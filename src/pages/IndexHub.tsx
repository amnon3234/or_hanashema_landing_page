import "./IndexHub.css";
import { motion, useReducedMotion } from "framer-motion";
import {
  CosmicShell,
  Reveal,
  revealContainer,
  revealItem,
  WhatsAppIcon,
  CzLink,
  LogoMark,
} from "../design3/Cosmic";

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV = [
  { label: "הקורס", href: "/compass" },
  { label: "מפה נומרולוגית", href: "/map" },
  { label: "התדר שלך", href: "/frequency" },
];

// ─── SVG icons ───────────────────────────────────────────────────────────────

function IconCompass(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function IconMap(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

function IconFrequency(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M2 12h2l3-8 4 16 3-10 2 2h6" />
    </svg>
  );
}

function IconHeart(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconFlower(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
      <path d="M12 14a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
      <path d="M2 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
      <path d="M14 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
    </svg>
  );
}

function IconCard(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function IconArrowLeft(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type PortalCardProps = {
  href: string;
  title: string;
  blurb: string;
  label: string;
  icon: JSX.Element;
  variant: "primary" | "gold" | "blue" | "rose" | "teal";
  isFree?: boolean;
};

// ─── PortalCard ───────────────────────────────────────────────────────────────

function PortalCard({ href, title, blurb, label, icon, variant, isFree }: PortalCardProps): JSX.Element {
  const reduced = useReducedMotion() ?? false;

  const variantClass = variant === "primary" ? "" : `hub-card--${variant}`;

  return (
    <motion.li
      variants={revealItem}
      whileHover={reduced ? {} : { y: -6, boxShadow: "0 16px 48px rgba(124,77,255,0.25)" }}
      whileTap={reduced ? {} : { scale: 0.98 }}
      style={{ borderRadius: 24 }}
    >
      <CzLink href={href} className={`hub-card cz-glass ${variantClass}`} aria-label={title}>
        <div className="hub-card__inner">
          {isFree && <span className="hub-badge">חינמי</span>}
          <div className="hub-card__icon">{icon}</div>
          <p className="hub-card__label">{label}</p>
          <h3 className="hub-card__title">{title}</h3>
          <p className="hub-card__blurb">{blurb}</p>
          <span className="hub-card__cta" aria-hidden="true">
            כניסה לחוויה <IconArrowLeft />
          </span>
        </div>
      </CzLink>
    </motion.li>
  );
}

// ─── IndexHub ─────────────────────────────────────────────────────────────────

/** The luminous home/hub for אנה אשכנזי — gateway to all experiences. */
export default function IndexHub(): JSX.Element {
  const reduced = useReducedMotion() ?? false;

  return (
    <CosmicShell
      header={{ nav: NAV }}
    >

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hub-hero" aria-labelledby="hub-hero-title">
        <Reveal>
          <LogoMark size={96} className="hub-hero__logo" />
        </Reveal>

        <Reveal as="span" className="cz-eyebrow">
          אנה אשכנזי · מצפן הנשמה<sup style={{ fontSize: "0.6em", verticalAlign: "top" }}>®</sup>
        </Reveal>

        <Reveal>
          <h1 id="hub-hero-title" className="hub-hero__title">
            כל נשמה נושאת{" "}
            <em className="cz-h2-em">מפה</em>
            {" "}פנימית משלה
          </h1>
        </Reveal>

        <Reveal>
          <p className="hub-hero__sub">
            נומרולוגיה היא שפת הנשמה. כאן תלמדי לקרוא את עצמך, להבין את הדפוסים שמניעים אותך, ולחיות בהתאם למי שאת באמת.
          </p>
        </Reveal>

        <Reveal>
          <div className="hub-hero__cta-row">
            <motion.div
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={reduced ? {} : { scale: 0.96 }}
              style={{ display: "inline-flex" }}
            >
              <CzLink href="/compass" className="cz-btn cz-btn--primary cz-btn--lg">
                הקורס המרכזי
              </CzLink>
            </motion.div>
            <motion.div
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={reduced ? {} : { scale: 0.96 }}
              style={{ display: "inline-flex" }}
            >
              <CzLink href="/map" className="cz-btn cz-btn--ghost cz-btn--lg">
                המפה הנומרולוגית שלי
              </CzLink>
            </motion.div>
          </div>
        </Reveal>

        <div className="hub-hero__divider" aria-hidden="true" />
      </section>

      {/* ── Primary offerings: course + map ───────────────────────────────── */}
      <section className="hub-section" aria-labelledby="hub-primary-title">
        <div className="hub-section__header">
          <Reveal as="span" className="cz-eyebrow">
            הקורס והמפה
          </Reveal>
          <Reveal>
            <h2 id="hub-primary-title" className="hub-section__title">
              ההצעות <em className="cz-h2-em">המרכזיות</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="hub-section__sub">
              שתי דרכים להיכנס פנימה - אחת מעמיקה דרך לימוד, השנייה אישית ומדויקת.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="hub-grid hub-grid--primary"
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <PortalCard
            href="/compass"
            variant="primary"
            label="קורס חי · עשרה מפגשים"
            title="קורס מצפן הנשמה®"
            blurb="ללמוד לקרוא כל אדם דרך מספריו - לא שינון, אלא חיבור בין דפוסים, כוחות וקונפליקטים פנימיים. המחזור בעיצומו, הצטרפי לרשימה למחזור הבא."
            icon={<IconCompass />}
            isFree={false}
          />
          <PortalCard
            href="/map"
            variant="gold"
            label="מפה אישית כתובה"
            title="מפה נומרולוגית אישית"
            blurb="ניתוח נומרולוגי מלא ומדויק שנכתב עבורך ועבורך בלבד - מי את, מה הכוחות שלך, ולאן מצביעה הדרך שלפנייך."
            icon={<IconMap />}
            isFree={false}
          />
        </motion.ul>
      </section>

      {/* ── Free experiences ───────────────────────────────────────────────── */}
      <section className="hub-section" aria-labelledby="hub-free-title">
        <div className="hub-section__header">
          <Reveal as="span" className="cz-eyebrow">
            חוויות חינמיות
          </Reveal>
          <Reveal>
            <h2 id="hub-free-title" className="hub-section__title">
              גלי את <em className="cz-h2-em">התדר שלך</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="hub-section__sub">
              ארבע דלתות פתוחות לנסות, לגעת, לגלות - ללא תשלום, ללא התחייבות.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="hub-grid hub-grid--free"
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <PortalCard
            href="/frequency"
            variant="blue"
            label="גילוי אישי"
            title="התדר שלך"
            blurb="גלי את האנרגיה שאנשים מרגישים בנוכחותך - ואיך המספר שלך מגדיר את הרושם שאת משאירה."
            icon={<IconFrequency />}
            isFree
          />
          <PortalCard
            href="/zug"
            variant="rose"
            label="כימיה זוגית"
            title="התדר הזוגי שלכם"
            blurb="מה הקסם ומה המאתגר בקשר שלכם? הכניסי שני מספרים, וגלי את האנרגיה שנוצרת ביניכם."
            icon={<IconHeart />}
            isFree
          />
          <PortalCard
            href="/bsamim"
            variant="teal"
            label="משחק חושי"
            title="הבושם של המספר שלך"
            blurb="כל מספר נושא ארומה. גלי איזה בושם מייצג את נשמתך - חוויה קטנה ומפתיעה שמחכה לך."
            icon={<IconFlower />}
            isFree
          />
          <PortalCard
            href="/messages"
            variant="primary"
            label="מסר שבועי"
            title="מסר השבוע"
            blurb="בחרי קלף, קבלי מסר. כלי קטן לפתיחת השבוע עם כוונה, בהירות וחיבור לעצמך."
            icon={<IconCard />}
            isFree
          />
        </motion.ul>
      </section>

      {/* ── About Anna ────────────────────────────────────────────────────── */}
      <section className="hub-about" aria-labelledby="hub-about-title">
        <Reveal>
          <div className="hub-about__inner cz-glass" style={{ padding: "40px 36px", borderRadius: 24 }}>
            <img
              src="/assets/anna-portrait.jpg"
              alt="אנה אשכנזי, נומרולוגית ומפתחת שיטת מצפן הנשמה"
              className="hub-about__portrait"
              width={140}
              height={140}
              loading="lazy"
              decoding="async"
            />
            <div className="hub-about__text">
              <h2 id="hub-about-title" className="hub-about__name">אנה אשכנזי</h2>
              <p className="hub-about__role">נומרולוגית · מפתחת שיטת מצפן הנשמה®</p>
              <p className="hub-about__bio">
                שנים של לימוד, תרגול וליווי אנשים הובילו אנה לפתח מתודולוגיה ייחודית שמחברת נומרולוגיה לפסיכולוגיה פנימית. לא עוד ניחושים - אלא שפה מדויקת שמאפשרת לראות את עצמך ואת האחרים בצורה חדשה.
              </p>
              <motion.div
                whileHover={reduced ? {} : { scale: 1.04 }}
                whileTap={reduced ? {} : { scale: 0.96 }}
                style={{ display: "inline-flex" }}
              >
                <CzLink
                  href={`https://wa.me/972500000000?text=${encodeURIComponent("שלום אנה, רציתי לשאול על הקורס")}`}
                  className="cz-btn cz-btn--wa"
                  aria-label="שלחי הודעה לאנה ב-WhatsApp"
                >
                  <WhatsAppIcon size={18} />
                  שלחי הודעה לאנה
                </CzLink>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────────────────────── */}
      <section className="hub-wa" aria-labelledby="hub-wa-title">
        <Reveal>
          <div className="hub-wa__glass cz-glass">
            <h2 id="hub-wa-title" className="hub-wa__title">
              יש לך שאלה? <em className="cz-h2-em">בואי נדבר</em>
            </h2>
            <p className="hub-wa__sub">
              אנה עונה אישית. כתבי לה בוואטסאפ ותקבלי תשובה אמיתית.
            </p>
            <motion.div
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={reduced ? {} : { scale: 0.96 }}
              style={{ display: "inline-flex" }}
            >
              <CzLink
                href={`https://wa.me/972500000000?text=${encodeURIComponent("שלום אנה, רציתי לשמוע עוד על מצפן הנשמה")}`}
                className="cz-btn cz-btn--wa cz-btn--lg"
                aria-label="פתחי שיחה עם אנה ב-WhatsApp"
              >
                <WhatsAppIcon size={20} />
                WhatsApp עם אנה
              </CzLink>
            </motion.div>
          </div>
        </Reveal>
      </section>

    </CosmicShell>
  );
}
