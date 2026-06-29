import "./Design6ArtDecoLuxe.css";
import { useRef, useState } from "react";
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

/* ─── Icon components ─────────────────────────────────────────────────────── */
function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652C8.074 23.322 10.04 23.865 12.045 23.865c6.576 0 11.935-5.335 11.938-11.896.002-3.176-1.24-6.165-3.463-8.52zm-8.475 18.304c-1.78 0-3.524-.478-5.046-1.38l-.362-.214-3.754.979 1.004-3.648-.235-.374a9.86 9.86 0 0 1-1.52-5.274c.003-5.45 4.441-9.884 9.896-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.903-9.864 9.903zm5.44-7.408c-.299-.149-1.765-.869-2.037-.968-.273-.099-.473-.148-.673.15-.197.297-.769.968-.943 1.17-.173.197-.347.223-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.018-.462.13-.61.136-.133.3-.347.449-.52.15-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.075-.148-.672-1.622-.922-2.22-.242-.584-.487-.504-.672-.514-.172-.01-.371-.012-.57-.012a1.09 1.09 0 0 0-.796.372c-.273.3-1.045 1.02-1.045 2.487s1.07 2.886 1.217 3.085c.15.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.571-.347z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="d6-why-check" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="20" height="20" rx="2" stroke="#c8a253" strokeWidth="1.5"/>
      <path d="M6 11.5L9.5 15L16 8" stroke="#c8a253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Sunburst SVG ────────────────────────────────────────────────────────── */
function SunburstSVG({ size = 700, opacity = 0.06 }: { size?: number; opacity?: number }) {
  const rays = Array.from({ length: 36 }, (_, i) => i * 10);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      focusable="false"
      style={{ opacity, display: "block" }}
    >
      {rays.map((angle) => (
        <line
          key={angle}
          x1={size / 2}
          y1={size / 2}
          x2={size / 2 + (size / 2) * Math.cos((angle * Math.PI) / 180)}
          y2={size / 2 + (size / 2) * Math.sin((angle * Math.PI) / 180)}
          stroke="#c8a253"
          strokeWidth="1"
        />
      ))}
      <circle cx={size / 2} cy={size / 2} r={size * 0.08} fill="none" stroke="#c8a253" strokeWidth="1.5" />
      <circle cx={size / 2} cy={size / 2} r={size * 0.16} fill="none" stroke="#c8a253" strokeWidth="0.5" />
      <circle cx={size / 2} cy={size / 2} r={size * 0.28} fill="none" stroke="#c8a253" strokeWidth="0.5" />
      <circle cx={size / 2} cy={size / 2} r={size * 0.42} fill="none" stroke="#c8a253" strokeWidth="0.5" />
    </svg>
  );
}

/* Path-draw ornament line */
function OrnamentLineSVG({ animate: doAnim }: { animate: boolean }) {
  return (
    <div className="d6-ornament-line" aria-hidden="true">
      <svg width="480" height="20" viewBox="0 0 480 20" fill="none">
        <motion.path
          d="M0 10 H200 M280 10 H480"
          stroke="#c8a253"
          strokeWidth="1"
          strokeOpacity="0.45"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: doAnim ? 1.2 : 0, ease: "easeOut" }}
          viewport={{ once: true, margin: "-60px" }}
        />
        <motion.path
          d="M200 10 L220 2 L240 10 L260 2 L280 10"
          stroke="#c8a253"
          strokeWidth="1"
          strokeOpacity="0.7"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: doAnim ? 0.8 : 0, delay: doAnim ? 0.4 : 0, ease: "easeOut" }}
          viewport={{ once: true, margin: "-60px" }}
        />
      </svg>
    </div>
  );
}

/* Deco rule ornament */
function DecoRule() {
  return (
    <div className="d6-deco-rule" aria-hidden="true">
      <div className="d6-deco-rule__line" />
      <div className="d6-deco-rule__dot" />
      <div className="d6-deco-rule__diamond" />
      <div className="d6-deco-rule__dot" />
      <div className="d6-deco-rule__line d6-deco-rule__line--r" />
    </div>
  );
}

