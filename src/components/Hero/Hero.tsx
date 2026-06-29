import "./Hero.css";
import { Container } from "../Container/Container";

export interface HeroProps {
  eyebrow: string;
  logo: string;
  logoAlt: string;
  titleLine1: string;
  titleEm: string;
  sub: string;
}

/** Hub hero: eyebrow, logo mark, two-line serif title, supporting copy. */
export function Hero({ eyebrow, logo, logoAlt, titleLine1, titleEm, sub }: HeroProps) {
  return (
    <section className="hero hub-hero">
      <Container>
        <div className="hero__deco" aria-hidden="true" />
        <p className="hero__eyebrow">{eyebrow}</p>
        <img className="hub-mark" src={logo} alt={logoAlt} />
        <h1 className="hero__title">
          {titleLine1}
          <br />
          <em>{titleEm}</em>
        </h1>
        <p className="hero__sub">{sub}</p>
      </Container>
    </section>
  );
}
