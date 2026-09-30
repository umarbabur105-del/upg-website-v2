export type MaterialGuide = {
  id: string;
  name: string;
  label: string;
  image: string;
  imageAlt: string;
  summary: string;
  bestFor: string;
  printNote: string;
  selectionNote: string;
  productHref: string;
  productLabel: string;
};

export const materialGuides: MaterialGuide[] = [
  {
    id: "corrugated-board",
    name: "Corrugated board",
    label: "Protection & presentation",
    image: "/images/materials-library/corrugated-board-v1.webp",
    imageAlt: "Single-wall corrugated board edge showing two flat liners and a fluted center",
    summary: "A fluted paper layer between flat liners gives a mailer its depth and structure. Choose the board construction and the printed surface together.",
    bestFor: "Ear-lock mailer boxes, subscription packaging, PR kits, and fitted corrugated inserts.",
    printNote: "Kraft liners give a natural brown base. White liners or a printed sheet laminated to the board can support a brighter graphic finish.",
    selectionNote: "E flute is a common starting point for compact printed mailers. Product weight, insert fit, box size, stacking, and transit determine the final board specification; flute size alone is not a load rating.",
    productHref: "/products/custom-mailer-boxes",
    productLabel: "Explore custom mailer boxes",
  },
  {
    id: "white-paperboard",
    name: "White paperboard · C1S & C2S",
    label: "Clean color & fine detail",
    image: "/images/materials-library/paperboard-white-v1.webp",
    imageAlt: "Smooth white folding paperboard sheets with a lifted corner showing the white reverse",
    summary: "Solid bleached sulfate (SBS) paperboard gives folding cartons a bright white base. C1S means coated on one side; C2S means coated on both sides.",
    bestFor: "Beauty, supplement, small electronics, and other retail product cartons where clear graphics matter.",
    printNote: "Choose C1S for a coated exterior with an uncoated reverse. Consider C2S when both faces need a coated print surface. An uncoated inside can also be printed, with a different result.",
    selectionNote: "16 PT and 18 PT are common carton discussion points, with lighter and heavier options below. Coated board is not the same as a finished gloss or laminated box.",
    productHref: "/products/custom-tuck-boxes",
    productLabel: "Explore custom folding cartons",
  },
  {
    id: "kraft-board",
    name: "Natural kraft board",
    label: "Warm color & visible texture",
    image: "/images/materials-library/kraft-board-v1.webp",
    imageAlt: "Thin natural brown kraft paperboard sheets with visible paper fibers",
    summary: "Brown paperboard makes the stock itself part of the design. It works well with simple graphics, generous space, and a natural-looking palette.",
    bestFor: "Soap cartons, sleeves, gift packaging, and retail cartons with a kraft appearance.",
    printNote: "The brown base changes the appearance of printed color. If a bright brand color or white graphic is important, discuss white ink or a white stock before approving the artwork.",
    selectionNote: "Kraft describes a paper material, not a corrugated structure. Confirm the stock, thickness, and finish separately; brown color alone does not establish recycled content or certification.",
    productHref: "/products/custom-tuck-boxes",
    productLabel: "Explore kraft carton options",
  },
  {
    id: "duplex-paperboard",
    name: "CCNB / duplex paperboard",
    label: "White face, gray reverse",
    image: "/images/materials-library/duplex-grayboard-v1.webp",
    imageAlt: "Duplex folding paperboard with a white printing face and gray reverse",
    summary: "Clay-coated newsback has a white printing face over a gray or brown-backed board. It offers a different inside appearance from all-white SBS.",
    bestFor: "Retail cartons and sleeves where the exterior graphic matters more than a white interior.",
    printNote: "Put the main graphics on the coated face. Review the reverse if customers will see the inside or if an interior message is planned.",
    selectionNote: "Compare price and stiffness at the actual carton size. The same PT or GSM does not make duplex and SBS identical in appearance, rigidity, or print performance.",
    productHref: "/products/custom-tuck-boxes",
    productLabel: "Compare carton materials",
  },
  {
    id: "rigid-grayboard",
    name: "Rigid grayboard & wrap",
    label: "Structure beneath the surface",
    image: "/images/materials-library/rigid-grayboard-v1.webp",
    imageAlt: "Thick solid grayboard beside a separate white paper wrapping sheet",
    summary: "A rigid box gets its structure from a thick solid board core. A separate paper wrap carries the color, print, texture, and decorative finish.",
    bestFor: "Magnetic presentation boxes, gift sets, jewelry packaging, and collapsible rigid boxes.",
    printNote: "Plan foil, embossing, debossing, and surface finishes around the wrap and assembled box. The visible paper and structural core perform different jobs.",
    selectionNote: "Discuss core thickness in millimeters. A 1.5 mm or 2.0 mm core is a starting reference, not the finished wall thickness; wrap, lining, box dimensions, and inserts also matter.",
    productHref: "/products/custom-magnetic-boxes",
    productLabel: "Explore magnetic rigid boxes",
  },
  {
    id: "flexible-films",
    name: "Flexible films & pouch layers",
    label: "Barrier, sealing & shelf life",
    image: "/images/materials-library/flexible-film-v1.webp",
    imageAlt: "Flexible pouch material with a silver inner surface beside a transparent film strip",
    summary: "A pouch is a material system. Its outer layer, barrier layer, and sealant work together around the product and filling process.",
    bestFor: "Custom Mylar bags, stand-up pouches, flat-bottom bags, coffee bags, and other flexible formats.",
    printNote: "Matte, gloss, metallic effects, and clear windows depend on the film construction. A clear window changes the barrier area and should be specified with the product requirements.",
    selectionNote: "Share the contents, fill weight, shelf-life target, and filling method. Thickness alone does not establish oxygen or moisture protection, food-contact suitability, or recyclability.",
    productHref: "/products/custom-mylar-bags",
    productLabel: "Explore custom Mylar bags",
  },
];

