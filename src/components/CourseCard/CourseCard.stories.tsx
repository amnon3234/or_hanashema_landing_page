import type { Meta, StoryObj } from "@storybook/react";
import { CourseCard } from "./CourseCard";
import { courses } from "../../data/content";

const meta: Meta<typeof CourseCard> = {
  title: "Components/CourseCard",
  component: CourseCard,
  decorators: [(S) => <div style={{ maxWidth: 420, margin: "0 auto" }}>{<S />}</div>],
};
export default meta;

type Story = StoryObj<typeof CourseCard>;

export const Compass: Story = { args: { course: courses[0], tone: "a" } };
export const Shoresh: Story = { args: { course: courses[1], tone: "b" } };
