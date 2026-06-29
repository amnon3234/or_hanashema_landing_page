import "./RecognitionList.css";

export interface RecognitionListProps {
  items: string[];
}

const HEB_MARKS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י"];

/** Two-column list of recognition statements with Hebrew letter marks. */
export function RecognitionList({ items }: RecognitionListProps) {
  return (
    <ul className="pains">
      {items.map((text, i) => (
        <li key={text}>
          <span className="pains__mark" aria-hidden="true">
            {HEB_MARKS[i] ?? ""}
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
}