export type FinishGuide = {
  id: string;
  name: string;
  effect: string;
  image: string;
  imageAlt: string;
  summary: string;
  bestFor: string;
  artwork: string;
  cost: string;
  watch: string;
};

export const finishGuides: FinishGuide[] = [
  {
    id: "spot-uv",
    name: "Spot UV",
    effect: "Gloss in selected areas",
    image: "/images/materials-library/spot-uv-v1.webp",
    imageAlt: "Selective glossy clear UV pattern reflecting light against a matte dark olive surface",
    summary: "A clear coating adds shine to a selected logo, pattern, or image. Over a matte surface, the contrast is visible as the box moves in the light.",
    bestFor: "Brand marks on folding cartons, printed rigid-box wraps, and compatible printed mailer surfaces.",
    artwork: "Supply the UV area as a separate named vector layer or spot-color mask aligned to the print artwork.",
    cost: "Coverage, registration, the base finish, and the extra coating pass affect the quote.",
    watch: "Standard spot UV is not raised embossing. Review fine gaps and fold positions; confirm adhesion to the selected ink, coating, or laminate.",
  },
  {
    id: "embossing",
    name: "Embossing",
    effect: "Raised paper detail",
    image: "/images/redesign/finishes/finish-emboss.jpg",
    imageAlt: "Raised geometric embossing with visible highlights and shadows in ivory paper",
    summary: "A shaped die raises the paper surface to create a detail you can see and feel. Blind embossing uses the paper itself, without ink or foil in that area.",
    bestFor: "Logos and simple patterns on folding cartons and rigid-box wraps; mailer applications need the liner and construction reviewed first.",
    artwork: "Use a separate vector layer. Keep small letters, narrow gaps, and fine strokes open enough for the selected stock and die.",
    cost: "Die tooling, design area, relief levels, and alignment with print or foil affect setup and production.",
    watch: "Embossing can leave a corresponding impression on the reverse. Check the inside appearance and keep critical detail clear of folds and glue areas.",
  },
  {
    id: "debossing",
    name: "Debossing",
    effect: "Pressed-in detail",
    image: "/images/materials-library/deboss-v1.webp",
    imageAlt: "A recessed geometric impression pressed below the surface of ivory paperboard",
    summary: "Debossing presses a design below the surface. Shadows define the recessed mark, giving simple artwork a quiet, tactile character.",
    bestFor: "Minimal logos on suitable carton stocks and paper wraps for presentation boxes.",
    artwork: "Mark the deboss area on its own vector layer and show the intended position on the dieline.",
    cost: "Tooling, impression area, stock choice, and any print or foil registration affect the quote.",
    watch: "Depth depends on the substrate and construction. Very fine detail or a deep impression can distort the stock; review the intended result before production.",
  },
  {
    id: "foil-stamping",
    name: "Foil stamping",
    effect: "Reflective metallic accents",
    image: "/images/redesign/finishes/finish-foil.jpg",
    imageAlt: "Reflective gold foil areas contrasting with uncoated ivory paper",
    summary: "Foil transfers a decorative layer onto selected areas of the packaging. Metallic gold or silver can create reflections that ordinary CMYK ink cannot reproduce.",
    bestFor: "Logos, borders, and small focal details on cartons and rigid wraps, with compatible mailer surfaces reviewed by project.",
    artwork: "Separate each foil color into a named vector layer. Define solid shapes and leave enough space between small details.",
    cost: "Die size, foil coverage, foil colors, placements, and press passes influence pricing.",
    watch: "Foil is not automatically embossed. Combining foil with relief is a separate specification, with alignment and tooling to review.",
  },
  {
    id: "matte-lamination",
    name: "Matte lamination",
    effect: "Low sheen, smooth surface",
    image: "/images/materials-library/matte-lamination-v1.webp",
    imageAlt: "Matte olive carton surface with soft diffused light and low reflection",
    summary: "A thin matte film is bonded to the printed sheet. The muted reflection helps typography and simple color fields stay the focus.",
    bestFor: "Retail cartons, rigid-box wraps, and compatible printed mailers with a subdued surface finish.",
    artwork: "Specify the laminated face and any foil or spot UV that will be applied over it.",
    cost: "Film type, sheet coverage, and additional finishing steps affect the quote.",
    watch: "Dark matte surfaces may show rub marks. Discuss a scuff-resistant grade for handling-intensive packs; matte does not mean scratch-proof.",
  },
  {
    id: "gloss-lamination",
    name: "Gloss lamination",
    effect: "All-over reflective finish",
    image: "/images/materials-library/gloss-lamination-v1.webp",
    imageAlt: "Gloss-laminated printed carton with a continuous reflection across the surface",
    summary: "A clear glossy film adds a reflective surface across the printed sheet. It can make color and photographic artwork look more vivid.",
    bestFor: "Image-led retail cartons, colorful gift packaging, and compatible printed mailer surfaces.",
    artwork: "Identify the outside and inside faces separately if both need finishing.",
    cost: "Film specification, coverage, and any later foil or coating operations affect pricing.",
    watch: "Glare can compete with small text. Check readability under retail lighting, and review crease behavior on the chosen board.",
  },
  {
    id: "soft-touch",
    name: "Soft-touch finish",
    effect: "A smooth, velvety feel",
    image: "/images/materials-library/soft-touch-v1.webp",
    imageAlt: "Smooth dark olive packaging surface with a soft satin appearance",
    summary: "Soft-touch treatments add a tactile, low-sheen surface. Soft-touch coating and soft-touch lamination are different processes that can create a similar feel.",
    bestFor: "Beauty cartons, gift packaging, and presentation-box wraps where touch is part of the experience.",
    artwork: "Specify coating or film lamination with the quote and identify any overprinted or decorated areas.",
    cost: "The chosen process, surface area, and compatibility with later finishing affect the cost.",
    watch: "A screen cannot show the feel. Review a physical finish reference when touch matters, and confirm scuff performance and foil or UV compatibility.",
  },
  {
    id: "uv-coating",
    name: "Flood UV coating",
    effect: "Clear coating across a panel",
    image: "/images/materials-library/flood-uv-v1.webp",
    imageAlt: "Printed paperboard with an all-over clear gloss reflection across the panel",
    summary: "A liquid coating is cured with ultraviolet light over a broad surface. Gloss UV adds an overall sheen; spot UV limits that coating to selected details.",
    bestFor: "Printed cartons and compatible paper surfaces where an all-over coated finish is wanted.",
    artwork: "Identify coated panels and areas that must remain suitable for gluing, labeling, or other operations.",
    cost: "Coating formulation, coverage, application method, and additional operations affect the quote.",
    watch: "UV coating is not a laminated film and does not make a package waterproof. Confirm adhesion, fold behavior, and compatibility with the final use.",
  },
];

