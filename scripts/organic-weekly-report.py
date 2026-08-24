#!/usr/bin/env python3
"""Aggregate-only weekly acquisition report for UPG.

Reads Google Search Console, GA4, and the UPG Leads CRM sheet through the
existing local OAuth credential. It never writes to Google services and never
prints lead names, email addresses, phone numbers, companies, or project notes.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any


DEFAULT_CREDENTIAL = (
    Path.home() / ".config" / "gcloud" / "upg-automation" / "authorized_user.json"
)
PROJECT_ID = os.getenv("UPG_GOOGLE_PROJECT_ID", "upg-leads-crm")
GA4_PROPERTY_ID = os.getenv("UPG_GA4_PROPERTY_ID", "548846712")
SEARCH_CONSOLE_SITE = os.getenv(
    "UPG_SEARCH_CONSOLE_SITE", "sc-domain:universalpackaginggroup.com"
)
LEADS_SHEET_ID = os.getenv(
    "UPG_LEADS_SPREADSHEET_ID", "1nIMeqtTF9mv0gYxbI83GbgTatY0WdnSlfm3d009hxqQ"
)
BRAND_TERMS = ("universal packaging", "universal package", "upg")
COMMERCIAL_PACKAGING_PATTERN = re.compile(
    r"\b(?:packaging|boxes?|mailers?|cartons?|pouches?|mylar|bags?|roll[\s-]?stock|tuck|magnetic)\b",
    re.IGNORECASE,
)
CORE_PRODUCT_PATHS = (
    "/products/custom-tuck-boxes",
    "/products/custom-mailer-boxes",
    "/products/custom-magnetic-boxes",
    "/products/custom-collapsible-magnetic-boxes",
    "/products/custom-mylar-bags",
)
OUT_OF_SCOPE_QUERY_TERMS = (
    "gaylord",
    "master carton",
    "shipping carton",
    "rsc box",
    "rsc carton",
    "fulfillment",
    "overwrap",
    "overwrapper",
    "lipstick casing",
    "lipstick mechanism",
    "aluminum lipstick",
    "refillable lipstick",
    "filling and packaging",
)
AI_SOURCES = (
    "chatgpt",
    "openai",
    "perplexity",
    "claude",
    "gemini",
    "copilot",
    "you.com",
)
SEARCH_SOURCES = ("google.", "bing.", "search.yahoo.", "duckduckgo.")
FUNNEL_EVENT_NAMES = (
    "form_start",
    "generate_lead",
    "begin_checkout",
    "purchase",
)
TOOL_EVENT_NAMES = (
    "packaging_format_finder_result",
    "packaging_format_finder_handoff",
    "packaging_artwork_preflight_result",
    "packaging_artwork_preflight_handoff",
    "packaging_spec_copy",
    "packaging_spec_share_link",
    "packaging_spec_download",
    "packaging_spec_print",
    "packaging_spec_quote_handoff",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--days", type=int, default=7, choices=range(1, 91))
    parser.add_argument("--format", choices=("json", "markdown"), default="markdown")
    parser.add_argument(
        "--credential",
        type=Path,
        default=Path(os.getenv("UPG_GOOGLE_CREDENTIAL_FILE", DEFAULT_CREDENTIAL)),
    )
    return parser.parse_args()


def refresh_access_token(credential_path: Path) -> str:
    credential = json.loads(credential_path.read_text())
    data = urllib.parse.urlencode(
        {
            "client_id": credential["client_id"],
            "client_secret": credential["client_secret"],
            "refresh_token": credential["refresh_token"],
            "grant_type": "refresh_token",
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        "https://oauth2.googleapis.com/token",
        data=data,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)["access_token"]


def request_json(
    url: str,
    token: str,
    *,
    method: str = "GET",
    body: dict[str, Any] | None = None,
    timeout: int = 60,
) -> dict[str, Any]:
    data = None if body is None else json.dumps(body).encode("utf-8")
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {token}",
        "X-Goog-User-Project": PROJECT_ID,
    }
    if data is not None:
        headers["Content-Type"] = "application/json"
    for attempt in range(1, 4):
        request = urllib.request.Request(url, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            raw = error.read().decode("utf-8", errors="replace")
            if error.code < 500 or attempt == 3:
                raise RuntimeError(
                    f"Google API returned HTTP {error.code}: {raw[:500]}"
                ) from error
        except (urllib.error.URLError, TimeoutError) as error:
            if attempt == 3:
                raise RuntimeError(
                    f"Google API network request failed after {attempt} attempts: {error}"
                ) from error
        time.sleep(attempt * 1.5)
    raise RuntimeError("Google API request did not complete")


def period_ending(end_date: date, days: int) -> tuple[date, date]:
    return end_date - timedelta(days=days - 1), end_date


def previous_period(start_date: date, days: int) -> tuple[date, date]:
    previous_end = start_date - timedelta(days=1)
    return period_ending(previous_end, days)


def is_brand_query(query: str) -> bool:
    lowered = query.casefold()
    return any(term in lowered for term in BRAND_TERMS)


def search_opportunity_score(impressions: float, position: float) -> float:
    """Prioritize proven visibility that is closest to the first results pages."""
    position_weight = max(0.05, (51 - min(position, 50)) / 50)
    return impressions * position_weight


def is_commercial_packaging_query(query: str) -> bool:
    lowered = query.casefold()
    return bool(COMMERCIAL_PACKAGING_PATTERN.search(query)) and not any(
        term in lowered for term in OUT_OF_SCOPE_QUERY_TERMS
    )


def search_console_report(
    token: str, start_date: date, end_date: date
) -> dict[str, Any]:
    encoded_site = urllib.parse.quote(SEARCH_CONSOLE_SITE, safe="")
    payload = request_json(
        f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/searchAnalytics/query",
        token,
        method="POST",
        body={
            "startDate": start_date.isoformat(),
            "endDate": end_date.isoformat(),
            "dimensions": ["query", "page"],
            "rowLimit": 25000,
            "dataState": "all",
        },
    )
    rows = payload.get("rows", [])
    non_brand = [row for row in rows if not is_brand_query(row["keys"][0])]
    query_totals: dict[str, dict[str, float]] = {}
    for row in non_brand:
        query = row["keys"][0]
        current = query_totals.setdefault(
            query, {"clicks": 0.0, "impressions": 0.0, "position_sum": 0.0}
        )
        impressions = float(row.get("impressions", 0))
        current["clicks"] += float(row.get("clicks", 0))
        current["impressions"] += impressions
        current["position_sum"] += float(row.get("position", 0)) * impressions

    top_queries = []
    for query, values in sorted(
        query_totals.items(), key=lambda item: -item[1]["impressions"]
    )[:10]:
        impressions = values["impressions"]
        top_queries.append(
            {
                "query": query,
                "clicks": round(values["clicks"], 2),
                "impressions": round(impressions, 2),
                "average_position": (
                    round(values["position_sum"] / impressions, 1)
                    if impressions
                    else None
                ),
            }
        )

    page_totals: dict[str, dict[str, float]] = {}
    for row in non_brand:
        page = urllib.parse.urlsplit(row["keys"][1]).path or "/"
        current = page_totals.setdefault(
            page, {"clicks": 0.0, "impressions": 0.0, "position_sum": 0.0}
        )
        impressions = float(row.get("impressions", 0))
        current["clicks"] += float(row.get("clicks", 0))
        current["impressions"] += impressions
        current["position_sum"] += float(row.get("position", 0)) * impressions

    top_pages = []
    for page, values in sorted(
        page_totals.items(), key=lambda item: -item[1]["impressions"]
    )[:10]:
        impressions = values["impressions"]
        top_pages.append(
            {
                "page": page,
                "clicks": round(values["clicks"], 2),
                "impressions": round(impressions, 2),
                "average_position": (
                    round(values["position_sum"] / impressions, 1)
                    if impressions
                    else None
                ),
            }
        )

    core_product_pages = []
    for page in CORE_PRODUCT_PATHS:
        values = page_totals.get(
            page, {"clicks": 0.0, "impressions": 0.0, "position_sum": 0.0}
        )
        impressions = values["impressions"]
        core_product_pages.append(
            {
                "page": page,
                "clicks": round(values["clicks"], 2),
                "impressions": round(impressions, 2),
                "average_position": (
                    round(values["position_sum"] / impressions, 1)
                    if impressions
                    else None
                ),
            }
        )

    top_query_pages = [
        {
            "query": row["keys"][0],
            "page": urllib.parse.urlsplit(row["keys"][1]).path or "/",
            "clicks": round(float(row.get("clicks", 0)), 2),
            "impressions": round(float(row.get("impressions", 0)), 2),
            "average_position": round(float(row.get("position", 0)), 1),
        }
        for row in sorted(
            non_brand,
            key=lambda item: (
                -float(item.get("impressions", 0)),
                float(item.get("position", 0)),
            ),
        )[:15]
    ]

    zero_click_opportunities = []
    for row in non_brand:
        clicks = float(row.get("clicks", 0))
        impressions = float(row.get("impressions", 0))
        position = float(row.get("position", 0))
        if (
            clicks
            or not impressions
            or position > 50
            or not is_commercial_packaging_query(row["keys"][0])
        ):
            continue
        zero_click_opportunities.append(
            {
                "query": row["keys"][0],
                "page": urllib.parse.urlsplit(row["keys"][1]).path or "/",
                "impressions": round(impressions, 2),
                "average_position": round(position, 1),
                "opportunity_score": round(
                    search_opportunity_score(impressions, position), 2
                ),
            }
        )
    zero_click_opportunities.sort(
        key=lambda item: (
            -item["opportunity_score"],
            -item["impressions"],
            item["average_position"],
        )
    )

    zero_click_pages = [
        item
        for item in top_pages
        if item["impressions"] and not item["clicks"]
    ]

    return {
        "clicks": round(sum(float(row.get("clicks", 0)) for row in rows), 2),
        "impressions": round(
            sum(float(row.get("impressions", 0)) for row in rows), 2
        ),
        "non_brand_clicks": round(
            sum(float(row.get("clicks", 0)) for row in non_brand), 2
        ),
        "non_brand_impressions": round(
            sum(float(row.get("impressions", 0)) for row in non_brand), 2
        ),
        "queries_in_positions_1_20": sum(
            1
            for values in query_totals.values()
            if values["impressions"]
            and values["position_sum"] / values["impressions"] <= 20
        ),
        "top_non_brand_queries": top_queries,
        "top_non_brand_pages": top_pages,
        "core_product_pages": core_product_pages,
        "top_non_brand_query_pages": top_query_pages,
        "zero_click_opportunities": zero_click_opportunities[:10],
        "zero_click_pages": zero_click_pages,
    }


def ga4_report(token: str, start_date: date, end_date: date) -> dict[str, Any]:
    payload = request_json(
        f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport",
        token,
        method="POST",
        body={
            "dateRanges": [
                {"startDate": start_date.isoformat(), "endDate": end_date.isoformat()}
            ],
            "dimensions": [{"name": "sessionDefaultChannelGroup"}],
            "metrics": [
                {"name": "sessions"},
                {"name": "activeUsers"},
                {"name": "keyEvents"},
            ],
            "orderBys": [{"metric": {"metricName": "sessions"}, "desc": True}],
        },
    )
    channels: dict[str, dict[str, float]] = {}
    for row in payload.get("rows", []):
        channel = row["dimensionValues"][0]["value"]
        metrics = [float(value["value"]) for value in row["metricValues"]]
        channels[channel] = {
            "sessions": metrics[0],
            "active_users": metrics[1],
            "key_events": metrics[2],
        }

    tracked_event_names = (*FUNNEL_EVENT_NAMES, *TOOL_EVENT_NAMES)
    event_payload = request_json(
        f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport",
        token,
        method="POST",
        body={
            "dateRanges": [
                {"startDate": start_date.isoformat(), "endDate": end_date.isoformat()}
            ],
            "dimensions": [{"name": "eventName"}],
            "metrics": [{"name": "eventCount"}, {"name": "totalUsers"}],
            "dimensionFilter": {
                "filter": {
                    "fieldName": "eventName",
                    "inListFilter": {
                        "values": list(tracked_event_names),
                        "caseSensitive": True,
                    },
                }
            },
            "limit": str(len(tracked_event_names)),
        },
    )
    events = {
        event_name: {"event_count": 0.0, "total_users": 0.0}
        for event_name in tracked_event_names
    }
    for row in event_payload.get("rows", []):
        event_name = row["dimensionValues"][0]["value"]
        metrics = [float(value["value"]) for value in row["metricValues"]]
        if event_name in events:
            events[event_name] = {
                "event_count": metrics[0],
                "total_users": metrics[1],
            }

    return {
        "sessions": round(sum(item["sessions"] for item in channels.values()), 2),
        "active_users": round(
            sum(item["active_users"] for item in channels.values()), 2
        ),
        "key_events": round(sum(item["key_events"] for item in channels.values()), 2),
        "organic_search_sessions": round(
            channels.get("Organic Search", {}).get("sessions", 0), 2
        ),
        "organic_shopping_sessions": round(
            channels.get("Organic Shopping", {}).get("sessions", 0), 2
        ),
        "referral_sessions": round(
            channels.get("Referral", {}).get("sessions", 0), 2
        ),
        "channels": channels,
        "events": events,
    }


def ga4_event_count(report: dict[str, Any], event_name: str) -> float:
    return float(report["ga4"]["events"].get(event_name, {}).get("event_count", 0))


def google_serial_to_date(value: str) -> date | None:
    try:
        serial = float(value)
    except (TypeError, ValueError):
        try:
            return datetime.fromisoformat(value.replace("Z", "+00:00")).date()
        except (TypeError, ValueError):
            return None
    return (datetime(1899, 12, 30, tzinfo=timezone.utc) + timedelta(days=serial)).date()


def classify_lead(row: dict[str, str]) -> str:
    utm_source = row.get("UTM Source", "").casefold()
    utm_medium = row.get("UTM Medium", "").casefold()
    referrer = row.get("Referrer", "").casefold()
    combined = " ".join((utm_source, utm_medium, referrer))
    if "organic_shopping" in utm_medium or "merchant" in combined:
        return "merchant_free_listing"
    if "ai_referral" in utm_medium or any(source in combined for source in AI_SOURCES):
        return "ai_referral"
    if "organic" in utm_medium or any(source in referrer for source in SEARCH_SOURCES):
        return "organic_search"
    if not utm_source and not utm_medium and not referrer:
        return "direct_or_unattributed"
    return "other"


def sheet_rows(token: str) -> list[dict[str, str]]:
    encoded_range = urllib.parse.quote("Leads!A1:AH", safe="")
    payload = request_json(
        f"https://sheets.googleapis.com/v4/spreadsheets/{LEADS_SHEET_ID}/values/{encoded_range}",
        token,
    )
    values = payload.get("values", [])
    if not values:
        return []
    headers = values[0]
    return [
        {header: row[index] if index < len(row) else "" for index, header in enumerate(headers)}
        for row in values[1:]
        if row
    ]


def crm_report(rows: list[dict[str, str]], start_date: date, end_date: date) -> dict[str, Any]:
    period_rows = []
    for row in rows:
        received = google_serial_to_date(row.get("Received At", ""))
        if received and start_date <= received <= end_date:
            period_rows.append(row)

    real_rows = [
        row
        for row in period_rows
        if row.get("Status", "").casefold() != "spam"
        and row.get("UTM Source", "").casefold() != "codex-verification"
    ]
    acquisition = Counter(classify_lead(row) for row in real_rows)
    statuses = Counter(row.get("Status") or "Unspecified" for row in real_rows)
    products = Counter(
        (row.get("Product Family") or row.get("Product Style") or "Unspecified")
        for row in real_rows
    )
    qualified = sum(
        count
        for status, count in statuses.items()
        if status.casefold() in {"qualified", "quoted", "won"}
    )
    won = sum(count for status, count in statuses.items() if status.casefold() == "won")

    landing_page_groups: dict[str, list[dict[str, str]]] = {}
    for row in real_rows:
        raw_landing_page = row.get("Landing Page", "").strip()
        if raw_landing_page:
            parsed = urllib.parse.urlsplit(raw_landing_page)
            landing_page = parsed.path or "/"
        else:
            landing_page = "Unattributed"
        landing_page_groups.setdefault(landing_page, []).append(row)

    landing_page_outcomes = []
    for landing_page, landing_rows in landing_page_groups.items():
        landing_statuses = Counter(
            row.get("Status") or "Unspecified" for row in landing_rows
        )
        landing_qualified = sum(
            count
            for status, count in landing_statuses.items()
            if status.casefold() in {"qualified", "quoted", "won"}
        )
        landing_won = sum(
            count
            for status, count in landing_statuses.items()
            if status.casefold() == "won"
        )
        landing_page_outcomes.append(
            {
                "landing_page": landing_page,
                "leads": len(landing_rows),
                "qualified_or_later": landing_qualified,
                "won": landing_won,
                "qualified_rate": round(landing_qualified / len(landing_rows), 4),
                "statuses": dict(sorted(landing_statuses.items())),
            }
        )
    landing_page_outcomes.sort(
        key=lambda item: (
            -item["qualified_or_later"],
            -item["leads"],
            item["landing_page"],
        )
    )

    return {
        "leads": len(real_rows),
        "qualified_or_later": qualified,
        "won": won,
        "qualified_rate": round(qualified / len(real_rows), 4) if real_rows else 0,
        "acquisition": dict(sorted(acquisition.items())),
        "statuses": dict(sorted(statuses.items())),
        "product_families": dict(products.most_common()),
        "landing_page_outcomes": landing_page_outcomes,
        "excluded_spam_or_verification": len(period_rows) - len(real_rows),
    }


def compare(current: float, previous: float) -> dict[str, float | None]:
    return {
        "current": current,
        "previous": previous,
        "change": round(current - previous, 2),
        "change_percent": (
            round((current - previous) / previous * 100, 1) if previous else None
        ),
    }


def markdown_report(report: dict[str, Any]) -> str:
    periods = report["periods"]
    current = report["current"]
    comparisons = report["comparisons"]
    lines = [
        "# UPG Weekly Organic Acquisition Report",
        "",
        f"Generated: {report['generated_at']}",
        f"GA4 and CRM period: {periods['current']['start']} to {periods['current']['end']}",
        f"Search Console period: {periods['search_console_current']['start']} to {periods['search_console_current']['end']} (lag-adjusted)",
        "",
        "## Decision metrics",
        "",
        f"- Search impressions: {comparisons['search_impressions']['current']} (previous {comparisons['search_impressions']['previous']})",
        f"- Non-brand search impressions: {comparisons['non_brand_impressions']['current']} (previous {comparisons['non_brand_impressions']['previous']})",
        f"- Non-brand clicks: {comparisons['non_brand_clicks']['current']} (previous {comparisons['non_brand_clicks']['previous']})",
        f"- Non-brand queries in positions 1–20: {current['search_console']['queries_in_positions_1_20']}",
        f"- Organic Search sessions: {comparisons['organic_search_sessions']['current']} (previous {comparisons['organic_search_sessions']['previous']})",
        f"- Organic Shopping sessions: {comparisons['organic_shopping_sessions']['current']} (previous {comparisons['organic_shopping_sessions']['previous']})",
        f"- Lead form starts: {comparisons['form_starts']['current']} (previous {comparisons['form_starts']['previous']})",
        f"- Successful lead submissions: {comparisons['generated_leads']['current']} (previous {comparisons['generated_leads']['previous']})",
        f"- Sample-kit checkout starts: {comparisons['checkout_starts']['current']} (previous {comparisons['checkout_starts']['previous']})",
        f"- Sample-kit purchases: {comparisons['purchases']['current']} (previous {comparisons['purchases']['previous']})",
        f"- Qualified website leads: {comparisons['qualified_leads']['current']} (previous {comparisons['qualified_leads']['previous']})",
        f"- Won website leads: {comparisons['won_leads']['current']} (previous {comparisons['won_leads']['previous']})",
        "",
        "## Current lead attribution",
        "",
    ]
    acquisition = current["crm"]["acquisition"]
    if acquisition:
        lines.extend(f"- {source}: {count}" for source, count in acquisition.items())
    else:
        lines.append("- No non-spam website leads in this period.")
    lines.extend(["", "## Current lead statuses", ""])
    statuses = current["crm"]["statuses"]
    if statuses:
        lines.extend(f"- {status}: {count}" for status, count in statuses.items())
    else:
        lines.append("- No non-spam website lead statuses in this period.")
    lines.extend(["", "## Current product-family attribution", ""])
    product_families = current["crm"]["product_families"]
    if product_families:
        lines.extend(
            f"- {product_family}: {count}"
            for product_family, count in product_families.items()
        )
    else:
        lines.append("- No product-family attribution in this period.")
    lines.extend(
        [
            "",
            "## CRM exclusions",
            "",
            f"- Spam or verification rows excluded: {current['crm']['excluded_spam_or_verification']}",
        ]
    )
    lines.extend(["", "## Lead outcomes by landing page", ""])
    landing_page_outcomes = current["crm"]["landing_page_outcomes"]
    if landing_page_outcomes:
        lines.extend(
            f"- {item['landing_page']}: {item['leads']} leads, {item['qualified_or_later']} qualified or later, {item['won']} won"
            for item in landing_page_outcomes
        )
    else:
        lines.append("- No non-spam landing-page outcomes in this period.")
    lines.extend(["", "## On-site tool engagement", ""])
    tool_events = current["ga4"]["events"]
    measured_tool_events = [
        (event_name, tool_events[event_name]["event_count"])
        for event_name in TOOL_EVENT_NAMES
        if tool_events[event_name]["event_count"]
    ]
    if measured_tool_events:
        lines.extend(
            f"- {event_name}: {event_count}"
            for event_name, event_count in measured_tool_events
        )
    else:
        lines.append("- No measured tool events in this period.")
    lines.extend(["", "## Top non-brand Search Console queries", ""])
    queries = current["search_console"]["top_non_brand_queries"]
    if queries:
        lines.extend(
            f"- {item['query']}: {item['impressions']} impressions, {item['clicks']} clicks, position {item['average_position']}"
            for item in queries
        )
    else:
        lines.append("- No non-brand query evidence in this period.")
    lines.extend(["", "## Top non-brand landing pages", ""])
    pages = current["search_console"]["top_non_brand_pages"]
    if pages:
        lines.extend(
            f"- {item['page']}: {item['impressions']} impressions, {item['clicks']} clicks, position {item['average_position']}"
            for item in pages
        )
    else:
        lines.append("- No non-brand landing-page evidence in this period.")
    lines.extend(["", "## Core product page visibility", ""])
    lines.extend(
        f"- {item['page']}: {item['impressions']} impressions, {item['clicks']} clicks, "
        + (
            f"position {item['average_position']}"
            if item["average_position"] is not None
            else "no measured position"
        )
        for item in current["search_console"]["core_product_pages"]
    )
    lines.extend(["", "## Top non-brand query-to-page pairs", ""])
    query_pages = current["search_console"]["top_non_brand_query_pages"]
    if query_pages:
        lines.extend(
            f"- {item['query']} -> {item['page']}: {item['impressions']} impressions, {item['clicks']} clicks, position {item['average_position']}"
            for item in query_pages
        )
    else:
        lines.append("- No non-brand query-to-page evidence in this period.")
    lines.extend(["", "## Search opportunities", ""])
    opportunities = current["search_console"]["zero_click_opportunities"]
    if opportunities:
        lines.append(
            "Zero-click commercial-packaging query-to-page pairs at position 50 or better, scored by impressions and ranking proximity:"
        )
        lines.extend(
            f"- {item['query']} -> {item['page']}: {item['impressions']} impressions, position {item['average_position']}, opportunity score {item['opportunity_score']}"
            for item in opportunities
        )
    else:
        lines.append("- No zero-click query-to-page opportunities at position 50 or better.")
    zero_click_pages = current["search_console"]["zero_click_pages"]
    if zero_click_pages:
        lines.extend(["", "Pages with measured non-brand visibility but no clicks:"])
        lines.extend(
            f"- {item['page']}: {item['impressions']} impressions, position {item['average_position']}"
            for item in zero_click_pages
        )
    lines.extend(
        [
            "",
            "## Privacy and interpretation",
            "",
            "- This report is aggregate-only and does not print lead identity or project notes.",
            "- Search Console is lag-adjusted and should not be compared to same-day GA4 activity.",
            "- Zero leads or sessions means no measured evidence in the selected period; it is not proof that a channel can never work.",
        ]
    )
    return "\n".join(lines) + "\n"


def main() -> None:
    args = parse_args()
    token = refresh_access_token(args.credential)
    today = date.today()

    current_start, current_end = period_ending(today - timedelta(days=1), args.days)
    previous_start, previous_end = previous_period(current_start, args.days)
    sc_current_start, sc_current_end = period_ending(
        today - timedelta(days=3), args.days
    )
    sc_previous_start, sc_previous_end = previous_period(sc_current_start, args.days)

    rows = sheet_rows(token)
    current = {
        "search_console": search_console_report(token, sc_current_start, sc_current_end),
        "ga4": ga4_report(token, current_start, current_end),
        "crm": crm_report(rows, current_start, current_end),
    }
    previous = {
        "search_console": search_console_report(token, sc_previous_start, sc_previous_end),
        "ga4": ga4_report(token, previous_start, previous_end),
        "crm": crm_report(rows, previous_start, previous_end),
    }
    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "periods": {
            "current": {
                "start": current_start.isoformat(),
                "end": current_end.isoformat(),
            },
            "previous": {
                "start": previous_start.isoformat(),
                "end": previous_end.isoformat(),
            },
            "search_console_current": {
                "start": sc_current_start.isoformat(),
                "end": sc_current_end.isoformat(),
            },
            "search_console_previous": {
                "start": sc_previous_start.isoformat(),
                "end": sc_previous_end.isoformat(),
            },
        },
        "current": current,
        "previous": previous,
        "comparisons": {
            "search_impressions": compare(
                current["search_console"]["impressions"],
                previous["search_console"]["impressions"],
            ),
            "non_brand_impressions": compare(
                current["search_console"]["non_brand_impressions"],
                previous["search_console"]["non_brand_impressions"],
            ),
            "non_brand_clicks": compare(
                current["search_console"]["non_brand_clicks"],
                previous["search_console"]["non_brand_clicks"],
            ),
            "organic_search_sessions": compare(
                current["ga4"]["organic_search_sessions"],
                previous["ga4"]["organic_search_sessions"],
            ),
            "organic_shopping_sessions": compare(
                current["ga4"]["organic_shopping_sessions"],
                previous["ga4"]["organic_shopping_sessions"],
            ),
            "form_starts": compare(
                ga4_event_count(current, "form_start"),
                ga4_event_count(previous, "form_start"),
            ),
            "generated_leads": compare(
                ga4_event_count(current, "generate_lead"),
                ga4_event_count(previous, "generate_lead"),
            ),
            "checkout_starts": compare(
                ga4_event_count(current, "begin_checkout"),
                ga4_event_count(previous, "begin_checkout"),
            ),
            "purchases": compare(
                ga4_event_count(current, "purchase"),
                ga4_event_count(previous, "purchase"),
            ),
            "qualified_leads": compare(
                current["crm"]["qualified_or_later"],
                previous["crm"]["qualified_or_later"],
            ),
            "won_leads": compare(current["crm"]["won"], previous["crm"]["won"]),
        },
    }

    if args.format == "json":
        print(json.dumps(report, indent=2, sort_keys=True))
    else:
        print(markdown_report(report), end="")


if __name__ == "__main__":
    main()
