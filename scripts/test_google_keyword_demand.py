#!/usr/bin/env python3
"""Unit tests for the read-only Keyword Planner report."""

from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).with_name("google-keyword-demand.py")
SPEC = importlib.util.spec_from_file_location("google_keyword_demand", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class GoogleKeywordDemandTest(unittest.TestCase):
    def test_load_keywords_deduplicates_case_insensitively(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "seeds.csv"
            path.write_text("Keyword\nCustom Boxes\ncustom boxes\nCustom Mailers\n")
            self.assertEqual(
                MODULE.load_keywords(path), ["Custom Boxes", "Custom Mailers"]
            )

    def test_parse_results_sorts_and_converts_micros(self) -> None:
        rows = MODULE.parse_results(
            {
                "results": [
                    {
                        "text": "lower demand",
                        "keywordMetrics": {
                            "avgMonthlySearches": "10",
                            "competition": "LOW",
                            "competitionIndex": "5",
                        },
                    },
                    {
                        "text": "higher demand",
                        "keywordMetrics": {
                            "avgMonthlySearches": "100",
                            "competition": "HIGH",
                            "competitionIndex": "90",
                            "averageCpcMicros": "1230000",
                        },
                    },
                ]
            }
        )
        self.assertEqual(rows[0]["keyword"], "higher demand")
        self.assertEqual(rows[0]["average_cpc_usd"], 1.23)

    def test_markdown_warns_against_market_size_summing(self) -> None:
        report = {
            "market": "United States",
            "requested_keyword_count": 1,
            "returned_keyword_count": 1,
            "rows": [
                {
                    "keyword": "custom boxes",
                    "average_monthly_searches": 100,
                    "competition": "HIGH",
                    "competition_index": 90,
                    "low_top_of_page_bid_usd": 1.0,
                    "high_top_of_page_bid_usd": 2.0,
                    "average_cpc_usd": 1.5,
                }
            ],
        }
        rendered = MODULE.render_markdown(report)
        self.assertIn("must not be summed", rendered)
        self.assertIn("| custom boxes | 100 |", rendered)


if __name__ == "__main__":
    unittest.main()
