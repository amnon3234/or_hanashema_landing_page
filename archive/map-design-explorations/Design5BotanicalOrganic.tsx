import "./Design5BotanicalOrganic.css";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  animate,
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

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg className="d5-check-icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M6.5 11.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`d5-faq-chevron${open ? " d5-faq-chevron-open" : ""}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Botanical SVG decorations ─────────────────────────────────────────────────

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 140" fill="none" aria-hidden="true">
      <path d="M60 130 C60 130 60 40 60 10" stroke="#7c8a63" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 80 C60 80 30 65 18 42 C30 58 55 68 60 80Z" fill="#7c8a63" opacity="0.5" />
      <path d="M60 65 C60 65 88 50 102 28 C90 44 64 54 60 65Z" fill="#7c8a63" opacity="0.45" />
      <path d="M60 48 C60 48 35 36 26 18 C36 30 57 40 60 48Z" fill="#7c8a63" opacity="0.35" />
      <path d="M60 96 C60 96 82 86 95 70 C84 80 62 88 60 96Z" fill="#7c8a63" opacity="0.3" />
    </svg>
  );
}

function VineDivider() {
  return (
    <div className="d5-vine-divider" aria-hidden="true">
      <svg viewBox="0 0 800 40" preserveAspectRatio="xMidYMid meet">
        <path
          d="M0 20 C80 8, 160 32, 240 20 C320 8, 400 32, 480 20 C560 8, 640 32, 720 20 C760 14, 780 20, 800 20"
          stroke="#7c8a63"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="240" cy="20" r="3" fill="#7c8a63" />
        <circle cx="480" cy="20" r="3" fill="#7c8a63" />
        <circle cx="720" cy="20" r="3" fill="#7c8a63" />
      </svg>
    </div>
  );
}

// ── Animated botanical path (draws in on scroll) ──────────────────────────────

function AnimatedLeafPath({ reduced }: { reduced: boolean | null }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" aria-hidden="true">
      <motion.path
        d="M60 130 C60 130 60 40 60 10"
        stroke="#7c8a63"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 1.4, ease: "easeInOut" }}
        viewport={{ once: true, margin: "-40px" }}
      />
      <motion.path
        d="M60 80 C60 80 30 65 18 42 C30 58 55 68 60 80Z"
        fill="#7c8a63"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.6 }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M60 65 C60 65 88 50 102 28 C90 44 64 54 60 65Z"
        fill="#7c8a63"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.45 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.8 }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M60 48 C60 48 35 36 26 18 C36 30 57 40 60 48Z"
        fill="#7c8a63"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 1.0 }}
        viewport={{ once: true }}
      />
      <motion.path
        d="M60 96 C60 96 82 86 95 70 C84 80 62 88 60 96Z"
        fill="#7c8a63"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 1.2 }}
        viewport={{ once: true }}
      />
    </svg>
  );
}

// ── Ambient morphing blobs ────────────────────────────────────────────────────

