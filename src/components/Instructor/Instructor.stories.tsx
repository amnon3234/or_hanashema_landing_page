import type { Meta, StoryObj } from "@storybook/react";
import { Instructor } from "./Instructor";
import { Container } from "../Container/Container";
import { instructors } from "../../data/content";

const meta: Meta<typeof Instructor> = {
  title: "Components/Instructor",
  component: Instructor,
  decorators: [(S) => <Container>{<S />}</Container>],
};
export default meta;

type Story = StoryObj<typeof Instructor>;

export const Anna: Story = { args: { instructor: instructors[0] } };
export const Natalie: Story = { args: { instructor: instructors[1] } };
