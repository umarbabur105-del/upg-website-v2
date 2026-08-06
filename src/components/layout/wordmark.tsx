type WordmarkProps = {
  placement?: "header" | "footer";
};

export function Wordmark({ placement = "header" }: WordmarkProps) {
  const isFooter = placement === "footer";

  return (
    <span className="inline-flex items-center" aria-hidden="true">
      <span
        className={`font-sans font-semibold leading-none tracking-[-0.065em] text-foreground ${
          isFooter ? "text-[1.75rem]" : "text-[1.45rem]"
        }`}
      >
        UPG
      </span>
      <span
        className={`ml-3 hidden w-px shrink-0 bg-gold/55 sm:block ${
          isFooter ? "h-9" : "h-8"
        }`}
      />
      <span className="ml-3 hidden flex-col sm:flex">
        <span
          className={`font-sans font-semibold uppercase leading-none text-foreground ${
            isFooter
              ? "text-[0.72rem] tracking-[0.19em]"
              : "text-[0.66rem] tracking-[0.18em]"
          }`}
        >
          Universal
        </span>
        <span
          className={`mt-1.5 font-sans font-semibold uppercase leading-none text-gold ${
            isFooter
              ? "text-[0.61rem] tracking-[0.16em]"
              : "text-[0.56rem] tracking-[0.145em]"
          }`}
        >
          Packaging Group
        </span>
      </span>
    </span>
  );
}
