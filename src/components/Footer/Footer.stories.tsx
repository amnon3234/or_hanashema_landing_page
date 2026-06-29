import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { brand } from "../../data/content";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  args: {
    brandName: brand.name,
    logo: brand.logo,
    tagline: brand.tagline,
    links: [
      { label: "מצפן הנשמה", href: "compass.html" },
      { label: "שורש הנשמה", href: "shoresh.html" },
    ],
    year: 2026,
  },
};
export default meta;

export const Default: StoryObj<typeof Footer> = {};
