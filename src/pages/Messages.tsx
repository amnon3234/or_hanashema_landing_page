import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CosmicShell, Reveal, WhatsAppIcon, CzLink } from "../design3/Cosmic";
import "./Messages.css";

// ─── Content data ─────────────────────────────────────────────────────────────

type CardData = {
  id: number;
  num: string;
  numeral: string;
  name: string;
  tagline: string;
  accent: string;
  headline: string;
  body: string;
  intention: string;
};

const CARDS: CardData[] = [
  {
    id: 1,
    num: "I",
    numeral: "I",
    name: "דלת",
    tagline: "לא כל דלת סגורה היא סימן לעצור",
    accent: "#6f8479",
    headline: "לפעמים הדלת לא נפתחת כי את מנסה להיכנס בדרך הישנה.",
    body: "לפעמים כשדלת לא נפתחת, זה לא כי התשובה היא ״לא״. זה כי את מנסה להיכנס אליה באותה דרך ישנה. השבוע תבדקי איפה את חוזרת שוב ושוב על אותה פעולה ומצפה לתוצאה אחרת. אולי הבעיה היא לא הרצון שלך, אלא הדרך שבה את מנסה להגיע אליו.",
    intention: "אל תוותרי מהר, תשני גישה.",
  },
  {
    id: 2,
    num: "II",
    numeral: "II",
    name: "להיות",
    tagline: "את לא פרויקט שצריך לשפר בלי סוף",
    accent: "#c9a96a",
    headline: "לא כל רגש צריך להפוך לשיעור, ולא כל תחושה לעבודה פנימית.",
    body: "התפתחות והתבוננות פנימית הן חשובות, אבל לפעמים אנחנו כל כך רגילות לנתח כל רגש, כל תגובה וכל מחשבה שאנחנו שוכחות פשוט להיות. לא צריך לנתח כל דבר ולא כל תחושה צריכה להפוך לשיעור עמוק. לפעמים חלק מהעבודה הפנימית הוא דווקא לעצור, לנוח, לצחוק, לנשום ולהיות נוכחת ברגע, בלי לפרק אותו לגורמים ובלי לנסות מיד ״להבין מה זה אומר״. האיזון האמיתי הוא לדעת מתי להתבונן פנימה, ומתי להרפות מהצורך לפרק כל רגש וכל מחשבה.",
    intention: "את לא פרויקט שצריך לשפר בלי סוף. לפעמים ההתפתחות הכי עמוקה קורית דווקא כשאת מרשה לעצמך פשוט להיות.",
  },
  {
    id: 3,
    num: "III",
    numeral: "III",
    name: "מתנה",
    tagline: "יש משהו שאת מקטינה כי הוא בא לך בקלות",
    accent: "#a07ec1",
    headline: "דווקא מה שקל לך לעשות, יכול להיות מה שמישהו אחר מחפש ממך.",
    body: "שימי לב לאיזה כישרון, יכולת או מתנה את מתייחסת כמובן מאליו. דווקא הדבר שקל לך לעשות, יכול להיות הדבר שמישהו אחר מחפש ממך. לא כל ערך חייב להגיע דרך מאמץ, קושי או הוכחה. לפעמים מה שטבעי לך הוא בדיוק המקום שבו את אמורה לתת יותר מקום לעצמך.",
    intention: "אל תזלזלי במה שלא דרש ממך להילחם כדי לקבל אותו.",
  },
];

const FOOTER = [
  { label: "דף הבית", href: "/" },
  { label: "קורס מצפן הנשמה", href: "/compass" },
  { label: "מפה נומרולוגית", href: "/map" },
  { label: "מדיניות פרטיות", href: "/privacy" },
];

const WA_HREF =
  "https://wa.me/972585577021?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A0%D7%94%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%A2%D7%9E%D7%95%D7%93%20%D7%A9%D7%9C%20%D7%94%D7%A7%D7%9C%D7%A4%D7%99%D7%9D%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93.";

