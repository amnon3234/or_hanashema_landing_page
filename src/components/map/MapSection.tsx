import "./MapSection.css";
import { Container } from "../Container/Container";
import { Reveal } from "../Reveal/Reveal";

export interface MapSectionProps {
  children: React.ReactNode;
  id?: string;
  /** Elevated alternate band background. */
  band?: boolean;
  /** Wrap content in a scroll-reveal. */
  reveal?: boolean;
  className?: string;
}

/** Long-form section with generous vertical rhythm for the map page. */
export function MapSection({ children, id, band = false, reveal = true, className = "" }: MapSectionProps) {
  const inner = <Container width="page">{children}</Container>;
  return (
    <section id={id} className={`msec ${band ? "msec--band" : ""} ${className}`.trim()}>
      {reveal ? <Reveal>{inner}</Reveal> : inner}
    </section>
  );
}
