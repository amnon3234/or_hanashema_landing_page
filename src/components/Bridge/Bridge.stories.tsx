import type { Meta, StoryObj } from "@storybook/react";
import { Bridge } from "./Bridge";
import { bridge } from "../../data/content";

const meta: Meta<typeof Bridge> = {
  title: "Sections/Bridge",
  component: Bridge,
  parameters: { layout: "fullscreen" },
  args: { text: bridge },
};
export default meta;

export const Default: StoryObj<typeof Bridge> = {};
