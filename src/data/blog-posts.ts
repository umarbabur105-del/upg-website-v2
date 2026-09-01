export interface BlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  date: string;
  updatedAt?: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-moq-custom-packaging",
    title: "What Is MOQ in Custom Packaging?",
    date: "2026-08-04",
    updatedAt: "2026-09-01",
    excerpt:
      "MOQ is the minimum quantity available for a packaging format. See UPG's planning minimums for tuck boxes, mailer boxes, magnetic boxes, and Mylar bags.",
    content: `
MOQ means **minimum order quantity**. In custom packaging, it is the lowest production quantity available for one confirmed structure and specification. UPG uses a 250-unit planning MOQ for each of its five custom product families, regardless of finished size.

## UPG planning MOQs

| Product family | Planning MOQ | Typical starting point |
| --- | --- | --- |
| **Tuck boxes** | 250 units | Individual retail cartons and folding-box formats |
| **Corrugated mailer boxes** | 250 units | Ear-lock mailers for branded shipping and presentation |
| **Magnetic boxes** | 250 units | Premium assembled presentation boxes |
| **Collapsible magnetic boxes** | 250 units | Fold-flat premium presentation boxes |
| **Mylar bags** | 250 units | Finished pouches and approved flexible-packaging formats |

The planning MOQ applies to one approved product family and project specification. Combining unrelated box styles, sizes, artworks, or materials into one 250-unit total is not assumed. Any requested variation needs to be identified during quote review.

## What a planning MOQ does and does not confirm

The 250-unit figure gives a buyer a clear quantity threshold for starting a UPG custom-production enquiry. It does not confirm an instant price, production slot, material suitability, delivery date, freight cost, or final construction.

Those details depend on the approved structure, dimensions, material, print coverage, finish requirements, quantity, intended use, and delivery destination. The accepted written quote or agreement is the record that confirms the final commercial and production terms.

## Why dimensions still matter

Finished dimensions do not change UPG's 250-unit planning MOQ. They still affect structural feasibility, material use, panel layout, insert planning, packing, freight, and final pricing. A narrow lipstick carton, a corrugated mailer, and a magnetic presentation box can share the same planning MOQ while requiring completely different specifications.

## Why quantities above the MOQ still matter

The planning minimum is not a fixed pricing tier. Share the quantity you are likely to order, including any useful quantity breaks you want reviewed. Production quantity can change material planning, setup, packing, and delivery requirements, so the written quote must use the actual quantity being considered.

## What to send for an MOQ and price review

- The closest product family or a reference image
- Finished box dimensions, or the dimensions of the product being packed
- Required quantity and any quantity breaks to compare
- Intended use and delivery destination
- Known material, print, finish, insert, or artwork requirements

## A simple way to start

Choose the product family, add the quantity and dimensions you know, and explain what the packaging will hold. UPG will review the structure, identify open specification questions, and prepare project-specific pricing after the required details are clear.
    `.trim(),
  },
  {
    slug: "corrugated-vs-rigid-boxes",
    title: "Corrugated Mailer vs. Magnetic Boxes: Which Fits Your Brand?",
    metaTitle: "Corrugated Mailer vs. Magnetic Boxes",
    date: "2026-08-04",
    updatedAt: "2026-09-01",
    excerpt:
      "Compare branded corrugated mailer boxes with magnetic and collapsible magnetic boxes for PR kits, ecommerce, gifting, and premium presentation.",
    content: `
Corrugated ear-lock mailers and magnetic boxes solve different packaging jobs. Choose a corrugated mailer when shipping-ready structure and branded unboxing matter. Choose a magnetic box when the packaging itself needs to deliver a premium presentation experience. Both UPG families use a 250-unit planning MOQ.

## Corrugated mailer vs. magnetic box

| Decision | Corrugated ear-lock mailer | Magnetic presentation box |
| --- | --- | --- |
| **Primary role** | Branded mailer and presentation structure | Premium rigid presentation structure |
| **Common projects** | PR kits, subscriptions, ecommerce, product launches | Gifting, beauty sets, apparel, electronics, launch collections |
| **Closure** | Corrugated ear-lock construction | Magnetic closure |
| **Insert option** | Custom insert when required | Custom insert when required |
| **Planning MOQ** | 250 units | 250 units |
| **Important boundary** | Not a regular slotted shipping carton or master carton | Final structure, insert, and packed arrangement require review |

The word **corrugated boxes** covers several buying intentions. UPG's current corrugated offer is the ear-lock mailer format used for branded presentation and unboxing. Regular slotted shipping cartons, master cartons, and RSC cases are outside the current offer.

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

Choose a collapsible magnetic box when you want a premium magnetic presentation with a structure that ships and stores flat before assembly. Final packed dimensions, assembly method, and freight plan still need project review.

## Compare the packed experience

Start with the way the buyer receives and opens the packaging. A corrugated mailer can combine transit structure with printed interior and exterior presentation. A magnetic box places more emphasis on rigid presentation, closure, finish details, and the product arrangement inside the box.

Neither format is automatically better for every product. Product weight, dimensions, insert requirements, handling, delivery method, quantity, and target presentation all affect the decision.

## Information needed for either format

- Finished product dimensions and weight where available
- Required quantity, beginning at the 250-unit planning MOQ
- Product arrangement and any insert requirements
- Interior and exterior print direction
- Finish preferences and artwork status
- Delivery country, target timing, and known packing requirements

## How to choose

Start with the experience you want the customer to have, then match that experience to the actual product and delivery plan. Share the product dimensions, quantity, intended use, destination, and reference images so the structure and pricing can be developed around the real project rather than a generic box size.
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
