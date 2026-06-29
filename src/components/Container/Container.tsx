import "./Container.css";

export interface ContainerProps {
  children: React.ReactNode;
  /** narrow = reading column, wide = tablet+ layout, page = full landing width. */
  width?: "narrow" | "wide" | "page";
  className?: string;
  style?: React.CSSProperties;
}

/** Centered max-width content column with side padding. */
export function Container({ children, width = "wide", className = "", style }: ContainerProps) {
  return (
    <div className={`wrap wrap--${width} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
