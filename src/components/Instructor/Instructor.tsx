import "./Instructor.css";
import type { Instructor as InstructorData } from "../../data/content";

export interface InstructorProps {
  instructor: InstructorData;
}

/** Photo + bio row for a single teacher. */
export function Instructor({ instructor }: InstructorProps) {
  return (
    <div className="about">
      <div className="about__photo">
        <img
          src={instructor.photo}
          alt={instructor.photoAlt}
          loading="lazy"
          decoding="async"
          style={
            instructor.photoObjectPosition
              ? { objectPosition: instructor.photoObjectPosition }
              : undefined
          }
        />
      </div>
      <div className="about__copy">
        <p className="about__kicker">{instructor.kicker}</p>
        <p>{instructor.body}</p>
        <p className="signature">{instructor.signature}</p>
        <a className="about__link" href={instructor.href}>
          {instructor.linkLabel}
        </a>
      </div>
    </div>
  );
}