function AmbientBlobs({ reduced }: { reduced: boolean | null }) {
  if (reduced) {
    return (
      <div className="d5-blobs" aria-hidden="true">
        <div className="d5-blob d5-blob-a" />
        <div className="d5-blob d5-blob-b" />
        <div className="d5-blob d5-blob-c" />
      </div>
    );
  }
  return (
    <div className="d5-blobs" aria-hidden="true">
      <motion.div
        className="d5-blob d5-blob-a"
        animate={{
          borderRadius: [
            "40% 60% 55% 45% / 50% 40% 60% 50%",
            "55% 45% 40% 60% / 45% 60% 40% 55%",
            "40% 60% 55% 45% / 50% 40% 60% 50%",
          ],
          scale: [1, 1.06, 1],
          x: [0, 12, 0],
          y: [0, 8, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="d5-blob d5-blob-b"
        animate={{
          borderRadius: [
            "55% 45% 40% 60% / 60% 50% 40% 45%",
            "40% 60% 55% 45% / 45% 55% 60% 40%",
            "55% 45% 40% 60% / 60% 50% 40% 45%",
          ],
          scale: [1, 0.94, 1],
          x: [0, -10, 0],
          y: [0, 14, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="d5-blob d5-blob-c"
        animate={{
          borderRadius: [
            "45% 55% 60% 40% / 55% 45% 50% 50%",
            "60% 40% 45% 55% / 40% 60% 45% 55%",
            "45% 55% 60% 40% / 55% 45% 50% 50%",
          ],
          scale: [1, 1.04, 1],
          x: [0, 8, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />
    </div>
  );
}

// ── Motion variants ───────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

const cardHover = { y: -5, boxShadow: "0 12px 40px rgba(44,48,35,0.11)", transition: { duration: 0.22 } };
const cardTap = { scale: 0.98 };
const btnHover = { scale: 1.03, transition: { duration: 0.14 } };
const btnTap = { scale: 0.97 };

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: string, inView: boolean, reduced: boolean | null) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const isNumeric = /^\d+$/.test(target);

  useEffect(() => {
    if (!inView || !isNumeric) { setDisplay(target); return; }
    if (reduced) { setDisplay(target); return; }
    const ctrl = animate(motionVal, parseInt(target, 10), {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => ctrl.stop();
  }, [inView, reduced, target, isNumeric, motionVal]);

  return display;
}

// ── Trust stat cell ───────────────────────────────────────────────────────────

function TrustStat({ num, numSmall, label, inView }: { num: string; numSmall?: string; label: string; inView: boolean }) {
  const reduced = useReducedMotion();
  const display = useCountUp(num, inView, reduced);
  const isRaw = !/^\d+$/.test(num);

  return (
    <div className="d5-trust-item">
      <div className="d5-trust-num">
        {isRaw ? num : display}
        {numSmall && <span className="d5-trust-num-small">{numSmall}</span>}
      </div>
      <div className="d5-trust-label">{label}</div>
    </div>
  );
}

// ── Scroll progress bar ───────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      className="d5-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

// ── Announcement bar ──────────────────────────────────────────────────────────

function AnnouncementBar() {
  const parts = announcement.split("·");
  return (
    <div className="d5-ann" role="banner">
      <span className="d5-ann-bold">{parts[0].trim()}</span>
      {parts.length > 1 && <> · {parts.slice(1).join("·").trim()}</>}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="d5-header">
      <a href="/" className="d5-header-brand" aria-label="חזור לדף הבית">
        <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d5-header-logo" />
        <span className="d5-header-name">אור הנשמה</span>
      </a>
      <motion.a
        href="#pricing"
        className="d5-btn d5-btn-sage d5-btn-sm"
        whileHover={btnHover}
        whileTap={btnTap}
        aria-label="עבור לרכישה"
      >
        לרכישה
      </motion.a>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const reduced = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: portraitRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 36]);

  return (
    <section className="d5-hero-section" aria-label="כותרת ראשית">
      <motion.div
        className="d5-hero-inner"
        variants={stagger(0.09)}
        initial="hidden"
        animate="show"
      >
        <motion.div className="d5-hero-text" variants={fadeUp}>
          <p className="d5-eyebrow">{mapHero.eyebrow}</p>
          <h1 className="d5-hero-heading">
            {mapHero.title}{" "}
            <em>{mapHero.titleEm}</em>
          </h1>
          <p className="d5-hero-sub">{mapHero.sub}</p>
          <div className="d5-hero-actions">
            <motion.a
              href="#pricing"
              className="d5-btn d5-btn-primary"
              whileHover={btnHover}
              whileTap={btnTap}
              aria-label={CTA_LABEL}
            >
              {CTA_LABEL}
            </motion.a>
          </div>
        </motion.div>

        <motion.div className="d5-hero-portrait-wrap" variants={fadeUp} ref={portraitRef}>
          <div className="d5-hero-portrait-mask">
            <motion.img
              src={mapHero.photo}
              alt={mapHero.photoAlt}
              style={{ y: portraitY }}
            />
          </div>
          <LeafSprig className="d5-hero-leaf" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Trust strip ───────────────────────────────────────────────────────────────

function TrustStrip() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="d5-trust-section" aria-label="נתוני אמון">
      <motion.div
        className="d5-trust-grid"
        ref={ref}
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {trust.map((item, i) => (
          <motion.div key={i} variants={fadeUp}>
            <TrustStat num={item.num} numSmall={item.numSmall} label={item.label} inView={inView} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ── Why section ───────────────────────────────────────────────────────────────

function WhySection() {
  const reduced = useReducedMotion();
  return (
    <section className="d5-why-section d5-section" aria-label="למה מפה נומרולוגית">
      <div className="d5-why-inner">
        <motion.div
          className="d5-why-text"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.09)}
        >
          <motion.p className="d5-eyebrow" variants={fadeUp}>זה בשבילך אם</motion.p>
          <motion.h2 className="d5-heading" variants={fadeUp}>
            {why.title} <em>{why.titleEm}</em>
          </motion.h2>
          <motion.p className="d5-lede" variants={fadeUp}>{why.lede}</motion.p>
        </motion.div>

        <motion.div
          className="d5-why-items"
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {why.items.map((item, i) => (
            <motion.div
              key={i}
              className="d5-why-item"
              variants={fadeUp}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              <IconCheck />
              <span className="d5-why-item-text">{item}</span>
            </motion.div>
          ))}
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "flex-start" }}>
            <AnimatedLeafPath reduced={reduced} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Story section ─────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <section className="d5-story-section" aria-label="הסיפור של אנה">
      <LeafSprig className="d5-story-leaf-bg" aria-hidden="true" />
      <motion.div
        className="d5-story-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
      >
        <motion.div className="d5-story-head" variants={fadeUp}>
          <p className="d5-eyebrow">הסיפור שלי</p>
          <h2 className="d5-heading">
            {story.title} <em>{story.titleEm}</em>
          </h2>
        </motion.div>
        {story.paragraphs.map((p, i) => (
          <motion.p key={i} className="d5-story-para" variants={fadeUp}>{p}</motion.p>
        ))}
        <motion.div className="d5-story-cta" variants={fadeUp}>
          <motion.a
            href="#pricing"
            className="d5-btn d5-btn-ghost"
            whileHover={btnHover}
            whileTap={btnTap}
          >
            {CTA_LABEL}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section className="d5-pricing-section d5-section" id="pricing" aria-label="מסלולים ומחירים">
      <div className="d5-pricing-inner">
        <div className="d5-pricing-head">
          <p className="d5-eyebrow">{pricing.kicker}</p>
          <h2 className="d5-heading">
            {pricing.title} <em>{pricing.titleEm}</em>
          </h2>
          <p className="d5-pricing-lede">{pricing.lede}</p>
        </div>

        <motion.div
          className="d5-tiers"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`d5-tier-card${tier.featured ? " d5-tier-card-featured" : ""}`}
              variants={fadeUp}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              {tier.ribbon && <span className="d5-ribbon">{tier.ribbon}</span>}
              <div>
                <div className="d5-tier-name">{tier.name}</div>
                <div className="d5-tier-sub">{tier.sub}</div>
              </div>
              <div className="d5-tier-price">
                <span className="d5-tier-currency">₪</span>
                <span className="d5-tier-amount">{tier.amount}</span>
                <span className="d5-tier-terms">{tier.terms}</span>
              </div>
              <ul className="d5-tier-features" aria-label={`תכולת ${tier.name}`}>
                {tier.features.map((f, fi) => (
                  <li key={fi} className="d5-tier-feature">
                    <span className="d5-tier-feature-dot" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href={tier.payLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`d5-btn${tier.featured ? " d5-btn-primary" : " d5-btn-outline"}`}
                whileHover={btnHover}
                whileTap={btnTap}
                aria-label={`רכשי את ${tier.name} ב-₪${tier.amount}`}
                data-track-id={tier.trackId}
                data-track-value={tier.trackValue}
              >
                {CTA_LABEL}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <div className="d5-pricing-wa">
          <p className="d5-pricing-wa-lede">{pricing.waLede}</p>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="d5-btn d5-btn-wa"
            whileHover={btnHover}
            whileTap={btnTap}
            aria-label={pricing.waLabel}
          >
            <IconWhatsApp />
            {pricing.waLabel}
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// ── Mid CTA ───────────────────────────────────────────────────────────────────

function MidCta() {
  return (
    <section className="d5-midcta-section" aria-label="חשיבה על השינוי">
      <LeafSprig className="d5-midcta-leaf" aria-hidden="true" />
      <motion.div
        className="d5-midcta-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
      >
        <motion.h2 className="d5-heading" variants={fadeUp}>
          {midCta.title} <em>{midCta.titleEm}</em>
        </motion.h2>
        <motion.p className="d5-midcta-body" variants={fadeUp}>{midCta.body}</motion.p>
      </motion.div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────

function BenefitsSection() {
  return (
    <section className="d5-benefits-section d5-section" aria-label="יתרונות המפה">
      <div className="d5-benefits-inner">
        <div className="d5-benefits-head">
          <h2 className="d5-heading">
            {benefits.title} <em>{benefits.titleEm}</em>
          </h2>
          <p className="d5-benefits-lede">{benefits.lede}</p>
        </div>

        <motion.div
          className="d5-benefits-grid"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {benefits.items.map((item, i) => (
            <motion.div
              key={i}
              className="d5-benefit-card"
              variants={fadeUp}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              <div className="d5-benefit-num" aria-hidden="true">{item.num}</div>
              <div className="d5-benefit-title">{item.title}</div>
              <p className="d5-benefit-body">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="d5-benefits-cta">
          <motion.a
            href="#pricing"
            className="d5-btn d5-btn-outline"
            whileHover={btnHover}
            whileTap={btnTap}
          >
            {CTA_LABEL}
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// ── About Anna ────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="d5-about-section" aria-label="אודות אנה אשכנזי">
      <div className="d5-about-inner d5-inner">
        <motion.div
          className="d5-about-photo-wrap"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="d5-about-photo-mask">
            <img src={aboutAnna.photo} alt={aboutAnna.photoAlt} />
          </div>
          <LeafSprig className="d5-about-leaf" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="d5-about-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.09)}
        >
          <motion.h2 className="d5-heading" variants={fadeUp}>
            {aboutAnna.title} <em>{aboutAnna.titleEm}</em>
          </motion.h2>
          {aboutAnna.paragraphs.map((p, i) => (
            <motion.p key={i} className="d5-about-para" variants={fadeUp}>{p}</motion.p>
          ))}
          <motion.blockquote className="d5-signature" variants={fadeUp}>
            {aboutAnna.signature}
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  function handleKey(e: React.KeyboardEvent, i: number) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); }
  }

  return (
    <section className="d5-faq-section d5-section" aria-label="שאלות נפוצות">
      <div className="d5-faq-inner">
        <div className="d5-faq-head">
          <p className="d5-eyebrow">{faq.kicker}</p>
          <h2 className="d5-heading">
            {faq.title} <em>{faq.titleEm}</em>
          </h2>
        </div>

        <motion.div
          className="d5-faq-list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.06)}
          role="list"
        >
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `d5-faq-answer-${i}`;
            return (
              <motion.div key={i} className="d5-faq-item" variants={fadeUp} role="listitem">
                <button
                  className="d5-faq-trigger"
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => handleKey(e, i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  {item.q}
                  <IconChevron open={isOpen} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      className="d5-faq-body"
                      role="region"
                      aria-label={item.q}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.22, ease: "easeIn" } }}
                      style={{ overflow: "hidden" }}
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── Lead / Final CTA ──────────────────────────────────────────────────────────

function LeadSection() {
  return (
    <section className="d5-lead-section" aria-label="קריאה לפעולה סופית">
      <LeafSprig className="d5-lead-leaf" aria-hidden="true" />
      <motion.div
        className="d5-lead-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger(0.1)}
      >
        <motion.h2 className="d5-heading" variants={fadeUp}>
          {lead.title} <em>{lead.titleEm}</em> {lead.titleAfter}
        </motion.h2>
        <motion.p className="d5-lead-lede" variants={fadeUp}>{lead.lede}</motion.p>
        <motion.div className="d5-lead-buttons" variants={fadeUp}>
          <motion.a
            href={PAY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="d5-btn d5-btn-primary"
            whileHover={btnHover}
            whileTap={btnTap}
            aria-label={CTA_LABEL}
          >
            {CTA_LABEL}
          </motion.a>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="d5-btn d5-btn-wa"
            whileHover={btnHover}
            whileTap={btnTap}
            aria-label="פתחי שיחה בוואטסאפ"
          >
            <IconWhatsApp />
            וואטסאפ
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="d5-footer">
      <a href="/" className="d5-footer-brand" aria-label="חזור לדף הבית">
        <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d5-footer-logo" />
        <span className="d5-footer-name">אור הנשמה</span>
      </a>
      <nav className="d5-footer-links" aria-label="קישורי ניווט">
        <a href="/" className="d5-footer-link">דף הבית</a>
        <a href="compass.html" className="d5-footer-link">קורס מצפן הנשמה</a>
        <a href="shoresh.html" className="d5-footer-link">קורס שורש הנשמה</a>
      </nav>
      <p className="d5-footer-copy">© {new Date().getFullYear()} אור הנשמה · אנה אשכנזי</p>
    </footer>
  );
}

// ── Sticky mobile bar ─────────────────────────────────────────────────────────

function StickyMobileBar({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="d5-mobile-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ y: 80, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
          aria-hidden="true"
        >
          <a href="#pricing" className="d5-btn d5-btn-primary" tabIndex={-1}>
            {CTA_LABEL}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function Design5BotanicalOrganic() {
  const reduced = useReducedMotion();
  const [barVisible, setBarVisible] = useState(false);
  const heroSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroSentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setBarVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="d5-root">
      <ScrollProgressBar />
      <AmbientBlobs reduced={reduced} />
      <AnnouncementBar />
      <Header />
      <main>
        <div ref={heroSentinelRef}>
          <Hero />
        </div>
        <VineDivider />
        <TrustStrip />
        <WhySection />
        <VineDivider />
        <StorySection />
        <PricingSection />
        <MidCta />
        <BenefitsSection />
        <AboutSection />
        <FaqSection />
        <LeadSection />
      </main>
      <Footer />
      <StickyMobileBar visible={barVisible} />
    </div>
  );
}
