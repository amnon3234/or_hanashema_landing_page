import type { Meta, StoryObj } from "@storybook/react";
import { colorTokens, typeTokens, radiusTokens, spaceTokens } from "../design-system/tokens";

const meta: Meta = {
  title: "Design System/Tokens",
  parameters: { layout: "fullscreen", controls: { disable: true } },
};
export default meta;

const wrap: React.CSSProperties = {
  padding: 32,
  fontFamily: "var(--font-sans)",
  color: "var(--color-text)",
  direction: "rtl",
};
const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: 16,
};

export const Colors: StoryObj = {
  render: () => (
    <div style={wrap}>
      <h2 style={{ fontFamily: "var(--font-serif)" }}>צבעים · Colors (placeholder neutral)</h2>
      <div style={grid}>
        {colorTokens.map((t) => (
          <div key={t.name} style={{ border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ height: 64, background: `var(${t.name})` }} />
            <div style={{ padding: "10px 12px", fontSize: 12 }}>
              <strong>{t.role}</strong>
              <div style={{ color: "var(--color-muted)" }}>{t.name}</div>
              <div style={{ color: "var(--color-muted)" }}>{t.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div style={wrap}>
      <h2 style={{ fontFamily: "var(--font-serif)" }}>טיפוגרפיה · Typography</h2>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: 48 }}>שיטת המגן · Bellefair</p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 18 }}>
        קורסי עומק לנשים — Assistant body text 17px
      </p>
      <ul style={{ color: "var(--color-muted)", fontSize: 14 }}>
        {typeTokens.map((t) => (
          <li key={t.name}>
            <code>{t.name}</code> — {t.role} ({t.value})
          </li>
        ))}
      </ul>
    </div>
  ),
};

export const Radius: StoryObj = {
  render: () => (
    <div style={wrap}>
      <h2 style={{ fontFamily: "var(--font-serif)" }}>פינות · Radius</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {radiusTokens.map((t) => (
          <div key={t.name} style={{ textAlign: "center", fontSize: 12 }}>
            <div
              style={{
                width: 96,
                height: 96,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: `var(${t.name})`,
                boxShadow: "var(--shadow-soft)",
              }}
            />
            <div style={{ marginTop: 8 }}>{t.name}</div>
            <div style={{ color: "var(--color-muted)" }}>{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Spacing: StoryObj = {
  render: () => (
    <div style={wrap}>
      <h2 style={{ fontFamily: "var(--font-serif)" }}>מרווחים · Spacing</h2>
      {spaceTokens.map((name) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <code style={{ width: 110, fontSize: 12 }}>{name}</code>
          <div style={{ height: 16, width: `var(${name})`, background: "var(--color-accent)" }} />
        </div>
      ))}
    </div>
  ),
};
