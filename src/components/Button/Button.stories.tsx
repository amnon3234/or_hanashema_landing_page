import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: { children: "פרטים מלאים על הקורס" },
  argTypes: {
    variant: { control: "radio", options: ["primary", "soft", "ghost", "whatsapp"] },
    size: { control: "radio", options: ["md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", arrow: true } };
export const Soft: Story = { args: { variant: "soft", arrow: true } };
export const Ghost: Story = { args: { variant: "ghost", arrow: true } };
export const WhatsApp: Story = {
  args: { variant: "whatsapp", children: "שאלות? דברי איתי בוואטסאפ" },
};
export const Large: Story = { args: { size: "lg", arrow: true } };
export const FullWidth: Story = {
  args: { fullWidth: true, arrow: true },
  decorators: [(S) => <div style={{ width: 360 }}>{<S />}</div>],
};