export const materialFinishFaqs = [
  {
    question: "Can a corrugated mailer have foil, spot UV, or embossing?",
    answer: "The surface and production route matter. A printed sheet laminated to corrugated board can support different decoration options from a directly printed kraft liner. Share the desired effect with the mailer specification so the liner, flute, folds, and finishing sequence can be reviewed together.",
  },
  {
    question: "Is spot UV the same as embossing or raised UV?",
    answer: "No. Standard spot UV creates selective gloss, while embossing reshapes the paper to create relief. Raised UV uses a thicker deposited coating and is a separate process; ask for it specifically if a raised coating is the intended result.",
  },
  {
    question: "Does C1S mean the finished box will be glossy?",
    answer: "No. C1S describes paperboard coated on one face for printing. The final sheen depends on the additional coating or lamination. A C1S carton can have a matte, gloss, or other specified finish.",
  },
  {
    question: "Which artwork files are needed for foil, UV, embossing, or debossing?",
    answer: "Keep the print artwork, dieline, and each decorative process on separately named layers. Use vector shapes for the finish areas, outline type where required, and align every layer to the same dieline. Review placement and separation in the design proof file before approval.",
  },
  {
    question: "Do special finishes change the packaging price?",
    answer: "They can add tooling, material, setup, or another production operation. The size and number of decorated areas, colors, registration, quantity, and stock all matter. Request the base option and preferred finish together for a meaningful comparison; there is no universal percentage uplift.",
  },
  {
    question: "Does a thicker board always give better protection?",
    answer: "No. Compare the complete pack: product weight and fragility, box dimensions, board grade, structure, insert fit, and shipping conditions. Paperboard PT describes thickness, GSM describes weight per area, and corrugated flute describes a profile. None is a complete protection rating on its own.",
  },
];

