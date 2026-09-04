export type LeadDeliveryState = {
  accepted: boolean;
  stored: boolean;
  delivered: boolean;
  recorded: boolean;
  ignored: boolean;
  partialFailure: boolean;
};

export function classifyLeadDelivery({
  stored,
  delivered,
  ignored = false,
}: {
  stored: boolean;
  delivered: boolean;
  ignored?: boolean;
}): LeadDeliveryState {
  if (ignored) {
    return {
      accepted: true,
      stored: false,
      delivered: false,
      recorded: false,
      ignored: true,
      partialFailure: false,
    };
  }

  const accepted = stored || delivered;

  return {
    accepted,
    stored,
    delivered,
    recorded: stored,
    ignored: false,
    partialFailure: accepted && (!stored || !delivered),
  };
}

export function shouldTrackGenerateLead(
  response: Partial<LeadDeliveryState>
): boolean {
  return response.accepted === true
    && response.recorded === true
    && response.ignored !== true;
}
