import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";
import { hero, brand } from "../../data/content";

const meta: Meta<typeof Hero> = {
  title: "Sections/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: hero.eyebrow,
    logo: brand.logo,
    logoAlt: brand.name,
    titleLine1: hero.titleLine1,
    titleEm: hero.titleEm,
    sub: hero.sub,
  },
};
export default meta;

export const Default: StoryObj<typeof Hero> = {};
