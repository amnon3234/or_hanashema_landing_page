import {
  Header,
  Hero,
  CourseGrid,
  Bridge,
  Section,
  SectionHeader,
  Container,
  Instructor,
  Footer,
} from "../components";
import { brand, hero, courses, bridge, instructors } from "../data/content";

/** אור הנשמה hub landing page. */
export default function HubPage() {
  return (
    <div id="top">
      <Header brandName={brand.name} logo={brand.logo} ctaLabel="לקורסים" ctaHref="#courses" />

      <main>
        <Hero
          eyebrow={hero.eyebrow}
          logo={brand.logo}
          logoAlt={brand.name}
          titleLine1={hero.titleLine1}
          titleEm={hero.titleEm}
          sub={hero.sub}
        />

        <CourseGrid id="courses" kicker="הקורסים שלנו" title="בחרי את" titleEm="המסלול שלך" courses={courses} />

        <Bridge text={bridge} />

        <Section id="instructors" alt>
          <Container>
            <SectionHeader kicker="המורות שלנו" title="מי" titleEm="מלמדת" />
            {instructors.map((instructor) => (
              <Instructor key={instructor.id} instructor={instructor} />
            ))}
          </Container>
        </Section>
      </main>

      <Footer
        brandName={brand.name}
        logo={brand.logo}
        tagline={brand.tagline}
        links={[
          { label: "מצפן הנשמה", href: "compass.html" },
          { label: "שורש הנשמה", href: "shoresh.html" },
        ]}
      />
    </div>
  );
}
