import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

export type BrandIntroProps = {
  brandName: string;
  logo: string;
  tagline: string;
};

/** Minimal logo + title reveal. Placeholder for the next-step animation work. */
export function BrandIntro({ brandName, logo, tagline }: BrandIntroProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f4f4f3",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Bellefair", serif',
        direction: "rtl",
      }}
    >
      <Img
        src={logo.startsWith("/") ? staticFile(logo.slice(1)) : logo}
        style={{ width: 220, transform: `scale(${logoScale})`, marginBottom: 40 }}
      />
      <div style={{ fontSize: 72, color: "#1f2225", opacity: titleOpacity }}>{brandName}</div>
      <div style={{ fontSize: 34, color: "#6f6f6f", marginTop: 16, opacity: taglineOpacity }}>
        {tagline}
      </div>
    </AbsoluteFill>
  );
}
