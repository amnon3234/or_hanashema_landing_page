import "./Design4ModernBento.css";
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

// ── Small SVG icons ──────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg className="d4-check-icon" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="currentColor" opacity="0.15" />
      <path d="M6 11.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      className={`d4-faq-chevron${open ? " d4-faq-chevron-open" : ""}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Framer Motion variants ───────────────────────────────────────────────────

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = (stagger = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const cardHover = {
  y: -4,
  scale: 1.015,
  boxShadow: "0 12px 36px rgba(28,26,23,0.13)",
  transition: { duration: 0.2 },
};

const cardTap = { scale: 0.98 };

const btnHover = { scale: 1.03, transition: { duration: 0.15 } };
const btnTap = { scale: 0.97 };

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: string, inView: boolean, reduced: boolean | null) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const isNumeric = /^\d+$/.test(target);

  useEffect(() => {
    if (!inView || !isNumeric) {
      setDisplay(target);
      return;
    }
    if (reduced) {
      setDisplay(target);
      return;
    }
    const numTarget = parseInt(target, 10);
    const ctrl = animate(motionVal, numTarget, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => ctrl.stop();
  }, [inView, reduced, target, isNumeric, motionVal]);

  return display;
}

// ── Trust stat ────────────────────────────────────────────────────────────────

function TrustStat({ num, numSmall, label, inView }: { num: string; numSmall?: string; label: string; inView: boolean }) {
  const reduced = useReducedMotion();
  const display = useCountUp(num, inView, reduced);
  const showRaw = !(/^\d+$/.test(num));

  return (
    <>
      <div className="d4-trust-num">
        {showRaw ? num : display}
        {numSmall && <span className="d4-trust-num-small">{numSmall}</span>}
      </div>
      <div className="d4-trust-label">{label}</div>
    </>
  );
}

// ── Hero stat (count-up inside a bento cell) ──────────────────────────────────

function HeroStat({ num, numSmall, label, inView }: { num: string; numSmall?: string; label: string; inView: boolean }) {
  const reduced = useReducedMotion();
  const display = useCountUp(num, inView, reduced);
  const showRaw = !(/^\d+$/.test(num));

  return (
    <>
      <div className="d4-cell-stat-num">
        {showRaw ? num : display}
        {numSmall && <span className="d4-cell-stat-small">{numSmall}</span>}
      </div>
      <div className="d4-cell-stat-label">{label}</div>
    </>
  );
}

// ── Announcement bar ──────────────────────────────────────────────────────────

function AnnouncementBar() {
  const parts = announcement.split("·");
  return (
    <div className="d4-ann" role="banner">
      <span className="d4-ann-bold">{parts[0].trim()}</span>
      {parts.length > 1 && <> · {parts.slice(1).join("·").trim()}</>}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="d4-header">
      <a href="/" className="d4-header-brand" aria-label="חזור לדף הבית">
        <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d4-header-logo" />
        <span className="d4-header-name">אור הנשמה</span>
      </a>
      <motion.a
        href="#pricing"
        className="d4-btn d4-btn-primary d4-btn-sm"
        whileHover={btnHover}
        whileTap={btnTap}
        aria-label="עבור לרכישה"
      >
        לרכישה
      </motion.a>
    </header>
  );
}

// ── Hero (bento) ──────────────────────────────────────────────────────────────

