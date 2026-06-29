import "./TrustStrip.css";
import { Container } from "../Container/Container";
import type { TrustItem } from "../../data/map";

export interface TrustStripProps {
  items: TrustItem[];
}

/** Three-column band of headline stats. */
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <div className="trust">
      <Container width="page">
        <div className="trust__grid">
          {items.map((item) => (
            <div className="trust__item" key={item.label}>
              <span className={`trust__num ${/^[\d-]+$/.test(item.num) ? "" : "trust__num--text"}`}>
                {item.num}
                {item.numSmall && <small>{item.numSmall}</small>}
              </span>
              <span className="trust__lbl">{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
