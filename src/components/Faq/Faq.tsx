import "./Faq.css";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqProps {
  items: FaqItem[];
}

/** Accordion list of questions using native <details>. */
export function Faq({ items }: FaqProps) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq-item" key={item.q}>
          <summary>
            <span>{item.q}</span>
            <span className="faq-item__plus" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="faq-item__answer">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
