import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
  headingClassName?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  headingClassName,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <div className="eyebrow mb-5">{eyebrow}</div> : null}
      <Heading className={headingClassName ?? "display-2 text-balance"}>
        {title}
      </Heading>
      {intro ? (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
