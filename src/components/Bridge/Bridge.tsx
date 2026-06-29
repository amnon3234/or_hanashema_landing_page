import "./Bridge.css";
import { Container } from "../Container/Container";

export interface BridgeProps {
  text: string;
}

/** Quiet full-width brand statement between sections. */
export function Bridge({ text }: BridgeProps) {
  return (
    <section className="hub-bridge">
      <Container>
        <p>{text}</p>
      </Container>
    </section>
  );
}
