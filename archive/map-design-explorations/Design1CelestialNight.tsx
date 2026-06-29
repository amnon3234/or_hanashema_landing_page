import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
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
import "./Design1CelestialNight.css";

/* ── Celestial ambient background layers ── */

function CelestialBackground({ reduced }: { reduced: boolean }) {
  // Nebula blobs: large very-low-opacity blurred gradient divs that drift slowly
  const nebulas = [
    { className: "d1-nebula d1-nebula-1", delay: 0, duration: 22 },
    { className: "d1-nebula d1-nebula-2", delay: 6, duration: 28 },
    { className: "d1-nebula d1-nebula-3", delay: 12, duration: 18 },
  ];

  // Shooting stars: thin gold streaks with long gaps
  const meteors = [
    { className: "d1-meteor d1-meteor-1", delay: 3, repeatDelay: 18 },
    { className: "d1-meteor d1-meteor-2", delay: 11, repeatDelay: 22 },
  ];

  // Constellation: small SVG of connected dots
  // Orb positions in the constellation (viewport %)
  const constStars = [
    { cx: 78, cy: 14 },
    { cx: 83, cy: 9 },
    { cx: 87, cy: 16 },
    { cx: 82, cy: 20 },
    { cx: 75, cy: 19 },
    { cx: 90, cy: 11 },
  ];
  const constLines = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 5], [5, 2],
  ] as [number, number][];

  if (reduced) {
    return (
      <div className="d1-celestial-bg" aria-hidden="true">
        {/* Static nebula blobs */}
        {nebulas.map((n, i) => (
          <div key={i} className={n.className} style={{ opacity: 0.55 }} />
        ))}
        {/* Static constellation */}
        <svg className="d1-constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {constLines.map(([a, b], i) => (
            <line
              key={i}
              x1={constStars[a].cx} y1={constStars[a].cy}
              x2={constStars[b].cx} y2={constStars[b].cy}
              stroke="rgba(208,169,96,0.18)" strokeWidth="0.15"
            />
          ))}
          {constStars.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r="0.4" fill="rgba(208,169,96,0.45)" />
          ))}
        </svg>
        {/* Static moon orb */}
        <div className="d1-moon-wrap">
          <div className="d1-moon-halo" style={{ opacity: 0.35 }} />
          <div className="d1-moon" />
        </div>
      </div>
    );
  }

  return (
    <div className="d1-celestial-bg" aria-hidden="true">
      {/* Drifting nebula blobs */}
      {nebulas.map((n, i) => (
        <motion.div
          key={i}
          className={n.className}
          animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.08, 1] }}
          transition={{ duration: n.duration, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Shooting stars / meteors */}
      {meteors.map((m, i) => (
        <motion.div
          key={i}
          className={m.className}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            x: [-60, 60],
            y: [0, 60],
          }}
          transition={{
            duration: 0.9,
            delay: m.delay,
            repeat: Infinity,
            repeatDelay: m.repeatDelay,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Constellation SVG with animating pathLength + twinkling dots */}
      <svg className="d1-constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {constLines.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={constStars[a].cx} y1={constStars[a].cy}
            x2={constStars[b].cx} y2={constStars[b].cy}
            stroke="rgba(208,169,96,0.22)" strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.8 + i * 0.25, ease: "easeOut" }}
          />
        ))}
        {constStars.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx} cy={s.cy} r="0.45"
            fill="rgba(208,169,96,0.55)"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.8 + i * 0.4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Crescent moon orb with breathing halo */}
      <div className="d1-moon-wrap">
        <motion.div
          className="d1-moon-halo"
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.12, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="d1-moon"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

/* ── Inline SVG components (no external icon imports) ── */

