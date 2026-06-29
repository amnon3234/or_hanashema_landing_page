import "./CourseCard.css";
import { Button } from "../Button/Button";
import type { Course } from "../../data/content";

export interface CourseCardProps {
  course: Course;
  /** Visual accent variant to distinguish the two courses. */
  tone?: "a" | "b";
}

/** Card summarising one course with photo, pitch, bullets and CTA. */
export function CourseCard({ course, tone = "a" }: CourseCardProps) {
  return (
    <article className={`course-card course-card--${tone}`}>
      <span className="course-card__teacher">{course.teacher}</span>
      <h3 className="course-card__title">
        {course.title}
        {course.titleSup && <sup className="course-card__sup">{course.titleSup}</sup>}
      </h3>
      <p className="course-card__type">{course.type}</p>

      <div className="course-card__photo">
        <img src={course.photo} alt={course.photoAlt} loading="lazy" decoding="async" />
      </div>

      <p className="course-card__pitch">{course.pitch}</p>

      <ul className="course-card__bullets">
        {course.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <div className="course-card__cta-row">
        <Button href={course.href} variant="primary" arrow fullWidth>
          {course.ctaLabel}
        </Button>
      </div>
    </article>
  );
}
