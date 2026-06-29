import "./Header.css";

export interface HeaderProps {
  brandName: string;
  logo: string;
  ctaLabel: string;
  ctaHref: string;
  /** Where the brand mark links to. */
  brandHref?: string;
  /** Render the logo as a circle. */
  roundLogo?: boolean;
}

/** Sticky top bar with brand mark and a single CTA. */
export function Header({
  brandName,
  logo,
  ctaLabel,
  ctaHref,
  brandHref = "#top",
  roundLogo = false,
}: HeaderProps) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="brand" href={brandHref} aria-label={brandName}>
          <img
            className={`brand__mark ${roundLogo ? "brand__mark--round" : ""}`.trim()}
            src={logo}
            alt=""
            aria-hidden="true"
          />
          <span className="brand__name">{brandName}</span>
        </a>
        <a className="topbar__cta" href={ctaHref}>
          {ctaLabel} <span aria-hidden="true">←</span>
        </a>
      </div>
    </header>
  );
}