// ─── Card back SVG ────────────────────────────────────────────────────────────

function CardBack({ idx }: { idx: number }): JSX.Element {
  const gradId = `msg-grad-${idx}`;
  const glowId = `msg-glow-${idx}`;
  return (
    <svg
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="msg-card__back"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="#3a2282" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#f0c97d" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f0c97d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="320" fill={`url(#${gradId})`} />
      <rect width="200" height="320" fill={`url(#${glowId})`} />
      <rect x="10" y="10" width="180" height="300" rx="4" fill="none" stroke="#f0c97d" strokeWidth="0.6" opacity="0.45" />
      <rect x="16" y="16" width="168" height="288" rx="2" fill="none" stroke="#d946a8" strokeWidth="0.5" opacity="0.3" />
      <g opacity="0.55">
        <circle cx="100" cy="38" r="1.8" fill="#f0c97d" />
        <line x1="60" y1="38" x2="92" y2="38" stroke="#f0c97d" strokeWidth="0.6" />
        <line x1="108" y1="38" x2="140" y2="38" stroke="#f0c97d" strokeWidth="0.6" />
      </g>
      <g transform="translate(100, 160)">
        <circle r="58" fill="none" stroke="#f0c97d" strokeWidth="0.8" opacity="0.35" />
        <circle r="48" fill="none" stroke="#d946a8" strokeWidth="0.5" opacity="0.3" />
        <g opacity="0.45" stroke="#f0c97d" strokeWidth="0.8">
          <line x1="0" y1="-70" x2="0" y2="-62" />
          <line x1="0" y1="62" x2="0" y2="70" />
          <line x1="-70" y1="0" x2="-62" y2="0" />
          <line x1="62" y1="0" x2="70" y2="0" />
          <line x1="49" y1="-49" x2="44" y2="-44" />
          <line x1="-49" y1="-49" x2="-44" y2="-44" />
          <line x1="49" y1="49" x2="44" y2="44" />
          <line x1="-49" y1="49" x2="-44" y2="44" />
        </g>
        <circle r="36" fill="none" stroke="#f0c97d" strokeWidth="0.5" opacity="0.3" />
        <circle r="28" fill="rgba(240,201,125,0.05)" stroke="#d946a8" strokeWidth="0.4" opacity="0.4" />
        <text y="13" textAnchor="middle" fontFamily="Frank Ruhl Libre, serif" fontSize="42" fill="#f0c97d" opacity="0.85">
          {idx}
        </text>
      </g>
      <g opacity="0.55">
        <circle cx="100" cy="282" r="1.8" fill="#f0c97d" />
        <line x1="60" y1="282" x2="92" y2="282" stroke="#f0c97d" strokeWidth="0.6" />
        <line x1="108" y1="282" x2="140" y2="282" stroke="#f0c97d" strokeWidth="0.6" />
      </g>
      <text x="100" y="302" textAnchor="middle" fontFamily="Frank Ruhl Libre, serif" fontSize="8" fill="#f0c97d" opacity="0.6" letterSpacing="3">
        אנה אשכנזי
      </text>
      <circle cx="36" cy="80" r="1.2" fill="#f0c97d" opacity="0.4" />
      <circle cx="164" cy="100" r="1" fill="#d946a8" opacity="0.5" />
      <circle cx="32" cy="200" r="1" fill="#d946a8" opacity="0.35" />
      <circle cx="168" cy="220" r="1.2" fill="#f0c97d" opacity="0.4" />
      <circle cx="48" cy="260" r="1" fill="#f0c97d" opacity="0.4" />
      <circle cx="152" cy="60" r="1" fill="#f0c97d" opacity="0.35" />
    </svg>
  );
}

// ─── Float animation variants ─────────────────────────────────────────────────

