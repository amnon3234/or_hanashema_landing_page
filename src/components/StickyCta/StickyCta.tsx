import "./StickyCta.css";

export interface StickyCtaProps {
  label: string;
  href: string;
}

/** Mobile-only sticky bottom CTA with a pulsing dot. */
export function StickyCta({ label, href }: StickyCtaProps) {
  return (
    <a className="sticky-cta" href={href} aria-label={label}>
      <span className="sticky-cta__main">
        <span className="sticky-cta__pulse" aria-hidden="true" />
        <span>{label}</span>
      </span>
      <span aria-hidden="true">←</span>
    </a>
  );
}
