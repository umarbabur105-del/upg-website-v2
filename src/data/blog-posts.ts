export interface BlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  date: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-moq-custom-packaging",
    title: "What Is MOQ in Custom Packaging?",
    date: "2026-08-04",
    excerpt:
      "MOQ is the minimum quantity available for a packaging format. See UPG's planning minimums for tuck boxes, mailer boxes, magnetic boxes, and Mylar bags.",
    content: `
MOQ means **minimum order quantity**. It is the lowest quantity available for a confirmed packaging format and specification.

## UPG planning MOQs

- **Tuck boxes:** 1,000 units when every finished dimension is 5 inches or less; 500 units over 5 inches through 10 inches; 250 units over 10 inches.
- **Corrugated mailer boxes:** the same size-based minimums as tuck boxes.
- **Magnetic boxes:** 250 units; final dimensions are confirmed after structural feasibility review.
- **Collapsible magnetic boxes:** 250 units; final dimensions are confirmed after structural feasibility review.
- **Mylar bags:** 500 units.

## Why dimensions matter

Tuck and ear-lock mailer projects move through three planning brackets. Share all finished dimensions in your project enquiry so the correct bracket can be confirmed before pricing.

## A simple way to start

Choose the product family, add the quantity and dimensions you need, and explain what the packaging will hold. UPG will review the structure, confirm the applicable MOQ, and prepare project pricing.
    `.trim(),
  },
  {
    slug: "corrugated-vs-rigid-boxes",
    title: "Corrugated Mailer vs. Magnetic Boxes: Which Fits Your Brand?",
    metaTitle: "Corrugated Mailer vs. Magnetic Boxes",
    date: "2026-08-04",
    excerpt:
      "Compare branded corrugated mailer boxes with magnetic and collapsible magnetic boxes for PR kits, ecommerce, gifting, and premium presentation.",
    content: `
The keyword **corrugated boxes** covers many buying intentions. UPG focuses its corrugated offer on ear-lock mailer boxes for branded presentation, PR kits, subscriptions, and ecommerce unboxing.

## Choose a corrugated mailer box when

- You want an ear-lock mailer structure.
- The inside and outside presentation both matter.
- The project is a PR kit, subscription program, or branded ecommerce experience.
- You may need a custom insert.

UPG does not supply regular slotted shipping cartons, master cartons, or RSC cases.

## Choose a magnetic box when

- The box itself is part of the premium product experience.
- The project is for gifting, beauty, apparel, electronics, or a launch collection.
- You want a magnetic closure, custom insert, or specialty finish combination.

## Choose a collapsible magnetic box when

You want the premium presentation of a magnetic box with a structure that folds flat to reduce freight and storage volume.

## How to choose

Start with the experience you want the customer to have. Then share the product dimensions, quantity, and reference images so the structure and pricing can be developed around the real project.
    `.trim(),
  },
  {
    slug: "how-to-prepare-artwork-for-custom-packaging",
    title: "How to Prepare Artwork for Custom Packaging",
    date: "2026-08-04",
    excerpt:
      "A simple preparation checklist for artwork, references, dimensions, and structure approval before custom packaging production.",
    content: `
Good packaging artwork starts with the correct structure. A tuck box, corrugated mailer, magnetic box, collapsible magnetic box, and Mylar bag each need their own approved template.

## Confirm the structure first

Share the product type, finished dimensions, quantity, and intended use before final artwork is locked. UPG coordinates the applicable dieline after the structure is sufficiently defined.

## Send what you already have

Useful starting files include:

- Brand artwork and logos
- Packaging references or mockups
- Product dimensions
- Existing packaging files
- Notes for foil, spot UV, embossing, debossing, windows, inserts, zippers, valves, or other selected features

## Use the approved dieline

Final artwork should be prepared on the approved project dieline. Keep structural lines and feature areas clear so the final review can match the intended pack.

## Ask before rebuilding files

If artwork is still in progress, state that in your project enquiry. It is better to confirm the structure before spending time adapting a design to the wrong template.
    `.trim(),
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
