import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { brand } from "../../data/content";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  args: { brandName: brand.name, logo: brand.logo, ctaLabel: "לקורסים", ctaHref: "#courses" },
};
export default meta;

export const Default: StoryObj<typeof Header> = {};
