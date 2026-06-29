import "./CourseGrid.css";
import { Section, SectionHeader } from "../Section/Section";
import { Container } from "../Container/Container";
import { CourseCard } from "../CourseCard/CourseCard";
import type { Course } from "../../data/content";

export interface CourseGridProps {
  id?: string;
  kicker: string;
  title: string;
  titleEm?: string;
  courses: Course[];
}

/** Section presenting the available courses as a responsive card grid. */
export function CourseGrid({ id, kicker, title, titleEm, courses }: CourseGridProps) {
  return (
    <Section id={id}>
      <Container>
        <SectionHeader kicker={kicker} title={title} titleEm={titleEm} />
        <div className="course-cards">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} tone={i === 0 ? "a" : "b"} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
