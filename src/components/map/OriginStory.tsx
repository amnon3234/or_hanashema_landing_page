import "./OriginStory.css";

export interface OriginStoryProps {
  paragraphs: string[];
}

/** Quote-style origin narrative with a leading rule. */
export function OriginStory({ paragraphs }: OriginStoryProps) {
  return (
    <div className="origin">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
