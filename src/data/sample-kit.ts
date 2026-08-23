import { siteConfig } from "@/data/site";

export const sampleKitShippingCountries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LV", name: "Latvia" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SK", name: "Slovakia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "GB", name: "United Kingdom" },
] as const;

export type SampleKitShippingCountryCode =
  (typeof sampleKitShippingCountries)[number]["code"];

export const sampleKitShippingCountryCodes = sampleKitShippingCountries.map(
  ({ code }) => code
) as SampleKitShippingCountryCode[];

export const sampleKitShippingRegionLabel =
  "United States, Canada, United Kingdom, and supported European countries";
export const sampleKitDeliveryEstimate = "3–7 business days";

export type SampleKit = {
  kind: "box" | "mylar_bag";
  orderType: "box_sample_kit" | "mylar_bag_sample_kit";
  merchantId: string;
  sku: string;
  name: string;
  shortName: string;
  description: string;
  price: number;
  priceCents: number;
  currency: "USD";
  availability: "in_stock";
  condition: "new";
  path: string;
  image: string;
  imageAlt: string;
  imageDisclosure: string;
  shippingCountries: readonly SampleKitShippingCountryCode[];
  shippingLabel: string;
  deliveryEstimate: string;
  creditText: string;
  selectionNote: string;
  productBoundary: string;
  merchantProductType: string;
  merchantLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  contentsEyebrow: string;
  contentsTitle: string;
  evaluationDescription: string;
  includedDirections: readonly {
    title: string;
    description: string;
  }[];
  relatedProductionLinks: readonly {
    title: string;
    description: string;
    href: string;
  }[];
  crm: {
    source: "Box Sample Kit Order" | "Mylar Bag Sample Kit Order";
    productFamily: string;
    productStyle: string;
    intendedEndUse: string;
    materialPreference: string;
    finishPreference: string;
  };
  url: string;
};

export const boxSampleKit: SampleKit = {
  kind: "box",
  orderType: "box_sample_kit",
  merchantId: "upg-box-sample-kit-001",
  sku: "UPG-BOX-SAMPLE-KIT-001",
  name: "UPG Custom Box Sample Kit",
  shortName: "Box Sample Kit",
  description:
    "A curated custom box sample pack with finished UPG-branded boxes for comparing structures, board construction, print surfaces, and specialty finishes before production.",
  price: 19.99,
  priceCents: 1_999,
  currency: "USD",
  availability: "in_stock",
  condition: "new",
  path: "/samples/box-sample-kit",
  image: "/images/redesign/samples/box-sample-kit-merchant-v1.jpg",
  imageAlt:
    "UPG Box Sample Kit with finished tuck cartons, an ear-lock mailer, and a magnetic rigid box",
  imageDisclosure:
    "AI-generated presentation image. The shipped kit contains finished UPG-branded box samples; exact styles and finish combinations vary.",
  shippingCountries: sampleKitShippingCountryCodes,
  shippingLabel: "Shipping included · 3–7 business days",
  deliveryEstimate: `Estimated delivery: ${sampleKitDeliveryEstimate}`,
  creditText:
    "The full $19.99 kit price is credited toward your first custom packaging production order with UPG.",
  selectionNote:
    "Each kit contains finished UPG-branded box samples, not loose material swatches. Styles and finish combinations vary by current availability, and are selected to demonstrate folding-carton, corrugated ear-lock mailer, rigid-box, print, and specialty-finish capabilities.",
  productBoundary:
    "Mylar bags and flexible pouches are not included. Choose the separate Mylar Bag Sample Kit to evaluate flexible packaging.",
  merchantProductType:
    "Business & Industrial > Custom Packaging > Finished Box Samples",
  merchantLabel: "box_sample_kit",
  heroEyebrow: "Finished custom box samples",
  heroTitle: "Custom Box Sample Kit: compare finished boxes.",
  heroDescription:
    "Order a dedicated Box Sample Kit containing finished UPG-branded box samples. Compare structures, board construction, print, and specialty finishes before planning custom production.",
  contentsEyebrow: "Box samples only",
  contentsTitle: "Finished boxes, not loose swatches.",
  evaluationDescription:
    "Review finished box structures, board construction, print surfaces, and specialty finishes before production planning.",
  includedDirections: [
    {
      title: "Finished box styles",
      description:
        "UPG-branded tuck cartons, corrugated ear-lock mailers, and rigid-box samples selected from the available finished assortment.",
    },
    {
      title: "Board construction",
      description:
        "Compare paperboard, corrugated board, and wrapped rigid-board construction as completed packaging—not loose material swatches.",
    },
    {
      title: "Print & finishes",
      description:
        "Review selected examples of spot UV, embossing, debossing, foil, soft-touch lamination, holographic accents, and other finishes.",
    },
  ],
  relatedProductionLinks: [
    {
      title: "Custom tuck boxes",
      description:
        "Explore straight tuck, reverse tuck, auto-lock, interlock, and seal-end carton formats.",
      href: "/products/custom-tuck-boxes",
    },
    {
      title: "Corrugated mailer boxes",
      description:
        "Plan branded ear-lock mailers for PR kits, subscriptions, ecommerce, and presentation.",
      href: "/products/custom-mailer-boxes",
    },
    {
      title: "Magnetic boxes",
      description:
        "Compare premium magnetic and collapsible magnetic box production paths.",
      href: "/products/custom-magnetic-boxes",
    },
  ],
  crm: {
    source: "Box Sample Kit Order",
    productFamily: "Box Sample Kit",
    productStyle: "Finished custom box samples",
    intendedEndUse:
      "Box structure, board construction, print, and finish evaluation",
    materialPreference:
      "Finished paperboard, corrugated, and rigid-box samples",
    finishPreference:
      "Spot UV, embossing, debossing, foil, lamination, and specialty finishes",
  },
  url: `${siteConfig.url}/samples/box-sample-kit`,
};

