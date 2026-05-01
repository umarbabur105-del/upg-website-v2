import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  variant?: "cream" | "olive" | "charcoal" | "surface";
  className?: string;
  id?: string;
}

const variantStyles = {
  cream: "bg-cream text-foreground",
  olive: "bg-gradient-moss text-primary-foreground",
  charcoal: "bg-foreground text-cream",
  surface: "bg-background text-foreground",
};

export function Section({
  children,
  variant = "surface",
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section-shell", variantStyles[variant], className)}
    >
      <div className="container-editorial">{children}</div>
    </section>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "display-2 text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSubheading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty",
        className
      )}
    >
      {children}
    </p>
  );
}
