/** Token metadata mirroring tokens.css, for documentation in Storybook. */
export const colorTokens = [
  { name: "--color-bg", value: "#f4f4f3", role: "Page background" },
  { name: "--color-surface", value: "#ffffff", role: "Card / surface" },
  { name: "--color-surface-alt", value: "#fafafa", role: "Alternate surface" },
  { name: "--color-text", value: "#1f2225", role: "Primary text" },
  { name: "--color-muted", value: "#5f6368", role: "Secondary text" },
  { name: "--color-border", value: "#e3e3e1", role: "Borders / dividers" },
  { name: "--color-primary", value: "#2a2d31", role: "Primary action" },
  { name: "--color-primary-hover", value: "#3c4045", role: "Primary hover" },
  { name: "--color-on-primary", value: "#fafafa", role: "Text on primary" },
  { name: "--color-accent", value: "#8c8c8c", role: "Accent" },
  { name: "--color-accent-strong", value: "#6f6f6f", role: "Accent strong" },
  { name: "--color-accent-soft", value: "#c9c9c4", role: "Accent soft" },
  { name: "--color-invert-bg", value: "#2a2d31", role: "Inverted surface" },
  { name: "--color-invert-text", value: "#fafafa", role: "Text on inverted" },
] as const;

export const typeTokens = [
  { name: "--font-serif", value: '"Bellefair", serif', role: "Display / headings" },
  { name: "--font-sans", value: '"Assistant", sans-serif', role: "Body" },
  { name: "--text-base", value: "17px", role: "Body size" },
  { name: "--text-2xl", value: "clamp(40px, 11vw, 60px)", role: "Hero title" },
] as const;

export const spaceTokens = [
  "--space-1", "--space-2", "--space-3", "--space-4", "--space-5",
  "--space-6", "--space-7", "--space-8", "--space-9", "--space-10",
] as const;

export const radiusTokens = [
  { name: "--radius-sm", value: "14px" },
  { name: "--radius-md", value: "22px" },
  { name: "--radius-card", value: "28px" },
  { name: "--radius-pill", value: "999px" },
] as const;
