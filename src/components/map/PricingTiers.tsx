import "./PricingTiers.css";
import { Button } from "../Button/Button";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import type { Tier } from "../../data/map";

export interface PricingTiersProps {
  tiers: Tier[];
  ctaLabel: string;
  waLede: string;
  waLabel: string;
  waHref: string;
  onPurchase?: (id: string, value: number) => void;
}

/** Pricing tier cards plus a WhatsApp inquiry panel. */
export function PricingTiers({ tiers, ctaLabel, waLede, waLabel, waHref, onPurchase }: PricingTiersProps) {
  return (
    <>
      <div className="tiers">
        {tiers.map((tier) => (
          <article key={tier.name} className={`tier ${tier.featured ? "tier--featured" : ""}`}>
            {tier.ribbon && <span className="tier__ribbon">{tier.ribbon}</span>}
            <h3 className="tier__name">{tier.name}</h3>
            <p className="tier__sub">{tier.sub}</p>
            <div className="tier__price">
              <span className="tier__currency">₪</span>
              <span className="tier__amount">{tier.amount}</span>
              <span className="tier__terms">{tier.terms}</span>
            </div>
            <ul className="tier__list">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Button
              href={tier.payLink}
              variant={tier.featured ? "primary" : "ghost"}
              arrow
              fullWidth
              external
              onClick={() => onPurchase?.(tier.trackId, tier.trackValue)}
            >
              {ctaLabel}
            </Button>
          </article>
        ))}
      </div>

      <div className="wa-inquire" role="complementary">
        <p className="wa-inquire__lede">{waLede}</p>
        <Button href={waHref} variant="whatsapp" external icon={<WhatsAppIcon />}>
          {waLabel}
        </Button>
      </div>
    </>
  );
}