/* ─── Announcement ────────────────────────────────────────────────────────── */
function Announcement() {
  const parts = announcement.split("·");
  return (
    <div className="d6-announcement" role="banner">
      <strong>{parts[0].trim()}</strong>
      {parts.length > 1 && <span> · {parts.slice(1).join("·").trim()}</span>}
    </div>
  );
}

/* ─── Header ──────────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="d6-header" role="banner">
      <div className="d6-header-inner">
        <a href="/" className="d6-logo-group" aria-label="אור הנשמה – דף הבית">
          <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" className="d6-logo-img" />
          <div>
            <div className="d6-brand-name">אור הנשמה</div>
            <div className="d6-brand-sub">אנה אשכנזי · נומרולוגיה</div>
          </div>
        </a>
        <a href="#pricing" className="d6-header-cta">לרכישה</a>
      </div>
    </header>
  );
}

/* ─── Scroll progress bar ─────────────────────────────────────────────────── */
function ScrollBar({ reduced }: { reduced: boolean }) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="d6-progress-bar"
      style={{ scaleX: reduced ? 1 : scrollYProgress }}
      aria-hidden="true"
    />
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function Hero({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);

  return (
    <section className="d6-section d6-hero" ref={ref} aria-labelledby="hero-heading">
      {/* Rotating sunburst backdrop */}
      <div className="d6-hero-sunburst" aria-hidden="true">
        <motion.div
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <SunburstSVG size={800} opacity={0.045} />
        </motion.div>
      </div>

      <div className="d6-hero-inner">
        {/* Text column */}
        <motion.div
          className="d6-hero-text"
          initial={{ opacity: 0, y: reduced ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="d6-hero-eyebrow">{mapHero.eyebrow}</span>
          <h1 className="d6-hero-title" id="hero-heading">
            {mapHero.title}
            <em>{mapHero.titleEm}</em>
          </h1>
          <p className="d6-hero-sub">{mapHero.sub}</p>
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduced ? 0 : 0.4, ease: "easeOut" }}
          >
            <a href="#pricing" className="d6-btn d6-btn--primary">{CTA_LABEL}</a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          className="d6-hero-portrait-wrap"
          style={{ y }}
          initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: reduced ? 0 : 0.2, ease: "easeOut" }}
        >
          <div className="d6-hero-arch">
            <div className="d6-hero-arch-frame" aria-hidden="true" />
            <div className="d6-corner-tl" aria-hidden="true" />
            <div className="d6-corner-br" aria-hidden="true" />
            <img
              src={mapHero.photo}
              alt={mapHero.photoAlt}
              className="d6-hero-photo"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Trust ───────────────────────────────────────────────────────────────── */
