export type ArtworkCheckStatus = "confirmed" | "attention" | "unsure";

export interface ArtworkPreflightCheck {
  id: string;
  title: string;
  prompt: string;
  helpText: string;
  priority: "foundation" | "production-detail";
  options: Array<{
    status: ArtworkCheckStatus;
    label: string;
    description: string;
  }>;
}

export type ArtworkPreflightAnswers = Record<string, ArtworkCheckStatus>;

const standardOptions = {
  confirmed: {
    status: "confirmed" as const,
    label: "Confirmed",
    description: "This item is identified and included in the current artwork package.",
  },
  attention: {
    status: "attention" as const,
    label: "Needs attention",
    description: "This item is missing, outdated, or still being prepared.",
  },
  unsure: {
    status: "unsure" as const,
    label: "Not sure",
    description: "Keep this item open for clarification during UPG review.",
  },
};

export const artworkPreflightChecks: ArtworkPreflightCheck[] = [
  {
    id: "structure-dieline",
    title: "Structure and dieline",
    prompt: "Is the artwork built on the current dieline for the intended packaging structure?",
    helpText:
      "Dielines are structure-specific. If the structure or dimensions changed, identify that before final artwork work continues.",
    priority: "foundation",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
  {
    id: "editable-source",
    title: "Editable artwork source",
    prompt: "Is the current editable artwork source available with the files being shared?",
    helpText:
      "Identify the current master file or artwork source so changes are not made from an outdated export.",
    priority: "foundation",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
  {
    id: "placed-images",
    title: "Placed images and graphics",
    prompt: "Are the images and graphics used by the artwork available and clearly identified?",
    helpText:
      "Missing or unclear image assets can delay artwork review. UPG confirms production suitability after receiving the files.",
    priority: "production-detail",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
  {
    id: "fonts",
    title: "Fonts and text handling",
    prompt: "Can the fonts and editable text used in the artwork be reviewed without missing type assets?",
    helpText:
      "Keep the intended typography identifiable. Final text handling is confirmed during artwork review.",
    priority: "production-detail",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
  {
    id: "color-intent",
    title: "Color intent",
    prompt: "Are the intended brand, process, or named spot colors clearly identified?",
    helpText:
      "The checker records color intent only. Final color setup, references, and production expectations require UPG review.",
    priority: "production-detail",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
  {
    id: "special-finishes",
    title: "Special finishes",
    prompt: "Are foil, spot UV, embossing, debossing, windows, or other intended effects clearly separated and labeled?",
    helpText:
      "Only select Confirmed when the intended effects can be identified in the current artwork package.",
    priority: "production-detail",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
  {
    id: "copy-codes",
    title: "Copy and variable elements",
    prompt: "Is the current copy approved, with barcodes, legal text, and variable elements identified where applicable?",
    helpText:
      "The brand remains responsible for content approval and any required external validation. UPG reviews placement within the packaging artwork.",
    priority: "production-detail",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
  {
    id: "version-approval",
    title: "Current version and approver",
    prompt: "Is the current artwork version clearly named, and is the person responsible for approval known?",
    helpText:
      "A clear current version reduces the risk of reviewing or producing from an outdated file.",
    priority: "foundation",
    options: [standardOptions.confirmed, standardOptions.attention, standardOptions.unsure],
  },
];

export function evaluateArtworkReadiness(answers: ArtworkPreflightAnswers) {
  const answeredChecks = artworkPreflightChecks.filter((check) => answers[check.id]);
  const confirmedChecks = artworkPreflightChecks.filter(
    (check) => answers[check.id] === "confirmed"
  );
  const attentionChecks = artworkPreflightChecks.filter(
    (check) => answers[check.id] === "attention"
  );
  const unsureChecks = artworkPreflightChecks.filter(
    (check) => answers[check.id] === "unsure"
  );
  const openFoundationChecks = artworkPreflightChecks.filter(
    (check) =>
      check.priority === "foundation" &&
      answers[check.id] &&
      answers[check.id] !== "confirmed"
  );
  const isComplete = answeredChecks.length === artworkPreflightChecks.length;

  if (!isComplete) {
    return {
      status: "incomplete" as const,
      title: "Complete all eight checks.",
      description:
        "The result will separate confirmed items from artwork details that need attention or UPG clarification.",
      answeredCount: answeredChecks.length,
      confirmedCount: confirmedChecks.length,
      attentionChecks,
      unsureChecks,
      openFoundationChecks,
      isComplete,
    };
  }

  if (openFoundationChecks.length > 0) {
    return {
      status: "foundation-open" as const,
      title: "Resolve the foundation items first.",
      description:
        "The artwork can still be shared for guidance, but the open structure, source, or version items should be resolved before final artwork approval.",
      answeredCount: answeredChecks.length,
      confirmedCount: confirmedChecks.length,
      attentionChecks,
      unsureChecks,
      openFoundationChecks,
      isComplete,
    };
  }

  if (attentionChecks.length > 0 || unsureChecks.length > 0) {
    return {
      status: "review-with-open-items" as const,
      title: "Ready to share with open items noted.",
      description:
        "The foundation is identified. Send the current package with the open items listed so UPG can review what requires correction or clarification.",
      answeredCount: answeredChecks.length,
      confirmedCount: confirmedChecks.length,
      attentionChecks,
      unsureChecks,
      openFoundationChecks,
      isComplete,
    };
  }

  return {
    status: "ready-for-review" as const,
    title: "Ready for UPG artwork review.",
    description:
      "All eight preparation items are confirmed. UPG must still review the actual files, structure, production setup, proof, and final approvals.",
    answeredCount: answeredChecks.length,
    confirmedCount: confirmedChecks.length,
    attentionChecks,
    unsureChecks,
    openFoundationChecks,
    isComplete,
  };
}
