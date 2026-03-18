import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  variant?: "cream" | "olive" | "charcoal" | "surface";
  className?: string;
  id?: string;
}

const variantStyles = {
  cream: "bg-cream text-charcoal",
  olive: "bg-olive text-offwhite",
  charcoal: "bg-charcoal text-offwhite",
  surface: "bg-surface text-charcoal",
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
      className={cn("px-6 py-20 lg:px-8 lg:py-28", variantStyles[variant], className)}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
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
        "font-serif text-4xl font-semibold leading-tight tracking-tight lg:text-5xl",
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
        "mt-4 max-w-2xl text-lg leading-relaxed opacity-70",
        className
      )}
    >
      {children}
    </p>
  );
}
