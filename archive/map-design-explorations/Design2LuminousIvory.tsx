import "./Design2LuminousIvory.css";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  useSpring,
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

/* ─── Small reusable SVGs ─────────────────────────────────── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path
        d="M5 9.5l2.8 2.8L13 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="d2-btn-wa-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`d2-faq-chevron${open ? " d2-faq-chevron-open" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Scroll-reveal variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };
const staggerSlow = { show: { transition: { staggerChildren: 0.15 } } };

/* ─── Magnetic/lift button wrapper ──────────────────────── */
function MotionAnchor({
  href,
  className,
  target,
  rel,
  children,
  reduced,
}: {
  href: string;
  className: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  reduced: boolean;
}) {
  return (
    <motion.a
      href={href}
      className={className}
      target={target}
      rel={rel}
      whileHover={reduced ? undefined : { y: -2, boxShadow: "0 8px 24px rgba(193,154,91,0.28)" }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Animated trust number ─────────────────────────────── */
function TrustItem({ item, reduced }: { item: (typeof trust)[0]; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [16, 0]);
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { opacity: springOpacity, y: springY }}
      className=""
    >
      <div className="d2-trust-num">
        {item.num}
        {item.numSmall && <span className="d2-trust-num-small">{item.numSmall}</span>}
      </div>
      <div className="d2-trust-label">{item.label}</div>
    </motion.div>
  );
}

/* ─── FAQ Accordion item ─────────────────────────────────── */
function FaqItem({ item, open, onToggle, index }: {
  item: (typeof faq.items)[0];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const triggerId = `d2-faq-trigger-${index}`;
  const panelId = `d2-faq-panel-${index}`;
  return (
    <div className="d2-faq-item">
      <button
        id={triggerId}
        className="d2-faq-trigger"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        type="button"
      >
        <span>{item.q}</span>
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            className="d2-faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="d2-faq-body-inner">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Decorative SVG flourish ───────────────────────────── */
function Flourish() {
  return (
    <svg
      className="d2-hero-flourish"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <motion.circle
        cx="60"
        cy="60"
        r="55"
        stroke="#c19a5b"
        strokeWidth="1"
        strokeDasharray="345"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="42"
        stroke="#c98b86"
        strokeWidth="0.6"
        strokeDasharray="264"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Design2LuminousIvory() {
  const reduced = useReducedMotion() ?? false;

  /* Scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(heroScroll, [0, 1], [0, 60]);

  /* Sticky mobile CTA — show after hero leaves viewport */
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sentinel } = useScroll({
    target: heroSentinelRef,
    offset: ["end start", "end start"],
  });
  const [pastHero, setPastHero] = useState(false);
  sentinel.on("change", (v) => setPastHero(v >= 1));

  /* FAQ open state */
  const [openFaq, setOpenFaq] = useState<number>(0);

  /* Announcement parts */
  const announceParts = announcement.split("·");

  return (
    <div className="d2-root">
      {/* Scroll progress indicator */}
      <motion.div
        className="d2-progress-bar"
        style={reduced ? undefined : { scaleX }}
      />

      {/* 1 — Announcement bar */}
      <div className="d2-announce" role="banner">
        <strong>{announceParts[0].trim()}</strong>
        {announceParts[1] ? ` · ${announceParts[1].trim()}` : ""}
      </div>

      {/* 2 — Sticky header */}
      <header className="d2-header">
        <a href="/" className="d2-header-brand" aria-label="אור הנשמה — דף הבית">
          <img
            src="/assets/logo-or-haneshama.png"
            alt="לוגו אור הנשמה"
            className="d2-header-logo"
            width="40"
            height="40"
          />
          <span className="d2-header-name">אור הנשמה</span>
        </a>
        <MotionAnchor
          href="#pricing"
          className="d2-btn-primary d2-header-cta"
          reduced={reduced}
        >
          לרכישה
        </MotionAnchor>
      </header>

      {/* 3 — Hero */}
      <section className="d2-hero" ref={heroRef} aria-label="כותרת ראשית">
        <div className="d2-hero-inner">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              className="d2-hero-eyebrow"
              variants={reduced ? undefined : fadeUp}
            >
              {mapHero.eyebrow}
            </motion.p>
            <motion.h1
              className="d2-hero-title"
              variants={reduced ? undefined : fadeUp}
            >
              {mapHero.title}
              <em className="d2-hero-title-em">{mapHero.titleEm}</em>
            </motion.h1>
            <motion.p
              className="d2-hero-sub"
              variants={reduced ? undefined : fadeUp}
            >
              {mapHero.sub}
            </motion.p>
            <motion.div
              className="d2-hero-cta-row"
              variants={reduced ? undefined : fadeUp}
            >
              <MotionAnchor
                href="#pricing"
                className="d2-btn-primary"
                reduced={reduced}
              >
                {CTA_LABEL}
              </MotionAnchor>
            </motion.div>
          </motion.div>

          <div className="d2-hero-portrait-wrap">
            <Flourish />
            <motion.img
              src={mapHero.photo}
              alt={mapHero.photoAlt}
              className="d2-hero-portrait"
              style={reduced ? undefined : { y: portraitY }}
              initial={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </section>

      {/* Hero sentinel for mobile CTA detection */}
      <div ref={heroSentinelRef} style={{ height: 1 }} aria-hidden="true" />

      {/* 4 — Trust strip */}
      <div className="d2-trust" role="region" aria-label="נתוני אמון">
        <div className="d2-trust-grid">
          {trust.map((item) => (
            <TrustItem key={item.label} item={item} reduced={reduced} />
          ))}
        </div>
      </div>

      {/* 5 — Why / recognition checklist */}
      <section className="d2-section d2-section-warm" aria-labelledby="d2-why-heading">
        <div className="d2-inner">
          <motion.div
            className="d2-why-grid"
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div className="d2-why-text" variants={reduced ? undefined : fadeUp}>
              <span className="d2-kicker">למה מפה נומרולוגית</span>
              <h2 id="d2-why-heading" className="d2-heading d2-heading-lg">
                {why.title}{" "}
                <em className="d2-em">{why.titleEm}</em>
              </h2>
              <p className="d2-lede">{why.lede}</p>
            </motion.div>
            <motion.div variants={reduced ? undefined : fadeUp}>
              <ul className="d2-why-list" role="list">
                {why.items.map((item) => (
                  <li key={item} className="d2-why-item">
                    <CheckIcon className="d2-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6 — Story */}
      <section className="d2-section d2-section-paper" aria-labelledby="d2-story-heading">
        <div className="d2-inner-narrow">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={reduced ? undefined : fadeUp}>
              <span className="d2-kicker">הסיפור שלי</span>
              <div className="d2-story-rule" aria-hidden="true" />
              <h2 id="d2-story-heading" className="d2-heading d2-heading-lg">
                {story.title}{" "}
                <em className="d2-em">{story.titleEm}</em>
              </h2>
            </motion.div>
            <motion.div className="d2-story-paragraphs" variants={reduced ? undefined : staggerSlow}>
              {story.paragraphs.map((para) => (
                <motion.p key={para.slice(0, 30)} variants={reduced ? undefined : fadeUp}>
                  {para}
                </motion.p>
              ))}
            </motion.div>
            <motion.div className="d2-story-cta" variants={reduced ? undefined : fadeUp}>
              <MotionAnchor href="#pricing" className="d2-btn-ghost" reduced={reduced}>
                {CTA_LABEL}
              </MotionAnchor>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7 — Pricing */}
      <section
        id="pricing"
        className="d2-section d2-section-warm"
        aria-labelledby="d2-pricing-heading"
      >
        <div className="d2-inner">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={reduced ? undefined : fadeUp}>
              <span className="d2-kicker">{pricing.kicker}</span>
              <h2 id="d2-pricing-heading" className="d2-heading d2-heading-lg">
                {pricing.title}{" "}
                <em className="d2-em">{pricing.titleEm}</em>
              </h2>
              <p className="d2-lede d2-pricing-lede">{pricing.lede}</p>
            </motion.div>

            <motion.div className="d2-tiers" variants={reduced ? undefined : stagger}>
              {tiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  className={`d2-tier-card${tier.featured ? " d2-tier-card-featured" : ""}`}
                  variants={reduced ? undefined : fadeUp}
                >
                  {tier.ribbon && (
                    <div className="d2-tier-ribbon" aria-label={`מסלול מומלץ: ${tier.name}`}>
                      {tier.ribbon}
                    </div>
                  )}
                  <div className="d2-tier-name">{tier.name}</div>
                  <div className="d2-tier-sub">{tier.sub}</div>
                  <div className="d2-tier-price">
                    <span className="d2-tier-currency">₪</span>
                    <span className="d2-tier-amount">{tier.amount}</span>
                  </div>
                  <div className="d2-tier-terms">{tier.terms}</div>
                  <div className="d2-tier-divider" aria-hidden="true" />
                  <ul className="d2-tier-features" role="list">
                    {tier.features.map((f) => (
                      <li key={f} className="d2-tier-feature">
                        <CheckIcon className="d2-tier-check" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <MotionAnchor
                    href={tier.payLink}
                    className="d2-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    reduced={reduced}
                  >
                    {CTA_LABEL}
                  </MotionAnchor>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="d2-pricing-wa" variants={reduced ? undefined : fadeIn}>
              <p className="d2-pricing-wa-lede">{pricing.waLede}</p>
              <MotionAnchor
                href={WA_LINK}
                className="d2-btn-wa"
                target="_blank"
                rel="noopener noreferrer"
                reduced={reduced}
              >
                <WhatsAppIcon />
                {pricing.waLabel}
              </MotionAnchor>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 8 — Mid CTA */}
      <section className="d2-section d2-section-paper d2-midcta" aria-labelledby="d2-midcta-heading">
        <div className="d2-inner-narrow">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={reduced ? undefined : fadeUp}>
              <h2 id="d2-midcta-heading" className="d2-heading d2-heading-lg">
                {midCta.title}{" "}
                <em className="d2-em">{midCta.titleEm}</em>
              </h2>
              <p className="d2-midcta-body">{midCta.body}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 9 — Benefits + ghost CTA */}
      <section className="d2-section d2-section-warm" aria-labelledby="d2-benefits-heading">
        <div className="d2-inner">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={reduced ? undefined : fadeUp}>
              <span className="d2-kicker">מה תקבלי</span>
              <h2 id="d2-benefits-heading" className="d2-heading d2-heading-lg">
                {benefits.title}{" "}
                <em className="d2-em">{benefits.titleEm}</em>
              </h2>
              <p className="d2-lede">{benefits.lede}</p>
            </motion.div>
            <motion.div className="d2-benefits-grid" variants={reduced ? undefined : stagger}>
              {benefits.items.map((b) => (
                <motion.div
                  key={b.num}
                  className="d2-benefit-card"
                  variants={reduced ? undefined : fadeUp}
                >
                  <div className="d2-benefit-num" aria-hidden="true">{b.num}</div>
                  <div className="d2-benefit-title">{b.title}</div>
                  <p className="d2-benefit-body">{b.body}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="d2-benefits-cta" variants={reduced ? undefined : fadeUp}>
              <MotionAnchor href="#pricing" className="d2-btn-ghost" reduced={reduced}>
                {CTA_LABEL}
              </MotionAnchor>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 10 — About Anna */}
      <section className="d2-section d2-section-paper" aria-labelledby="d2-about-heading">
        <div className="d2-inner">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={reduced ? undefined : fadeUp}>
              <span className="d2-kicker">קצת עליי</span>
              <h2 id="d2-about-heading" className="d2-heading d2-heading-lg" style={{ marginBottom: 32 }}>
                {aboutAnna.title}{" "}
                <em className="d2-em">{aboutAnna.titleEm}</em>
              </h2>
            </motion.div>
            <div className="d2-about-grid">
              <motion.div className="d2-about-photo-wrap" variants={reduced ? undefined : fadeIn}>
                <img
                  src={aboutAnna.photo}
                  alt={aboutAnna.photoAlt}
                  className="d2-about-photo"
                />
              </motion.div>
              <motion.div variants={reduced ? undefined : fadeUp}>
                <div className="d2-about-paragraphs">
                  {aboutAnna.paragraphs.map((p) => (
                    <p key={p.slice(0, 30)}>{p}</p>
                  ))}
                </div>
                <blockquote className="d2-about-signature">
                  {aboutAnna.signature}
                </blockquote>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11 — FAQ accordion */}
      <section className="d2-section d2-section-warm" aria-labelledby="d2-faq-heading">
        <div className="d2-inner-narrow">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={reduced ? undefined : fadeUp}>
              <span className="d2-kicker">{faq.kicker}</span>
              <h2 id="d2-faq-heading" className="d2-heading d2-heading-lg">
                {faq.title}{" "}
                <em className="d2-em">{faq.titleEm}</em>
              </h2>
            </motion.div>
            <motion.div className="d2-faq-list" variants={reduced ? undefined : fadeUp}>
              {faq.items.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  index={i}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 12 — Final lead CTA */}
      <section className="d2-section d2-section-paper d2-lead" aria-labelledby="d2-lead-heading">
        <div className="d2-inner-narrow">
          <motion.div
            variants={reduced ? undefined : stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2 id="d2-lead-heading" className="d2-lead-title" variants={reduced ? undefined : fadeUp}>
              {lead.title}{" "}
              <em className="d2-em">{lead.titleEm}</em>
              {" "}{lead.titleAfter}
            </motion.h2>
            <motion.p className="d2-lead-lede" variants={reduced ? undefined : fadeUp}>
              {lead.lede}
            </motion.p>
            <motion.div className="d2-lead-btns" variants={reduced ? undefined : fadeUp}>
              <MotionAnchor
                href={PAY_LINK}
                className="d2-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                reduced={reduced}
              >
                {CTA_LABEL}
              </MotionAnchor>
              <MotionAnchor
                href={WA_LINK}
                className="d2-btn-wa"
                target="_blank"
                rel="noopener noreferrer"
                reduced={reduced}
              >
                <WhatsAppIcon />
                שאלות? דברי איתי
              </MotionAnchor>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 13 — Footer */}
      <footer className="d2-footer">
        <div className="d2-footer-inner">
          <div className="d2-footer-brand">
            <img
              src="/assets/logo-or-haneshama.png"
              alt="לוגו אור הנשמה"
              className="d2-footer-logo"
              width="48"
              height="48"
            />
            <span className="d2-footer-name">אור הנשמה</span>
          </div>
          <nav className="d2-footer-links" aria-label="ניווט ראשי">
            <a href="/">דף הבית</a>
            <a href="compass.html">קורס מצפן הנשמה</a>
            <a href="shoresh.html">קורס שורש הנשמה</a>
          </nav>
          <p className="d2-footer-copy">
            © {new Date().getFullYear()} אור הנשמה · אנה אשכנזי · כל הזכויות שמורות
          </p>
        </div>
      </footer>

      {/* 14 — Sticky mobile CTA bar */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            className="d2-mobile-cta-bar"
            role="complementary"
            aria-label="כפתור רכישה נייד"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <MotionAnchor href="#pricing" className="d2-btn-primary" reduced={reduced}>
              {CTA_LABEL}
            </MotionAnchor>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
