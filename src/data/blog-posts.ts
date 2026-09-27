export interface BlogPostResource {
  title: string;
  description: string;
  href: string;
}

export interface BlogPostSource {
  name: string;
  href: string;
  note: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  date: string;
  updatedAt?: string;
  category:
    | "Project Planning"
    | "Structure & Delivery"
    | "Artwork & Print"
    | "Materials & Finishes";
  readTime: string;
  excerpt: string;
  quickAnswer: string;
  heroImage: string;
  heroAlt: string;
  heroPosition?: string;
  diagram?: {
    src: string;
    alt: string;
    caption: string;
  };
  keyDecisions: Array<{
    label: string;
    title: string;
    description: string;
  }>;
  content: string;
  faqs: Array<{ question: string; answer: string }>;
  resources: BlogPostResource[];
  sources?: BlogPostSource[];
  relatedSlugs: string[];
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "packaging-material-thickness-guide",
    title: "Paperboard Thickness Guide: 8 PT to 28 PT",
    date: "2026-09-27",
    category: "Materials & Finishes",
    readTime: "6 min read",
    excerpt:
      "Compare 8 PT to 28 PT paperboard with exact nominal millimeters, published GSM examples, and clear starting uses for printed packaging.",
    quickAnswer:
      "PT measures nominal paperboard thickness: one point is 0.001 inch, or 0.0254 mm. GSM measures weight per square meter, so it is not a fixed PT conversion. Compare 8–14 PT for light printed components, 16–18 PT for retail cartons, and 20–28 PT where folding and structure need closer review.",
    heroImage: "/images/redesign/hero/materials-hero.jpg",
    heroAlt: "Paperboard, packaging surfaces, and material finish details",
    keyDecisions: [
      {
        label: "8–14 PT",
        title: "Light printed components",
        description:
          "Compare these lower calipers for cards, tags, insert cards, sleeves, and light cartons—not loaded or shipping cartons.",
      },
      {
        label: "16–18 PT",
        title: "Retail cartons",
        description:
          "A practical comparison range for product cartons. Board grade, panel size, insert, closure, and product weight still decide the final specification.",
      },
      {
        label: "20–28 PT",
        title: "Thicker folding board",
        description:
          "Use a more substantial caliper only with crease, fold, closure, and structural review.",
      },
    ],
    content: `
## Paperboard thickness chart: 8 PT to 28 PT

Paperboard points measure nominal thickness: **1 PT = 0.001 inch = 0.0254 mm**. GSM measures weight per square meter. They are related by the board’s construction, but one is not a fixed conversion of the other.

| Caliper | Nominal thickness | Published GSM examples | Starting use |
| --- | --- | --- | --- |
| **8 PT** | 0.2032 mm | 177 GSM | Light printed cards, tags, insert cards, or sleeves |
| **10 PT** | 0.2540 mm | 195–202 GSM | Light printed cards, tags, insert cards, or sleeves |
| **12 PT** | 0.3048 mm | 227–250 GSM | Light cartons or sleeves |
| **14 PT** | 0.3556 mm | 255–275 GSM | Light cartons or sleeves |
| **16 PT** | 0.4064 mm | 284–300 GSM | Retail product cartons |
| **18 PT** | 0.4572 mm | 311–350 GSM | Retail product cartons |
| **20 PT** | 0.5080 mm | 335–345 GSM | Thicker folding board; review creases and structure |
| **24 PT** | 0.6096 mm | 396–407 GSM | Thicker folding board; review creases and structure |
| **28 PT** | 0.7112 mm | 462–527 GSM | Thicker folding board; review creases and structure |

*These are published stock examples from Sappi Spectro C1S, Smurfit Westrock PrintKote, and PakFactory’s nominal stock guide. GSM varies by board grade; confirm the selected stock with your quote.*

## How to use the chart

Lower calipers can suit light printed components, but are not a recommendation for shipping or loaded cartons. **12 PT and 14 PT** are useful comparisons for light cartons and sleeves. **16 PT and 18 PT** are a useful retail-carton comparison. At **20 PT, 24 PT, and 28 PT**, creasing, folding, closure, panel size, and product support deserve closer review.

The table gives a starting point, not a payload rating. Windows, inserts, grain direction, board grade, moisture, and the final structure can all change the right selection.

## C1S, C2S, rigid board, and corrugated board

**C1S** means coated one side; **C2S** means coated two sides. Those terms describe the printing surface, not a universal strength or weight. A rigid presentation box uses a separate core plus wrap; 1.5 mm and 2.0 mm cores are useful project references. Corrugated board uses liners and a fluted medium, so its formation and flute profile need review separately from paperboard PT.

## Formation is not flute

Single face board has one liner and one flute. Single wall has two liners and one flute. Double wall has three liners and two flutes; triple wall has four liners and three flutes. F, E, B, C, and A are flute profiles, ordered from thinner to deeper. A deeper flute is not automatically a double-wall board.

Use the complete pack, dimensions, fragility, handling, and transit conditions to choose corrugated board. Generic caliper and flute letters do not establish a safe load rating.

## Match the material to the packaging job

| Packaging need | Starting comparison | Review before choosing |
| --- | --- | --- |
| **Retail and cosmetics** | 16 PT or 18 PT folding board for an individual outer carton | Product weight, panel size, window, closure, insert, and intended feel |
| **Light cartons and sleeves** | 12 PT or 14 PT paperboard | Product support, folding, print surface, and the final structure |
| **Food or beverage secondary packs** | Folding board around an already packed product | Contact, barrier, grease, moisture, temperature, and storage conditions |
| **Ecommerce presentations** | Corrugated ear-lock mailer board with a selected formation and flute | Packed product, insert, handling, and delivery conditions |
| **Premium sets and gifts** | 1.5 mm or 2.0 mm rigid core plus wrap and insert | Product arrangement, box span, opening style, and finished presentation |

Rigid-core thickness is separate from folding-board PT, and its wrap and lining add to the finished wall. Food-contact, liquid-contact, and barrier requirements need their own material review.

## Start with the product and structure

Send the product, dimensions, quantity, target look, and intended use. If PT, board family, or flute is undecided, leave it open for review. You can <a href="/get-a-quote?builder_note=Please%20help%20me%20choose%20the%20material%20and%20thickness%20for%20my%20packaging." class="font-semibold text-gold-dark underline">request a quick quote</a> with the details you have.
    `.trim(),
    faqs: [
      {
        question: "What is the lowest paperboard PT option?",
        answer:
          "8 PT appears in the published Sappi Spectro C1S table used here, but it is not a market-wide minimum. Light 8 PT and 10 PT stocks are starting points for printed cards, tags, insert cards, and sleeves, not loaded or shipping cartons.",
      },
      {
        question: "How do I convert paperboard points to millimeters?",
        answer:
          "One paperboard point is 0.001 inch, or 0.0254 mm. Multiply PT by 0.0254: 8 PT is 0.2032 mm, 16 PT is 0.4064 mm, and 28 PT is 0.7112 mm.",
      },
      {
        question: "How many GSM is paperboard?",
        answer:
          "There is no universal PT-to-GSM conversion. In the published stock examples here, 10 PT spans 195–202 GSM, 16 PT spans 284–300 GSM, and 28 PT spans 462–527 GSM. Specify the grade as well as the PT.",
      },
      {
        question: "What is the difference between C1S and C2S board?",
        answer:
          "C1S is coated on one side; C2S is coated on two sides. The terms describe coated surfaces, so the final specification should also name the board grade, caliper, print requirements, and structure.",
      },
      {
        question: "What is the difference between corrugated layers and flute?",
        answer:
          "Formation counts liners and fluted layers: single wall uses two liners and one flute, while double wall uses three liners and two flutes. Flute letters describe profile depth; a larger flute does not mean a double-wall board.",
      },
      {
        question: "Should I choose 16 PT or 18 PT for a retail carton?",
        answer:
          "Compare both around the product, carton dimensions, panel size, insert, window, closure, and desired feel. 16 PT is nominally 0.4064 mm and 18 PT is 0.4572 mm, but the thicker board is not automatically the right structure.",
      },
      {
        question: "Do I need PT and GSM before requesting a quote?",
        answer:
          "No. Start with the product, dimensions, quantity, intended use, and target look. The project review can identify the material and structure that fit the brief.",
      },
    ],
    resources: [
      {
        title: "Materials and finishes",
        description:
          "Match the board family with printing, surface, and finish options.",
        href: "/materials-finishes",
      },
      {
        title: "Custom tuck boxes",
        description:
          "Explore a folding-carton structure for retail and cosmetic outer packaging.",
        href: "/products/custom-tuck-boxes",
      },
      {
        title: "Corrugated mailer boxes",
        description:
          "Review the format alongside the product and delivery requirements.",
        href: "/products/custom-mailer-boxes",
      },
      {
        title: "Get help choosing a material",
        description:
          "Send the product and intended use, even when the material is still open.",
        href: "/get-a-quote?builder_note=Please%20help%20me%20choose%20the%20material%20and%20thickness%20for%20my%20packaging.",
      },
    ],
    sources: [
      {
        name: "Sappi Spectro C1S specifications",
        href: "https://cdn-s3.sappi.com/s3fs-public/12.22_Sappi_SpectroC1S.pdf",
        note: "The grade-properties table pairs caliper with GSM for this SBS grade; one mil is one paperboard point.",
      },
      {
        name: "Smurfit Westrock PrintKote specifications",
        href: "https://files.smurfitwestrock.com/m/397e51417075f51c/original/PrintKote_Product-Guide_NA.pdf",
        note: "North American grade specifications list nominal thickness and GSM for PrintKote paperboard.",
      },
      {
        name: "PakFactory paperboard guide",
        href: "https://pakfactory.com/solid-bleached-board-c1s.html",
        note: "Its nominal stock table provides the 12, 14, 16, 18, 24, and 28 PT published examples used for the upper span.",
      },
      {
        name: "PakFactory corrugated board explainer",
        href: "https://pakfactory.com/what-is-corrugated-cardboard",
        note: "Reference for corrugated liner-and-flute formation and approximate common flute profiles.",
      },
      {
        name: "ESKA board specifications",
        href: "https://eska.com/products/eska-board/",
        note: "Producer data lists solid-board thicknesses including 1.5 and 2.0 mm; a finished rigid box also includes its wrap and lining.",
      },
      {
        name: "DS Smith fluting guide",
        href: "https://www.dssmith.com/sheetfeeding/insights/about-fluting/flutes",
        note: "Reference explaining how flute profiles and complete corrugated construction affect packaging choices.",
      },
      {
        name: "Fibre Box Association corrugated guide",
        href: "https://www.fibrebox.org/what-is-corrugated",
        note: "Independent industry reference for single-face, single-wall, double-wall, and triple-wall layer counts; flute profiles vary by design.",
      },
    ],
    relatedSlugs: [
      "how-to-measure-product-for-custom-packaging",
      "cosmetic-outer-packaging-guide",
      "packaging-proof-vs-sample",
    ],
    keywords: [
      "8 pt to 28 pt paperboard",
      "paperboard thickness chart",
      "paperboard pt to gsm",
      "paperboard pt to mm",
      "C1S vs C2S board",
      "corrugated layers vs flute",
    ],
  },
  {
    slug: "cosmetic-outer-packaging-guide",
    title: "Cosmetic Outer Packaging Guide: Cartons, Sets & Mailers",
    metaTitle: "Cosmetic Outer Packaging Guide: Boxes & Sets",
    date: "2026-09-03",
    category: "Project Planning",
    readTime: "7 min read",
    excerpt:
      "Choose an outer carton, presentation box, or ear-lock mailer around a finished cosmetic product. Covers 250-unit MOQ, scope, and quote inputs.",
    quickAnswer:
      "Cosmetic outer packaging is the printed box around a finished beauty product. Use a tuck carton for one retail jar, bottle, tube, or lipstick product; a magnetic box for a premium product or set; and a corrugated ear-lock mailer for a branded PR or ecommerce presentation. Final structure starts with product dimensions, arrangement, quantity, artwork, and destination.",
    heroImage: "/images/redesign/hero/hero-cosmetics.jpg",
    heroAlt: "Cosmetic outer cartons and premium beauty packaging formats",
    keyDecisions: [
      {
        label: "Single product",
        title: "Start with the finished item",
        description:
          "Measure the jar, bottle, tube, compact, or lipstick product before choosing the outer-carton dimensions.",
      },
      {
        label: "Set or presentation",
        title: "Map the complete arrangement",
        description:
          "Confirm every product position, orientation, weight, and insert need before selecting a presentation box.",
      },
      {
        label: "Artwork responsibility",
        title: "Supply approved panel content",
        description:
          "The buyer supplies and approves claims, ingredients, warnings, and market-specific copy for the final dieline.",
      },
    ],
    content: `
## What cosmetic outer packaging includes

UPG's current beauty offer covers the custom printed outer box around a finished cosmetic or personal-care product. That can be a folding carton for one retail item, a magnetic presentation box for a premium product or set, or a corrugated ear-lock mailer for a branded PR or ecommerce presentation.

## Match the packaging to your product

| Packaging need | Start with | Confirm before artwork |
| --- | --- | --- |
| **One finished retail product** | Straight or reverse tuck outer carton | Product dimensions, weight, orientation, flap direction, and required panels |
| **Premium hero product or set** | Magnetic presentation box | Complete product arrangement, opening experience, insert, and packed weight |
| **PR or ecommerce presentation** | Corrugated ear-lock mailer | Product layout, transit expectation, insert, and presentation goal |

Explore each box style for material, printing, and finish options. Choose the structure around your product dimensions, presentation, and delivery needs, then confirm the details in your quote.

## What is outside the current offer

UPG does not supply cosmetic bottles, jars, tubes, lipstick mechanisms, applicators, formulas, product filling, overwrapping, bundling, repacking, campaign fulfillment, or regulatory approval. Do not add those services to a quote brief unless a written UPG offer specifically confirms them.

## The six inputs for a useful beauty-packaging brief

- The finished product or complete set arrangement
- Exact product dimensions, weight, and orientation
- Required quantity, starting from the 250-unit planning MOQ
- Intended use: retail, gifting, PR presentation, or ecommerce
- Artwork status plus buyer-approved panel content
- Delivery country, region, and target timing

## Plan the panel layout before design lock

An outer carton is more than a front-facing graphic. Opening direction, usable panels, structural lines, product identity, quantity statements, ingredients, warnings, and other buyer-supplied content can affect the layout. Final artwork belongs on the approved project dieline—not on a generic template found online.

For products marketed in the United States, the FDA Cosmetics Labeling Guide is a primary planning reference for required cosmetic label information. The brand remains responsible for its claims, classification, legal review, and approved copy; UPG does not provide regulatory approval.

## Use the planning MOQ correctly

Every current UPG custom product family uses a 250-unit planning MOQ. It applies to one reviewed project specification, not an assumed mix of unrelated sizes, structures, or artworks. Final price, production timing, and delivery terms are confirmed only after the complete project is reviewed.
    `.trim(),
    faqs: [
      {
        question: "What is cosmetic outer packaging?",
        answer:
          "It is the printed box around a finished cosmetic or personal-care product. Examples include folding cartons for individual products, magnetic presentation boxes for premium sets, and corrugated ear-lock mailers for branded presentations.",
      },
      {
        question: "Does UPG supply cosmetic bottles, formulas, or filling?",
        answer:
          "No. UPG's current offer covers the custom printed outer box. Bottles, jars, tubes, lipstick components, formulas, filling, overwrapping, repacking, and fulfillment are outside scope.",
      },
      {
        question: "What is the minimum order for cosmetic boxes?",
        answer:
          "UPG uses a 250-unit planning MOQ for every current custom product family. It applies to one reviewed project specification; final commercial and production terms remain subject to review.",
      },
      {
        question: "What should I send for a cosmetic packaging quote?",
        answer:
          "Send the finished product dimensions, weight and orientation when relevant, quantity, intended use, delivery destination, target timing, artwork status, and a reference image if the structure is still open.",
      },
    ],
    resources: [
      {
        title: "Beauty and personal care packaging hub",
        description:
          "Compare tuck cartons, ear-lock mailers, magnetic boxes, and collapsible magnetic boxes.",
        href: "/industries/beauty-personal-care-packaging",
      },
      {
        title: "Cosmetics packaging by finished product",
        description:
          "Open the detailed skincare, serum, lipstick, perfume, PR, and subscription-box guides.",
        href: "/cosmetics",
      },
      {
        title: "Straight tuck end boxes",
        description:
          "Explore a folding-carton style for an individual beauty product.",
        href: "/packaging-styles/straight-tuck-end-boxes",
      },
      {
        title: "Start a human-reviewed beauty project",
        description:
          "Send the real product, arrangement, quantity, artwork status, and delivery destination.",
        href: "/get-a-quote?builder_note=I%20reviewed%20the%20cosmetic%20outer%20packaging%20guide.",
      },
    ],
    sources: [
      {
        name: "U.S. FDA Cosmetics Labeling Guide",
        href: "https://www.fda.gov/cosmetics/cosmetics-labeling-regulations/cosmetics-labeling-guide",
        note: "Primary U.S. reference for cosmetic labeling concepts and required information. The buyer remains responsible for approved claims and market compliance.",
      },
    ],
    relatedSlugs: [
      "custom-packaging-quote-checklist",
      "how-to-measure-product-for-custom-packaging",
      "how-to-prepare-artwork-for-custom-packaging",
    ],
    keywords: [
      "cosmetic outer packaging",
      "custom cosmetic boxes",
      "beauty packaging boxes",
      "skincare outer cartons",
    ],
  },
  {
    slug: "custom-packaging-quote-checklist",
    title: "Custom Packaging Quote Checklist: What to Send",
    date: "2026-09-01",
    category: "Project Planning",
    readTime: "6 min read",
    excerpt:
      "Organize the dimensions, quantity, artwork status, intended use, and delivery details needed for a useful custom packaging quote.",
    quickAnswer:
      "A useful custom packaging quote starts with the product or packaging family, finished-product dimensions, quantity, intended use, delivery destination, and artwork status. Material, print, finish, insert, and timing preferences help, but open details can remain clearly marked for review instead of being guessed.",
    heroImage: "/images/redesign/hero/materials-hero.jpg",
    heroAlt: "Custom packaging materials arranged for project planning",
    keyDecisions: [
      {
        label: "Required start",
        title: "Product, size, and quantity",
        description:
          "Identify what will be packed, its known dimensions, and the quantity being considered.",
      },
      {
        label: "Commercial context",
        title: "Destination and timing",
        description:
          "State the delivery country and target timing so the enquiry is not reviewed in a vacuum.",
      },
      {
        label: "Creative status",
        title: "Artwork and references",
        description:
          "Share available artwork or visual references and clearly label anything still in progress.",
      },
    ],
    content: `
## The short version

You do not need a completed packaging specification to start a quote enquiry. You do need enough information to identify the likely format, understand what will be packed, and separate confirmed facts from preferences that still need review.

## The six inputs that create a useful starting brief

| Input | What to send | Why it matters |
| --- | --- | --- |
| **Product or format** | The closest UPG family, a reference image, or a plain-language description | Establishes the structure being reviewed |
| **Dimensions** | Product dimensions, existing pack dimensions, or a clearly labelled target size | Supports structure and fit review |
| **Quantity** | The likely order quantity and any useful quantity breaks | Keeps the quote tied to a real production scenario |
| **Intended use** | Retail, ecommerce, gifting, launch kit, food pouch, or another real use | Helps screen the format and project boundary |
| **Destination** | Delivery country plus state or province when relevant | Gives the commercial review a delivery context |
| **Artwork status** | Ready, in progress, reference only, or not started | Prevents creative readiness from being assumed |

## Helpful details when you already know them

- Preferred material or a reference package
- Interior and exterior print requirements
- Matte, gloss, soft-touch, foil, spot UV, embossing, or debossing interests
- Window, zipper, valve, spout, closure, or insert requirements where the format supports them
- Product weight, packed arrangement, or filling process when relevant
- A target date and the reason it matters

These details improve the first review, but none should be invented just to make a form look complete.

## What can stay open

It is acceptable to write **not sure** for the structure, material, finish, or insert. A useful brief distinguishes known facts from open decisions. UPG can then review the closest product family and identify the next information needed.

## What the first response should not be treated as

An initial response is not automatically a final price, production slot, approved structure, approved artwork, freight commitment, or delivery date. The accepted written quote or agreement confirms the commercial and production terms for the project.

## A copy-ready project brief

- Product being packed:
- Closest packaging family or reference:
- Product or target dimensions:
- Quantity and useful quantity breaks:
- Intended use:
- Delivery country and region:
- Target timing:
- Artwork status:
- Known material, print, finish, closure, or insert details:
- Open questions:

Paste the completed lines into the project enquiry. Empty lines can remain open for human review.
    `.trim(),
    faqs: [
      {
        question: "Can I request a quote if I do not know the box style?",
        answer:
          "Yes. Share the product, dimensions, quantity, intended use, destination, and a reference image if available. UPG can review the closest current product family and identify the next structural questions.",
      },
      {
        question: "Does a quote request confirm the final price?",
        answer:
          "No. A request begins human review. Final pricing, structure, specifications, production timing, and delivery terms are controlled by the accepted written quote or agreement.",
      },
      {
        question: "What is UPG's planning MOQ?",
        answer:
          "UPG uses a 250-unit planning MOQ for every current custom product family. The minimum applies to one reviewed project specification rather than an assumed mix of unrelated sizes, artworks, or formats.",
      },
    ],
    resources: [
      {
        title: "Custom packaging pricing and MOQ",
        description:
          "Review the 250-unit planning MOQ, quote factors, and written-term boundaries.",
        href: "/custom-packaging-pricing",
      },
      {
        title: "Start a human-reviewed project",
        description:
          "Send the known details and leave open decisions clearly marked for review.",
        href: "/get-a-quote?builder_note=I%20used%20the%20custom%20packaging%20quote%20checklist.",
      },
    ],
    relatedSlugs: [
      "how-to-measure-product-for-custom-packaging",
      "custom-packaging-production-process",
      "what-is-moq-custom-packaging",
    ],
    keywords: [
      "custom packaging quote checklist",
      "packaging quote requirements",
      "custom box quote requirements",
    ],
  },
  {
    slug: "how-to-measure-product-for-custom-packaging",
    title: "How to Measure a Product for Custom Packaging",
    date: "2026-09-01",
    updatedAt: "2026-09-27",
    category: "Project Planning",
    readTime: "6 min read",
    excerpt:
      "Measure the packed product, record the arrangement, and send product dimensions before assuming final box dimensions or requesting a structure-specific dieline.",
    quickAnswer:
      "Start by measuring the product that will actually be packed and record length, width, and height in one consistent unit. For sets, map the full arrangement and note the weight, orientation, accessories, and insert needs. Product measurements are planning inputs; final packaging dimensions require structural review.",
    heroImage: "/images/generated/tuck-boxes/tuck-boxes-straight-reverse-v1.png",
    heroAlt: "Custom tuck boxes shown in different proportions and structures",
    diagram: {
      src: "/images/guides/upright-carton-measurement-diagram.svg",
      alt: "Upright rectangular carton with a front panel, top opening, and labelled length, width, and height arrows.",
      caption:
        "UPG first-brief convention for an upright rectangular carton: front panel facing you, opening upward. Final dimensions follow the approved structure and dieline.",
    },
    keyDecisions: [
      {
        label: "Measure",
        title: "The packed product",
        description:
          "Include caps, pumps, accessories, and any component that must fit inside the final pack.",
      },
      {
        label: "Arrange",
        title: "Single item or set",
        description:
          "Show whether products sit side by side, stack, or need a fixed presentation order.",
      },
      {
        label: "Review",
        title: "Do not add a guessed allowance",
        description:
          "Send the actual measurements and let the final structure and tolerances be reviewed for the project.",
      },
    ],
    content: `
## Measure the product before the package

The safest starting point is the item or complete set that will go inside the packaging. A guessed box size can hide whether the product, closure, insert, or opening sequence has actually been considered.

## Use one clear orientation for an upright rectangular carton

For a fast first brief, place an **upright rectangular carton** with its front panel facing you and its opening upward. In that example, **L** runs left to right across the front panel, **W** runs from front to back, and **H** runs from base to top. This is an oriented carton example, not a universal rule for every packaging structure.

For mailers, irregular packs, and other structures, use the labels shown on the agreed project dieline. Before final artwork, UPG confirms the applicable dimension basis and structural orientation.

## Record length, width, height, and basis consistently

| Field | What to record | Common mistake to avoid |
| --- | --- | --- |
| **Length (L)** | Left to right across the front panel in the upright-carton example | Assuming the longest face is always L for every structure |
| **Width (W)** | Front to back in the upright-carton example | Omitting protruding parts such as pumps or closures |
| **Height (H)** | Base to top in the intended packed orientation | Measuring only the main body of the product |
| **Measurement basis** | Product, required internal pack, or required external shipping dimensions | Leaving the basis unstated |
| **Unit** | Inches or millimeters, used consistently | Mixing inches and millimeters in one set of values |
| **Weight** | Product or complete set weight where relevant | Treating weight as optional for an insert-led or presentation project |

Measure internal dimensions between the inside faces of the erected box, and external dimensions from outside edge to outside edge. An insert can reduce the space available for the product, so identify it separately. Send actual measurements instead of subtracting an assumed board thickness.

The labels above are a communication convention for the enquiry, not approval of a final structure or tolerance.

## Prevent a size or structure mismatch

A box can match the stated dimensions and still be wrong for the product if those measurements describe the outside of an old box instead of the space the contents need. Label each measurement before the structure is reviewed.

| Situation | What to check before the quote |
| --- | --- |
| **You measured an existing box** | Say whether the dimensions are internal or external, and send the product measurements separately. |
| **A pump, cap, handle, or accessory projects beyond the main body** | Measure the complete item in its packed orientation, including every protruding part. |
| **Several products share one box** | Send each item's dimensions and weight, a layout sketch, and the insert or divider requirement. |
| **The contents are heavy or fragile** | Share the full packed weight, product type, arrangement, expected handling and delivery route. Ask for the board and interior packaging to be reviewed together. |

## E-flute or C-flute: start with the complete packout

Weight alone does not decide the flute. Board construction and grade, box dimensions, inserts, stacking, and the distribution route all affect the review. A larger flute can offer different cushioning and compression characteristics, but changing from E-flute to C-flute is not an automatic fix for a heavy product. Ask which construction and any relevant performance testing fit the complete packout before approving the structure.

## For a multi-product set

- List every item and its individual dimensions.
- Show the intended arrangement with a simple top-view sketch or labelled photograph.
- State which face should be visible first when the box opens.
- Include accessories, cards, cables, applicators, or literature that must be packed.
- Note whether the arrangement must stay fixed with an insert.

## For a flexible package

Share the product, target fill, finished-pack preference, closure or valve requirement, and filling or sealing process when known. A flat product measurement alone may not define a finished pouch because the contents, fill volume, film, seals, and pack format still require review.

## For an existing package

If you want to review an existing structure, send clear photographs and label whether the measurements are internal, external, or taken from the product. Do not assume an old dieline will transfer to a different material, product arrangement, or manufacturing specification.

## What happens after measurement

UPG uses the measurements as project inputs. The applicable structure, clearances, material, insert, panel layout, and final dimensions are then reviewed before final artwork is placed on an approved project dieline.
    `.trim(),
    faqs: [
      {
        question: "What is the difference between internal and external box dimensions?",
        answer:
          "Internal dimensions are measured between the inside faces of the erected box. External dimensions are measured from outside edge to outside edge. Label the basis and unit, identify any insert, and send the product measurements separately when fit needs review. Do not estimate internal space by subtracting an assumed board thickness.",
      },
      {
        question: "Should I send product dimensions or final box dimensions?",
        answer:
          "Send product dimensions first when the final structure has not been confirmed. Label every figure as product, required internal pack, or required external shipping dimensions, and include the unit. If you also have a target box size, label it as a target rather than an approved production dimension.",
      },
      {
        question: "Which way should I measure an upright rectangular carton?",
        answer:
          "For UPG's first-brief example, face the front panel toward you with the opening upward: L is left to right across the front, W is front to back, and H is base to top. This example does not replace the agreed dieline labels for mailers or other structures.",
      },
      {
        question: "Can I combine several products in one measurement?",
        answer:
          "For a set, provide individual measurements plus the intended full arrangement. A labelled photograph or simple sketch helps explain orientation without replacing structural review.",
      },
      {
        question: "Does UPG publish universal dielines by size?",
        answer:
          "No. Final dielines are coordinated for the reviewed project structure because material, construction, dimensions, closures, inserts, and manufacturing requirements can change the file.",
      },
    ],
    resources: [
      {
        title: "Packaging Format Finder",
        description:
          "Use four simple questions when the starting product family is still unclear.",
        href: "/tools/packaging-format-finder",
      },
      {
        title: "Packaging style library",
        description:
          "Review the current tuck-box and flexible-packaging styles before project review.",
        href: "/packaging-styles",
      },
    ],
    sources: [
      {
        name: "FEFCO/ESBO Code of Designs",
        href: "https://www.fefco.org/sites/default/files/files/FEFCO_ESBO_code_of_designs.pdf",
        note: "Primary corrugated-packaging reference for stated internal dimensions and opening-based orientation; final project conventions remain structure specific.",
      },
      {
        name: "Fibre Box Association — What is Corrugated",
        href: "https://www.fibrebox.org/what-is-corrugated",
        note: "Flute profiles, combined board construction, and interior packaging affect structural selection.",
      },
      {
        name: "ISTA — Selecting and Using Test Procedures",
        href: "https://ista.org/docs/2018_ISTA_Guidelines.pdf",
        note: "Product weight, dimensions, materials, interior packaging, closures, and the distribution route affect package-performance review.",
      },
    ],
    relatedSlugs: [
      "custom-packaging-quote-checklist",
      "how-to-prepare-artwork-for-custom-packaging",
      "how-custom-packaging-ships",
    ],
    keywords: [
      "measure product for custom packaging",
      "custom box dimensions guide",
      "measure product for custom box",
    ],
  },
  {
    slug: "custom-packaging-production-process",
    title: "Custom Packaging Production Process, Step by Step",
    date: "2026-09-01",
    updatedAt: "2026-09-27",
    category: "Project Planning",
    readTime: "7 min read",
    excerpt:
      "Understand the path from project brief and structural review through artwork, proof approval, manufacturing, and delivery without assuming an instant timeline.",
    quickAnswer:
      "A made-to-spec packaging project moves from brief and qualification into structure, materials, artwork, proofing, commercial approval, manufacturing, quality review, packing, and delivery. The exact sequence can vary by format, and production timing is confirmed only after the required project specifications and approvals are clear.",
    heroImage: "/images/redesign/hero/hero-cosmetics.jpg",
    heroAlt: "Custom packaging production for branded products",
    heroPosition: "center 44%",
    keyDecisions: [
      {
        label: "Stage 1",
        title: "Define the project",
        description:
          "Product, format, dimensions, quantity, intended use, destination, and artwork status create the brief.",
      },
      {
        label: "Stage 2",
        title: "Approve the specification",
        description:
          "Structure, material, print, finish, artwork, proofing, price, and scope are aligned before production.",
      },
      {
        label: "Stage 3",
        title: "Manufacture and deliver",
        description:
          "Production, quality review, packing, and delivery follow the approved project terms.",
      },
    ],
    content: `
## 1. Project brief and qualification

The buyer shares the product, closest packaging family, dimensions, quantity, intended use, destination, timing, and artwork status. UPG checks whether the project fits the current product range and identifies missing decisions.

## 2. Structure and specification review

The proposed structure is reviewed around the product and the way it will be packed, presented, stored, or delivered. Materials, print surfaces, finishes, closures, inserts, and compatibility requirements are considered where applicable.

## 3. Quote and commercial scope

The written quote records the project-specific commercial terms. It can include the confirmed quantity, specification, price, payment terms, production timing, delivery scope, freight, duties, taxes, and documentation responsibilities that apply.

## 4. Dieline and artwork development

Final artwork belongs on the approved project dieline. Panel orientation, print areas, structural lines, finishes, required copy, and any variable information should be checked against the reviewed structure rather than a generic template.

## Avoid late artwork changes

A practical lesson from our founder's six years of packaging experience: even a small copy change needs a clear handover when a project is close to production. A revised label, panel, size, or finish can require another artwork or proof review and affect the production plan.

- **One approval owner:** Name one person to collect the final changes and approve the file.
- **One current version:** Send one clearly dated replacement file with a short list of what changed.
- **Review the impact:** Ask which approvals and timing assumptions need to be checked again.
- **Approve the revised proof:** Review it against the change list before approving that version.

If the delivery date is fixed, share it with the destination and artwork status at the start. Ask for feasibility to be reviewed whenever the specification or approval date changes.

## 5. Proofing and required approvals

The applicable proof or sample path is confirmed for the project. Buyers should check spelling, product copy, placement, color intent, finish callouts, codes, and version control. Approval should be treated as a production decision, not a casual design preview.

## 6. Manufacturing and quality review

Production follows the approved specification and commercial terms. The applicable manufacturing and quality checks depend on the format, material, print, finish, and project requirements.

## 7. Packing and delivery

The packaging may be supplied flat, folded, collapsed, nested, or assembled depending on its structure and the written project scope. Final packing, freight, delivery destination, and related responsibilities should be confirmed rather than inferred from a product image.

## Keep one approval record

| Decision | Record to retain |
| --- | --- |
| **Structure** | Approved structure or project dieline version |
| **Artwork** | Final approved artwork and version |
| **Commercial terms** | Accepted quote or agreement |
| **Proofing** | Applicable signed or recorded approval |
| **Delivery** | Confirmed destination and delivery scope |
    `.trim(),
    faqs: [
      {
        question: "How long does custom packaging production take?",
        answer:
          "UPG confirms timing after the structure, specification, quantity, artwork status, proofing path, destination, and other project requirements have been reviewed. This guide does not publish a universal production promise.",
      },
      {
        question: "When should final artwork be prepared?",
        answer:
          "Prepare final artwork on the approved project dieline after the structure is sufficiently defined. Rebuilding artwork too early can create avoidable rework if the structure changes.",
      },
      {
        question: "Does production start when I submit a quote request?",
        answer:
          "No. A quote request begins human review. Manufacturing starts only after the applicable commercial, artwork, proofing, and production approvals are complete.",
      },
    ],
    resources: [
      {
        title: "Quote checklist",
        description:
          "Organize the first project inputs before requesting a human review.",
        href: "/blog/custom-packaging-quote-checklist",
      },
      {
        title: "Proof and sample guide",
        description:
          "Separate a reference sample kit, artwork proof, and project approval decision.",
        href: "/blog/packaging-proof-vs-sample",
      },
      {
        title: "Review a fixed target date",
        description:
          "Share the project facts already known so UPG can review feasibility and timing for the requested date.",
        href: "/get-a-quote?builder_note=I%20need%20project-specific%20feasibility%20and%20timing%20review%20for%20a%20fixed%20target%20date.",
      },
    ],
    relatedSlugs: [
      "custom-packaging-quote-checklist",
      "packaging-proof-vs-sample",
      "how-custom-packaging-ships",
    ],
    keywords: [
      "custom packaging production process",
      "how custom packaging is made",
      "custom box production steps",
    ],
  },
  {
    slug: "packaging-proof-vs-sample",
    title: "Packaging Proof vs. Sample: What Each One Confirms",
    date: "2026-09-01",
    updatedAt: "2026-09-27",
    category: "Artwork & Print",
    readTime: "6 min read",
    excerpt:
      "Separate artwork review, finished sample-kit references, project-specific sampling, and final production approval before treating them as interchangeable.",
    quickAnswer:
      "An artwork proof helps review content, placement, and production intent; a finished sample kit helps a buyer examine representative packaging examples; and any project-specific physical sample must be confirmed in the written project scope. None should be assumed to approve every material, color, structure, or production variable by itself.",
    heroImage: "/images/redesign/samples/sample-pr-kit.jpg",
    heroAlt: "Printed presentation packaging and insert details used as a visual reference",
    keyDecisions: [
      {
        label: "Review",
        title: "Artwork proof",
        description:
          "Check content, placement, version, and the production callouts shown in the approved review file.",
      },
      {
        label: "Reference",
        title: "Finished sample kit",
        description:
          "Examine representative structures, materials, and finishes without treating them as your custom project.",
      },
      {
        label: "Approve",
        title: "Project-specific decision",
        description:
          "Confirm the sample or proof path, acceptance criteria, and production effect in the written scope.",
      },
    ],
    content: `
## The three things buyers often call a sample

| Review item | Main purpose | What it does not automatically confirm |
| --- | --- | --- |
| **Artwork or digital proof** | Review copy, placement, panel orientation, and production callouts | Final appearance on every material, screen, finish, or lighting condition |
| **Finished sample kit** | Examine representative finished packaging examples | Your custom dimensions, artwork, product fit, or approved production specification |
| **Project-specific physical sample** | Review the agreed physical characteristics included in the written scope | Every production variable unless those acceptance criteria are explicitly defined |

## What to inspect in an artwork proof

- Product name, spelling, ingredients, warnings, and market-required copy supplied by the buyer
- Barcode, QR code, batch, date, or variable-data placement when applicable
- Logo position, panel orientation, opening direction, and front-panel hierarchy
- Foil, spot UV, embossing, debossing, window, zipper, valve, or other callouts shown in the file
- Correct project, SKU, language, and version number

An on-screen file is affected by the display and viewing setup. Treat it as the review record described in the project process, not as a universal physical color standard.

## A final check before you approve

When a launch is urgent, it is easy to approve the familiar front panel and miss a change elsewhere. Open the exact approval file and check every panel against the project brief.

| Check | What you are confirming |
| --- | --- |
| **File and version** | Correct product, SKU, language, dated file, and latest requested changes. |
| **Copy and codes** | Spelling, quantities, buyer-supplied required text, barcode or QR content, and variable-data areas. |
| **Structure and orientation** | Approved dieline, opening direction, front/back placement, folds, and any insert relationship. |
| **Print and finishes** | Color references and the intended locations of foil, coating, embossing, or other specified effects. |
| **Approval scope** | Which artwork, structure, color, or sample decision this approval covers, and what still needs review. |

Record the approved version and any remaining questions explicitly. If a detail is uncertain, identify it before approving the next production step.

## What a finished sample kit is useful for

A finished kit can help buyers handle representative packaging, compare broad structures, and discuss material or finish direction. UPG's Box Sample Kit and Mylar Bag Sample Kit are separate fixed-price products. Their assortment is curated and can vary; neither kit is a custom proof of the buyer's project.

## Questions to ask before approving a physical sample

- Which structure, material, print, finish, and dimensions does this sample represent?
- Is the artwork final or only for structural review?
- Which visual or functional characteristics are being approved?
- What can still change in production?
- Does approval affect the production schedule or commercial terms?

## Keep approval language precise

Use clear wording such as **artwork content approved**, **structure approved**, or **sample approved against the stated criteria**. Avoid a vague message such as **looks good** when the project has several versions or separate structural, color, finish, and copy decisions.
    `.trim(),
    faqs: [
      {
        question: "Is the UPG sample kit a custom proof of my packaging?",
        answer:
          "No. Each paid sample kit contains a curated assortment of representative finished packaging. It helps with reference and planning but does not approve a buyer's custom structure, dimensions, artwork, or production specification.",
      },
      {
        question: "Does an artwork proof confirm exact printed color?",
        answer:
          "An artwork proof should be reviewed within the proof method and acceptance criteria defined for the project. Screen display, substrate, ink, print process, coating, finish, and viewing conditions can affect appearance.",
      },
      {
        question: "Can a project-specific physical sample be requested?",
        answer:
          "Sampling options, cost, timing, purpose, and production effect must be reviewed and confirmed for the specific project. Availability is not assumed from this guide.",
      },
    ],
    resources: [
      {
        title: "Compare available sample kits",
        description:
          "Review the separate Box Sample Kit and Mylar Bag Sample Kit before purchase.",
        href: "/samples",
      },
      {
        title: "Prepare packaging artwork",
        description:
          "Use the approved project structure before locking the final artwork file.",
        href: "/blog/how-to-prepare-artwork-for-custom-packaging",
      },
      {
        title: "Confirm the proof or sample path",
        description:
          "Request project-specific review of the applicable proof or sample decision before the next approval.",
        href: "/get-a-quote?builder_note=I%20need%20the%20project-specific%20proof%20or%20sample%20path%20confirmed%20before%20the%20next%20approval.",
      },
    ],
    relatedSlugs: [
      "how-to-prepare-artwork-for-custom-packaging",
      "cmyk-vs-pantone-packaging-printing",
      "custom-packaging-production-process",
    ],
    keywords: [
      "packaging proof vs sample",
      "custom packaging sample process",
      "digital proof packaging",
    ],
  },
  {
    slug: "cmyk-vs-pantone-packaging-printing",
    title: "CMYK vs. Pantone for Custom Packaging Printing",
    date: "2026-09-01",
    updatedAt: "2026-09-27",
    category: "Artwork & Print",
    readTime: "7 min read",
    excerpt:
      "Compare four-color process and spot-color printing for packaging artwork, brand colors, photography, substrates, and proof expectations.",
    quickAnswer:
      "CMYK combines cyan, magenta, yellow, and black process inks to reproduce many colors and is a natural starting point for photographs or complex artwork. Pantone spot colors use specifically identified premixed inks when a smaller set of brand-critical colors needs closer control. The final method depends on the print process and project specification.",
    heroImage: "/images/redesign/finishes/finish-foil.jpg",
    heroAlt: "Printed packaging detail showing controlled color and metallic finish",
    keyDecisions: [
      {
        label: "Choose CMYK when",
        title: "Artwork uses many colors",
        description:
          "Photography, gradients, and complex illustrations usually point toward a process-color discussion.",
      },
      {
        label: "Review spot color when",
        title: "A brand color is critical",
        description:
          "A named Pantone reference can communicate a specific spot-color target for project review.",
      },
      {
        label: "Always confirm",
        title: "Material and print method",
        description:
          "The same color intent can appear different across substrates, coatings, finishes, and production processes.",
      },
    ],
    content: `
## CMYK and spot color solve different artwork problems

| Decision | CMYK process color | Pantone spot color |
| --- | --- | --- |
| **How color is created** | Standard cyan, magenta, yellow, and black inks combine in screens | A specifically identified premixed ink is printed as its own color |
| **Natural fit** | Photographs, gradients, illustrations, and many-color artwork | A small number of brand-critical or specially specified colors |
| **Artwork setup** | Process-color values and separations | Named spot-color swatches and separate production callouts |
| **Important limit** | Some spot colors cannot be closely simulated inside a four-color process gamut | The printed result still depends on substrate, ink, process, coating, and viewing conditions |

CMYK means four process inks: cyan, magenta, yellow, and black. It does **not** mean four PMS spot inks. A Pantone/PMS spot color is a separately premixed ink. On a conventional plate-based offset job, each spot-color separation uses its own plate; digital printing uses a different setup. A project can also use CMYK imagery plus one or more spot colors.

## Use CMYK as a starting discussion when

- The artwork contains photography or complex multicolor illustrations.
- Gradients and tonal transitions are important.
- The selected print process and production plan are based on process color.
- The brand accepts an approved process-color build rather than requiring a separate spot ink.

## Review Pantone spot color when

- A logo or brand color has a named Pantone specification.
- The project uses only a few controlled colors.
- A particular color sits outside an acceptable CMYK simulation.
- A metallic, fluorescent, or other specially specified ink is being considered.

## UPG quotation policy for CMYK and PMS

For UPG quotation purposes, on an otherwise unchanged specification, a CMYK process print basis is treated as equivalent to **two PMS colors**. This is a UPG commercial quoting policy, not a statement that four CMYK process inks and four PMS spot inks are technically the same.

If the requested artwork needs four PMS colors, CMYK plus spot color(s), or a revised print specification, UPG confirms the available print route and price in the written quote. Do not infer a fee or numeric price from this policy; structure, substrate, size, quantity, finishing, proofing, and the production method still need project review.

## Why an RGB screen is not the final print target

Screens display RGB light, while printed packaging uses inks on a physical material. If artwork begins in RGB, its appearance can change when converted for print because some screen colors fall outside a CMYK print gamut. Supply editable artwork, identify critical brand colors, and review approved production values rather than relying on one monitor display.

## Pantone C and U identify the reference paper stock

Pantone **C** and **U** refer to coated and uncoated paper reference stocks in the Pantone guide. They are not simply lamination or finish labels. Stock absorption can change the appearance of the same named color, so include the complete Pantone reference and confirm the production substrate, ink system, press process, coating, and proof path for the project.

## A practical artwork handoff

- Supply editable source files and linked assets where requested.
- Identify every named spot color clearly.
- Keep process colors defined in the approved color mode.
- Flag colors that are brand critical.
- State whether the artwork is RGB, CMYK, PMS/spot, or CMYK plus spot colors.
- Include the full Pantone reference, including C or U where applicable.
- Record whether the reference is a physical standard, a prior printed sample, or an on-screen approximation.
- Ask UPG to confirm the print route and written price when four PMS colors, CMYK plus spot colors, or a revised print specification is requested.
- Approve the applicable proof within the project criteria.
    `.trim(),
    faqs: [
      {
        question: "Is Pantone always more accurate than CMYK?",
        answer:
          "Pantone spot color can be useful for a specifically identified brand-critical color, but the final appearance still depends on substrate, ink, print process, coating, finish, and viewing conditions. The correct method is project specific.",
      },
      {
        question: "Can every Pantone color be converted exactly to CMYK?",
        answer:
          "No. Pantone explains that some spot colors fall outside the process-color gamut and may look different when simulated in CMYK. A physical comparison and the approved production method help set expectations.",
      },
      {
        question: "Should packaging artwork be sent in RGB?",
        answer:
          "Send editable source files and identify the intended print colors. RGB is a screen color model and some RGB colors cannot reproduce exactly in CMYK print, so the final separation or spot-color setup follows the approved production specification.",
      },
      {
        question: "Is Pantone C or U just a finish choice?",
        answer:
          "No. C and U identify coated and uncoated paper reference stocks in Pantone guides. Stock affects ink absorption and appearance, so include the complete Pantone reference and ask UPG to confirm the production substrate and proof path.",
      },
      {
        question: "Does UPG price CMYK the same as PMS?",
        answer:
          "For UPG quotation purposes, on an otherwise unchanged specification, a CMYK process print basis is treated as equivalent to two PMS colors. Four PMS colors, CMYK plus spot color(s), or a revised print specification require written price confirmation. This is UPG's commercial quoting policy; it does not make four CMYK process inks technically equivalent to four PMS spot inks.",
      },
    ],
    resources: [
      {
        title: "Materials and finishes",
        description:
          "Review the substrate and finish families that can affect printed appearance.",
        href: "/materials-finishes",
      },
      {
        title: "Artwork preparation guide",
        description:
          "Prepare final packaging artwork only after the project structure is clear.",
        href: "/blog/how-to-prepare-artwork-for-custom-packaging",
      },
    ],
    sources: [
      {
        name: "Adobe: Photoshop color modes",
        href: "https://helpx.adobe.com/photoshop/using/color-modes.html",
        note: "Primary reference for RGB screen work, CMYK print work, and the effect of print conditions on CMYK range.",
      },
      {
        name: "Adobe: Spot and Process Colors",
        href: "https://helpx.adobe.com/creative-cloud/apps/colors/spot-and-process-colors.html",
        note: "Primary software reference for how commercial print colors are specified.",
      },
      {
        name: "Pantone: Coated and Uncoated",
        href: "https://support.pantone.com/en/what-does-the-terms-coated-and-uncoated-mean-in-the-pantone-graphics-system",
        note: "Primary reference explaining that C and U identify Pantone reference paper stocks and can produce different visual appearance.",
      },
    ],
    relatedSlugs: [
      "packaging-finishes-guide",
      "packaging-proof-vs-sample",
      "how-to-prepare-artwork-for-custom-packaging",
    ],
    keywords: [
      "CMYK vs Pantone packaging",
      "Pantone printing custom boxes",
      "spot color vs process color packaging",
    ],
  },
  {
    slug: "packaging-finishes-guide",
    title: "Custom Packaging Finishes: A Buyer Decision Guide",
    date: "2026-09-01",
    category: "Materials & Finishes",
    readTime: "7 min read",
    excerpt:
      "Compare matte, gloss, soft-touch, foil, spot UV, embossing, debossing, and windows by visual role instead of stacking every finish on one package.",
    quickAnswer:
      "Choose packaging finishes by job: matte, gloss, or soft-touch shapes the broader surface; foil and spot UV create selective contrast; embossing or debossing adds tactile relief; and a window reveals the product where the structure supports it. Final availability and suitability depend on material, print, structure, artwork, and production review.",
    heroImage: "/images/redesign/hero/materials-hero.jpg",
    heroAlt:
      "Custom packaging materials with contrasting printed and tactile finishes",
    heroPosition: "center 55%",
    keyDecisions: [
      {
        label: "Base surface",
        title: "Matte, gloss, or soft-touch",
        description:
          "Start with the overall surface character before adding selective decorative details.",
      },
      {
        label: "Visual accent",
        title: "Foil or spot UV",
        description:
          "Use selective accents to establish hierarchy around logos, borders, patterns, or key artwork.",
      },
      {
        label: "Tactile detail",
        title: "Emboss or deboss",
        description:
          "Raised or recessed relief can add touch, but the design and structure need production review.",
      },
    ],
    content: `
## Start with the purpose of the finish

| Finish family | What it is | Where it helps |
| --- | --- | --- |
| **Matte** | A lower-sheen surface treatment | A calm overall surface and restrained print treatment |
| **Gloss** | A higher-sheen surface treatment | More reflection and a sharper visual contrast |
| **Soft-touch** | A tactile matte surface treatment | Presentation-led packs where the hand feel matters |
| **Foil stamping** | Metallic foil transferred to selected artwork | Logos, borders, and controlled premium accents |
| **Spot UV** | Gloss coating applied only to selected artwork | Contrast over a matte or lower-sheen printed surface |
| **Emboss or deboss** | Raised or recessed detail made with a die | Tactile logo marks and simple decorative forms |
| **Window** | A die-cut opening that reveals the product | Product visibility where the selected structure supports it |

## Coating and lamination are different

A coating is a liquid finish applied and cured on the printed surface. Lamination bonds a thin film to that surface. Matte, gloss, and soft-touch looks can use different coating or film systems; spot UV is a coating applied to selected areas. Confirm the treatment with the board, artwork, folds, and handling needs.

## Build a hierarchy instead of a finish list

A finish plan should explain what the buyer notices first, second, and third. One controlled foil logo on a matte surface can create clearer hierarchy than several decorative processes competing across every panel.

## Review the finish with the material

The same finish can look and behave differently across paperboard, kraft, wrapped rigid board, corrugated material, and flexible film. Material color, texture, surface treatment, print coverage, folds, edges, seals, and closures all affect the review.

## Plan selective finishes in the artwork

- Separate foil, spot UV, emboss, deboss, and window callouts clearly.
- Use consistent names across artwork, proof, and quote documents.
- Keep important effects away from structural areas when the approved dieline requires it.
- Confirm which side or panel receives each treatment.
- Remove unused layers and old production callouts before final approval.

## Ask for a focused comparison

If the finish direction is unclear, request one or two purposeful options. Compare how each supports the brand, material, budget, product position, and required production method. Avoid asking for every available finish when the actual decision is between two surface systems.

## Bring your finish ideas to the brief

Share the colors, textures and finishing details you like, along with your packaging format and quantity. We can then compare the finish options that suit your product, artwork and budget.
    `.trim(),
    faqs: [
      {
        question: "Can foil, spot UV, and embossing be combined?",
        answer:
          "A combination can be reviewed, but availability, artwork setup, registration, material, structure, cost, and production suitability must be confirmed for the specific project.",
      },
      {
        question: "Is matte or gloss better for custom packaging?",
        answer:
          "Neither is universally better. Matte creates a lower-sheen surface, while gloss creates a higher-sheen surface. The better choice depends on the brand direction, material, artwork, handling, and approved specification.",
      },
      {
        question: "Does every packaging format support a window?",
        answer:
          "No. Window availability and suitability depend on the selected structure, material, product presentation, artwork, and production review.",
      },
    ],
    resources: [
      {
        title: "Materials and finishes library",
        description:
          "See UPG's current material groups, finish visuals, and project boundaries.",
        href: "/materials-finishes",
      },
      {
        title: "Compare packaging structures",
        description:
          "Choose the structure before building a finish system around it.",
        href: "/compare",
      },
    ],
    relatedSlugs: [
      "cmyk-vs-pantone-packaging-printing",
      "packaging-proof-vs-sample",
      "corrugated-vs-rigid-boxes",
    ],
    keywords: [
      "custom packaging finishes",
      "matte vs gloss packaging",
      "foil spot UV embossing packaging",
    ],
  },
  {
    slug: "how-custom-packaging-ships",
    title: "How Custom Packaging Ships: Flat, Folded, or Assembled",
    date: "2026-09-01",
    category: "Structure & Delivery",
    readTime: "7 min read",
    excerpt:
      "Understand why tuck boxes, mailers, collapsible magnetic boxes, fixed magnetic boxes, and flexible packaging do not share one universal packing model.",
    quickAnswer:
      "Custom packaging can be supplied flat, folded, collapsed, nested, or assembled depending on the structure. Tuck cartons, ear-lock mailers, collapsible magnetic boxes, fixed magnetic boxes, and flexible packs use different packing assumptions. The final packing method, packed footprint, freight, and assembly responsibility belong in the written project scope.",
    heroImage: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-overhead-v1.png",
    heroAlt: "Collapsible magnetic presentation box shown in a fold-flat configuration",
    keyDecisions: [
      {
        label: "Flat or folded",
        title: "Cartons and mailers",
        description:
          "Folding structures can use compact supply configurations, but final packing depends on construction and scope.",
      },
      {
        label: "Collapsed",
        title: "Collapsible magnetic boxes",
        description:
          "The fold-flat structure changes storage and assembly planning compared with a fixed rigid box.",
      },
      {
        label: "Assembled",
        title: "Fixed presentations",
        description:
          "A fixed magnetic presentation structure needs a different packed-volume and handling discussion.",
      },
    ],
    content: `
## There is no universal box-shipping assumption

| UPG product family | Common planning model | What still needs confirmation |
| --- | --- | --- |
| **Tuck boxes** | Folding-carton structure supplied in a compact unerected form | Gluing, forming, packing method, bundle, and delivery scope |
| **Corrugated ear-lock mailers** | Folded or flat corrugated presentation structure | Final construction, insert packing, assembly, and transport arrangement |
| **Magnetic boxes** | Fixed rigid presentation structure | Assembled packed footprint, insert arrangement, protection, and freight plan |
| **Collapsible magnetic boxes** | Fold-flat premium presentation structure | Assembly method, closure, adhesive details where applicable, packing, and delivery |
| **Mylar bags and pouches** | Finished flexible packs packed in bundles or cartons | Format, seals, closures, valve or spout, bundle, and delivery scope |

This table is planning guidance, not a universal production promise for every project.

## Why a generic CBM calculator can mislead packaging buyers

A calculator that multiplies the finished dimensions of one assembled item by the order quantity assumes every unit occupies its full finished volume during shipment. That can substantially misrepresent folding cartons, ear-lock mailers, collapsible structures, nested items, bundled pouches, and any project packed into master cartons under a separate arrangement.

The reliable inputs are the approved packing configuration, units per bundle or carton, master-carton dimensions, carton count, gross weight, and delivery terms. Those values exist after the packing plan is confirmed, not at the first product-idea stage.

## Questions to confirm before comparing freight

- Is the packaging supplied flat, folded, collapsed, nested, or assembled?
- Who performs the final assembly or erection?
- Are inserts packed inside, separately, or pre-installed?
- How many units are packed per bundle or master carton?
- What are the approved master-carton dimensions and gross weights?
- What delivery destination and commercial terms apply?

## Fixed versus collapsible magnetic boxes

A fixed magnetic box emphasizes an assembled rigid presentation. A collapsible magnetic box is designed to fold flat for storage and delivery before assembly. The visual result can be similarly premium, but the packing, setup, insert, closure, and handling plan are not interchangeable.

## Keep freight separate from a visual mockup

A product render or sample image shows the intended finished presentation. It does not prove the shipment configuration. Freight comparisons should use the approved packing list or written packing assumptions for the quoted project.
    `.trim(),
    faqs: [
      {
        question: "Are all custom boxes shipped flat?",
        answer:
          "No. Many folding structures can be supplied flat or folded, while fixed magnetic presentation boxes are assembled structures. Collapsible magnetic boxes use a fold-flat construction. The exact packing method is project specific.",
      },
      {
        question: "Why does finished box size not confirm freight volume?",
        answer:
          "Finished size does not show whether units are flat, folded, collapsed, nested, bundled, or assembled. Freight planning needs the approved master-carton arrangement, carton dimensions, carton count, gross weight, destination, and delivery terms.",
      },
      {
        question: "Who assembles collapsible or folding packaging?",
        answer:
          "Assembly responsibility and method should be confirmed in the written project scope. Do not infer assembly, packout, or fulfillment from the product family alone.",
      },
    ],
    resources: [
      {
        title: "Magnetic vs. collapsible magnetic boxes",
        description:
          "Compare fixed and fold-flat premium structures before planning storage and delivery.",
        href: "/compare/magnetic-boxes-vs-collapsible-magnetic-boxes",
      },
      {
        title: "Corrugated mailer vs. shipping carton",
        description:
          "Keep UPG's ear-lock presentation mailer separate from standard RSC and master-carton intent.",
        href: "/compare/corrugated-mailer-boxes-vs-shipping-cartons",
      },
    ],
    relatedSlugs: [
      "corrugated-vs-rigid-boxes",
      "custom-packaging-production-process",
      "how-to-measure-product-for-custom-packaging",
    ],
    keywords: [
      "how custom boxes are shipped",
      "flat packed custom boxes",
      "collapsible vs assembled packaging shipping",
    ],
  },
  {
    slug: "what-is-moq-custom-packaging",
    title: "What Is MOQ in Custom Packaging?",
    date: "2026-08-04",
    updatedAt: "2026-09-01",
    category: "Project Planning",
    readTime: "6 min read",
    excerpt:
      "MOQ is the minimum quantity available for a packaging format. See UPG's planning minimums for tuck boxes, mailer boxes, magnetic boxes, and Mylar bags.",
    quickAnswer:
      "MOQ means minimum order quantity. UPG uses a 250-unit planning MOQ for each of its five custom product families, regardless of finished size. The minimum starts one reviewed project specification; it does not combine unrelated structures, sizes, artworks, materials, or delivery requirements by default.",
    heroImage: "/images/generated/mailer-boxes/mailer-boxes-sizes-v1.png",
    heroAlt: "Custom corrugated mailer boxes shown in several finished sizes",
    keyDecisions: [
      {
        label: "Published minimum",
        title: "250 units",
        description:
          "Every current UPG custom product family uses the same planning MOQ.",
      },
      {
        label: "One specification",
        title: "Do not assume mixing",
        description:
          "Different sizes, structures, artworks, or materials need to be identified for review.",
      },
      {
        label: "Quote basis",
        title: "Send the real quantity",
        description:
          "The planning minimum is not an instant price tier or a replacement for a written quote.",
      },
    ],
    content: `
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
    faqs: [
      {
        question: "Is UPG's MOQ 250 units for every box size?",
        answer:
          "Yes. The planning MOQ is 250 units for every current custom product family regardless of finished size. Final dimensions and specifications still require structural review.",
      },
      {
        question: "Can different designs be combined into one 250-unit order?",
        answer:
          "Do not assume unrelated artworks, sizes, materials, or structures can be combined. Identify every variation during quote review so the written terms can confirm what is included.",
      },
      {
        question: "Does the MOQ confirm an instant price?",
        answer:
          "No. Custom production is quoted from the approved structure, dimensions, material, print, finish, quantity, intended use, and delivery destination.",
      },
    ],
    resources: [
      {
        title: "Custom packaging pricing and MOQ guide",
        description:
          "Review the current planning minimum, price factors, and terms controlled by the final written quote.",
        href: "/custom-packaging-pricing",
      },
      {
        title: "Custom packaging quote checklist",
        description:
          "Prepare the product, quantity, dimensions, artwork status, intended use, and destination.",
        href: "/blog/custom-packaging-quote-checklist",
      },
    ],
    relatedSlugs: [
      "custom-packaging-quote-checklist",
      "how-to-measure-product-for-custom-packaging",
      "custom-packaging-production-process",
    ],
    keywords: [
      "custom packaging MOQ",
      "minimum order custom boxes",
      "low MOQ custom packaging",
    ],
  },
  {
    slug: "corrugated-vs-rigid-boxes",
    title: "Corrugated Mailer vs. Magnetic Boxes: Which Fits Your Brand?",
    metaTitle: "Corrugated Mailer vs. Magnetic Boxes",
    date: "2026-08-04",
    updatedAt: "2026-09-01",
    category: "Structure & Delivery",
    readTime: "7 min read",
    excerpt:
      "Compare branded corrugated mailer boxes with magnetic and collapsible magnetic boxes for PR kits, ecommerce, gifting, and premium presentation.",
    quickAnswer:
      "Choose a corrugated ear-lock mailer when branded unboxing and a folding corrugated presentation structure matter. Choose a magnetic box when the package itself needs a premium rigid presentation and closure. Consider a collapsible magnetic box when a fold-flat premium structure better fits storage and delivery planning.",
    heroImage: "/images/generated/mailer-boxes/mailer-boxes-inside-print-v1.png",
    heroAlt: "Corrugated ear-lock mailer box with printed interior presentation",
    keyDecisions: [
      {
        label: "Mailer",
        title: "Branded unboxing",
        description:
          "Start with an ear-lock corrugated mailer for PR, subscription, or ecommerce presentation.",
      },
      {
        label: "Fixed magnetic",
        title: "Rigid premium reveal",
        description:
          "Use a fixed magnetic structure when the assembled presentation is central to the experience.",
      },
      {
        label: "Collapsible magnetic",
        title: "Fold-flat premium format",
        description:
          "Review a collapsible structure when storage and delivery planning favor a fold-flat box.",
      },
    ],
    content: `
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
    `.trim(),
    faqs: [
      {
        question: "Is a corrugated mailer the same as a standard shipping carton?",
        answer:
          "No. UPG's current offer is the corrugated ear-lock mailer used for branded presentation. Regular slotted shipping cartons, master cartons, and RSC cases are outside the current offer.",
      },
      {
        question: "Which format is better for a premium gift set?",
        answer:
          "A magnetic or collapsible magnetic box is a strong starting point when the rigid presentation and closure are central. A corrugated mailer can be a better starting point when branded unboxing and a folding corrugated structure matter more.",
      },
      {
        question: "Do all three formats use the same MOQ?",
        answer:
          "Yes. Corrugated mailers, magnetic boxes, and collapsible magnetic boxes each use a 250-unit planning MOQ. Final specifications remain subject to project review.",
      },
    ],
    resources: [
      {
        title: "Full mailer vs. magnetic comparison",
        description:
          "Use the structured side-by-side guide for construction, presentation, packing, and quote inputs.",
        href: "/compare/mailer-boxes-vs-magnetic-boxes",
      },
      {
        title: "How custom packaging ships",
        description:
          "Compare flat, folded, collapsed, and assembled packing assumptions.",
        href: "/blog/how-custom-packaging-ships",
      },
    ],
    relatedSlugs: [
      "how-custom-packaging-ships",
      "packaging-finishes-guide",
      "custom-packaging-quote-checklist",
    ],
    keywords: [
      "corrugated mailer vs magnetic box",
      "mailer box vs rigid box",
      "best box for PR kit",
    ],
  },
  {
    slug: "how-to-prepare-artwork-for-custom-packaging",
    title: "How to Prepare Artwork for Custom Packaging",
    date: "2026-08-04",
    updatedAt: "2026-09-27",
    category: "Artwork & Print",
    readTime: "6 min read",
    excerpt:
      "A practical preparation checklist for packaging artwork, references, dimensions, color intent, and structure approval before custom production.",
    quickAnswer:
      "Prepare final packaging artwork only after the project structure is sufficiently defined and an approved dieline is available. Send editable source files, linked assets, fonts or outlined text as requested, brand-color references, finish callouts, required copy, and a clear version. Open details should be labelled for review.",
    heroImage: "/images/generated/tuck-boxes/tuck-boxes-hero-v1.png",
    heroAlt: "Printed custom tuck boxes representing structure-specific packaging artwork",
    keyDecisions: [
      {
        label: "First",
        title: "Confirm the structure",
        description:
          "Artwork should follow the reviewed packaging format instead of forcing a generic template.",
      },
      {
        label: "Then",
        title: "Prepare production layers",
        description:
          "Separate artwork, structural lines, and finish callouts using the project file requirements.",
      },
      {
        label: "Before approval",
        title: "Check every panel",
        description:
          "Review copy, orientation, codes, color intent, version, and production notes.",
      },
    ],
    content: `
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

## Keep production callouts separate

Identify spot colors, white ink, foil, spot UV, embossing, debossing, windows, and other production layers clearly where they apply. Use consistent names across the artwork, proof, and written specification.

For RGB, CMYK, Pantone/PMS, and CMYK-plus-spot choices, use the <a href="/blog/cmyk-vs-pantone-packaging-printing" class="font-semibold text-gold-dark underline">CMYK vs. Pantone packaging printing guide</a> before finalizing color callouts. For dimensions and structure orientation, use the <a href="/blog/how-to-measure-product-for-custom-packaging" class="font-semibold text-gold-dark underline">product measurement guide</a> before placing artwork on the approved dieline.

## Check every panel before approval

- Product name, claims, ingredients, warnings, and required market copy supplied by the buyer
- Barcode, QR code, batch, date, and variable-data areas where applicable
- Opening direction and panel orientation
- Correct language, SKU, and artwork version
- Color intent and physical reference where one exists
- Finish and structural callouts

## Does a small text change count as another design?

Yes. A changed word, punctuation mark, SKU, language version, barcode, or other artwork change creates a different artwork version, even when the dieline, size, and shape stay the same. List every artwork version and the quantity required for each one when requesting a quote.

The same dieline does not automatically mean one print setup. In offset production, a changed version can change color separations, and affected plates may need revision. Setup or run planning may also change. UPG confirms the exact production route, run plan, and written price after reviewing the artwork versions, quantities, and specification.

## Ask before rebuilding files

If artwork is still in progress, state that in your project enquiry. It is better to confirm the structure before spending time adapting a design to the wrong template.
    `.trim(),
    faqs: [
      {
        question: "Can I start a quote before my artwork is ready?",
        answer:
          "Yes. State that the artwork is not started or still in progress. Product, dimensions, quantity, intended use, destination, and references can begin the review.",
      },
      {
        question: "Can I use a dieline found online?",
        answer:
          "A reference can help explain intent, but final artwork should use the approved project dieline. Structure, dimensions, material, closures, inserts, and manufacturing requirements can change the file.",
      },
      {
        question: "Should foil and spot UV be shown in the artwork?",
        answer:
          "Yes. Selective finishes should be clearly identified in the production artwork and use consistent callout names across the proof and written specification.",
      },
      {
        question: "Does a small text change count as another packaging design?",
        answer:
          "Yes. A changed word, punctuation mark, SKU, language version, barcode, or other artwork change is a different artwork version even if the dieline is unchanged. List every version and quantity per design. In offset production, a changed version can change color separations and affected plates may need revision; setup or run planning may also change. UPG confirms the exact production route, run plan, and written price after review.",
      },
    ],
    resources: [
      {
        title: "CMYK vs. Pantone",
        description:
          "Separate process color from spot-color intent before the print file is approved.",
        href: "/blog/cmyk-vs-pantone-packaging-printing",
      },
      {
        title: "Start an artwork review enquiry",
        description:
          "Send the known artwork status with the product, dimensions, quantity, and intended use.",
        href: "/get-a-quote?builder_note=Please%20review%20the%20artwork%20preparation%20status%20for%20this%20project.",
      },
    ],
    relatedSlugs: [
      "cmyk-vs-pantone-packaging-printing",
      "packaging-proof-vs-sample",
      "how-to-measure-product-for-custom-packaging",
    ],
    keywords: [
      "prepare artwork for custom packaging",
      "custom box artwork requirements",
      "packaging artwork checklist",
    ],
  },
];

export const blogCategories: BlogPost["category"][] = [
  "Project Planning",
  "Structure & Delivery",
  "Artwork & Print",
  "Materials & Finishes",
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((candidate): candidate is BlogPost => Boolean(candidate));
}