function floatVariants(i: number) {
  const isMiddle = i === 1;
  return {
    animate: isMiddle
      ? { y: ["-6px", "-14px", "-6px"], rotate: [0, 0, 0] }
      : { y: ["0px", "-8px", "0px"], rotate: [i === 0 ? -1.5 : 1.5, i === 0 ? 1.5 : -1.5, i === 0 ? -1.5 : 1.5] },
    transition: {
      duration: isMiddle ? 3.8 : 4.4,
      delay: i * 0.6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };
}

// ─── TarotCard component ──────────────────────────────────────────────────────

type TarotCardProps = {
  card: CardData;
  idx: number;
  picked: number | null;
  onPick: (id: number) => void;
  reduced: boolean;
};

function TarotCard({ card, idx, picked, onPick, reduced }: TarotCardProps): JSX.Element {
  const isFlipped = picked === card.id;
  const isDisabled = picked !== null && picked !== card.id;
  const { animate, transition } = floatVariants(idx);

  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && picked === null) {
      e.preventDefault();
      onPick(card.id);
    }
  };

  return (
    <motion.button
      className="msg-card"
      type="button"
      aria-label={`בחרי קלף ${card.name}`}
      aria-pressed={isFlipped}
      disabled={isDisabled}
      onClick={() => picked === null && onPick(card.id)}
      onKeyDown={handleKey}
      style={{ transformStyle: "preserve-3d" }}
      // Idle float (stop when picked)
      animate={
        reduced
          ? {}
          : isFlipped
          ? { rotateY: 180, y: -6, scale: 1.04 }
          : isDisabled
          ? { opacity: 0.2, y: 4, scale: 0.92, rotateY: 0 }
          : { ...animate, rotateY: 0 }
      }
      transition={
        isFlipped || isDisabled
          ? { rotateY: { duration: 0.95, ease: [0.4, 0, 0.2, 1] }, scale: { duration: 0.5 }, y: { duration: 0.5 } }
          : transition
      }
      whileHover={reduced || picked !== null ? {} : { y: -14, scale: 1.06 }}
      whileFocus={reduced || picked !== null ? {} : { scale: 1.03 }}
    >
      {/* Back face */}
      <div className="msg-card__face" aria-hidden="true">
        <CardBack idx={idx + 1} />
      </div>
      {/* Front face (revealed) */}
      <div className="msg-card__face msg-card__front" aria-hidden={!isFlipped}>
        <div className="msg-card__front-frame">
          <span className="msg-card__num">{card.num}</span>
          <h3 className="msg-card__name">{card.name}</h3>
          <span className="msg-card__divider" />
          <p className="msg-card__tagline">{card.tagline}</p>
        </div>
      </div>
    </motion.button>
  );
}

// ─── RevealPanel component ────────────────────────────────────────────────────

