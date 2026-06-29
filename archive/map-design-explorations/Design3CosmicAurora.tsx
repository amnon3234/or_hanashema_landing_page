import "./Design3CosmicAurora.css";
import {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useInView,
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

// ─── Inline SVGs ──────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="d3-why__check"
    >
      <circle cx="11" cy="11" r="11" fill="currentColor" fillOpacity="0.18" />
      <path
        d="M6.5 11.5L9.5 14.5L15.5 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFeature() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 1.5L9.6 6.1H14.5L10.5 8.9L12.1 13.5L8 10.7L3.9 13.5L5.5 8.9L1.5 6.1H6.4L8 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`d3-faq__chevron${open ? " d3-faq__chevron--open" : ""}`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.112 1.528 5.836L.057 23.25a.75.75 0 00.918.908l5.478-1.434A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.883 0-3.649-.49-5.183-1.352l-.372-.213-3.848 1.008 1.03-3.755-.232-.384A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

// ─── Animated trust number ─────────────────────────────────────────────────

function AnimatedTrustNum({ num, numSmall }: { num: string; numSmall?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
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
    <span className="d3-trust__num" ref={ref}>
      {displayed}
      {numSmall && <span className="d3-trust__num-small">{numSmall}</span>}
    </span>
  );
}

// ─── FAQ item ──────────────────────────────────────────────────────────────

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const id = `d3-faq-${q.slice(0, 10).replace(/\s/g, "-")}`;
  return (
    <div className="d3-faq__item">
      <button
        className="d3-faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
      >
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
            <p className="d3-faq__answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scroll-reveal wrapper ─────────────────────────────────────────────────

const revealVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

function Reveal({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div
      variants={revealVariants}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating digits layer ─────────────────────────────────────────────────

const DIGITS = [
  { value: "1", top: "8%", right: "5%", size: "14vw" },
  { value: "3", top: "28%", left: "3%", size: "10vw" },
  { value: "7", top: "52%", right: "8%", size: "12vw" },
  { value: "9", top: "70%", left: "6%", size: "9vw" },
  { value: "11", top: "40%", right: "2%", size: "8vw" },
];

function FloatingDigits({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <>
      {DIGITS.map((d, i) => (
        <motion.span
          key={d.value + i}
          className="d3-float-digit"
          aria-hidden="true"
          style={{
            top: d.top,
            right: "right" in d ? d.right : undefined,
            left: "left" in d ? d.left : undefined,
            fontSize: d.size,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10 + i * 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.3,
          }}
        >
          {d.value}
        </motion.span>
      ))}
    </>
  );
}

// ─── Aurora background ─────────────────────────────────────────────────────

function AuroraBackground({ reduced }: { reduced: boolean }) {
  return (
    <div className="d3-aurora-layer" aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <motion.div
          key={n}
          className={`d3-aurora-blob d3-aurora-blob--${n}`}
          animate={
            reduced
              ? {}
              : {
                  scale: [1, 1.12, 0.95, 1],
                  opacity: [0.4, 0.55, 0.35, 0.4],
                  x: n % 2 === 0 ? [0, 20, -10, 0] : [0, -15, 12, 0],
                  y: n % 2 === 0 ? [0, -15, 10, 0] : [0, 18, -8, 0],
                }
          }
          transition={{
            duration: 14 + n * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: n * 1.5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function Design3CosmicAurora() {
  const shouldReduce = useReducedMotion() ?? false;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleXSpring = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Hero photo parallax
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 500], [0, shouldReduce ? 0 : -40]);

  // Intersection to show mobile sticky CTA after hero passes
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // Announcement parts
  const parts = announcement.split("·");
  const annBold = parts[0]?.trim() ?? "";
  const annRest = parts.slice(1).join("·").trim();

  function handleFaqToggle(i: number) {
    setOpenFaq((prev) => (prev === i ? null : i));
  }

  return (
    <div className={`d3-root${shouldReduce ? " d3-no-motion" : ""}`}>
      {/* Scroll progress */}
      <motion.div
        className="d3-progress-bar"
        style={{ scaleX: scaleXSpring, transformOrigin: "right center" }}
        aria-hidden="true"
      />

      {/* Aurora background */}
      <AuroraBackground reduced={shouldReduce} />

      {/* Floating digits */}
      <FloatingDigits reduced={shouldReduce} />

      <div className="d3-page">
        {/* 1. Announcement bar */}
        <div className="d3-announce" role="banner">
          <strong>{annBold}</strong>
          {annRest && <> · {annRest}</>}
        </div>

        {/* 2. Sticky header */}
        <header className="d3-header">
          <div className="d3-container">
            <div className="d3-header__inner">
              <a href="/" className="d3-header__brand" aria-label="חזרה לדף הבית · אור הנשמה">
                <img
                  src="/assets/logo-or-haneshama.png"
                  alt="לוגו אור הנשמה"
                  className="d3-header__logo"
                  width={40}
                  height={40}
                />
                <span className="d3-header__name">
                  אור הנשמה
                  <span>אנה אשכנזי</span>
                </span>
              </a>
              <motion.a
                href="#pricing"
                className="d3-btn d3-btn--primary d3-btn--sm"
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.96 }}
              >
                לרכישה
              </motion.a>
            </div>
          </div>
        </header>

        {/* 3. Hero */}
        <section className="d3-hero" ref={heroRef} aria-labelledby="d3-hero-title">
          <div className="d3-container">
            <div className="d3-hero__inner">
              {/* Text side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span className="d3-hero__eyebrow">{mapHero.eyebrow}</span>
                <h1 className="d3-hero__title" id="d3-hero-title">
                  {mapHero.title} <em>{mapHero.titleEm}</em>
                </h1>
                <p className="d3-hero__sub">{mapHero.sub}</p>
                <motion.a
                  href="#pricing"
                  className="d3-btn d3-btn--gold d3-btn--lg"
                  whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: "0 0 48px rgba(240,201,125,0.55)" }}
                  whileTap={shouldReduce ? {} : { scale: 0.96 }}
                >
                  {CTA_LABEL}
                </motion.a>
              </motion.div>

              {/* Photo side */}
              <div className="d3-hero__photo-wrap">
                <motion.div
                  ref={heroPhotoRef}
                  style={{ y: photoY }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <div className="d3-hero__aura" aria-hidden="true" />
                  <motion.div
                    className="d3-hero__photo-frame"
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
                    <img
                      src={mapHero.photo}
                      alt={mapHero.photoAlt}
                      className="d3-hero__photo"
                      width={380}
                      height={380}
                      loading="eager"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Trust strip */}
        <section className="d3-trust" aria-label="נתוני אמון">
          <div className="d3-container">
            <div className="d3-trust__grid">
              {trust.map((item, i) => (
                <Reveal key={i} i={i}>
                  <div className="d3-trust__item">
                    <AnimatedTrustNum num={item.num} numSmall={item.numSmall} />
                    <p className="d3-trust__label">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why section */}
        <section className="d3-why" aria-labelledby="d3-why-title">
          <div className="d3-container">
            <Reveal>
              <h2 className="d3-section-heading" id="d3-why-title">
                {why.title} <em>{why.titleEm}</em>
              </h2>
              <p className="d3-why__lede">{why.lede}</p>
            </Reveal>
            <ul className="d3-why__list" role="list">
              {why.items.map((item, i) => (
                <Reveal key={i} i={i + 1}>
                  <li className="d3-why__item">
                    <IconCheck />
                    <span className="d3-why__item-text">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Story */}
        <section className="d3-story" aria-labelledby="d3-story-title">
          <div className="d3-container">
            <Reveal>
              <h2 className="d3-section-heading" id="d3-story-title">
                {story.title} <em>{story.titleEm}</em>
              </h2>
            </Reveal>
            <div className="d3-story__body">
              <Reveal i={1}>
                <div className="d3-story__paragraphs">
                  {story.paragraphs.map((p, i) => (
                    <p key={i} className="d3-story__p">{p}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal i={2}>
                <motion.a
                  href="#pricing"
                  className="d3-btn d3-btn--ghost"
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                >
                  {CTA_LABEL}
                </motion.a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 7. Pricing */}
        <section className="d3-pricing" id="pricing" aria-labelledby="d3-pricing-title">
          <div className="d3-container">
            <div className="d3-pricing__header">
              <Reveal>
                <span className="d3-section-kicker">{pricing.kicker}</span>
                <h2 className="d3-section-heading" id="d3-pricing-title">
                  {pricing.title} <em>{pricing.titleEm}</em>
                </h2>
              </Reveal>
              <Reveal i={1}>
                <p className="d3-pricing__lede">{pricing.lede}</p>
              </Reveal>
            </div>

            <div className="d3-pricing__grid">
              {tiers.map((tier, i) => (
                <Reveal key={tier.trackId} i={i}>
                  <motion.div
                    className={`d3-tier-card${tier.featured ? " d3-tier-card--featured" : ""}`}
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
                      <span className="d3-tier-ribbon" aria-label={`מסלול ${tier.ribbon}`}>
                        {tier.ribbon}
                      </span>
                    )}
                    <h3 className="d3-tier__name">{tier.name}</h3>
                    <p className="d3-tier__sub">{tier.sub}</p>
                    <div className="d3-tier__price">
                      <span className="d3-tier__currency">₪</span>
                      <span className="d3-tier__amount">{tier.amount}</span>
                    </div>
                    <p className="d3-tier__terms">{tier.terms}</p>
                    <hr className="d3-tier__divider" />
                    <ul className="d3-tier__features" role="list">
                      {tier.features.map((f, fi) => (
                        <li key={fi} className="d3-tier__feature">
                          <IconFeature />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <motion.a
                      href={tier.payLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`d3-btn${tier.featured ? " d3-btn--gold" : " d3-btn--primary"}`}
                      style={{ width: "100%", justifyContent: "center" }}
                      whileHover={shouldReduce ? {} : { scale: 1.04 }}
                      whileTap={shouldReduce ? {} : { scale: 0.96 }}
                      aria-label={`רכישת ${tier.name} במחיר ₪${tier.amount}`}
                      data-track-id={tier.trackId}
                      data-track-value={tier.trackValue}
                    >
                      {CTA_LABEL}
                    </motion.a>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* WhatsApp row */}
            <Reveal i={3}>
              <div className="d3-pricing__wa">
                <p className="d3-pricing__wa-lede">{pricing.waLede}</p>
                <motion.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d3-btn d3-btn--wa"
                  whileHover={shouldReduce ? {} : { scale: 1.04 }}
                  whileTap={shouldReduce ? {} : { scale: 0.96 }}
                  aria-label={pricing.waLabel}
                >
                  <IconWhatsApp />
                  {pricing.waLabel}
                </motion.a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8. midCta */}
        <section className="d3-midcta" aria-labelledby="d3-midcta-title">
          <div className="d3-container">
            <Reveal>
              <div className="d3-midcta__inner">
                <h2 className="d3-section-heading" id="d3-midcta-title">
                  {midCta.title} <em>{midCta.titleEm}</em>
                </h2>
                <p className="d3-midcta__body">{midCta.body}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 9. Benefits */}
        <section className="d3-benefits" aria-labelledby="d3-benefits-title">
          <div className="d3-container">
            <div className="d3-benefits__header">
              <Reveal>
                <h2 className="d3-section-heading" id="d3-benefits-title">
                  {benefits.title} <em>{benefits.titleEm}</em>
                </h2>
                <p className="d3-benefits__lede">{benefits.lede}</p>
              </Reveal>
            </div>
            <div className="d3-benefits__grid">
              {benefits.items.map((item, i) => (
                <Reveal key={item.num} i={i}>
                  <motion.div
                    className="d3-benefit-card"
                    whileHover={shouldReduce ? {} : { scale: 1.03, borderColor: "rgba(124,77,255,0.4)" }}
                    whileTap={shouldReduce ? {} : { scale: 0.98 }}
                  >
                    <span className="d3-benefit-card__num" aria-hidden="true">{item.num}</span>
                    <div>
                      <h3 className="d3-benefit-card__title">{item.title}</h3>
                      <p className="d3-benefit-card__body">{item.body}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
            <Reveal i={benefits.items.length}>
              <div style={{ textAlign: "center" }}>
                <motion.a
                  href="#pricing"
                  className="d3-btn d3-btn--primary"
                  whileHover={shouldReduce ? {} : { scale: 1.04 }}
                  whileTap={shouldReduce ? {} : { scale: 0.96 }}
                >
                  {CTA_LABEL}
                </motion.a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 10. About Anna */}
        <section className="d3-about" aria-labelledby="d3-about-title">
          <div className="d3-container">
            <Reveal>
              <h2 className="d3-section-heading" id="d3-about-title">
                {aboutAnna.title} <em>{aboutAnna.titleEm}</em>
              </h2>
            </Reveal>
            <div className="d3-about__inner">
              <Reveal i={1} className="d3-about__photo-wrap">
                <img
                  src={aboutAnna.photo}
                  alt={aboutAnna.photoAlt}
                  className="d3-about__photo"
                  width={280}
                  height={373}
                  loading="lazy"
                />
              </Reveal>
              <Reveal i={2}>
                <div className="d3-about__content">
                  <div className="d3-about__paragraphs">
                    {aboutAnna.paragraphs.map((p, i) => (
                      <p key={i} className="d3-about__p">{p}</p>
                    ))}
                  </div>
                  <blockquote className="d3-about__signature">
                    {aboutAnna.signature}
                  </blockquote>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="d3-faq" aria-labelledby="d3-faq-title">
          <div className="d3-container">
            <div className="d3-faq__header">
              <Reveal>
                <span className="d3-section-kicker">{faq.kicker}</span>
                <h2 className="d3-section-heading" id="d3-faq-title">
                  {faq.title} <em>{faq.titleEm}</em>
                </h2>
              </Reveal>
            </div>
            <div className="d3-faq__list" role="list">
              {faq.items.map((item, i) => (
                <Reveal key={i} i={i}>
                  <div role="listitem">
                    <FaqItem
                      q={item.q}
                      a={item.a}
                      isOpen={openFaq === i}
                      onToggle={() => handleFaqToggle(i)}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Lead / Final CTA */}
        <section className="d3-lead" aria-labelledby="d3-lead-title">
          <div className="d3-container">
            <Reveal>
              <div className="d3-lead__inner">
                <h2 className="d3-lead__title" id="d3-lead-title">
                  {lead.title} <em>{lead.titleEm}</em> {lead.titleAfter}
                </h2>
                <p className="d3-lead__lede">{lead.lede}</p>
                <div className="d3-lead__actions">
                  <motion.a
                    href={PAY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d3-btn d3-btn--gold d3-btn--lg"
                    whileHover={shouldReduce ? {} : { scale: 1.05, boxShadow: "0 0 52px rgba(240,201,125,0.6)" }}
                    whileTap={shouldReduce ? {} : { scale: 0.96 }}
                    aria-label="לרכישת המפה הנומרולוגית"
                  >
                    {CTA_LABEL}
                  </motion.a>
                  <motion.a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d3-btn d3-btn--wa"
                    whileHover={shouldReduce ? {} : { scale: 1.04 }}
                    whileTap={shouldReduce ? {} : { scale: 0.96 }}
                    aria-label="פתיחת שיחת וואטסאפ עם אנה"
                  >
                    <IconWhatsApp />
                    וואטסאפ
                  </motion.a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 13. Footer */}
        <footer className="d3-footer">
          <div className="d3-container">
            <div className="d3-footer__inner">
              <a href="/" className="d3-footer__brand" aria-label="עמוד הבית · אור הנשמה">
                <img
                  src="/assets/logo-or-haneshama.png"
                  alt="לוגו אור הנשמה"
                  className="d3-footer__logo"
                  width={36}
                  height={36}
                  loading="lazy"
                />
                <span className="d3-footer__name">אור הנשמה</span>
              </a>
              <nav aria-label="קישורי ניווט">
                <ul className="d3-footer__links">
                  <li><a href="/" className="d3-footer__link">דף הבית</a></li>
                  <li><a href="compass.html" className="d3-footer__link">קורס מצפן הנשמה</a></li>
                  <li><a href="shoresh.html" className="d3-footer__link">קורס שורש הנשמה</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </footer>

        {/* 14. Sticky mobile CTA */}
        <AnimatePresence>
          {!heroVisible && (
            <motion.div
              className="d3-mobile-cta"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              aria-hidden="true"
            >
              <a
                href="#pricing"
                className="d3-btn d3-btn--gold d3-mobile-cta__btn"
                tabIndex={-1}
              >
                {CTA_LABEL}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
