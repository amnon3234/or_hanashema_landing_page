import "./Section.css";

export interface SectionProps {
  children: React.ReactNode;
  id?: string;
  /** Alternate (slightly raised) background. */
  alt?: boolean;
  className?: string;
}

/** Vertical page section with standard rhythm. */
export function Section({ children, id, alt = false, className = "" }: SectionProps) {
  return (
    <section id={id} className={`sec ${alt ? "sec--alt" : ""} ${className}`.trim()}>
      {children}
    </section>
  );
}

export interface SectionHeaderProps {
  kicker?: string;
  title: React.ReactNode;
  /** Emphasized run appended to the title in accent color. */
  titleEm?: string;
  lede?: string;
}

/** Centered kicker + serif title + optional lede. */
export function SectionHeader({ kicker, title, titleEm, lede }: SectionHeaderProps) {
  return (
    <>
      {kicker && <p className="sec__kicker">{kicker}</p>}
      <h2 className="sec__title">
        {title}
        {titleEm && (
          <>
            {" "}
            <em>{titleEm}</em>
          </>
        )}
      </h2>
      {lede && <p className="sec__lede">{lede}</p>}
    </>
  );
}
