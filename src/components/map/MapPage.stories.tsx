import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../Container/Container";
import { MapHero } from "./MapHero";
import { TrustStrip } from "./TrustStrip";
import { RecognitionList } from "./RecognitionList";
import { OriginStory } from "./OriginStory";
import { PricingTiers } from "./PricingTiers";
import { Benefits } from "./Benefits";
import { AuthorBio } from "./AuthorBio";
import { MidCta } from "./MidCta";
import {
  mapHero,
  trust,
  why,
  story,
  tiers,
  pricing,
  benefits,
  aboutAnna,
  midCta,
  CTA_LABEL,
  WA_LINK,
} from "../../data/map";

const meta: Meta = {
  title: "Map/Sections",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Hero: Story = {
  render: () => (
    <MapHero
      eyebrow={mapHero.eyebrow}
      title={mapHero.title}
      titleEm={mapHero.titleEm}
      sub={mapHero.sub}
      photo={mapHero.photo}
      photoAlt={mapHero.photoAlt}
      ctaLabel={CTA_LABEL}
      ctaHref="#"
    />
  ),
};

export const Trust: Story = { render: () => <TrustStrip items={trust} /> };

export const Recognition: Story = {
  render: () => (
    <Container width="page" style={{ padding: "40px 22px" }}>
      <RecognitionList items={why.items} />
    </Container>
  ),
};

export const Story_: Story = {
  name: "Origin Story",
  render: () => (
    <Container width="page" style={{ padding: "40px 22px" }}>
      <OriginStory paragraphs={story.paragraphs} />
    </Container>
  ),
};

export const Pricing: Story = {
  render: () => (
    <Container width="page" style={{ padding: "40px 22px" }}>
      <PricingTiers
        tiers={tiers}
        ctaLabel={CTA_LABEL}
        waLede={pricing.waLede}
        waLabel={pricing.waLabel}
        waHref={WA_LINK}
      />
    </Container>
  ),
};

export const BenefitsList: Story = {
  render: () => (
    <Container width="page" style={{ padding: "40px 22px" }}>
      <Benefits items={benefits.items} />
    </Container>
  ),
};

export const Bio: Story = {
  render: () => (
    <Container width="page" style={{ padding: "40px 22px" }}>
      <AuthorBio
        photo={aboutAnna.photo}
        photoAlt={aboutAnna.photoAlt}
        paragraphs={aboutAnna.paragraphs}
        signature={aboutAnna.signature}
      />
    </Container>
  ),
};

export const Reassurance: Story = {
  render: () => (
    <Container width="page" style={{ padding: "40px 22px" }}>
      <MidCta title={midCta.title} titleEm={midCta.titleEm} body={midCta.body} ctaLabel={CTA_LABEL} ctaHref="#" />
    </Container>
  ),
};
