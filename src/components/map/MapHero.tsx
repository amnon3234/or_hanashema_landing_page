import "./MapHero.css";
import { Container } from "../Container/Container";
import { Button } from "../Button/Button";

export interface MapHeroProps {
  eyebrow: string;
  title: string;
  titleEm: string;
  sub: string;
  photo: string;
  photoAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Split hero: copy + CTA beside an arched portrait. */
export function MapHero({ eyebrow, title, titleEm, sub, photo, photoAlt, ctaLabel, ctaHref }: MapHeroProps) {
  return (
    <section className="mhero">
      <Container width="page">
        <div className="mhero__grid">
          <div className="mhero__inner">
            <p className="mhero__eyebrow">{eyebrow}</p>
            <h1 className="mhero__title">
              {title} <em>{titleEm}</em>
            </h1>
            <p className="mhero__sub">{sub}</p>
            <Button href={ctaHref} variant="primary" size="lg" arrow>
              {ctaLabel}
            </Button>
          </div>
          <div className="mhero__photo">
            <span className="mhero__ring" aria-hidden="true" />
            <img src={photo} alt={photoAlt} loading="eager" decoding="async" />
          </div>
        </div>
      </Container>
    </section>
  );
}
