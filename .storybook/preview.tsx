import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: "page",
      values: [
        { name: "page", value: "#f4f4f3" },
        { name: "surface", value: "#ffffff" },
        { name: "inverted", value: "#2a2d31" },
      ],
    },
  },
  globalTypes: {
    direction: {
      description: "Text direction",
      defaultValue: "rtl",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "rtl", title: "RTL (עברית)" },
          { value: "ltr", title: "LTR" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dir = context.globals.direction || "rtl";
      document.documentElement.lang = "he";
      return <Story />;
    },
  ],
};

export default preview;
