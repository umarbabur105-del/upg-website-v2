"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const messages = [
  "Free design support on all orders",
  "Quote turnaround targeted within 24 business hours",
  "Shipped to US & Canada with DDP pricing available",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setFading(false);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-olive px-4 text-center text-xs text-offwhite/85"
      style={{ height: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem" }}
    >
      <span
        style={{
          transition: "opacity 0.35s ease",
          opacity: fading ? 0 : 1,
        }}
      >
        {messages[index]}
      </span>
      <span className="text-offwhite/40 mx-1">—</span>
      <Link
        href="/get-a-quote"
        className="font-medium text-gold underline-offset-2 hover:underline"
      >
        Get a Quote →
      </Link>
    </div>
  );
}