function RevealPanel({ card, reduced }: { card: CardData; reduced: boolean }): JSX.Element {
  return (
    <AnimatePresence>
      <motion.div
        key={card.id}
        className="msg-reveal"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
      >
        <div className="msg-reveal__inner cz-glass">
          <div
            className="msg-reveal__accent-bar"
            style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
            aria-hidden="true"
          />
          <p className="msg-reveal__kicker">המסר שלך</p>
          <p className="msg-reveal__num">{card.numeral}</p>
          <h2 className="msg-reveal__name">{card.name}</h2>
          <div className="msg-reveal__divider" />
          <p className="msg-reveal__hl" style={{ color: card.accent }}>{card.headline}</p>
          <p className="msg-reveal__body">{card.body}</p>
          <p className="msg-reveal__intention" style={{ borderInlineEndColor: card.accent }}>
            <span className="msg-reveal__intention-label" style={{ color: card.accent }}>
              המסר שלך
            </span>
            {card.intention}
          </p>
          <p className="msg-reveal__footer">
            <strong>מסר חדש בכל מוצ״ש.</strong>
            <br />
            שמרי את העמוד הזה ותחזרי בשבוע הבא 🌙
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Messages(): JSX.Element {
  const [picked, setPicked] = useState<number | null>(null);
  const reduced = useReducedMotion() ?? false;

  const pickedCard = CARDS.find((c) => c.id === picked) ?? null;

  function handlePick(id: number) {
    setPicked(id);
    // Scroll to reveal after flip animation
    setTimeout(() => {
      document.getElementById("msg-reveal-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, reduced ? 200 : 1200);
  }

  function handleReset() {
    setPicked(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <CosmicShell
      header={{ ctaLabel: "עוד על אנה", ctaHref: "#msg-bridge" }}
      footerLinks={FOOTER}
      sticky={picked !== null ? { label: "כתבי לי בוואטסאפ", href: WA_HREF } : undefined}
    >
      {/* ── Hero ── */}
      <section className="cz-section msg-hero">
        <div className="cz-wrap">
          <Reveal>
            <p className="cz-eyebrow">המסר השבועי שלך</p>
          </Reveal>
          <p className="msg-hero__sparkles" aria-hidden="true">✦ &nbsp; ✦ &nbsp; ✦</p>
          <Reveal>
            <h1 className="cz-h2">
              סמכי על{" "}
              <em className="cz-h2-em">האינטואיציה שלך</em>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="cz-lede" style={{ margin: "0 auto", textAlign: "center" }}>
              אל תחשבי, בחרי את הקלף שמושך אותך.
            </p>
          </Reveal>
          {picked === null && (
            <p className="msg-hero__hint" aria-live="polite">↓ &nbsp; בחרי אחד &nbsp; ↓</p>
          )}
        </div>
      </section>

      {/* ── Cards arena ── */}
      <section className="msg-arena" aria-label="בחרי קלף">
        <div className="msg-arena__inner">
          {CARDS.map((card, i) => (
            <TarotCard
              key={card.id}
              card={card}
              idx={i}
              picked={picked}
              onPick={handlePick}
              reduced={reduced}
            />
          ))}
        </div>
        {picked !== null && (
          <button
            className="msg-reset"
            type="button"
            onClick={handleReset}
            aria-label="בחרי קלף אחר מחדש"
          >
            ↺ &nbsp; בחרי שוב
          </button>
        )}
      </section>

      {/* ── Reveal panel ── */}
      <section id="msg-reveal-section" className="cz-section" aria-live="polite" aria-atomic="true">
        {pickedCard && <RevealPanel card={pickedCard} reduced={reduced} />}
      </section>

      {/* ── Bridge / about Anna ── */}
      <section className="cz-section cz-band msg-bridge" id="msg-bridge">
        <div className="cz-wrap">
          <Reveal>
            <div className="msg-bridge__avatar">
              <img src="/assets/anna-portrait.jpg" alt="אנה אשכנזי · אנה אשכנזי" loading="lazy" width={96} height={96} />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="cz-kicker">מרחב לעומק</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="cz-h2">
              אם המסר נגע בך,{" "}
              <em className="cz-h2-em">סימן שאת מוכנה להעמיק.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="cz-lede" style={{ margin: "0 auto 0" }}>
              המסר השבועי נותן הצצה קטנה. המפה הנומרולוגית האישית שלך פותחת את כל התמונה: הכיוון שלך, החוזקות שלך והדרך שמחכה לך.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="msg-bridge__actions">
              <CzLink href="/map" className="cz-btn cz-btn--gold cz-btn--lg">
                גלי את המפה שלך <span aria-hidden="true">←</span>
              </CzLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WhatsApp section ── */}
      <section className="cz-section msg-wa-section">
        <div className="cz-wrap">
          <Reveal>
            <p className="cz-kicker">יש לך שאלה?</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="cz-h2">כתבי לי <em className="cz-h2-em">בוואטסאפ</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="cz-lede">
              בא לך לשאול עוד על הקורסים, על המסר שקיבלת או על משהו אחר?
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CzLink href={WA_HREF} className="cz-btn cz-btn--wa cz-btn--lg" aria-label="שלחי הודעה בוואטסאפ">
              <WhatsAppIcon size={22} />
              058-557-7021 · WhatsApp
            </CzLink>
          </Reveal>
        </div>
      </section>
    </CosmicShell>
  );
}
