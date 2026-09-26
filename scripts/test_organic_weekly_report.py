#!/usr/bin/env python3
"""Focused tests for UPG organic-report classification rules."""

from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).with_name("organic-weekly-report.py")
SPEC = importlib.util.spec_from_file_location("upg_organic_weekly_report", SCRIPT_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("Unable to load organic-weekly-report.py")
REPORT = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = REPORT
SPEC.loader.exec_module(REPORT)


class OrganicReportClassificationTests(unittest.TestCase):
    def test_brand_and_known_name_variants_are_excluded(self) -> None:
        for query in (
            "universal packaging group",
            "universal package company",
            "universal packing",
            "UPG packaging",
        ):
            with self.subTest(query=query):
                self.assertTrue(REPORT.is_brand_query(query))

    def test_commercial_non_brand_queries_remain_available(self) -> None:
        for query in (
            "custom packaging boxes",
            "lipstick packaging",
            "corrugated mailer boxes",
            "mylar bags wholesale",
        ):
            with self.subTest(query=query):
                self.assertFalse(REPORT.is_brand_query(query))

    def test_known_name_collisions_do_not_enter_opportunity_queue(self) -> None:
        for query in (
            "u packaging",
            "up packaging",
            "quick packaging llc",
            "upward packaging",
        ):
            with self.subTest(query=query):
                self.assertFalse(REPORT.is_commercial_packaging_query(query))

        self.assertTrue(REPORT.is_commercial_packaging_query("custom packaging boxes"))

    def test_withupg_campaign_is_classified_as_brand_alias(self) -> None:
        self.assertEqual(
            REPORT.classify_lead(
                {
                    "UTM Source": "withupg",
                    "UTM Medium": "vanity_url",
                    "UTM Campaign": "brand_alias",
                }
            ),
            "brand_alias",
        )
        self.assertEqual(
            REPORT.classify_lead(
                {
                    "UTM Source": "qr_code",
                    "UTM Medium": "vanity_url",
                    "UTM Campaign": "trade_show",
                }
            ),
            "brand_alias",
        )

    def test_only_explicit_qa_markers_are_excluded(self) -> None:
        for row in (
            {"UTM Source": "codex-verification"},
            {"UTM Campaign": "codex_integration_test"},
            {"UTM Term": "production_delivery_verification"},
            {"UTM Source": "stripe_test_mode"},
            {"Source": "Stripe Test Order"},
            {"Owner": "System Test"},
        ):
            with self.subTest(row=row):
                self.assertTrue(REPORT.is_explicit_qa_row(row))

        self.assertFalse(REPORT.is_explicit_qa_row({"UTM Campaign": "testimonial"}))
        self.assertFalse(REPORT.is_explicit_qa_row({"UTM Content": "qa"}))
        self.assertFalse(REPORT.is_explicit_qa_row({"Source": "Stripe Order"}))

    def test_reporting_dates_use_product_timezones_near_midnight(self) -> None:
        now = REPORT.datetime(2026, 9, 27, 5, 30, tzinfo=REPORT.timezone.utc)
        ga_today, search_console_today = REPORT.reporting_today(now)

        self.assertEqual(ga_today, REPORT.date(2026, 9, 27))
        self.assertEqual(search_console_today, REPORT.date(2026, 9, 26))
        _, ga_end = REPORT.period_ending(ga_today - REPORT.timedelta(days=1), 28)
        _, search_console_end = REPORT.period_ending(
            search_console_today - REPORT.timedelta(days=3), 28
        )
        self.assertEqual(ga_end, REPORT.date(2026, 9, 26))
        self.assertEqual(search_console_end, REPORT.date(2026, 9, 23))

    def test_crm_timestamp_uses_ga_timezone_for_period_inclusion(self) -> None:
        timestamp = REPORT.datetime(2026, 9, 26, 3, 30, tzinfo=REPORT.timezone.utc)
        serial = (timestamp - REPORT.datetime(1899, 12, 30, tzinfo=REPORT.timezone.utc)).total_seconds() / 86400
        row = {"Received At": str(serial), "Status": "New"}

        self.assertEqual(REPORT.google_serial_to_date(row["Received At"]), REPORT.date(2026, 9, 25))
        self.assertEqual(REPORT.google_serial_to_date("2026-09-26T03:30:00+00:00"), REPORT.date(2026, 9, 25))
        self.assertEqual(REPORT.google_serial_to_date("2026-09-26"), REPORT.date(2026, 9, 26))
        self.assertEqual(REPORT.crm_report([row], REPORT.date(2026, 9, 25), REPORT.date(2026, 9, 25))["leads"], 1)
        self.assertEqual(REPORT.crm_report([row], REPORT.date(2026, 9, 26), REPORT.date(2026, 9, 26))["leads"], 0)

    def test_sheet_read_requests_unformatted_values_and_normalizes_scalars(self) -> None:
        calls = []
        original = REPORT.request_json

        def fake_request(url, token, **kwargs):
            calls.append((url, token, kwargs))
            return {"values": [["Received At", "Status"], [45926.5, 1]]}

        REPORT.request_json = fake_request
        try:
            rows = REPORT.sheet_rows("token")
        finally:
            REPORT.request_json = original

        self.assertIn("valueRenderOption=UNFORMATTED_VALUE", calls[0][0])
        self.assertEqual(rows, [{"Received At": "45926.5", "Status": "1"}])

    def test_crm_report_excludes_only_spam_and_explicit_qa_rows(self) -> None:
        rows = [
            {"Received At": "2026-09-01", "Status": "New", "UTM Campaign": "testimonial"},
            {"Received At": "2026-09-01", "Status": "New", "UTM Source": "codex_integration_test"},
            {"Received At": "2026-09-01", "Status": "New", "Source": "Stripe Test Order"},
            {"Received At": "2026-09-01", "Status": "Spam"},
        ]
        report = REPORT.crm_report(rows, REPORT.date(2026, 9, 1), REPORT.date(2026, 9, 1))

        self.assertEqual(report["leads"], 1)
        self.assertEqual(report["excluded_spam_or_qa"], 3)

    def test_search_console_uses_ungrouped_totals_and_discloses_subset(self) -> None:
        responses = iter(
            [
                {"rows": [{"clicks": 100, "impressions": 1000}]},
                {
                    "rows": [
                        {
                            "keys": ["custom packaging boxes", "https://example.com/products"],
                            "clicks": 10,
                            "impressions": 100,
                            "position": 9,
                        },
                        {
                            "keys": ["universal packaging group", "https://example.com/"],
                            "clicks": 5,
                            "impressions": 50,
                            "position": 2,
                        },
                    ]
                },
            ]
        )
        original = REPORT.request_json
        REPORT.request_json = lambda *args, **kwargs: next(responses)
        try:
            report = REPORT.search_console_report("token", REPORT.date(2026, 9, 1), REPORT.date(2026, 9, 2))
        finally:
            REPORT.request_json = original

        self.assertEqual(report["clicks"], 100)
        self.assertEqual(report["impressions"], 1000)
        self.assertEqual(report["query_page_subset"]["clicks"], 15)
        self.assertEqual(report["query_page_subset"]["non_brand_clicks"], 10)

    def test_ga4_uses_ungrouped_unique_users_and_separate_brand_alias_query(self) -> None:
        responses = iter(
            [
                {"rows": [{"metricValues": [{"value": "20"}, {"value": "7"}, {"value": "9"}, {"value": "3"}]}]},
                {"rows": [{"dimensionValues": [{"value": "Organic Search"}], "metricValues": [{"value": "11"}, {"value": "6"}, {"value": "1"}]}, {"dimensionValues": [{"value": "Referral"}], "metricValues": [{"value": "9"}, {"value": "5"}, {"value": "2"}]}]},
                {"rows": [{"dimensionValues": [{"value": "quote_form_start"}], "metricValues": [{"value": "2"}, {"value": "2"}]}]},
                {"rows": [{"metricValues": [{"value": "4"}, {"value": "2"}, {"value": "2"}, {"value": "1"}]}]},
                {"rows": [{"dimensionValues": [{"value": "withupg"}, {"value": "vanity_url"}, {"value": "brand_alias"}], "metricValues": [{"value": "4"}, {"value": "1"}]}]},
                {"rows": [{"metricValues": [{"value": "3"}, {"value": "1"}]}]},
            ]
        )
        original = REPORT.request_json
        REPORT.request_json = lambda *args, **kwargs: next(responses)
        try:
            report = REPORT.ga4_report("token", REPORT.date(2026, 9, 1), REPORT.date(2026, 9, 2))
        finally:
            REPORT.request_json = original

        self.assertEqual(report["sessions"], 20)
        self.assertEqual(report["active_users"], 7)
        self.assertEqual(report["total_users"], 9)
        self.assertEqual(report["brand_alias_active_users"], 2)
        self.assertEqual(report["stripe_payment_provider_referrals"]["sessions"], 3)
        self.assertIn("quote_form_start", report["events"])
        self.assertIn("form_start", report["events"])


if __name__ == "__main__":
    unittest.main()