export const mylarBagSampleKit: SampleKit = {
  kind: "mylar_bag",
  orderType: "mylar_bag_sample_kit",
  merchantId: "upg-mylar-bag-sample-kit-001",
  sku: "UPG-MYLAR-BAG-SAMPLE-KIT-001",
  name: "UPG Mylar Bag Sample Kit",
  shortName: "Mylar Bag Sample Kit",
  description:
    "A flexible packaging sample kit with five finished UPG-branded Mylar bag and rollstock formats for comparing structures, seals, closures, and print surfaces before production.",
  price: 19.99,
  priceCents: 1_999,
  currency: "USD",
  availability: "in_stock",
  condition: "new",
  path: "/samples/mylar-bag-sample-kit",
  image: "/images/redesign/samples/mylar-bag-sample-kit-merchant-v1.jpg",
  imageAlt:
    "UPG Mylar Bag Sample Kit with a stand-up pouch, flat-bottom coffee bag, spout pouch, three-side-seal pouch, and printed film roll",
  imageDisclosure:
    "AI-generated presentation image. The shipped kit contains finished UPG-branded flexible-packaging samples in the five listed formats.",
  shippingCountries: sampleKitShippingCountryCodes,
  shippingLabel: "Shipping included · 3–7 business days",
  deliveryEstimate: `Estimated delivery: ${sampleKitDeliveryEstimate}`,
  creditText:
    "The full $19.99 kit price is credited toward your first custom packaging production order with UPG.",
  selectionNote:
    "The current kit contains five finished UPG-branded formats: one stand-up pouch, one flat-bottom coffee bag with valve, one spout pouch, one flat three-side-seal pouch, and one printed film-on-roll sample.",
  productBoundary:
    "Boxes and loose material swatches are not included. A child-resistant pouch is not included in the current five-format kit.",
  merchantProductType:
    "Business & Industrial > Custom Packaging > Finished Flexible Packaging Samples",
  merchantLabel: "mylar_bag_sample_kit",
  heroEyebrow: "Finished flexible-packaging samples",
  heroTitle: "Mylar Bag Sample Kit: compare five finished formats.",
  heroDescription:
    "Order a dedicated Mylar Bag Sample Kit containing five finished UPG-branded formats. Compare pouch structures, seals, gussets, closures, print surfaces, and rollstock before planning custom production.",
  contentsEyebrow: "Flexible packaging only",
  contentsTitle: "Five finished formats in one focused kit.",
  evaluationDescription:
    "Review five flexible-packaging formats, their construction, closures, print surfaces, and rollstock before production planning.",
  includedDirections: [
    {
      title: "Stand-up & flat-bottom",
      description:
        "Compare one stand-up pouch and one flat-bottom coffee bag with valve as finished packaging formats.",
    },
    {
      title: "Spout & three-side seal",
      description:
        "Review one finished spout pouch and one flat three-side-seal pouch with distinct opening and sealing structures.",
    },
    {
      title: "Printed film-on-roll",
      description:
        "Inspect one printed rollstock sample alongside the finished pouches to compare the print surface and production format.",
    },
  ],
  relatedProductionLinks: [
    {
      title: "Custom Mylar bags",
      description:
        "Compare UPG's finished bag, pouch, coffee, child-resistant, spout, and rollstock formats.",
      href: "/products/custom-mylar-bags",
    },
    {
      title: "Printed rollstock film",
      description:
        "Review the project inputs needed for custom printed rollstock and film-on-roll enquiries.",
      href: "/packaging-styles/printed-rollstock-film",
    },
    {
      title: "Stand-up pouches",
      description:
        "Plan a finished stand-up pouch project with the correct dimensions, features, and review inputs.",
      href: "/packaging-styles/stand-up-pouches",
    },
  ],
  crm: {
    source: "Mylar Bag Sample Kit Order",
    productFamily: "Mylar Bag Sample Kit",
    productStyle:
      "Stand-up, flat-bottom coffee, spout, three-side-seal, and film-on-roll samples",
    intendedEndUse:
      "Flexible-packaging format, seal, gusset, closure, print, and rollstock evaluation",
    materialPreference: "Finished flexible-packaging samples",
    finishPreference: "Printed pouch surfaces and printed film-on-roll",
  },
  url: `${siteConfig.url}/samples/mylar-bag-sample-kit`,
};

export const sampleKits = [boxSampleKit, mylarBagSampleKit] as const;

export function getSampleKitBySku(sku: string) {
  return sampleKits.find((kit) => kit.sku === sku);
}
