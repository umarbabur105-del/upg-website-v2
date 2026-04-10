export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-moq-custom-packaging",
    title: "What Is MOQ in Custom Packaging?",
    date: "2026-03-15",
    excerpt:
      "MOQ stands for minimum order quantity — the lowest number of units a supplier will produce in a single run. Here is what it means for your packaging project and how to plan around it.",
    content: `
MOQ stands for **minimum order quantity** — the smallest number of units a supplier will produce in a single production run. It is one of the first numbers you will encounter when sourcing custom packaging, and understanding it can save you from surprises in pricing and lead time.

## Why Does MOQ Exist?

Custom packaging is manufactured in runs. Whether it is a corrugated box, a mylar pouch, or a paper cup, the supplier has setup costs — printing plates, die cuts, equipment configuration — that are spread across the total quantity. A run of 200 units carries nearly the same setup cost as a run of 2,000 units, which means very small orders are rarely economical for the factory.

MOQ is essentially the point at which the math works for both sides: the factory can run the job without losing money, and the brand gets a unit cost that makes sense.

## Typical MOQ Ranges by Product Type

- **Folding cartons and mailer boxes:** MOQs commonly start between 500 and 1,000 units for standard structures with basic print. Premium finishes like soft-touch or foil stamping may push the minimum higher.
- **Rigid boxes:** Because rigid boxes require more manual assembly, MOQs are typically higher — often starting at 500 units, sometimes more depending on complexity.
- **Mylar pouches:** Stand-up pouches with gravure printing usually start at 1,000 units minimum due to the cylinder setup cost. Digital printing options can allow lower quantities but at a higher per-unit cost.
- **Paper cups:** Single-wall cups are typically quoted from 1,000 units due to the specialized die-cutting and seaming equipment involved.

## MOQ vs. What You Actually Need

If you need 300 units but the MOQ is 1,000, you have a few options. You can order the minimum and hold inventory. You can look for a supplier with lower MOQs (often at a higher per-unit price). Or you can time your order to coincide with a larger launch run.

At UPG, we work with brands to find the right balance. In some cases, a slightly higher quantity costs only marginally more per unit while dramatically reducing the per-unit cost — which makes holding extra inventory worth it.

## The Bottom Line

MOQ is not a rigid wall — it is a starting point for a conversation. When you submit a quote request, include your target quantity honestly. If it is below typical MOQs, say so. A good packaging partner will tell you upfront whether it is feasible and what the pricing looks like at different quantity tiers.
    `.trim(),
  },
  {
    slug: "corrugated-vs-rigid-boxes",
    title: "Corrugated vs. Rigid Boxes: Which Is Right for Your Brand?",
    date: "2026-03-22",
    excerpt:
      "Corrugated and rigid boxes look different, cost differently, and serve different purposes. Here is a practical guide to choosing between them for your packaging project.",
    content: `
Two of the most common custom box types brands ask about are **corrugated mailer boxes** and **rigid boxes**. They look completely different, behave differently in shipping, and have very different price points. Choosing the wrong one can mean overpaying for a product that ships flat or using a box that gets crushed in transit.

## What Is a Corrugated Box?

Corrugated boxes are made from two flat sheets of paper (liners) bonded to a wavy inner layer (the flute). This construction creates a lightweight, shock-absorbing structure that is strong enough for shipping without excessive material weight. The inside is typically plain kraft or white.

Common corrugated formats include:
- **Mailer boxes** (tuck-top, used for e-commerce and subscription packaging)
- **Regular slotted cartons (RSC)** (standard shipping boxes)
- **Folding cartons** using SBS paperboard (thinner, for retail shelf packaging)

Corrugated is the workhorse of product shipping. It handles drops, stacking, and transit stress well.

## What Is a Rigid Box?

Rigid boxes — sometimes called set-up boxes — are made from thick chipboard (usually 1.5mm to 3mm) wrapped in printed paper or fabric. They do not collapse or fold flat. The lid either lifts off or uses a magnetic closure. The result is a much more premium, substantial feel.

Rigid boxes are used for:
- Luxury cosmetics and skincare
- Jewelry and accessories
- Electronics packaging
- Gift sets and PR kits

Because they cannot be flat-shipped, rigid boxes are bulkier and more expensive to freight than corrugated boxes.

## The Key Differences

| | Corrugated Mailer | Rigid Box |
|---|---|---|
| **Typical MOQ** | 500+ units | 500+ units |
| **Per-unit cost** | Lower | Higher |
| **Shipping** | Ships flat, assembled by customer | Ships assembled, takes more space |
| **Feel** | Practical, brandable | Premium, luxury |
| **Best for** | E-commerce, subscription, DTC | Gifting, retail, premium product |

## How to Choose

If your product ships directly to consumers and the packaging will be thrown away after unboxing, corrugated is almost always the better choice — it is less expensive and lighter to ship. If your product sits on a retail shelf, gets gifted, or needs to make a strong first impression (a high-end skincare set, a jewelry brand), a rigid box will deliver that experience at a higher cost.

Many brands use both: corrugated for their everyday shipping and rigid for a limited edition or gift version of the same product.

If you are unsure, include your intended use case and budget range in your quote request — we will recommend the right structure based on your actual needs.
    `.trim(),
  },
  {
    slug: "how-to-prepare-artwork-for-custom-packaging",
    title: "How to Prepare Artwork for Custom Packaging",
    date: "2026-04-01",
    excerpt:
      "Getting your artwork ready before production starts can save weeks of back-and-forth. Here is exactly what suppliers need and how to prepare your files correctly.",
    content: `
One of the most common causes of production delays is artwork that is not print-ready. Files arrive in the wrong format, at the wrong resolution, with fonts not outlined, or without proper bleed. The result is days of back-and-forth between the brand, the designer, and the supplier before a single box gets made.

Here is what you actually need to prepare and how to get it right the first time.

## Step 1 — Get the Dieline First

A **dieline** is a flat, technical template showing the exact shape and fold lines of your packaging. Every box style has its own dieline — a tuck-end carton looks completely different laid flat than a mailer box or a rigid box lid.

Do not start designing until you have the correct dieline. Designing on a generic template and then trying to adapt it to the actual structure almost always results in misaligned artwork.

At UPG, dielines are provided as part of the quoting process for your specific dimensions. If you are working with a designer, share the dieline file (usually an Adobe Illustrator .ai or .eps format) with them before design work begins.

## Step 2 — Set Up Your File Correctly

When your designer opens the dieline, they should set up the artwork with these specs:

- **Format:** Adobe Illustrator (.ai) or print-ready PDF. Photoshop files are rarely accepted for final print.
- **Color mode:** CMYK, not RGB. RGB is for screens. Printing is CMYK. Colors will shift significantly if you send an RGB file.
- **Resolution:** 300 DPI minimum for any raster images (photos, textures). Vector elements (logos, text) are resolution-independent.
- **Bleed:** Typically 0.125 inches (3mm) beyond the dieline edge. Bleed prevents white edges appearing on the printed piece if the cut shifts slightly.
- **Safe zone:** Keep important text and logos at least 0.125 inches inside the dieline edge.
- **Fonts:** Outline all fonts before saving the final file. This converts text to vector shapes so the printer does not need your exact font installed.

## Step 3 — Check Your Colors

If brand color accuracy matters — a specific Pantone red, a precise navy blue — specify your PMS (Pantone Matching System) colors in addition to CMYK values. CMYK printing has a limited gamut and cannot reproduce every Pantone color exactly.

For packaging printed in full color (process printing), CMYK is sufficient. For spot colors where precision matters, request PMS color matching and confirm with the supplier whether it is supported for your run size.

## Step 4 — Submit with a Mockup

Along with the print-ready file, include a 3D mockup or a visual reference showing what the finished packaging should look like. This gives the production team a reference point if they have any questions about intent.

If you do not have 3D mockup software, even a PDF showing each panel of your design labeled (front, back, left, right, top, bottom) works as a clear reference.

## The Short Version

- Get the dieline before designing
- Work in CMYK at 300 DPI
- Include 3mm bleed on all edges
- Outline all fonts
- Submit as .ai or print-ready PDF

If you have artwork in progress but are not sure whether it is ready, include it with your quote request and note its status. We review artwork as part of the quoting process and will flag any issues before production begins.
    `.trim(),
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