function Trust({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-trust" aria-label="מספרים ועובדות">
      <div className="d6-trust-grid">
        {trust.map((item, i) => (
          <motion.div
            className="d6-trust-item"
            key={i}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.12, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="d6-trust-num" aria-label={`${item.num}${item.numSmall ?? ""}`}>
              {item.num}
              {item.numSmall && <sup>{item.numSmall}</sup>}
            </div>
            <div className="d6-trust-label">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Why ─────────────────────────────────────────────────────────────────── */
function Why({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-section d6-section--alt" aria-labelledby="why-heading">
      <div className="d6-fluted-bg" aria-hidden="true" />
      <div className="d6-inner">
        <DecoRule />
        <div className="d6-why-grid">
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="d6-kicker" style={{ textAlign: "right" }}>למה זה מתאים לך</span>
            <h2 className="d6-heading d6-heading--lg" id="why-heading" style={{ textAlign: "right", marginBottom: "16px" }}>
              {why.title} <em>{why.titleEm}</em>
            </h2>
            <p className="d6-why-lede">{why.lede}</p>
          </motion.div>
          <ul className="d6-why-list" role="list">
            {why.items.map((item, i) => (
              <motion.li
                key={i}
                className="d6-why-item"
                initial={{ opacity: 0, x: reduced ? 0 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <CheckIcon />
                <span className="d6-why-text">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── Story ───────────────────────────────────────────────────────────────── */
function Story({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-section" aria-labelledby="story-heading">
      <div className="d6-inner">
        <DecoRule />
        <div className="d6-story-inner">
          <motion.h2
            className="d6-heading d6-heading--lg"
            id="story-heading"
            style={{ textAlign: "right" }}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {story.title} <em>{story.titleEm}</em>
          </motion.h2>
          <div className="d6-story-paras">
            {story.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="d6-story-para"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
              >
                {para}
              </motion.p>
            ))}
          </div>
          <OrnamentLineSVG animate={!reduced} />
          <div className="d6-story-cta-row">
            <a href="#pricing" className="d6-btn d6-btn--ghost">{CTA_LABEL}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─────────────────────────────────────────────────────────────── */
function Pricing({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-section d6-section--panel" id="pricing" aria-labelledby="pricing-heading">
      <div className="d6-fluted-bg" aria-hidden="true" />
      <div className="d6-inner">
        <span className="d6-kicker d6-pricing-kicker">{pricing.kicker}</span>
        <DecoRule />
        <h2 className="d6-heading d6-heading--lg" id="pricing-heading" style={{ marginBottom: "12px" }}>
          {pricing.title} <em>{pricing.titleEm}</em>
        </h2>
        <p className="d6-lede d6-pricing-lede">{pricing.lede}</p>

        <div className="d6-tiers-grid">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.trackId}
              className={`d6-tier${tier.featured ? " d6-tier--featured" : ""}`}
              initial={{ opacity: 0, y: reduced ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.15, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={reduced ? {} : { y: -4, boxShadow: "0 8px 40px rgba(200,162,83,0.28), 0 2px 8px rgba(0,0,0,0.5)" }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {tier.featured && (
                <div className="d6-tier-sunburst" aria-hidden="true">
                  <SunburstSVG size={300} opacity={1} />
                </div>
              )}
              {tier.ribbon && (
                <div className="d6-tier-ribbon" aria-label={`${tier.ribbon} – מומלץ`}>{tier.ribbon}</div>
              )}
              <div className="d6-tier-corner d6-tier-corner--tl" aria-hidden="true" />
              <div className="d6-tier-corner d6-tier-corner--br" aria-hidden="true" />

              <h3 className="d6-tier-name">{tier.name}</h3>
              <p className="d6-tier-sub">{tier.sub}</p>
              <div className="d6-tier-price">
                <span className="d6-tier-currency">₪</span>
                <span className="d6-tier-amount">{tier.amount}</span>
              </div>
              <p className="d6-tier-terms">{tier.terms}</p>
              <div className="d6-tier-divider" aria-hidden="true" />
              <ul className="d6-tier-features" role="list" aria-label={`תכולת ${tier.name}`}>
                {tier.features.map((f) => (
                  <li key={f} className="d6-tier-feature">
                    <span className="d6-tier-feature-dot" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href={tier.payLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`d6-btn d6-btn--primary d6-tier-btn`}
                aria-label={`רכישת ${tier.name} במחיר ₪${tier.amount}`}
                data-track-id={tier.trackId}
                data-track-value={tier.trackValue}
                whileHover={reduced ? {} : { scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
              >
                {CTA_LABEL}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp row */}
        <motion.div
          className="d6-pricing-wa"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="d6-pricing-wa-text">{pricing.waLede}</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="d6-btn d6-btn--wa"
            aria-label={pricing.waLabel}
          >
            <WaIcon />
            {pricing.waLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MidCTA ──────────────────────────────────────────────────────────────── */
function MidCta({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-section d6-midcta" aria-labelledby="midcta-heading">
      <div className="d6-inner d6-inner--narrow">
        <OrnamentLineSVG animate={!reduced} />
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="d6-heading d6-heading--md" id="midcta-heading">
            {midCta.title} <em>{midCta.titleEm}</em>
          </h2>
          <p className="d6-midcta-body">{midCta.body}</p>
        </motion.div>
        <OrnamentLineSVG animate={!reduced} />
      </div>
    </section>
  );
}

/* ─── Benefits ────────────────────────────────────────────────────────────── */
function Benefits({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-section d6-section--alt" aria-labelledby="benefits-heading">
      <div className="d6-fluted-bg" aria-hidden="true" />
      <div className="d6-inner">
        <span className="d6-kicker">מה תרוויחי</span>
        <DecoRule />
        <h2 className="d6-heading d6-heading--lg" id="benefits-heading" style={{ marginBottom: "12px" }}>
          {benefits.title} <em>{benefits.titleEm}</em>
        </h2>
        <p className="d6-lede" style={{ marginBottom: "0" }}>{benefits.lede}</p>

        <div className="d6-benefits-grid">
          {benefits.items.map((item, i) => (
            <motion.div
              key={item.num}
              className="d6-benefit"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.12, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={reduced ? {} : { y: -3, boxShadow: "0 6px 28px rgba(200,162,83,0.15)" }}
            >
              <div className="d6-benefit-num" aria-hidden="true">{item.num}</div>
              <h3 className="d6-benefit-title">{item.title}</h3>
              <p className="d6-benefit-body">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="d6-benefits-cta">
          <a href="#pricing" className="d6-btn d6-btn--ghost">{CTA_LABEL}</a>
        </div>
      </div>
    </section>
  );
}

/* ─── About ───────────────────────────────────────────────────────────────── */
function About({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-section" aria-labelledby="about-heading">
      <div className="d6-inner">
        <DecoRule />
        <div className="d6-about-grid">
          {/* Photo */}
          <motion.div
            className="d6-about-photo-wrap"
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="d6-about-frame" aria-hidden="true">
              <div className="d6-about-frame-corner d6-about-frame-corner--tl" aria-hidden="true" />
              <div className="d6-about-frame-corner d6-about-frame-corner--br" aria-hidden="true" />
            </div>
            <img src={aboutAnna.photo} alt={aboutAnna.photoAlt} className="d6-about-photo" loading="lazy" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="d6-about-text"
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div>
              <span className="d6-kicker" style={{ textAlign: "right" }}>קצת עלי</span>
              <h2 className="d6-heading d6-heading--md" id="about-heading" style={{ textAlign: "right" }}>
                {aboutAnna.title} <em>{aboutAnna.titleEm}</em>
              </h2>
            </div>
            <div className="d6-about-paras">
              {aboutAnna.paragraphs.map((para, i) => (
                <p key={i} className="d6-about-para">{para}</p>
              ))}
            </div>
            <blockquote className="d6-about-signature">
              {aboutAnna.signature}
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ item ────────────────────────────────────────────────────────────── */
function FaqItem({ item, defaultOpen, reduced }: { item: { q: string; a: string }; defaultOpen: boolean; reduced: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="d6-faq-item">
      <button
        className="d6-faq-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((v) => !v); } }}
      >
        <span>{item.q}</span>
        <span className="d6-faq-icon" aria-hidden="true">+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="d6-faq-overflow"
            key="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: "easeInOut" }}
          >
            <div className="d6-faq-body-inner">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
function Faq({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-section d6-section--alt" aria-labelledby="faq-heading">
      <div className="d6-inner d6-inner--narrow">
        <span className="d6-kicker">{faq.kicker}</span>
        <DecoRule />
        <h2 className="d6-heading d6-heading--lg" id="faq-heading">
          {faq.title} <em>{faq.titleEm}</em>
        </h2>
        <div className="d6-faq-list" role="list">
          {faq.items.map((item, i) => (
            <FaqItem key={i} item={item} defaultOpen={i === 0} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Lead / Final CTA ────────────────────────────────────────────────────── */
function Lead({ reduced }: { reduced: boolean }) {
  return (
    <section className="d6-lead" aria-labelledby="lead-heading">
      <div className="d6-inner d6-inner--narrow">
        <div className="d6-deco-rule" aria-hidden="true" style={{ marginBottom: "28px" }}>
          <div className="d6-deco-rule__line" />
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <circle cx="16" cy="16" r="7" fill="none" stroke="#c8a253" strokeWidth="1" />
            <circle cx="16" cy="16" r="2.5" fill="#c8a253" />
            {[0,45,90,135,180,225,270,315].map((a) => (
              <line
                key={a}
                x1={16 + 9 * Math.cos((a * Math.PI) / 180)}
                y1={16 + 9 * Math.sin((a * Math.PI) / 180)}
                x2={16 + 15 * Math.cos((a * Math.PI) / 180)}
                y2={16 + 15 * Math.sin((a * Math.PI) / 180)}
                stroke="#c8a253"
                strokeWidth="1"
                opacity="0.6"
              />
            ))}
          </svg>
          <div className="d6-deco-rule__line d6-deco-rule__line--r" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="d6-heading d6-heading--xl" id="lead-heading">
            {lead.title} <em>{lead.titleEm}</em>{" "}{lead.titleAfter}
          </h2>
          <p className="d6-lead-lede">{lead.lede}</p>
          <div className="d6-lead-buttons">
            <motion.a
              href={PAY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="d6-btn d6-btn--primary"
              aria-label="לרכישת המפה הנומרולוגית"
              whileHover={reduced ? {} : { scale: 1.03, boxShadow: "0 0 32px rgba(200,162,83,0.4)" }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {CTA_LABEL}
            </motion.a>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="d6-btn d6-btn--wa"
              aria-label="פתיחת שיחת ווטסאפ עם אנה"
              whileHover={reduced ? {} : { scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              <WaIcon />
              ווטסאפ
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="d6-footer" role="contentinfo">
      <div className="d6-footer-brand">אור הנשמה · אנה אשכנזי</div>
      <nav className="d6-footer-links" aria-label="ניווט ראשי">
        <a href="/" className="d6-footer-link">דף הבית</a>
        <a href="compass.html" className="d6-footer-link">קורס מצפן הנשמה</a>
        <a href="shoresh.html" className="d6-footer-link">קורס שורש הנשמה</a>
      </nav>
      <p className="d6-footer-copy">© {new Date().getFullYear()} אור הנשמה · כל הזכויות שמורות</p>
    </footer>
  );
}

/* ─── Sticky mobile CTA ───────────────────────────────────────────────────── */
function StickyMobileCta({ reduced }: { reduced: boolean }) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  scrollY.on("change", (v) => setVisible(v > 400));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="d6-sticky-mobile"
          role="complementary"
          aria-label="כפתור רכישה מהיר"
          initial={{ y: reduced ? 0 : 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <a href="#pricing" className="d6-btn d6-btn--primary">
            {CTA_LABEL}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Root ────────────────────────────────────────────────────────────────── */
export default function Design6ArtDecoLuxe() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="d6" lang="he" dir="rtl">
      <ScrollBar reduced={reduced} />
      <Announcement />
      <Header />
      <main>
        <Hero reduced={reduced} />
        <Trust reduced={reduced} />
        <Why reduced={reduced} />
        <Story reduced={reduced} />
        <Pricing reduced={reduced} />
        <MidCta reduced={reduced} />
        <Benefits reduced={reduced} />
        <About reduced={reduced} />
        <Faq reduced={reduced} />
        <Lead reduced={reduced} />
      </main>
      <Footer />
      <StickyMobileCta reduced={reduced} />
    </div>
  );
}
