import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
import "./Design8SoftClay.css";

const spring = { type: "spring" as const, stiffness: 260, damping: 20 };

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.25a.75.75 0 00.918.919l5.444-1.462A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.15-1.425l-.37-.22-3.828 1.028 1.042-3.808-.242-.385A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--lav)" />
      <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function TrustNumber({ value }: { value: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const target = parseInt(value, 10);
  const isNumeric = !isNaN(target) && String(target) === value;
  const [count, setCount] = useState(isNumeric ? 0 : 0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isNumeric || started) return;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [isNumeric, started]);

  useEffect(() => {
    if (!started || !isNumeric) return;
    if (reduced) {
      setCount(target);
      return;
    }
    const duration = 1100;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, isNumeric, reduced, target]);

  return <span ref={ref}>{isNumeric ? count : value}</span>;
}

const numberBubbles = [
  { n: 1, top: "12%", start: "8%" },
  { n: 7, top: "30%", start: "82%" },
  { n: 3, top: "55%", start: "14%" },
  { n: 9, top: "70%", start: "88%" },
  { n: 5, top: "88%", start: "40%" },
];

export default function Design8SoftClay() {
  const reduced = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 400], [0, reduced ? 0 : -40]);

  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [showStickyMobile, setShowStickyMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowStickyMobile(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [annPart0, ...annRest] = announcement.split("·");

  const toggleFaq = (idx: number) => setOpenIdx((cur) => (cur === idx ? null : idx));
  const onFaqKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFaq(idx);
    }
  };

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { ...spring, delay },
        };

  const buttonMotion = reduced ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.96 }, transition: spring };

  return (
    <div className="d8-wrap">
      {/* Scroll progress bar */}
      <motion.div className="d8-progress" style={{ scaleX: scrollYProgress, transformOrigin: "right" }} aria-hidden="true" />

      {/* Ambient background */}
      <div className="d8-ambient" aria-hidden="true">
        <motion.div
          className="d8-blob d8-blob-1"
          animate={reduced ? undefined : { y: [0, -28, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="d8-blob d8-blob-2"
          animate={reduced ? undefined : { y: [0, 24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="d8-blob d8-blob-3"
          animate={reduced ? undefined : { y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="d8-blob d8-blob-4"
          animate={reduced ? undefined : { y: [0, 18, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        {numberBubbles.map((b) => (
          <motion.div
            key={b.n}
            className="d8-bubble"
            style={{ top: b.top, insetInlineStart: b.start }}
            animate={reduced ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 9 + b.n, repeat: Infinity, ease: "easeInOut" }}
          >
            {b.n}
          </motion.div>
        ))}
      </div>

      {/* S1 — Announcement bar */}
      <div className="d8-announce">
        <strong>{annPart0.trim()}</strong>
        <span> · {annRest.join("·").trim()}</span>
      </div>

      {/* S2 — Sticky header */}
      <header className="d8-header">
        <div className="d8-header-inner">
          <a className="d8-brand" href="#top">
            <img src="/assets/logo-or-haneshama.png" alt="לוגו אור הנשמה" />
            <span>אור הנשמה</span>
          </a>
          <nav>
            <a className="d8-nav-link" href="#pricing">לרכישה</a>
          </nav>
        </div>
      </header>

      {/* S3 — Hero */}
      <section className="d8-hero" id="top">
        <div className="d8-hero-inner">
          <motion.div className="d8-hero-text" {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: spring })}>
            <span className="d8-eyebrow">{mapHero.eyebrow}</span>
            <h1 className="d8-hero-title">
              {mapHero.title} <em>{mapHero.titleEm}</em>
            </h1>
            <p className="d8-hero-sub">{mapHero.sub}</p>
            <motion.a className="d8-btn d8-btn-primary" href="#pricing" {...buttonMotion}>
              {CTA_LABEL}
            </motion.a>
          </motion.div>
          <motion.div className="d8-hero-photo" style={{ y: portraitY }}>
            <img src={mapHero.photo} alt={mapHero.photoAlt} />
          </motion.div>
        </div>
      </section>

      {/* S4 — Trust strip */}
      <section className="d8-trust">
        <div className="d8-trust-row">
          {trust.map((t, i) => (
            <motion.div className="d8-trust-card" key={t.label} {...reveal(i * 0.08)}>
              <div className="d8-trust-num">
                <TrustNumber value={t.num} />
                {t.numSmall ? <span className="d8-trust-num-small">{t.numSmall}</span> : null}
              </div>
              <div className="d8-trust-label">{t.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* S5 — Why + checklist */}
      <section className="d8-section d8-why">
        <motion.h2 className="d8-h2" {...reveal()}>
          {why.title} <em>{why.titleEm}</em>
        </motion.h2>
        <motion.p className="d8-lede" {...reveal(0.05)}>{why.lede}</motion.p>
        <ul className="d8-checklist">
          {why.items.map((item, i) => (
            <motion.li className="d8-check-item" key={item} {...reveal(i * 0.08)}>
              <CheckIcon />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* S6 — Story */}
      <section className="d8-section">
        <motion.div className="d8-story-card" {...reveal()}>
          <h2 className="d8-h2">
            {story.title} <em>{story.titleEm}</em>
          </h2>
          {story.paragraphs.map((p, i) => (
            <p className="d8-body" key={i}>{p}</p>
          ))}
          <motion.a className="d8-btn d8-btn-ghost" href="#pricing" {...buttonMotion}>
            {CTA_LABEL}
          </motion.a>
        </motion.div>
      </section>

      {/* S7 — Pricing */}
      <section className="d8-section d8-pricing" id="pricing">
        <motion.span className="d8-kicker" {...reveal()}>{pricing.kicker}</motion.span>
        <motion.h2 className="d8-h2" {...reveal(0.05)}>
          {pricing.title} <em>{pricing.titleEm}</em>
        </motion.h2>
        <motion.p className="d8-lede" {...reveal(0.1)}>{pricing.lede}</motion.p>

        <div className="d8-tiers">
          {tiers.map((tier, i) => (
            <motion.div
              className={`d8-tier${tier.featured ? " d8-tier-featured" : ""}`}
              key={tier.name}
              {...reveal(i * 0.1)}
            >
              {tier.ribbon ? <span className="d8-ribbon">{tier.ribbon}</span> : null}
              <h3 className="d8-tier-name">{tier.name}</h3>
              <p className="d8-tier-sub">{tier.sub}</p>
              <div className="d8-tier-amount">₪{tier.amount}</div>
              <div className="d8-tier-terms">{tier.terms}</div>
              <ul className="d8-tier-features">
                {tier.features.map((f) => (
                  <li key={f}>
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                className={`d8-btn ${tier.featured ? "d8-btn-primary" : "d8-btn-ghost"} d8-tier-btn`}
                href={tier.payLink}
                target="_blank"
                rel="noopener noreferrer"
                {...buttonMotion}
              >
                {CTA_LABEL}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.div className="d8-wa-block" {...reveal(0.1)}>
          <p className="d8-wa-lede">{pricing.waLede}</p>
          <motion.a className="d8-btn d8-btn-wa" href={WA_LINK} target="_blank" rel="noopener noreferrer" {...buttonMotion}>
            <WhatsAppIcon />
            <span>{pricing.waLabel}</span>
          </motion.a>
        </motion.div>
      </section>

      {/* S8 — MidCta */}
      <section className="d8-section">
        <motion.div className="d8-midcta" {...reveal()}>
          <h2 className="d8-h2">
            {midCta.title} <em>{midCta.titleEm}</em>
          </h2>
          <p className="d8-body">{midCta.body}</p>
        </motion.div>
      </section>

      {/* S9 — Benefits */}
      <section className="d8-section d8-benefits">
        <motion.h2 className="d8-h2" {...reveal()}>
          {benefits.title} <em>{benefits.titleEm}</em>
        </motion.h2>
        <motion.p className="d8-lede" {...reveal(0.05)}>{benefits.lede}</motion.p>
        <div className="d8-benefit-grid">
          {benefits.items.map((b, i) => (
            <motion.div className="d8-benefit-card" key={b.num} {...reveal(i * 0.1)}>
              <div className="d8-benefit-num">{b.num}</div>
              <h3 className="d8-benefit-title">{b.title}</h3>
              <p className="d8-body">{b.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.a className="d8-btn d8-btn-ghost d8-center-btn" href="#pricing" {...buttonMotion}>
          {CTA_LABEL}
        </motion.a>
      </section>

      {/* S10 — About Anna */}
      <section className="d8-section d8-about">
        <motion.div className="d8-about-inner" {...reveal()}>
          <div className="d8-about-photo">
            <img src={aboutAnna.photo} alt={aboutAnna.photoAlt} />
          </div>
          <div className="d8-about-text">
            <h2 className="d8-h2">
              {aboutAnna.title} <em>{aboutAnna.titleEm}</em>
            </h2>
            {aboutAnna.paragraphs.map((p, i) => (
              <p className="d8-body" key={i}>{p}</p>
            ))}
            <p className="d8-signature">{aboutAnna.signature}</p>
          </div>
        </motion.div>
      </section>

      {/* S11 — FAQ accordion */}
      <section className="d8-section d8-faq">
        <motion.span className="d8-kicker" {...reveal()}>{faq.kicker}</motion.span>
        <motion.h2 className="d8-h2" {...reveal(0.05)}>
          {faq.title} <em>{faq.titleEm}</em>
        </motion.h2>
        <div className="d8-faq-list">
          {faq.items.map((item, idx) => {
            const open = openIdx === idx;
            return (
              <div className={`d8-faq-item${open ? " d8-faq-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="d8-faq-q"
                  aria-expanded={open}
                  onClick={() => toggleFaq(idx)}
                  onKeyDown={(e) => onFaqKey(e, idx)}
                >
                  <span>{item.q}</span>
                  <motion.span
                    className="d8-faq-chevron"
                    animate={reduced ? undefined : { rotate: open ? 180 : 0 }}
                    transition={spring}
                  >
                    <ChevronIcon />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      className="d8-faq-a-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reduced ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="d8-faq-a">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* S12 — Final lead CTA */}
      <section className="d8-section d8-lead">
        <motion.div className="d8-lead-card" {...reveal()}>
          <h2 className="d8-h2 d8-lead-title">
            {lead.title} <em>{lead.titleEm}</em> {lead.titleAfter}
          </h2>
          <p className="d8-lede">{lead.lede}</p>
          <div className="d8-lead-btns">
            <motion.a className="d8-btn d8-btn-primary" href={PAY_LINK} target="_blank" rel="noopener noreferrer" {...buttonMotion}>
              {CTA_LABEL}
            </motion.a>
            <motion.a className="d8-btn d8-btn-wa" href={WA_LINK} target="_blank" rel="noopener noreferrer" {...buttonMotion}>
              <WhatsAppIcon />
              <span>{pricing.waLabel}</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* S13 — Footer */}
      <footer className="d8-footer">
        <nav className="d8-footer-nav">
          <a href="/">דף הבית</a>
          <span aria-hidden="true">|</span>
          <a href="compass.html">קורס מצפן הנשמה</a>
          <span aria-hidden="true">|</span>
          <a href="shoresh.html">קורס שורש הנשמה</a>
        </nav>
        <p className="d8-footer-small">אור הנשמה · אנה אשכנזי</p>
      </footer>

      {/* S14 — Sticky mobile CTA */}
      <AnimatePresence>
        {showStickyMobile ? (
          <motion.div
            className="d8-sticky-mobile"
            initial={reduced ? false : { y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
            transition={spring}
          >
            <a className="d8-btn d8-btn-primary d8-sticky-btn" href="#pricing">
              {CTA_LABEL}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
