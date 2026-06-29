import { Composition } from "remotion";
import { BrandIntro } from "./compositions/BrandIntro";
import { brand, hero } from "../data/content";

/** Registers Remotion compositions. Expand here in the next step. */
export function RemotionRoot() {
  return (
    <Composition
      id="BrandIntro"
      component={BrandIntro}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{
        brandName: brand.name,
        logo: brand.logo,
        tagline: hero.titleEm,
      }}
    />
  );
}
