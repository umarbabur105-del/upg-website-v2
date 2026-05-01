import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <div className="eyebrow mb-5">{eyebrow}</div> : null}
      <h2 className="display-2 text-balance">{title}</h2>
      {intro ? (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
