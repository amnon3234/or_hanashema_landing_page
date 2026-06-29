import "./MapHeading.css";

export interface MapHeadingProps {
  kicker?: string;
  title: string;
  titleEm?: string;
  titleAfter?: string;
  lede?: string;
  align?: "start" | "center";
}

/** Kicker + serif title (with an emphasized run) + lede, used across map sections. */
export function MapHeading({ kicker, title, titleEm, titleAfter, lede, align = "start" }: MapHeadingProps) {
  return (
    <div className={`mhead mhead--${align}`}>
      {kicker && <p className="mhead__kicker">{kicker}</p>}
      <h2 className="mhead__title">
        {title}
        {titleEm && (
          <>
            {" "}
            <em>{titleEm}</em>
          </>
        )}
        {titleAfter && ` ${titleAfter}`}
      </h2>
      {lede && <p className="mhead__lede">{lede}</p>}
    </div>
  );
}
