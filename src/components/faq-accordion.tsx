"use client";

import * as Accordion from "@radix-ui/react-accordion";
import type { FaqItem } from "@/data/faq";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`faq-${index}`}
          className="border-b border-charcoal/10"
        >
          <Accordion.Trigger className="group flex w-full items-center justify-between py-6 text-left">
            <span className="font-serif text-lg font-medium text-charcoal md:text-xl">
              {item.question}
            </span>
            <svg
              className="h-5 w-5 shrink-0 text-gold transition-transform duration-200 group-data-[state=open]:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_200ms_ease-out] data-[state=open]:animate-[slideDown_200ms_ease-out]">
            <p className="pb-6 text-base leading-relaxed text-charcoal/70">
              {item.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
