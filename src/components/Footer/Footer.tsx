import "./Footer.css";
import { Container } from "../Container/Container";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  brandName: string;
  logo: string;
  tagline: string;
  links: FooterLink[];
  privacyHref?: string;
  year?: number;
}

/** Page footer with brand, tagline, links and copyright. */
export function Footer({
  brandName,
  logo,
  tagline,
  links,
  privacyHref = "privacy.html",
  year = new Date().getFullYear(),
}: FooterProps) {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div>
          <div className="brand footer__brand">
            <img className="brand__mark footer__mark" src={logo} alt="" aria-hidden="true" />
            <span className="brand__name footer__name">{brandName}</span>
          </div>
          <p className="footer__tag">{tagline}</p>
        </div>

        <div className="footer__contacts">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="footer__base">
          © {year} {brandName} · כל הזכויות שמורות
          <span aria-hidden="true" className="footer__sep">·</span>
          <a className="footer__privacy" href={privacyHref}>מדיניות פרטיות</a>
        </div>
      </Container>
    </footer>
  );
}
