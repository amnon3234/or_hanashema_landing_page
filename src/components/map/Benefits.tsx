import "./Benefits.css";
import type { Benefit } from "../../data/map";

export interface BenefitsProps {
  items: Benefit[];
}

/** Numbered editorial list of benefits. */
export function Benefits({ items }: BenefitsProps) {
  return (
    <div className="benefits__list">
      {items.map((b) => (
        <article className="benefit" key={b.num}>
          <div className="benefit__num" aria-hidden="true">
            {b.num}
          </div>
          <div>
            <h3 className="benefit__title">{b.title}</h3>
            <p className="benefit__body">{b.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
