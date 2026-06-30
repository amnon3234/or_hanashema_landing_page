import "./Map.css";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import {
  CosmicShell,
  CzLink,
  Reveal,
  WhatsAppIcon,
  revealContainer,
  revealItem,
} from "../design3/Cosmic";
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

// ─── Inline icons ────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="cz-check__icon">
      <circle cx="11" cy="11" r="11" fill="currentColor" fillOpacity="0.18" />
      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFeature() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M8 1.5L9.6 6.1H14.5L10.5 8.9L12.1 13.5L8 10.7L3.9 13.5L5.5 8.9L1.5 6.1H6.4L8 1.5Z" fill="currentColor" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className={`map-faq__chevron${open ? " map-faq__chevron--open" : ""}`}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Animated trust number ─────────────────────────────────────────────────

function AnimatedTrustNum({ num, numSmall }: { num: string; numSmall?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion() ?? false;
  const isPure = /^\d+$/.test(num);
  const [displayed, setDisplayed] = useState(isPure ? "0" : num);

  useEffect(() => {
    if (!inView || shouldReduce || !isPure) {
      setDisplayed(num);
      return;
    }
    const target = parseInt(num, 10);
    const duration = 1200;
    const steps = 40;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(String(Math.round(eased * target)));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, shouldReduce, isPure, num]);

  return (
    <span className="map-trust__num" ref={ref}>
      {displayed}
      {numSmall && <span className="map-trust__num-small">{numSmall}</span>}
    </span>
  );
}

// ─── FAQ item ──────────────────────────────────────────────────────────────

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const id = `map-faq-${q.slice(0, 10).replace(/\s/g, "-")}`;
  return (
    <div className="map-faq__item">
      <button className="map-faq__trigger" onClick={onToggle} aria-expanded={isOpen} aria-controls={id}>
        {q}
        <IconChevron open={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="map-faq__answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function Map() {
  const shouldReduce = useReducedMotion() ?? false;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const parts = announcement.split("·");
  const annBold = parts[0]?.trim() ?? "";
  const annRest = parts.slice(1).join("·").trim();

  function handleFaqToggle(i: number) {
    setOpenFaq((prev) => (prev === i ? null : i));
  }

  return (
    <CosmicShell
      header={{ ctaLabel: "לרכישה", ctaHref: "#pricing" }}
      sticky={{ label: CTA_LABEL, href: "#pricing" }}
    >
      {/* 1. Announcement bar */}
      <div className="cz-announce">
        <strong>{annBold}</strong>
        {annRest && <> · {annRest}</>}
      </div>

      {/* 2. Hero */}
      <section className="map-hero" aria-labelledby="map-hero-title">
        <div className="cz-wrap">
          <div className="map-hero__inner">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="cz-eyebrow">{mapHero.eyebrow}</span>
              <h1 className="map-hero__title" id="map-hero-title">
                {mapHero.title} <em>{mapHero.titleEm}</em>
              </h1>
              <p className="map-hero__sub">{mapHero.sub}</p>
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.96 }}
                style={{ display: "inline-flex" }}
              >
                <CzLink href="#pricing" className="cz-btn cz-btn--gold cz-btn--lg">
                  {CTA_LABEL}
                </CzLink>
              </motion.div>
            </motion.div>

            <div className="map-hero__photo-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="map-hero__aura" aria-hidden="true" />
                <motion.div
                  className="map-hero__photo-frame"
                  animate={
                    shouldReduce
                      ? {}
                      : {
                          boxShadow: [
                            "0 8px 32px rgba(0,0,0,0.45), 0 0 40px rgba(124,77,255,0.25)",
                            "0 8px 32px rgba(0,0,0,0.45), 0 0 60px rgba(124,77,255,0.45)",
                            "0 8px 32px rgba(0,0,0,0.45), 0 0 40px rgba(124,77,255,0.25)",
                          ],
                        }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={mapHero.photo} alt={mapHero.photoAlt} className="map-hero__photo" width={380} height={380} loading="eager" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust strip */}
      <section className="map-trust" aria-label="נתוני אמון">
        <div className="cz-wrap">
          <motion.div
            className="map-trust__grid"
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {trust.map((item, i) => (
              <motion.div key={i} className="map-trust__item" variants={revealItem}>
                <AnimatedTrustNum num={item.num} numSmall={item.numSmall} />
                <p className="map-trust__label">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Why + checklist */}
      <section className="cz-section" aria-labelledby="map-why-title">
        <div className="cz-wrap">
          <Reveal>
            <h2 className="cz-h2" id="map-why-title">
              {why.title} <em className="cz-h2-em">{why.titleEm}</em>
            </h2>
            <p className="cz-lede">{why.lede}</p>
          </Reveal>
          <ul className="map-why__list" role="list">
            {why.items.map((item, i) => (
              <Reveal key={i} as="li" className="cz-check">
                <IconCheck />
                <span className="cz-check__text">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Story */}
      <section className="cz-section" aria-labelledby="map-story-title">
        <div className="cz-wrap">
          <Reveal>
            <h2 className="cz-h2" id="map-story-title">
              {story.title} <em className="cz-h2-em">{story.titleEm}</em>
            </h2>
          </Reveal>
          <div className="map-story__body">
            <Reveal>
              <div className="map-story__paragraphs">
                {story.paragraphs.map((p, i) => (
                  <p key={i} className="map-prose">{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <motion.div whileHover={shouldReduce ? {} : { scale: 1.03 }} whileTap={shouldReduce ? {} : { scale: 0.97 }} style={{ display: "inline-flex" }}>
                <CzLink href="#pricing" className="cz-btn cz-btn--ghost">
                  {CTA_LABEL}
                </CzLink>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Pricing */}
      <section className="cz-section" id="pricing" aria-labelledby="map-pricing-title">
        <div className="cz-wrap">
          <div className="map-pricing__header">
            <Reveal>
              <span className="cz-kicker">{pricing.kicker}</span>
              <h2 className="cz-h2" id="map-pricing-title">
                {pricing.title} <em className="cz-h2-em">{pricing.titleEm}</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="map-pricing__lede">{pricing.lede}</p>
            </Reveal>
          </div>

          <div className="map-pricing__grid">
            {tiers.map((tier) => (
              <Reveal key={tier.trackId}>
                <motion.div
                  className={`cz-glass map-tier${tier.featured ? " map-tier--featured" : ""}`}
                  whileHover={
                    shouldReduce
                      ? {}
                      : {
                          scale: 1.03,
                          boxShadow: tier.featured
                            ? "0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(124,77,255,0.55)"
                            : "0 8px 32px rgba(0,0,0,0.5), 0 0 30px rgba(124,77,255,0.3)",
                        }
                  }
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                >
                  {tier.ribbon && (
                    <span className="cz-ribbon" aria-label={`מסלול ${tier.ribbon}`}>
                      {tier.ribbon}
                    </span>
                  )}
                  <h3 className="map-tier__name">{tier.name}</h3>
                  <p className="map-tier__sub">{tier.sub}</p>
                  <div className="map-tier__price">
                    <span className="map-tier__currency">₪</span>
                    <span className="map-tier__amount">{tier.amount}</span>
                  </div>
                  <p className="map-tier__terms">{tier.terms}</p>
                  <hr className="map-tier__divider" />
                  <ul className="map-tier__features" role="list">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="map-tier__feature">
                        <IconFeature />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <CzLink
                    href={tier.payLink}
                    className={`cz-btn cz-btn--block${tier.featured ? " cz-btn--gold" : " cz-btn--primary"}`}
                    aria-label={`רכישת ${tier.name} במחיר ₪${tier.amount}`}
                    data-track-id={tier.trackId}
                    data-track-value={tier.trackValue}
                  >
                    {CTA_LABEL}
                  </CzLink>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="map-pricing__wa">
              <p className="map-pricing__wa-lede">{pricing.waLede}</p>
              <motion.div whileHover={shouldReduce ? {} : { scale: 1.04 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                <CzLink href={WA_LINK} className="cz-btn cz-btn--wa" aria-label={pricing.waLabel}>
                  <WhatsAppIcon />
                  {pricing.waLabel}
                </CzLink>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. midCta */}
      <section className="cz-section map-midcta" aria-labelledby="map-midcta-title">
        <div className="cz-wrap">
          <Reveal>
            <div className="cz-glass map-midcta__inner">
              <h2 className="cz-h2" id="map-midcta-title">
                {midCta.title} <em className="cz-h2-em">{midCta.titleEm}</em>
              </h2>
              <p className="map-midcta__body">{midCta.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Benefits */}
      <section className="cz-section" aria-labelledby="map-benefits-title">
        <div className="cz-wrap">
          <div className="map-benefits__header">
            <Reveal>
              <h2 className="cz-h2" id="map-benefits-title">
                {benefits.title} <em className="cz-h2-em">{benefits.titleEm}</em>
              </h2>
              <p className="cz-lede">{benefits.lede}</p>
            </Reveal>
          </div>
          <div className="map-benefits__grid">
            {benefits.items.map((item) => (
              <Reveal key={item.num}>
                <motion.div
                  className="cz-glass map-benefit"
                  whileHover={shouldReduce ? {} : { scale: 1.03, borderColor: "rgba(124,77,255,0.4)" }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                >
                  <span className="map-benefit__num" aria-hidden="true">{item.num}</span>
                  <div>
                    <h3 className="map-benefit__title">{item.title}</h3>
                    <p className="map-benefit__body">{item.body}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="map-center">
              <motion.div whileHover={shouldReduce ? {} : { scale: 1.04 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                <CzLink href="#pricing" className="cz-btn cz-btn--primary">
                  {CTA_LABEL}
                </CzLink>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. About */}
      <section className="cz-section" aria-labelledby="map-about-title">
        <div className="cz-wrap">
          <Reveal>
            <h2 className="cz-h2" id="map-about-title">
              {aboutAnna.title} <em className="cz-h2-em">{aboutAnna.titleEm}</em>
            </h2>
          </Reveal>
          <div className="map-about__inner">
            <Reveal className="map-about__photo-wrap">
              <img src={aboutAnna.photo} alt={aboutAnna.photoAlt} className="map-about__photo" width={280} height={373} loading="lazy" />
            </Reveal>
            <Reveal>
              <div className="map-about__content">
                <div className="map-about__paragraphs">
                  {aboutAnna.paragraphs.map((p, i) => (
                    <p key={i} className="map-about__p">{p}</p>
                  ))}
                </div>
                <blockquote className="map-about__signature">{aboutAnna.signature}</blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="cz-section" aria-labelledby="map-faq-title">
        <div className="cz-wrap">
          <div className="map-faq__header">
            <Reveal>
              <span className="cz-kicker">{faq.kicker}</span>
              <h2 className="cz-h2" id="map-faq-title">
                {faq.title} <em className="cz-h2-em">{faq.titleEm}</em>
              </h2>
            </Reveal>
          </div>
          <div className="map-faq__list" role="list">
            {faq.items.map((item, i) => (
              <Reveal key={i}>
                <div role="listitem">
                  <FaqItem q={item.q} a={item.a} isOpen={openFaq === i} onToggle={() => handleFaqToggle(i)} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Lead / final CTA */}
      <section className="map-lead" aria-labelledby="map-lead-title">
        <div className="cz-wrap">
          <Reveal>
            <div className="map-lead__inner">
              <h2 className="map-lead__title" id="map-lead-title">
                {lead.title} <em>{lead.titleEm}</em> {lead.titleAfter}
              </h2>
              <p className="map-lead__lede">{lead.lede}</p>
              <div className="map-lead__actions">
                <motion.div whileHover={shouldReduce ? {} : { scale: 1.05 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                  <CzLink href={PAY_LINK} className="cz-btn cz-btn--gold cz-btn--lg" aria-label="לרכישת המפה הנומרולוגית">
                    {CTA_LABEL}
                  </CzLink>
                </motion.div>
                <motion.div whileHover={shouldReduce ? {} : { scale: 1.04 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                  <CzLink href={WA_LINK} className="cz-btn cz-btn--wa" aria-label="פתיחת שיחת וואטסאפ עם אנה">
                    <WhatsAppIcon />
                    וואטסאפ
                  </CzLink>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </CosmicShell>
  );
}
