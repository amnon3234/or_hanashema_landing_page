import "./MapPage.css";
import {
  Header,
  Footer,
  Announcement,
  StickyCta,
  Faq,
  Button,
  WhatsAppIcon,
  MapSection,
  MapHeading,
  MapHero,
  TrustStrip,
  RecognitionList,
  OriginStory,
  PricingTiers,
  MidCta,
  Benefits,
  AuthorBio,
} from "../components";
import { brand } from "../data/content";
import {
  PAY_LINK,
  WA_LINK,
  CTA_LABEL,
  announcement,
  mapHero,
  trust,
  why,
  story,
  tiers,
  pricing,
  midCta,
  benefits,
  aboutAnna,
  faq,
  lead,
} from "../data/map";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackPurchase(tier: string, value: number) {
  try {
    window.fbq?.("track", "InitiateCheckout", {
      content_name: `Numerology Map · ${tier}`,
      value,
      currency: "ILS",
    });
  } catch {
    /* no-op */
  }
}

/** מפה נומרולוגית כתובה — numerology map sales page. */
export default function MapPage() {
  const annParts = announcement.split("·");

  return (
    <div id="top">
      <Announcement>
        <b>{annParts[0].trim()}</b>
        {annParts[1] ? ` · ${annParts[1].trim()}` : ""}
      </Announcement>

      <Header
        brandName={brand.name}
        logo={brand.logo}
        ctaLabel="לרכישה"
        ctaHref="#pricing"
        brandHref="/"
        roundLogo
      />

      <main>
        <MapHero
          eyebrow={mapHero.eyebrow}
          title={mapHero.title}
          titleEm={mapHero.titleEm}
          sub={mapHero.sub}
          photo={mapHero.photo}
          photoAlt={mapHero.photoAlt}
          ctaLabel={CTA_LABEL}
          ctaHref="#pricing"
        />

        <TrustStrip items={trust} />

        <MapSection id="why">
          <MapHeading title={why.title} titleEm={why.titleEm} lede={why.lede} />
          <RecognitionList items={why.items} />
        </MapSection>

        <MapSection id="story" band>
          <MapHeading title={story.title} titleEm={story.titleEm} />
          <OriginStory paragraphs={story.paragraphs} />
          <Button href="#pricing" variant="ghost" arrow>
            {CTA_LABEL}
          </Button>
        </MapSection>

        <MapSection id="pricing">
          <MapHeading kicker={pricing.kicker} title={pricing.title} titleEm={pricing.titleEm} lede={pricing.lede} />
          <PricingTiers
            tiers={tiers}
            ctaLabel={CTA_LABEL}
            waLede={pricing.waLede}
            waLabel={pricing.waLabel}
            waHref={WA_LINK}
            onPurchase={trackPurchase}
          />
        </MapSection>

        <MapSection id="empty" band>
          <MidCta
            title={midCta.title}
            titleEm={midCta.titleEm}
            body={midCta.body}
            ctaLabel={CTA_LABEL}
            ctaHref="#pricing"
          />
        </MapSection>

        <MapSection id="benefits">
          <MapHeading title={benefits.title} titleEm={benefits.titleEm} lede={benefits.lede} />
          <Benefits items={benefits.items} />
          <div style={{ marginTop: 38 }}>
            <Button href="#pricing" variant="ghost" arrow>
              {CTA_LABEL}
            </Button>
          </div>
        </MapSection>

        <MapSection id="about-anna" band>
          <MapHeading title={aboutAnna.title} titleEm={aboutAnna.titleEm} />
          <AuthorBio
            photo={aboutAnna.photo}
            photoAlt={aboutAnna.photoAlt}
            paragraphs={aboutAnna.paragraphs}
            signature={aboutAnna.signature}
          />
        </MapSection>

        <MapSection id="faq">
          <MapHeading kicker={faq.kicker} title={faq.title} titleEm={faq.titleEm} />
          <Faq items={faq.items} />
        </MapSection>

        <MapSection id="lead" band className="map-lead">
          <MapHeading
            align="center"
            title={lead.title}
            titleEm={lead.titleEm}
            titleAfter={lead.titleAfter}
            lede={lead.lede}
          />
          <div className="map-lead__actions">
            <Button href={PAY_LINK} variant="primary" size="lg" arrow external onClick={() => trackPurchase("lead-final", 0)}>
              {CTA_LABEL}
            </Button>
            <Button href={WA_LINK} variant="whatsapp" external icon={<WhatsAppIcon size={20} />}>
              שאלות? דברי איתי בוואטסאפ
            </Button>
          </div>
        </MapSection>
      </main>

      <Footer
        brandName={brand.name}
        logo={brand.logo}
        tagline={brand.tagline}
        links={[
          { label: "דף הבית", href: "/" },
          { label: "קורס מצפן הנשמה", href: "compass.html" },
          { label: "קורס שורש הנשמה", href: "shoresh.html" },
        ]}
      />

      <StickyCta label={CTA_LABEL} href="#pricing" />
    </div>
  );
}
