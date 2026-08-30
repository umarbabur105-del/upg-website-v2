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


if __name__ == "__main__":
    unittest.main()
