import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
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
} from "../../data/map";
import "./Design9CelestialDawn.css";

/* ── SVG helpers ── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path d="M7 12.5l3.5 3.5L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="8" cy="8" r="3" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.95-1.418A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.078-1.12l-.292-.173-3.035.87.85-3.027-.19-.31A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
    </svg>
  );
}

/* ── Ambient Background ── */

const CONST_STARS = [
  { cx: 8, cy: 10 }, { cx: 20, cy: 6 }, { cx: 35, cy: 14 },
  { cx: 50, cy: 8 }, { cx: 68, cy: 5 }, { cx: 82, cy: 12 },
  { cx: 92, cy: 7 }, { cx: 15, cy: 22 }, { cx: 45, cy: 20 },
  { cx: 72, cy: 18 }, { cx: 88, cy: 25 },
];
const CONST_LINES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [1, 7], [3, 8], [5, 9], [6, 10],
];

function AmbientBackground({ reduced }: { reduced: boolean }) {
  const motes = [
    { cls: "d9-mote d9-mote-1", delay: 0, dur: 8 },
    { cls: "d9-mote d9-mote-2", delay: 2, dur: 11 },
    { cls: "d9-mote d9-mote-3", delay: 4, dur: 9 },
    { cls: "d9-mote d9-mote-4", delay: 6, dur: 13 },
    { cls: "d9-mote d9-mote-5", delay: 3, dur: 10 },
  ];

  if (reduced) {
    return (
      <div className="d9-ambient" aria-hidden="true">
        <div className="d9-sun-halo" />
        <div className="d9-sun-orb" />
        {motes.map((m, i) => <div key={i} className={m.cls} />)}
        <svg className="d9-constellation" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {CONST_LINES.map(([a, b], i) => (
            <line key={i}
              x1={CONST_STARS[a].cx} y1={CONST_STARS[a].cy}
              x2={CONST_STARS[b].cx} y2={CONST_STARS[b].cy}
              stroke="rgba(200,155,78,0.18)" strokeWidth="0.12"
            />
          ))}
          {CONST_STARS.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r="0.4" fill="rgba(200,155,78,0.5)" />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="d9-ambient" aria-hidden="true">
      {/* Breathing halo */}
      <motion.div
        className="d9-sun-halo"
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Sun orb */}
      <motion.div
        className="d9-sun-orb"
        animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Drifting motes */}
      {motes.map((m, i) => (
        <motion.div
          key={i}
          className={m.cls}
          animate={{
            y: [0, -12, 4, -6, 0],
            x: [0, 6, -4, 8, 0],
            opacity: [0.4, 0.8, 0.5, 0.9, 0.4],
          }}
          transition={{
            duration: m.dur,
            delay: m.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Constellation: lines draw in, stars twinkle */}
      <svg className="d9-constellation" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {CONST_LINES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={CONST_STARS[a].cx} y1={CONST_STARS[a].cy}
            x2={CONST_STARS[b].cx} y2={CONST_STARS[b].cy}
            stroke="rgba(200,155,78,0.22)" strokeWidth="0.12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.3 + i * 0.2, ease: "easeOut" }}
          />
        ))}
        {CONST_STARS.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx} cy={s.cy} r="0.45"
            fill="rgba(200,155,78,0.6)"
            animate={{ opacity: [0.3, 1, 0.3], r: [0.35, 0.55, 0.35] }}
            transition={{
              duration: 2 + (i % 4) * 0.7,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Announcement Bar ── */

function AnnouncementBar() {
  const parts = announcement.split("·");
  return (
    <div className="d9-announcement">
      <strong>{parts[0]?.trim()}</strong>
      {parts.slice(1).map((p, i) => <span key={i}> · {p.trim()}</span>)}
    </div>
  );
}

/* ── Sticky Header ── */

function Header() {
  return (
    <header className="d9-header">
      <a href="/" className="d9-header-brand" aria-label="אור הנשמה — עמוד הבית">
        <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d9-header-logo" />
        <div>
          <div className="d9-header-name">אור הנשמה</div>
          <div className="d9-header-sub">אנה אשכנזי</div>
        </div>
      </a>
      <a href="#pricing" className="d9-header-cta">לרכישה</a>
    </header>
  );
}

/* ── Hero Section ── */

function HeroSection({ reduced }: { reduced: boolean }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, reduced ? 0 : -30]);

  return (
    <section className="d9-hero" aria-label="כותרת ראשית">
      <div className="d9-hero-text">
        <motion.span
          className="d9-eyebrow"
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {mapHero.eyebrow}
        </motion.span>
        <motion.h1
          className="d9-hero-title"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {mapHero.title}{" "}
          <span className="d9-hero-title-em">{mapHero.titleEm}</span>
        </motion.h1>
        <motion.p
          className="d9-hero-sub"
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {mapHero.sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="#pricing"
            className="d9-btn-primary"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            {CTA_LABEL}
          </motion.a>
        </motion.div>
      </div>

      <motion.div className="d9-hero-image-wrap" style={{ y }}>
        <motion.div
          className="d9-portrait-frame"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="d9-portrait-halo" aria-hidden="true" />
          <div className="d9-portrait-ring" aria-hidden="true" />
          {!reduced && (
            <motion.div
              className="d9-portrait-ring"
              style={{ inset: -20, opacity: 0.3 }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          )}
          <img
            src={mapHero.photo}
            alt={mapHero.photoAlt}
            className="d9-portrait-img"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Trust Bar ── */

function TrustBar({ reduced }: { reduced: boolean }) {
  return (
    <div className="d9-trust" role="region" aria-label="נתוני אמון">
      <div className="d9-trust-inner">
        {trust.map((item, i) => (
          <motion.div
            key={i}
            className="d9-trust-item"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.12 }}
          >
            <div className="d9-trust-num">
              {item.num}
              {item.numSmall && <span className="d9-trust-num-small">{item.numSmall}</span>}
            </div>
            <div className="d9-trust-label">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Why Section ── */

function WhySection({ reduced }: { reduced: boolean }) {
  return (
    <section className="d9-section" aria-labelledby="d9-why-title">
      <div className="d9-section-inner">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="d9-why-title" className="d9-section-title">
            {why.title} <span className="d9-title-em">{why.titleEm}</span>
          </h2>
          <p className="d9-section-lede">{why.lede}</p>
        </motion.div>
        <div className="d9-why-grid" role="list">
          {why.items.map((item, i) => (
            <motion.div
              key={i}
              className="d9-why-item"
              role="listitem"
              initial={{ opacity: 0, x: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.1 }}
            >
              <CheckIcon className="d9-why-check" />
              <span className="d9-why-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Story Section ── */

function StorySection({ reduced }: { reduced: boolean }) {
  return (
    <section className="d9-section d9-story" aria-labelledby="d9-story-title">
      <div className="d9-section-inner">
        <motion.h2
          id="d9-story-title"
          className="d9-section-title"
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {story.title} <span className="d9-title-em">{story.titleEm}</span>
        </motion.h2>
        <div className="d9-story-content">
          <motion.div
            className="d9-story-paras"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {story.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </motion.div>
          <motion.div
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <motion.a
              href="#pricing"
              className="d9-btn-ghost"
              whileHover={reduced ? {} : { scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {CTA_LABEL}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Pricing Section ── */

function PricingSection({ reduced }: { reduced: boolean }) {
  return (
    <section id="pricing" className="d9-section d9-pricing-section" aria-labelledby="d9-pricing-title">
      <div className="d9-section-inner-wide">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <span className="d9-kicker">{pricing.kicker}</span>
          <h2 id="d9-pricing-title" className="d9-section-title">
            {pricing.title} <span className="d9-title-em">{pricing.titleEm}</span>
          </h2>
          <p className="d9-section-lede" style={{ margin: "0 auto" }}>{pricing.lede}</p>
        </motion.div>

        <div className="d9-tiers">
          {tiers.map((tier, i) => (
            <motion.article
              key={tier.trackId}
              className={`d9-tier-card${tier.featured ? " d9-tier-featured" : ""}`}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.15 }}
              whileHover={reduced ? {} : { y: -4 }}
              aria-label={`חבילה: ${tier.name}`}
            >
              {tier.ribbon && <div className="d9-ribbon">{tier.ribbon}</div>}
              <h3 className="d9-tier-name">{tier.name}</h3>
              <p className="d9-tier-sub">{tier.sub}</p>
              <div className="d9-tier-price">
                <span className="d9-tier-amount">{tier.amount}</span>
                <span className="d9-tier-currency">₪</span>
              </div>
              <div className="d9-tier-terms">{tier.terms}</div>
              <ul className="d9-tier-features" aria-label={`כלול ב${tier.name}`}>
                {tier.features.map((f, fi) => (
                  <li key={fi}>
                    <StarIcon className="d9-feat-icon" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href={tier.payLink}
                className="d9-tier-buy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`רכישת ${tier.name} — ₪${tier.amount}`}
                data-track-id={tier.trackId}
                data-track-value={tier.trackValue}
                whileHover={reduced ? {} : { scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
              >
                {CTA_LABEL}
              </motion.a>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="d9-pricing-wa"
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="d9-pricing-wa-lede">{pricing.waLede}</p>
          <motion.a
            href={WA_LINK}
            className="d9-wa-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={pricing.waLabel}
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            <WhatsAppIcon className="d9-wa-icon" />
            {pricing.waLabel}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── MidCta Section ── */

function MidCtaSection({ reduced }: { reduced: boolean }) {
  return (
    <section className="d9-section d9-midcta-section" aria-labelledby="d9-midcta-title">
      <div className="d9-section-inner" style={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="d9-midcta-title" className="d9-section-title">
            {midCta.title} <span className="d9-title-em">{midCta.titleEm}</span>
          </h2>
          <p className="d9-midcta-body">{midCta.body}</p>
          <motion.a
            href="#pricing"
            className="d9-btn-primary"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            {CTA_LABEL}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Benefits Section ── */

function BenefitsSection({ reduced }: { reduced: boolean }) {
  return (
    <section className="d9-section" aria-labelledby="d9-benefits-title">
      <div className="d9-section-inner-wide">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <h2 id="d9-benefits-title" className="d9-section-title">
            {benefits.title} <span className="d9-title-em">{benefits.titleEm}</span>
          </h2>
          <p className="d9-section-lede" style={{ margin: "0 auto" }}>{benefits.lede}</p>
        </motion.div>
        <div className="d9-benefits-grid">
          {benefits.items.map((item, i) => (
            <motion.article
              key={item.num}
              className="d9-benefit-card"
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.12 }}
              whileHover={reduced ? {} : { y: -4 }}
            >
              <div className="d9-benefit-num" aria-hidden="true">{item.num}</div>
              <h3 className="d9-benefit-title">{item.title}</h3>
              <p className="d9-benefit-body">{item.body}</p>
            </motion.article>
          ))}
        </div>
        <motion.div
          style={{ textAlign: "center", marginTop: "40px" }}
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="#pricing"
            className="d9-btn-ghost"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            {CTA_LABEL}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── About Anna Section ── */

function AboutSection({ reduced }: { reduced: boolean }) {
  return (
    <section className="d9-section d9-about-section" aria-labelledby="d9-about-title">
      <div className="d9-section-inner-wide">
        <div className="d9-about-grid">
          <motion.div
            className="d9-about-photo-wrap"
            initial={{ opacity: 0, x: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            <img
              src={aboutAnna.photo}
              alt={aboutAnna.photoAlt}
              className="d9-about-photo"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <h2 id="d9-about-title" className="d9-section-title">
              {aboutAnna.title} <span className="d9-title-em">{aboutAnna.titleEm}</span>
            </h2>
            <div className="d9-divider" aria-hidden="true" />
            <div className="d9-about-paras">
              {aboutAnna.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <blockquote className="d9-signature">{aboutAnna.signature}</blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Section ── */

function FaqSection({ reduced }: { reduced: boolean }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  function toggle(i: number) {
    setOpenIndex(prev => (prev === i ? -1 : i));
  }

  return (
    <section className="d9-section" aria-labelledby="d9-faq-title">
      <div className="d9-section-inner">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "40px" }}
        >
          <span className="d9-kicker">{faq.kicker}</span>
          <h2 id="d9-faq-title" className="d9-section-title">
            {faq.title} <span className="d9-title-em">{faq.titleEm}</span>
          </h2>
        </motion.div>
        <div className="d9-faq-list" role="list">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            const id = `d9-faq-answer-${i}`;
            const triggerId = `d9-faq-trigger-${i}`;
            return (
              <motion.div
                key={i}
                className="d9-faq-item"
                role="listitem"
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.07 }}
              >
                <button
                  id={triggerId}
                  className="d9-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(i);
                    }
                  }}
                  type="button"
                >
                  <span className="d9-faq-q">{item.q}</span>
                  <ChevronIcon className={`d9-faq-chevron${isOpen ? " d9-open" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.28, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="d9-faq-body">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Final Lead CTA Section ── */

function LeadSection({ reduced }: { reduced: boolean }) {
  return (
    <section className="d9-section d9-lead-section" aria-labelledby="d9-lead-title">
      <div className="d9-section-inner" style={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="d9-lead-title" className="d9-lead-title">
            {lead.title}{" "}
            <span className="d9-lead-title-em">{lead.titleEm}</span>{" "}
            {lead.titleAfter}
          </h2>
          <p className="d9-lead-lede">{lead.lede}</p>
          <div className="d9-lead-actions">
            <motion.a
              href={PAY_LINK}
              className="d9-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${CTA_LABEL} — עמוד תשלום`}
              whileHover={reduced ? {} : { scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {CTA_LABEL}
            </motion.a>
            <motion.a
              href={WA_LINK}
              className="d9-wa-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="פנייה בוואטסאפ"
              whileHover={reduced ? {} : { scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              <WhatsAppIcon className="d9-wa-icon" />
              וואטסאפ
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="d9-footer">
      <nav className="d9-footer-links" aria-label="קישורי ניווט תחתון">
        <a href="/">דף הבית</a>
        <a href="compass.html">קורס מצפן הנשמה</a>
        <a href="shoresh.html">קורס שורש הנשמה</a>
      </nav>
      <p className="d9-footer-copy">© אור הנשמה · אנה אשכנזי</p>
    </footer>
  );
}

/* ── Sticky Mobile CTA ── */

function StickyMobileCta({ visible, reduced }: { visible: boolean; reduced: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="d9-sticky-mobile"
          role="complementary"
          aria-label="כפתור רכישה נייד"
          initial={{ y: reduced ? 0 : 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.a
            href="#pricing"
            className="d9-btn-primary"
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            {CTA_LABEL}
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Root Component ── */

export default function Design9CelestialDawn() {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="d9-root" dir="rtl">
      {/* Scroll progress bar */}
      <motion.div
        className="d9-scroll-bar"
        style={{ scaleX, transformOrigin: "right center" }}
        aria-hidden="true"
      />

      {/* Ambient background */}
      <AmbientBackground reduced={reduced} />

      {/* Page sections */}
      <AnnouncementBar />
      <Header />
      <HeroSection reduced={reduced} />
      <TrustBar reduced={reduced} />
      <WhySection reduced={reduced} />
      <StorySection reduced={reduced} />
      <PricingSection reduced={reduced} />
      <MidCtaSection reduced={reduced} />
      <BenefitsSection reduced={reduced} />
      <AboutSection reduced={reduced} />
      <FaqSection reduced={reduced} />
      <LeadSection reduced={reduced} />
      <Footer />
      <StickyMobileCta visible={true} reduced={reduced} />
    </div>
  );
}
