#!/usr/bin/env python3
"""Read-only Google Ads Keyword Planner demand report for UPG.

The script reads an approved seed CSV, requests US English historical metrics,
and prints aggregate, non-PII output. It never creates campaigns or changes a
Google Ads account.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


CONFIG_DIR = Path.home() / ".config" / "gcloud" / "upg-automation"
DEFAULT_CREDENTIAL = CONFIG_DIR / "authorized_user.json"
DEFAULT_ADS_CONFIG = CONFIG_DIR / "google_ads.json"
DEFAULT_SEEDS = Path(__file__).resolve().parents[1] / "docs" / "google-keyword-planner-seeds.csv"
GOOGLE_ADS_API_VERSION = "v25"
PROJECT_ID = "upg-leads-crm"
MARKETS = {
    "US": {"label": "United States", "geo_target": "2840"},
    "CA": {"label": "Canada", "geo_target": "2124"},
    "GB": {"label": "United Kingdom", "geo_target": "2826"},
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--seeds", type=Path, default=DEFAULT_SEEDS)
    parser.add_argument("--market", choices=tuple(MARKETS), default="US")
    parser.add_argument("--format", choices=("json", "markdown", "csv"), default="markdown")
    parser.add_argument("--minimum-searches", type=int, default=0)
    parser.add_argument(
        "--credential",
        type=Path,
        default=Path(os.getenv("UPG_GOOGLE_CREDENTIAL_FILE", DEFAULT_CREDENTIAL)),
    )
    parser.add_argument(
        "--ads-config",
        type=Path,
        default=Path(os.getenv("UPG_GOOGLE_ADS_CONFIG_FILE", DEFAULT_ADS_CONFIG)),
    )
    return parser.parse_args()


def load_keywords(path: Path) -> list[str]:
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames or "Keyword" not in reader.fieldnames:
            raise ValueError(f"Seed CSV must contain a Keyword column: {path}")
        keywords: list[str] = []
        seen: set[str] = set()
        for row in reader:
            keyword = str(row.get("Keyword") or "").strip()
            key = keyword.casefold()
            if keyword and key not in seen:
                seen.add(key)
                keywords.append(keyword)
    if not keywords:
        raise ValueError(f"Seed CSV contains no keywords: {path}")
    if len(keywords) > 10_000:
        raise ValueError("Google Ads accepts at most 10,000 keywords per request")
    return keywords


def refresh_access_token(path: Path) -> str:
    credential = json.loads(path.read_text())
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
        return str(json.load(response)["access_token"])


def request_metrics(
    token: str,
    ads_config: dict[str, Any],
    keywords: list[str],
    market: str,
) -> dict[str, Any]:
    customer_id = "".join(ch for ch in str(ads_config["customer_id"]) if ch.isdigit())
    login_customer_id = "".join(
        ch
        for ch in str(ads_config.get("login_customer_id") or customer_id)
        if ch.isdigit()
    )
    target = MARKETS[market]
    body = json.dumps(
        {
            "keywords": keywords,
            "geoTargetConstants": [f"geoTargetConstants/{target['geo_target']}"],
            "keywordPlanNetwork": "GOOGLE_SEARCH",
            "language": "languageConstants/1000",
            "includeAdultKeywords": False,
            "historicalMetricsOptions": {"includeAverageCpc": True},
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        f"https://googleads.googleapis.com/{GOOGLE_ADS_API_VERSION}/customers/{customer_id}:generateKeywordHistoricalMetrics",
        data=body,
        headers={
            "Accept": "application/json",
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "developer-token": str(ads_config["developer_token"]),
            "login-customer-id": login_customer_id,
            "X-Goog-User-Project": PROJECT_ID,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=90) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        raw = error.read().decode("utf-8", errors="replace")
        try:
            payload = json.loads(raw)
            message = payload.get("error", {}).get("message") or "Google Ads API error"
        except json.JSONDecodeError:
            message = raw[:500]
        raise RuntimeError(f"Google Ads API returned HTTP {error.code}: {message}") from error


def micros_to_dollars(value: Any) -> float:
    try:
        return round(int(value or 0) / 1_000_000, 2)
    except (TypeError, ValueError):
        return 0.0


def parse_results(payload: dict[str, Any]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for item in payload.get("results", []):
        metrics = item.get("keywordMetrics", {})
        rows.append(
            {
                "keyword": item.get("text", ""),
                "average_monthly_searches": int(metrics.get("avgMonthlySearches", 0)),
                "competition": metrics.get("competition", "UNSPECIFIED"),
                "competition_index": int(metrics.get("competitionIndex", 0)),
                "low_top_of_page_bid_usd": micros_to_dollars(
                    metrics.get("lowTopOfPageBidMicros")
                ),
                "high_top_of_page_bid_usd": micros_to_dollars(
                    metrics.get("highTopOfPageBidMicros")
                ),
                "average_cpc_usd": micros_to_dollars(metrics.get("averageCpcMicros")),
            }
        )
    return sorted(
        rows,
        key=lambda row: (
            -row["average_monthly_searches"],
            -row["competition_index"],
            row["keyword"],
        ),
    )


def render_markdown(report: dict[str, Any]) -> str:
    lines = [
        f"# UPG Keyword Planner Snapshot: {report['market']}",
        "",
        f"- Seed keywords: {report['requested_keyword_count']}",
        f"- Returned metrics: {report['returned_keyword_count']}",
        "- Language: English",
        "- Network: Google Search",
        "- Evidence: Google Ads API GenerateKeywordHistoricalMetrics",
        "",
        "Average monthly searches are rounded planning estimates. Ad competition and bids are not organic-ranking difficulty scores. Related keywords can overlap, so rows must not be summed into a market-size claim.",
        "",
        "| Keyword | Avg monthly searches | Ad competition | Index | Low bid | High bid | Avg CPC |",
        "| --- | ---: | --- | ---: | ---: | ---: | ---: |",
    ]
    for row in report["rows"]:
        lines.append(
            "| {keyword} | {average_monthly_searches:,} | {competition} | {competition_index} | ${low_top_of_page_bid_usd:.2f} | ${high_top_of_page_bid_usd:.2f} | ${average_cpc_usd:.2f} |".format(
                **row
            )
        )
    return "\n".join(lines)


def render_csv(report: dict[str, Any]) -> str:
    fieldnames = [
        "keyword",
        "average_monthly_searches",
        "competition",
        "competition_index",
        "low_top_of_page_bid_usd",
        "high_top_of_page_bid_usd",
        "average_cpc_usd",
    ]
    from io import StringIO

    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=fieldnames, lineterminator="\n")
    writer.writeheader()
    writer.writerows(report["rows"])
    return output.getvalue().rstrip()


def main() -> int:
    args = parse_args()
    keywords = load_keywords(args.seeds)
    ads_config = json.loads(args.ads_config.read_text())
    payload = request_metrics(
        refresh_access_token(args.credential), ads_config, keywords, args.market
    )
    rows = [
        row
        for row in parse_results(payload)
        if row["average_monthly_searches"] >= args.minimum_searches
    ]
    report = {
        "market": MARKETS[args.market]["label"],
        "market_code": args.market,
        "language": "English",
        "network": "Google Search",
        "requested_keyword_count": len(keywords),
        "returned_keyword_count": len(rows),
        "rows": rows,
    }
    if args.format == "json":
        print(json.dumps(report, indent=2))
    elif args.format == "csv":
        print(render_csv(report))
    else:
        print(render_markdown(report))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
