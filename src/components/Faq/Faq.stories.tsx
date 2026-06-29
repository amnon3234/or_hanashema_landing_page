import type { Meta, StoryObj } from "@storybook/react";
import { Faq } from "./Faq";
import { Container } from "../Container/Container";
import { faq } from "../../data/map";

const meta: Meta<typeof Faq> = {
  title: "Components/Faq",
  component: Faq,
  decorators: [(S) => <Container style={{ padding: "32px 22px" }}>{<S />}</Container>],
  args: { items: faq.items },
};
export default meta;

export const Default: StoryObj<typeof Faq> = {};
