import "./MidCta.css";
import { Button } from "../Button/Button";

export interface MidCtaProps {
  title: string;
  titleEm: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Centered reassurance block with a single action. */
export function MidCta({ title, titleEm, body, ctaLabel, ctaHref }: MidCtaProps) {
  return (
    <div className="midcta">
      <h2 className="midcta__title">
        {title} <em>{titleEm}</em>
      </h2>
      <p className="midcta__body">{body}</p>
      <Button href={ctaHref} variant="primary" arrow>
        {ctaLabel}
      </Button>
    </div>
  );
}
