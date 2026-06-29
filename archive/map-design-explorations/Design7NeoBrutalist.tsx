import "./Design7NeoBrutalist.css";
import { useEffect, useRef, useState, useCallback } from "react";
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

// ── SVG icons ──────────────────────────────────────────────────────────────────

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconCheck({ white = false }: { white?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 9.5l3.5 3.5 7.5-8"
        stroke={white ? "#ffffff" : "#6b4cf0"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheckFilled() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" fill="#6b4cf0" />
      <path d="M5 12.5l4.5 4.5 9.5-10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg className="d7-faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Animated number counter ────────────────────────────────────────────────────

function AnimatedNum({ value, shouldCount }: { value: string; shouldCount: boolean }) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const isNumeric = /^\d+$/.test(value);

  useEffect(() => {
    if (!shouldCount || !isNumeric) {
      setDisplay(value);
      return;
    }
    const target = parseInt(value, 10);
    const controls = animate(motionVal, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [shouldCount, value, isNumeric, motionVal]);

  return <span>{isNumeric ? display : value}</span>;
}

// ── Floating geometry ──────────────────────────────────────────────────────────

function FloatShape({
  style,
  circle = false,
  color = "var(--violet)",
  reduced,
}: {
  style: React.CSSProperties;
  circle?: boolean;
  color?: string;
  reduced: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`d7-geo${circle ? " d7-geo-circle" : ""}`}
      style={{ ...style, borderColor: color, position: "absolute" }}
      animate={reduced ? {} : { y: [0, -12, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Design7NeoBrutalist() {
  const reduced = useReducedMotion() ?? false;

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroScroll, [0, 1], [0, reduced ? 0 : 60]);

  // Announcement ticker
  const parts = announcement.split("·");
  const annPart0 = parts[0]?.trim() ?? "";
  const annPart1 = parts[1]?.trim() ?? "";

  // Sticky mobile CTA — show after hero scrolls out
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setShowSticky(v > 0.08));
    return unsub;
  }, [scrollYProgress]);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number>(0);
  const toggleFaq = useCallback((i: number) => {
    setOpenFaq((prev) => (prev === i ? -1 : i));
  }, []);

  // Stagger helper
  const fadeUp = (i = 0) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 24, rotate: 0 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" } },
  });

  const brutFadeIn = (i = 0) => ({
    hidden: { opacity: 0, x: reduced ? 0 : -18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, delay: i * 0.07, ease: "easeOut" } },
  });

  // Trust in-view trigger
  const trustRef = useRef<HTMLDivElement>(null);
  const [trustVisible, setTrustVisible] = useState(false);
  useEffect(() => {
    if (!trustRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTrustVisible(true); }, { threshold: 0.3 });
    obs.observe(trustRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="d7-root">
      {/* Scroll progress */}
      <motion.div className="d7-progress-bar" style={{ scaleX }} />

      {/* 1 — Announcement ticker */}
      <div className="d7-announce" aria-label={announcement}>
        <motion.div
          className="d7-announce-track"
          animate={reduced ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2, 3].map((rep) => (
            <span key={rep} style={{ display: "flex", alignItems: "center", gap: "2rem", paddingLeft: "2rem" }}>
              <strong>{annPart0}</strong>
              <span className="d7-announce-sep" aria-hidden="true">·</span>
              <span>{annPart1}</span>
              <span className="d7-announce-sep" aria-hidden="true">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2 — Sticky header */}
      <header className="d7-header">
        <div className="d7-header-inner">
          <a href="/" className="d7-logo-group" aria-label="אור הנשמה — דף הבית">
            <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d7-logo-img" />
            <span className="d7-brand-name">אור הנשמה</span>
          </a>
          <motion.a
            href="#pricing"
            className="d7-header-cta"
            whileHover={reduced ? {} : { x: -2, y: -2, boxShadow: "8px 8px 0 #1a1714" }}
            whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #1a1714" }}
          >
            לרכישה
          </motion.a>
        </div>
      </header>

      {/* 3 — Hero */}
      <section className="d7-hero" ref={heroRef} aria-label="כותרת ראשית">
        <div className="d7-dotbg" />
        {/* Floating shapes */}
        <FloatShape reduced={reduced} style={{ top: "12%", left: "4%", width: 64, height: 64 }} color="var(--coral)" />
        <FloatShape reduced={reduced} style={{ top: "55%", left: "8%", width: 36, height: 36 }} circle color="var(--mint)" />
        <FloatShape reduced={reduced} style={{ bottom: "10%", right: "3%", width: 80, height: 80 }} color="var(--violet)" />

        <div className="d7-hero-inner">
          <motion.div
            className="d7-hero-text"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p className="d7-hero-eyebrow" variants={fadeUp(0)}>{mapHero.eyebrow}</motion.p>
            <motion.h1 className="d7-h1" variants={fadeUp(1)}>
              {mapHero.title}{" "}
              <span className="d7-em">{mapHero.titleEm}</span>
            </motion.h1>
            <motion.p className="d7-hero-sub" variants={fadeUp(2)}>{mapHero.sub}</motion.p>
            <motion.div variants={fadeUp(3)}>
              <motion.a
                href="#pricing"
                className="d7-btn d7-btn-primary"
                whileHover={reduced ? {} : { x: -3, y: -3, boxShadow: "12px 12px 0 #1a1714" }}
                whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #1a1714" }}
              >
                {CTA_LABEL}
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="d7-hero-photo-wrap">
            <motion.div
              className="d7-hero-frame"
              style={{ y: heroImgY }}
              initial={{ opacity: 0, rotate: reduced ? 0 : 3 }}
              animate={{ opacity: 1, rotate: 1.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={reduced ? {} : { rotate: 0, transition: { duration: 0.25 } }}
            >
              <img src={mapHero.photo} alt={mapHero.photoAlt} />
            </motion.div>
            <div className="d7-hero-sticker">מפה אישית כתובה</div>
          </div>
        </div>
      </section>

      {/* 4 — Trust */}
      <section className="d7-trust" aria-label="נתוני אמון">
        <div className="d7-trust-inner" ref={trustRef}>
          <div className="d7-trust-grid">
            {trust.map((item, i) => (
              <motion.div
                key={i}
                className="d7-trust-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp(i)}
              >
                <div className="d7-trust-num">
                  <AnimatedNum value={item.num} shouldCount={trustVisible} />
                  {item.numSmall && <span className="d7-trust-num-small">{item.numSmall}</span>}
                </div>
                <p className="d7-trust-label">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Why */}
      <section className="d7-section d7-band-paper2" aria-label="למי מתאים">
        <div className="d7-section-inner">
          <div className="d7-why-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            >
              <motion.span className="d7-kicker" variants={brutFadeIn(0)}>למי זה מתאים</motion.span>
              <motion.h2 className="d7-h2" variants={fadeUp(1)}>
                {why.title}{" "}
                <span className="d7-em">{why.titleEm}</span>
              </motion.h2>
              <motion.p className="d7-lede" variants={fadeUp(2)}>{why.lede}</motion.p>
            </motion.div>

            <motion.ul
              className="d7-why-checklist"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              aria-label="סיבות להזמין מפה"
            >
              {why.items.map((item, i) => (
                <motion.li key={i} className="d7-why-check-item" variants={fadeUp(i)}>
                  <span className="d7-check-icon" aria-hidden="true">
                    <IconCheckFilled />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* 6 — Story */}
      <section className="d7-section d7-band-ink" aria-label="הסיפור שלי">
        <div className="d7-section-inner" style={{ position: "relative", overflow: "hidden" }}>
          <div className="d7-dotbg" style={{ opacity: 0.04 }} />
          <FloatShape reduced={reduced} style={{ top: "-20px", left: "60%", width: 100, height: 100 }} color="var(--violet)" />
          <motion.div
            className="d7-story-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <motion.span className="d7-kicker" variants={brutFadeIn(0)}>הסיפור שלי</motion.span>
            <motion.h2 className="d7-h2" variants={fadeUp(1)} style={{ color: "var(--paper)" }}>
              {story.title}{" "}
              <span style={{ color: "var(--violet)" }}>{story.titleEm}</span>
            </motion.h2>
            <div className="d7-story-paras">
              {story.paragraphs.map((p, i) => (
                <motion.p key={i} variants={fadeUp(i + 2)}>{p}</motion.p>
              ))}
            </div>
            <motion.a
              href="#pricing"
              className="d7-btn d7-btn-ink"
              variants={fadeUp(story.paragraphs.length + 2)}
              whileHover={reduced ? {} : { x: -3, y: -3, boxShadow: "11px 11px 0 #ffffff" }}
              whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #ffffff" }}
            >
              {CTA_LABEL}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 7 — Pricing */}
      <section className="d7-section" id="pricing" aria-label="מסלולים ומחירים">
        <div className="d7-section-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.span className="d7-kicker" variants={brutFadeIn(0)}>{pricing.kicker}</motion.span>
            <motion.h2 className="d7-h2 d7-pricing-lede" variants={fadeUp(1)}>
              {pricing.title}{" "}
              <span className="d7-em">{pricing.titleEm}</span>
            </motion.h2>
            <motion.p className="d7-lede" variants={fadeUp(2)}>{pricing.lede}</motion.p>
          </motion.div>

          <div className="d7-tiers-grid">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.trackId}
                className={`d7-tier-card${tier.featured ? " d7-tier-card-featured" : ""}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp(i)}
                whileHover={reduced ? {} : { x: -3, y: -3, boxShadow: tier.featured ? "12px 12px 0 #1a1714" : "10px 10px 0 #1a1714" }}
                whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #1a1714" }}
              >
                {tier.ribbon && <div className="d7-tier-ribbon" aria-label={`מומלץ: ${tier.ribbon}`}>{tier.ribbon}</div>}
                <h3 className="d7-tier-name">{tier.name}</h3>
                <p className="d7-tier-sub">{tier.sub}</p>
                <div className="d7-tier-amount-row">
                  <span className="d7-tier-currency">₪</span>
                  <span className="d7-tier-amount">{tier.amount}</span>
                </div>
                <p className="d7-tier-terms">{tier.terms}</p>
                <hr className="d7-tier-divider" />
                <ul className="d7-tier-features" aria-label={`מה כלול ב${tier.name}`}>
                  {tier.features.map((f) => (
                    <li key={f} className="d7-tier-feature">
                      <span className="d7-tier-check">
                        <IconCheck white={tier.featured} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="d7-tier-btn">
                  <motion.a
                    href={tier.payLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`d7-btn ${tier.featured ? "d7-btn-coral" : "d7-btn-primary"} d7-tier-btn-link`}
                    aria-label={`רכישת ${tier.name} במחיר ₪${tier.amount}`}
                    whileHover={reduced ? {} : { x: -2, y: -2 }}
                    whileTap={reduced ? {} : { x: 0, y: 0 }}
                  >
                    {CTA_LABEL}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="d7-pricing-wa"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp(2)}
          >
            <p className="d7-pricing-wa-text">{pricing.waLede}</p>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="d7-btn d7-btn-wa"
              aria-label={pricing.waLabel}
              whileHover={reduced ? {} : { x: -2, y: -2, boxShadow: "7px 7px 0 #1a1714" }}
              whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #1a1714" }}
            >
              <IconWhatsApp />
              {pricing.waLabel}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 8 — Mid CTA */}
      <section className="d7-section d7-band-coral" aria-label="מסר אמצעי">
        <div className="d7-midcta-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ textAlign: "center" }}
          >
            <motion.h2 className="d7-h2" variants={fadeUp(0)}>
              {midCta.title}{" "}
              <span style={{ color: "var(--ink)", textDecoration: "underline", textDecorationThickness: "3px" }}>
                {midCta.titleEm}
              </span>
            </motion.h2>
            <motion.p className="d7-midcta-body" variants={fadeUp(1)}>{midCta.body}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* 9 — Benefits */}
      <section className="d7-section d7-band-violet-light" aria-label="יתרונות המפה">
        <div className="d7-section-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ marginBottom: "2.5rem" }}
          >
            <motion.span className="d7-kicker" variants={brutFadeIn(0)}>למה כדאי</motion.span>
            <motion.h2 className="d7-h2" variants={fadeUp(1)}>
              {benefits.title}{" "}
              <span className="d7-em">{benefits.titleEm}</span>
            </motion.h2>
            <motion.p className="d7-lede" variants={fadeUp(2)}>{benefits.lede}</motion.p>
          </motion.div>

          <div className="d7-benefits-grid">
            {benefits.items.map((item, i) => (
              <motion.div
                key={item.num}
                className="d7-benefit-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp(i)}
                whileHover={reduced ? {} : { x: -3, y: -3, boxShadow: "8px 8px 0 #1a1714" }}
              >
                <div className="d7-benefit-num" aria-hidden="true">{item.num}</div>
                <h3 className="d7-benefit-title">{item.title}</h3>
                <p className="d7-benefit-body">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp(3)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <motion.a
              href="#pricing"
              className="d7-btn d7-btn-ghost"
              whileHover={reduced ? {} : { x: -2, y: -2, boxShadow: "8px 8px 0 #1a1714" }}
              whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #1a1714" }}
            >
              {CTA_LABEL}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 10 — About Anna */}
      <section className="d7-section d7-band-paper2" aria-label="על אנה אשכנזי">
        <div className="d7-section-inner">
          <motion.div
            className="d7-about-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div className="d7-about-photo-wrap" variants={fadeUp(0)}>
              <div className="d7-about-frame">
                <img src={aboutAnna.photo} alt={aboutAnna.photoAlt} />
              </div>
            </motion.div>

            <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
              <motion.span className="d7-kicker" variants={brutFadeIn(0)}>על המנחה</motion.span>
              <motion.h2 className="d7-h2" variants={fadeUp(1)}>
                {aboutAnna.title}{" "}
                <span className="d7-em">{aboutAnna.titleEm}</span>
              </motion.h2>
              <div className="d7-about-paras">
                {aboutAnna.paragraphs.map((p, i) => (
                  <motion.p key={i} variants={fadeUp(i + 2)}>{p}</motion.p>
                ))}
              </div>
              <motion.blockquote className="d7-about-sig" variants={fadeUp(aboutAnna.paragraphs.length + 2)}>
                {aboutAnna.signature}
              </motion.blockquote>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="d7-section" aria-label="שאלות ותשובות">
        <div className="d7-section-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ marginBottom: "2rem" }}
          >
            <motion.span className="d7-kicker" variants={brutFadeIn(0)}>{faq.kicker}</motion.span>
            <motion.h2 className="d7-h2" variants={fadeUp(1)}>
              {faq.title}{" "}
              <span className="d7-em">{faq.titleEm}</span>
            </motion.h2>
          </motion.div>

          <div className="d7-faq-list" role="list">
            {faq.items.map((item, i) => (
              <div key={i} className="d7-faq-item" role="listitem">
                <button
                  className="d7-faq-trigger"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-body-${i}`}
                  id={`faq-btn-${i}`}
                  onClick={() => toggleFaq(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") { e.preventDefault(); toggleFaq(Math.min(i + 1, faq.items.length - 1)); }
                    if (e.key === "ArrowUp")   { e.preventDefault(); toggleFaq(Math.max(i - 1, 0)); }
                  }}
                >
                  {item.q}
                  <IconChevron />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-body-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="d7-faq-body"
                      key="faq-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.28, ease: "easeInOut" }}
                    >
                      <div className="d7-faq-body-inner">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Final lead CTA */}
      <section className="d7-section d7-band-violet" aria-label="קריאה לפעולה סופית" style={{ position: "relative", overflow: "hidden" }}>
        <div className="d7-dotbg" style={{ opacity: 0.07 }} />
        <FloatShape reduced={reduced} style={{ top: "10%", right: "5%", width: 72, height: 72 }} color="var(--coral)" circle />
        <FloatShape reduced={reduced} style={{ bottom: "15%", left: "3%", width: 56, height: 56 }} color="var(--paper-2)" />

        <div className="d7-lead-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 className="d7-h2" variants={fadeUp(0)}>
              {lead.title}{" "}
              <span style={{ color: "var(--paper-2)" }}>{lead.titleEm}</span>{" "}
              {lead.titleAfter}
            </motion.h2>
            <motion.p className="d7-lead-sub" variants={fadeUp(1)}>{lead.lede}</motion.p>
            <motion.div className="d7-lead-btns" variants={fadeUp(2)}>
              <motion.a
                href={PAY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="d7-btn d7-btn-coral"
                aria-label="רכישת המפה הנומרולוגית"
                whileHover={reduced ? {} : { x: -3, y: -3, boxShadow: "12px 12px 0 #1a1714" }}
                whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #1a1714" }}
              >
                {CTA_LABEL}
              </motion.a>
              <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="d7-btn d7-btn-wa"
                aria-label="שאלות? דברי איתי בוואטסאפ"
                whileHover={reduced ? {} : { x: -2, y: -2, boxShadow: "7px 7px 0 #1a1714" }}
                whileTap={reduced ? {} : { x: 0, y: 0, boxShadow: "0 0 0 #1a1714" }}
              >
                <IconWhatsApp />
                שאלות? וואטסאפ
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 13 — Footer */}
      <footer className="d7-footer">
        <div className="d7-footer-inner">
          <span className="d7-footer-brand">אור הנשמה © {new Date().getFullYear()}</span>
          <nav aria-label="קישורי ניווט תחתון">
            <ul className="d7-footer-links">
              <li><a href="/">דף הבית</a></li>
              <li><a href="compass.html">קורס מצפן הנשמה</a></li>
              <li><a href="shoresh.html">קורס שורש הנשמה</a></li>
            </ul>
          </nav>
        </div>
      </footer>

      {/* 14 — Sticky mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            className="d7-sticky-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
            aria-hidden="true"
          >
            <a href="#pricing" tabIndex={-1}>{CTA_LABEL}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
