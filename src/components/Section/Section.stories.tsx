import type { Meta, StoryObj } from "@storybook/react";
import { Section, SectionHeader } from "./Section";
import { Container } from "../Container/Container";

const meta: Meta<typeof SectionHeader> = {
  title: "Components/SectionHeader",
  component: SectionHeader,
};
export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  render: (args) => (
    <Section>
      <Container>
        <SectionHeader {...args} />
      </Container>
    </Section>
  ),
  args: { kicker: "הקורסים שלנו", title: "בחרי את", titleEm: "המסלול שלך" },
};

export const WithLede: Story = {
  ...Default,
  args: {
    kicker: "המורות שלנו",
    title: "מי",
    titleEm: "מלמדת",
    lede: "שתי מורות, שתי דרכים, מסגרת אחת.",
  },
};