type ProductLibrarySelection = {
  intro: string;
  options: { id: string; note: string }[];
};

export const productLibrarySelections: Record<string, ProductLibrarySelection> = {
  "custom-mailer-boxes": {
    intro: "Start with the corrugated structure, then choose the print surface and decoration. Finishes are reviewed around the liner and folded mailer.",
    options: [
      { id: "corrugated-board", note: "Compare kraft and white print surfaces, then review flute and board strength around the packed product." },
      { id: "spot-uv", note: "Add selective shine to a logo or pattern on a compatible printed surface." },
      { id: "embossing", note: "Explore raised detail with the liner, laminated sheet, and fold positions reviewed together." },
    ],
  },
  "custom-tuck-boxes": {
    intro: "The board controls the print base and folding behavior. The finish controls sheen, texture, and the details customers notice.",
    options: [
      { id: "white-paperboard", note: "Compare C1S and C2S around exterior graphics and interior printing." },
      { id: "foil-stamping", note: "Use a reflective accent for a logo, border, or key detail." },
      { id: "embossing", note: "Create raised paper detail while checking the reverse and crease positions." },
    ],
  },
  "custom-magnetic-boxes": {
    intro: "Choose the structural core and the visible wrap separately, then plan decoration around the box panels.",
    options: [
      { id: "rigid-grayboard", note: "Understand how the board core, wrap, lining, and insert work together." },
      { id: "debossing", note: "Use a recessed mark for a restrained tactile detail on a suitable wrap." },
      { id: "foil-stamping", note: "Add metallic contrast to a logo or simple design element." },
    ],
  },
  "custom-collapsible-magnetic-boxes": {
    intro: "Plan the wrap and decoration around the flat-fold structure, with hinges and assembly areas kept in mind.",
    options: [
      { id: "rigid-grayboard", note: "Compare the rigid core and paper wrap before choosing a surface treatment." },
      { id: "soft-touch", note: "Explore a low-sheen tactile wrap and review handling performance." },
      { id: "spot-uv", note: "Highlight selected areas while keeping decoration clear of critical folds." },
    ],
  },
  "custom-mylar-bags": {
    intro: "For pouches, choose the barrier and seal structure before the surface finish. Box-finishing processes are not automatically suitable for flexible film.",
    options: [
      { id: "flexible-films", note: "Review barrier, seals, windows, and appearance as one material system." },
    ],
  },
};