function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [statInView, setStatInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]);

  // Observe the stat cell for count-up
  const statRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const heroContainerVariants = staggerContainer(0.08);

  return (
    <section className="d4-hero-section" ref={heroRef} aria-label="כותרת ראשית">
      <motion.div
        className="d4-hero-grid"
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Headline cell */}
        <motion.div className="d4-cell d4-cell-headline" variants={fadeUpVariants}>
          <p className="d4-kicker">{mapHero.eyebrow}</p>
          <h1 className="d4-heading">
            {mapHero.title}{" "}
            <em>{mapHero.titleEm}</em>
          </h1>
          <p className="d4-lede">{mapHero.sub}</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <motion.a
              href={PAY_LINK}
              className="d4-btn d4-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={btnHover}
              whileTap={btnTap}
              aria-label={CTA_LABEL}
            >
              {CTA_LABEL}
            </motion.a>
          </div>
        </motion.div>

        {/* Portrait cell */}
        <motion.div className="d4-cell d4-cell-portrait" variants={fadeUpVariants} style={{ overflow: "hidden" }}>
          <motion.img
            src={mapHero.photo}
            alt={mapHero.photoAlt}
            style={{ y: portraitY, height: "100%", width: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
        </motion.div>

        {/* Stat cell — first trust item */}
        <motion.div
          className="d4-cell d4-cell-stat"
          variants={fadeUpVariants}
          ref={statRef}
          whileHover={cardHover}
          whileTap={cardTap}
        >
          <HeroStat
            num={trust[0].num}
            numSmall={trust[0].numSmall}
            label={trust[0].label}
            inView={statInView}
          />
        </motion.div>

        {/* CTA cell */}
        <motion.div className="d4-cell d4-cell-cta" variants={fadeUpVariants}>
          <motion.a
            href="#pricing"
            className="d4-btn d4-btn-outline"
            whileHover={btnHover}
            whileTap={btnTap}
            aria-label="ראי את המסלולים"
          >
            ראי את המסלולים
          </motion.a>
          <span className="d4-cell-cta-hint">ללא התחייבות · שלוש דקות מספיקות</span>
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
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="d4-trust-section" aria-label="נתוני אמון">
      <motion.div
        className="d4-trust-grid"
        ref={ref}
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {trust.map((item, i) => (
          <motion.div
            key={i}
            className="d4-trust-card"
            variants={fadeUpVariants}
            whileHover={cardHover}
            whileTap={cardTap}
          >
            <TrustStat
              num={item.num}
              numSmall={item.numSmall}
              label={item.label}
              inView={inView}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ── Why / Recognition ─────────────────────────────────────────────────────────

function WhySection() {
  return (
    <section className="d4-why-section" aria-label="למה מפה נומרולוגית">
      <div className="d4-why-inner">
        <div className="d4-why-left">
          <p className="d4-kicker">זה בשבילך אם</p>
          <h2 className="d4-heading">
            {why.title} <em>{why.titleEm}</em>
          </h2>
          <p className="d4-lede" style={{ marginTop: "16px" }}>{why.lede}</p>
        </div>

        <motion.div
          className="d4-why-grid"
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {why.items.map((item, i) => (
            <motion.div
              key={i}
              className="d4-why-card"
              variants={fadeUpVariants}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              <IconCheck />
              <span className="d4-why-card-text">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Story ─────────────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <section className="d4-story-section" aria-label="הסיפור של אנה">
      <motion.div
        className="d4-story-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
      >
        <motion.h2 className="d4-heading" variants={fadeUpVariants}>
          {story.title} <em>{story.titleEm}</em>
        </motion.h2>
        <div className="d4-story-paras">
          {story.paragraphs.map((p, i) => (
            <motion.p key={i} className="d4-story-para" variants={fadeUpVariants}>{p}</motion.p>
          ))}
        </div>
        <motion.div className="d4-story-cta" variants={fadeUpVariants}>
          <motion.a
            href="#pricing"
            className="d4-btn d4-btn-ghost"
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
    <section className="d4-pricing-section" id="pricing" aria-label="מסלולים ומחירים">
      <div className="d4-pricing-inner">
        <div className="d4-pricing-head">
          <p className="d4-kicker">{pricing.kicker}</p>
          <h2 className="d4-heading">
            {pricing.title} <em>{pricing.titleEm}</em>
          </h2>
          <p className="d4-pricing-lede">{pricing.lede}</p>
        </div>

        <motion.div
          className="d4-tiers"
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`d4-tier-card${tier.featured ? " d4-tier-card-featured" : ""}`}
              variants={fadeUpVariants}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              {tier.ribbon && <span className="d4-ribbon">{tier.ribbon}</span>}
              <div>
                <div className="d4-tier-name">{tier.name}</div>
                <div className="d4-tier-sub">{tier.sub}</div>
              </div>
              <div className="d4-tier-price">
                <span className="d4-tier-currency">₪</span>
                <span className="d4-tier-amount">{tier.amount}</span>
                <span className="d4-tier-terms">{tier.terms}</span>
              </div>
              <ul className="d4-tier-features" aria-label={`תכולת ${tier.name}`}>
                {tier.features.map((f, fi) => (
                  <li key={fi} className="d4-tier-feature">
                    <span className="d4-tier-feature-dot" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href={tier.payLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`d4-btn${tier.featured ? " d4-btn-primary" : " d4-btn-outline"}`}
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

        <div className="d4-pricing-wa">
          <p className="d4-pricing-wa-lede">{pricing.waLede}</p>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="d4-btn d4-btn-wa"
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
    <section className="d4-midcta-section" aria-label="חשיבה על השינוי">
      <motion.div
        className="d4-midcta-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
      >
        <motion.h2 className="d4-heading" variants={fadeUpVariants}>
          {midCta.title} <em>{midCta.titleEm}</em>
        </motion.h2>
        <motion.p className="d4-midcta-body" variants={fadeUpVariants}>{midCta.body}</motion.p>
      </motion.div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────

function BenefitsSection() {
  return (
    <section className="d4-benefits-section" aria-label="יתרונות המפה">
      <div className="d4-benefits-inner">
        <div className="d4-benefits-head">
          <h2 className="d4-heading">
            {benefits.title} <em>{benefits.titleEm}</em>
          </h2>
          <p className="d4-benefits-lede">{benefits.lede}</p>
        </div>

        <motion.div
          className="d4-benefits-grid"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {benefits.items.map((item, i) => (
            <motion.div
              key={i}
              className="d4-benefit-card"
              variants={fadeUpVariants}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              <div className="d4-benefit-num" aria-hidden="true">{item.num}</div>
              <div className="d4-benefit-title">{item.title}</div>
              <p className="d4-benefit-body">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── About Anna ────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="d4-about-section" aria-label="אודות אנה אשכנזי">
      <motion.div
        className="d4-about-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
      >
        <motion.div className="d4-about-photo-wrap" variants={fadeUpVariants}>
          <img src={aboutAnna.photo} alt={aboutAnna.photoAlt} />
        </motion.div>
        <div className="d4-about-content">
          <motion.h2 className="d4-heading" variants={fadeUpVariants}>
            {aboutAnna.title} <em>{aboutAnna.titleEm}</em>
          </motion.h2>
          <div className="d4-about-paras">
            {aboutAnna.paragraphs.map((p, i) => (
              <motion.p key={i} className="d4-about-para" variants={fadeUpVariants}>{p}</motion.p>
            ))}
          </div>
          <motion.blockquote className="d4-signature" variants={fadeUpVariants}>
            {aboutAnna.signature}
          </motion.blockquote>
        </div>
      </motion.div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section className="d4-faq-section" aria-label="שאלות נפוצות">
      <div className="d4-faq-inner">
        <div className="d4-faq-head">
          <p className="d4-kicker">{faq.kicker}</p>
          <h2 className="d4-heading">
            {faq.title} <em>{faq.titleEm}</em>
          </h2>
        </div>

        <motion.div
          className="d4-faq-list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer(0.06)}
          role="list"
        >
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `d4-faq-answer-${i}`;
            return (
              <motion.div
                key={i}
                className="d4-faq-item"
                variants={fadeUpVariants}
                role="listitem"
              >
                <button
                  className="d4-faq-trigger"
                  onClick={() => toggle(i)}
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
                      className="d4-faq-body"
                      role="region"
                      aria-label={item.q}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
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
    <section className="d4-lead-section" aria-label="קריאה לפעולה סופית">
      <motion.div
        className="d4-lead-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
      >
        <motion.h2 className="d4-heading" variants={fadeUpVariants}>
          {lead.title} <em>{lead.titleEm}</em> {lead.titleAfter}
        </motion.h2>
        <motion.p className="d4-lead-lede" variants={fadeUpVariants}>{lead.lede}</motion.p>
        <motion.div className="d4-lead-buttons" variants={fadeUpVariants}>
          <motion.a
            href={PAY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="d4-btn d4-btn-primary"
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
            className="d4-btn d4-btn-wa"
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
    <footer className="d4-footer">
      <a href="/" className="d4-footer-brand" aria-label="חזור לדף הבית">
        <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d4-footer-logo" />
        <span className="d4-footer-name">אור הנשמה</span>
      </a>
      <nav className="d4-footer-links" aria-label="קישורי ניווט">
        <a href="/" className="d4-footer-link">דף הבית</a>
        <a href="compass.html" className="d4-footer-link">קורס מצפן הנשמה</a>
        <a href="shoresh.html" className="d4-footer-link">קורס שורש הנשמה</a>
      </nav>
      <p className="d4-footer-copy">© {new Date().getFullYear()} אור הנשמה · אנה אשכנזי</p>
    </footer>
  );
}

// ── Sticky mobile bar ─────────────────────────────────────────────────────────

function StickyMobileBar({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="d4-mobile-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ y: 80, opacity: 0, transition: { duration: 0.22, ease: "easeIn" } }}
          aria-hidden="true"
        >
          <a
            href="#pricing"
            className="d4-btn d4-btn-primary"
            tabIndex={-1}
          >
            {CTA_LABEL}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Scroll progress bar ───────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      className="d4-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export default function Design4ModernBento() {
  const [barVisible, setBarVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setBarVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    const el = heroRef.current;
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="d4-root">
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />
      <main>
        <div ref={heroRef}>
          <Hero />
        </div>
        <TrustStrip />
        <WhySection />
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