function CheckStar() {
  return (
    <svg
      className="d1-check-icon"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11 1 L13.09 7.26 L19.5 7.64 L14.73 11.74 L16.18 18.01 L11 14.77 L5.82 18.01 L7.27 11.74 L2.5 7.64 L8.91 7.26 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function FeatureCheck() {
  return (
    <svg
      className="d1-tier-feature-icon"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 8 L7 10 L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 7.5 L10 12.5 L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Starfield (canvas-free, DOM stars) ── */

interface StarProps {
  top: string;
  right: string;
  size: number;
  delay: number;
}

function Starfield({ reduced }: { reduced: boolean }) {
  const stars: StarProps[] = [
    { top: "5%",  right: "10%", size: 1.5, delay: 0 },
    { top: "12%", right: "35%", size: 1,   delay: 0.4 },
    { top: "20%", right: "68%", size: 2,   delay: 0.8 },
    { top: "8%",  right: "55%", size: 1,   delay: 1.2 },
    { top: "30%", right: "22%", size: 1.5, delay: 0.2 },
    { top: "42%", right: "80%", size: 1,   delay: 1.0 },
    { top: "55%", right: "15%", size: 2,   delay: 0.6 },
    { top: "60%", right: "48%", size: 1,   delay: 1.4 },
    { top: "70%", right: "72%", size: 1.5, delay: 0.3 },
    { top: "78%", right: "30%", size: 1,   delay: 0.9 },
    { top: "88%", right: "60%", size: 2,   delay: 0.5 },
    { top: "92%", right: "5%",  size: 1,   delay: 1.1 },
    { top: "3%",  right: "85%", size: 1,   delay: 0.7 },
    { top: "48%", right: "92%", size: 1.5, delay: 1.3 },
    { top: "65%", right: "38%", size: 1,   delay: 0.1 },
    { top: "15%", right: "50%", size: 1.5, delay: 1.5 },
    { top: "35%", right: "5%",  size: 1,   delay: 0.35 },
    { top: "80%", right: "88%", size: 2,   delay: 0.65 },
  ];

  if (reduced) {
    return (
      <div className="d1-starfield" aria-hidden="true">
        {stars.map((s, i) => (
          <div
            key={i}
            className="d1-star"
            style={{
              top: s.top,
              right: s.right,
              width: s.size,
              height: s.size,
              opacity: 0.25,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="d1-starfield" aria-hidden="true">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="d1-star"
          style={{ top: s.top, right: s.right, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -8, 0] }}
          transition={{
            duration: 4 + s.delay * 1.2,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Scroll-progress bar ── */

function ProgressBar({ reduced }: { reduced: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  if (reduced) return null;
  return (
    <motion.div
      className="d1-progress-bar"
      style={{ scaleX, transformOrigin: "right center" }}
    />
  );
}

/* ── Fade-rise animation variants ── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
} as const;

function RevealSection({
  children,
  reduced,
  className,
}: {
  children: React.ReactNode;
  reduced: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  return (
    <motion.div variants={reduced ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}

/* ── Trust number reveal ── */

function TrustNumber({ num, numSmall, label, reduced }: { num: string; numSmall?: string; label: string; reduced: boolean }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <motion.div
      ref={ref}
      className="d1-trust-item"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="d1-trust-num">
        {num}
        {numSmall && <span className="d1-trust-num-small">{numSmall}</span>}
      </span>
      <span className="d1-trust-label">{label}</span>
    </motion.div>
  );
}

/* ── FAQ accordion item ── */

function FaqItem({ q, a, isOpen, onToggle, reduced }: { q: string; a: string; isOpen: boolean; onToggle: () => void; reduced: boolean }) {
  const panelId = `d1-faq-panel-${q.slice(0, 12).replace(/\s/g, "-")}`;
  const triggerId = `d1-faq-trigger-${q.slice(0, 12).replace(/\s/g, "-")}`;

  return (
    <div className="d1-faq-item">
      <button
        id={triggerId}
        className="d1-faq-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{q}</span>
        <span className={`d1-faq-chevron${isOpen ? " d1-faq-chevron-open" : ""}`}>
          <ChevronDown />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            className="d1-faq-panel"
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="d1-faq-panel-inner">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Hero photo with parallax glow ── */

function HeroPhoto({ reduced }: { reduced: boolean }) {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -50]);
  const y = useSpring(rawY, { stiffness: 80, damping: 30 });

  const glowScale = useMotionValue(1);
  const glowOpacity = useMotionValue(0.6);

  useEffect(() => {
    if (reduced) return;
    let frame: number;
    let t = 0;
    const tick = () => {
      t += 0.016;
      glowScale.set(1 + 0.06 * Math.sin(t * 0.7));
      glowOpacity.set(0.5 + 0.2 * Math.sin(t * 0.5));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, glowScale, glowOpacity]);

  return (
    <motion.div
      className="d1-hero-photo-wrap"
      style={reduced ? undefined : { y }}
    >
      <motion.div
        className="d1-hero-photo-glow"
        style={reduced ? undefined : { scale: glowScale, opacity: glowOpacity }}
      />
      <motion.img
        src={mapHero.photo}
        alt={mapHero.photoAlt}
        className="d1-hero-photo"
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={reduced ? undefined : { scale: 1.02 }}
      />
    </motion.div>
  );
}

/* ── Sticky mobile CTA ── */

function StickyCta({ heroRef, reduced }: { heroRef: React.RefObject<HTMLElement | null>; reduced: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setShow(rect.bottom < 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [heroRef]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="d1-sticky-cta"
          initial={reduced ? false : { y: 64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: 64, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="כפתור רכישה"
        >
          <span className="d1-sticky-cta-text">מוכנה?</span>
          <motion.a
            href="#pricing"
            className="d1-btn-pill"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            {CTA_LABEL}
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main component ── */

export default function Design1CelestialNight() {
  const reduced = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);

  const announcementParts = announcement.split("·");
  const annPart0 = announcementParts[0]?.trim() ?? announcement;
  const annPart1 = announcementParts[1]?.trim() ?? "";

  return (
    <div className="d1-root">
      {/* Ambient celestial background layers */}
      <CelestialBackground reduced={reduced} />

      {/* Starfield background */}
      <Starfield reduced={reduced} />

      {/* Scroll progress */}
      <ProgressBar reduced={reduced} />

      {/* 1. Announcement bar */}
      <div className="d1-announcement" role="status">
        <strong>{annPart0}</strong>
        {annPart1 && <span> · {annPart1}</span>}
      </div>

      {/* 2. Sticky header */}
      <header className="d1-header">
        <a href="/" className="d1-header-brand" aria-label="חזרה לדף הבית - אור הנשמה">
          <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d1-header-logo" />
          <span className="d1-header-name">אור הנשמה</span>
        </a>
        <motion.a
          href="#pricing"
          className="d1-btn-pill"
          aria-label="לרכישת המפה"
          whileHover={reduced ? undefined : { scale: 1.03 }}
          whileTap={reduced ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          לרכישה
        </motion.a>
      </header>

      {/* 3. Hero */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="d1-section"
        style={{ padding: 0 }}
        aria-label="כותרת ראשית"
      >
        <div className="d1-hero">
          <motion.div
            className="d1-hero-content"
            variants={containerVariants}
            initial={reduced ? false : "hidden"}
            animate="visible"
          >
            <motion.p className="d1-eyebrow" variants={reduced ? undefined : itemVariants}>
              {mapHero.eyebrow}
            </motion.p>
            <motion.h1 className="d1-hero-title" variants={reduced ? undefined : itemVariants}>
              {mapHero.title}
              <em>{mapHero.titleEm}</em>
            </motion.h1>
            <motion.p className="d1-hero-sub" variants={reduced ? undefined : itemVariants}>
              {mapHero.sub}
            </motion.p>
            <motion.div className="d1-hero-cta" variants={reduced ? undefined : itemVariants}>
              <motion.a
                href="#pricing"
                className="d1-btn-pill"
                whileHover={reduced ? undefined : { scale: 1.03, boxShadow: "0 0 32px rgba(208,169,96,0.35)" }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {CTA_LABEL}
              </motion.a>
            </motion.div>
          </motion.div>

          <HeroPhoto reduced={reduced} />
        </div>
      </section>

      {/* 4. Trust strip */}
      <div className="d1-trust">
        <div className="d1-trust-inner">
          {trust.map((item) => (
            <TrustNumber
              key={item.label}
              num={item.num}
              numSmall={item.numSmall}
              label={item.label}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      {/* 5. Why section */}
      <section className="d1-section d1-section-alt" aria-label={why.title}>
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <div className="d1-why-grid">
              <RevealItem reduced={reduced}>
                <div className="d1-why-left">
                  <h2 className="d1-heading">
                    {why.title} <em>{why.titleEm}</em>
                  </h2>
                  <p className="d1-lede" style={{ marginBottom: 0 }}>{why.lede}</p>
                </div>
              </RevealItem>
              <RevealItem reduced={reduced}>
                <ul className="d1-checklist" role="list">
                  {why.items.map((item) => (
                    <motion.li
                      key={item}
                      className="d1-check-item"
                      variants={reduced ? undefined : itemVariants}
                    >
                      <CheckStar />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </RevealItem>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 6. Story section */}
      <section className="d1-section d1-section-dark" aria-label={story.title}>
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <div className="d1-story-content">
              <RevealItem reduced={reduced}>
                <h2 className="d1-heading">
                  {story.title} <em>{story.titleEm}</em>
                </h2>
              </RevealItem>
              <div className="d1-story-paragraphs">
                {story.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className="d1-story-para"
                    variants={reduced ? undefined : itemVariants}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
              <RevealItem reduced={reduced}>
                <div className="d1-story-cta">
                  <motion.a
                    href="#pricing"
                    className="d1-btn-ghost"
                    whileHover={reduced ? undefined : { scale: 1.03 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {CTA_LABEL}
                  </motion.a>
                </div>
              </RevealItem>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 7. Pricing */}
      <section className="d1-section d1-section-band" id="pricing" aria-label="מסלולי המפה">
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <RevealItem reduced={reduced}>
              <div className="d1-pricing-header">
                <h2 className="d1-heading">
                  {pricing.title} <em>{pricing.titleEm}</em>
                </h2>
                <p className="d1-lede" style={{ margin: "0 auto" }}>{pricing.lede}</p>
              </div>
            </RevealItem>

            <div className="d1-tiers">
              {tiers.map((tier) => (
                <motion.div
                  key={tier.trackId}
                  className={`d1-tier-card${tier.featured ? " d1-tier-card-featured" : ""}`}
                  variants={reduced ? undefined : itemVariants}
                  whileHover={reduced ? undefined : { scale: 1.02, y: -4 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {tier.ribbon && (
                    <span className="d1-tier-ribbon" aria-label={`סרט: ${tier.ribbon}`}>{tier.ribbon}</span>
                  )}
                  <div className="d1-tier-name">{tier.name}</div>
                  <div className="d1-tier-sub">{tier.sub}</div>
                  <div className="d1-tier-price">
                    <span className="d1-tier-currency">&#x20AA;</span>
                    <span className="d1-tier-amount">{tier.amount}</span>
                  </div>
                  <div className="d1-tier-terms">{tier.terms}</div>
                  <ul className="d1-tier-features" role="list">
                    {tier.features.map((feat) => (
                      <li key={feat} className="d1-tier-feature">
                        <FeatureCheck />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href={tier.payLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d1-btn-pill"
                    style={{ textAlign: "center" }}
                    whileHover={reduced ? undefined : { scale: 1.03 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    aria-label={`לרכישת ${tier.name} במחיר ₪${tier.amount}`}
                  >
                    {CTA_LABEL}
                  </motion.a>
                </motion.div>
              ))}
            </div>

            <RevealItem reduced={reduced}>
              <div className="d1-wa-note">
                <p>{pricing.waLede}</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d1-wa-link"
                  aria-label="שאלות - דברי איתי בוואטסאפ"
                >
                  <WhatsAppIcon />
                  {pricing.waLabel}
                </a>
              </div>
            </RevealItem>
          </RevealSection>
        </div>
      </section>

      {/* 8. MidCta band */}
      <section className="d1-section d1-section-dark" aria-label="קריאה לפעולה">
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <RevealItem reduced={reduced}>
              <div className="d1-midcta-content">
                <h2 className="d1-heading">
                  {midCta.title} <em>{midCta.titleEm}</em>
                </h2>
                <p className="d1-midcta-body">{midCta.body}</p>
              </div>
            </RevealItem>
          </RevealSection>
        </div>
      </section>

      {/* 9. Benefits */}
      <section className="d1-section d1-section-alt" aria-label="יתרונות המפה">
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <RevealItem reduced={reduced}>
              <div className="d1-benefits-header">
                <h2 className="d1-heading">
                  {benefits.title} <em>{benefits.titleEm}</em>
                </h2>
                <p className="d1-lede">{benefits.lede}</p>
              </div>
            </RevealItem>

            <div className="d1-benefits-grid">
              {benefits.items.map((item) => (
                <motion.div
                  key={item.num}
                  className="d1-benefit-card"
                  variants={reduced ? undefined : itemVariants}
                  whileHover={reduced ? undefined : { scale: 1.02, y: -3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="d1-benefit-num">{item.num}</div>
                  <div className="d1-benefit-title">{item.title}</div>
                  <p className="d1-benefit-body">{item.body}</p>
                </motion.div>
              ))}
            </div>

            <RevealItem reduced={reduced}>
              <div className="d1-benefits-cta">
                <motion.a
                  href="#pricing"
                  className="d1-btn-pill"
                  whileHover={reduced ? undefined : { scale: 1.03 }}
                  whileTap={reduced ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {CTA_LABEL}
                </motion.a>
              </div>
            </RevealItem>
          </RevealSection>
        </div>
      </section>

      {/* 10. About Anna */}
      <section className="d1-section d1-section-band" aria-label="אודות אנה">
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <RevealItem reduced={reduced}>
              <h2 className="d1-heading">
                {aboutAnna.title} <em>{aboutAnna.titleEm}</em>
              </h2>
            </RevealItem>
            <div className="d1-about-grid">
              <RevealItem reduced={reduced}>
                <div className="d1-about-photo-wrap">
                  <motion.img
                    src={aboutAnna.photo}
                    alt={aboutAnna.photoAlt}
                    className="d1-about-photo"
                    initial={reduced ? false : { opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={reduced ? undefined : { scale: 1.02 }}
                  />
                </div>
              </RevealItem>
              <RevealItem reduced={reduced}>
                <div className="d1-about-content">
                  <div className="d1-about-paras">
                    {aboutAnna.paragraphs.map((para, i) => (
                      <p key={i} className="d1-about-para">{para}</p>
                    ))}
                  </div>
                  <blockquote className="d1-signature">
                    {aboutAnna.signature}
                  </blockquote>
                </div>
              </RevealItem>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="d1-section d1-section-dark" aria-label="שאלות נפוצות">
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <RevealItem reduced={reduced}>
              <div className="d1-faq-header">
                <h2 className="d1-heading">
                  {faq.title} <em>{faq.titleEm}</em>
                </h2>
              </div>
            </RevealItem>
            <motion.div
              className="d1-faq-list"
              variants={reduced ? undefined : containerVariants}
              role="list"
            >
              {faq.items.map((item, i) => (
                <FaqItem
                  key={i}
                  q={item.q}
                  a={item.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          </RevealSection>
        </div>
      </section>

      {/* 12. Lead CTA */}
      <section className="d1-section" aria-label="קריאה לפעולה סופית">
        <div className="d1-section-inner">
          <RevealSection reduced={reduced}>
            <RevealItem reduced={reduced}>
              <div className="d1-lead-content">
                <h2 className="d1-lead-title">
                  {lead.title} <em>{lead.titleEm}</em>{" "}
                  {lead.titleAfter}
                </h2>
                <p className="d1-lead-lede">{lead.lede}</p>
                <div className="d1-lead-buttons">
                  <motion.a
                    href={PAY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d1-btn-pill"
                    whileHover={reduced ? undefined : { scale: 1.03, boxShadow: "0 0 32px rgba(208,169,96,0.35)" }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    aria-label="לרכישת המפה הנומרולוגית"
                  >
                    {CTA_LABEL}
                  </motion.a>
                  <motion.a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d1-btn-wa"
                    whileHover={reduced ? undefined : { scale: 1.03 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    aria-label="שאלות - דברי איתי בוואטסאפ"
                  >
                    <WhatsAppIcon />
                    <span>שאלות? ואטסאפ</span>
                  </motion.a>
                </div>
              </div>
            </RevealItem>
          </RevealSection>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="d1-footer">
        <div className="d1-footer-inner">
          <div className="d1-footer-brand">
            <img
              src="/assets/logo-or-haneshama.png"
              alt="לוגו אור הנשמה"
              className="d1-footer-logo"
            />
            <span className="d1-footer-name">אור הנשמה</span>
          </div>
          <nav aria-label="קישורי כותרת תחתונה">
            <div className="d1-footer-links">
              <a href="/" className="d1-footer-link">דף הבית</a>
              <a href="compass.html" className="d1-footer-link">קורס מצפן הנשמה</a>
              <a href="shoresh.html" className="d1-footer-link">קורס שורש הנשמה</a>
            </div>
          </nav>
        </div>
      </footer>

      {/* 14. Sticky mobile CTA */}
      <StickyCta heroRef={heroRef} reduced={reduced} />
    </div>
  );
}
