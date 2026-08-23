export function Wordmark() {
  return (
    <span className="inline-flex items-center" aria-hidden="true">
      <span className="font-sans text-[1.45rem] font-semibold leading-none tracking-[-0.065em] text-foreground">
        UPG
      </span>
      {" "}
      <span className="ml-3 h-8 w-px shrink-0 bg-gold/55" />
      <span className="ml-3 flex flex-col">
        <span className="font-sans text-[0.66rem] font-semibold tracking-[0.18em] text-foreground uppercase leading-none">
          Universal
        </span>
        {" "}
        <span className="mt-1.5 font-sans text-[0.56rem] font-semibold tracking-[0.145em] text-gold-dark uppercase leading-none">
          Packaging Group
        </span>
      </span>
    </span>
  );
}
