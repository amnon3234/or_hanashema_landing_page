import "./Frequency.css";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CosmicShell,
  Reveal,
  revealContainer,
  revealItem,
  WhatsAppIcon,
  CzLink,
} from "../design3/Cosmic";

// ─── Types & data ──────────────────────────────────────────────────────────

type FrequencyProfile = {
  num: number;
  accent: string;
  tint: string;
  label: string;
  kicker: string;
  title: string;
  body: string[];
};

const PROFILES: FrequencyProfile[] = [
  {
    num: 1, accent: "#d8b06a", tint: "#d8b06a", label: "עצמאות",
    kicker: "ביטחון · עצמאות · נוכחות",
    title: "נוכחות חזקה של אישה שיודעת מי היא",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, הם קולטים ממך נוכחות חזקה. את משדרת ביטחון, עצמאות ותחושה שאת יודעת מי את, גם כשבפנים את לא תמיד מרגישה ככה.",
      "גם אם את לא אומרת הרבה, יש בך משהו שמשדר \"אני יודעת לעמוד על שלי\". הרושם הראשוני שלך הוא של אישה עצמאית, ברורה, עם דעה, כיוון ואופי. אנשים יכולים להרגיש שאת לא אחת שקל להזיז, לשכנע או לערער.",
      "לפעמים זה מושך אלייך אנשים, ולפעמים זה גם קצת מאיים עליהם. זה יכול לגרום להם לחשוב שאת קשה, מרוחקת או לא צריכה אף אחד.",
      "אבל האמת היא שמתחת לעוצמה הזאת יש ילדה פנימית שרוצה שיראו אותה גם ברגעים שהיא לא חזקה. מה שלא תמיד רואים מיד, זה שיש בך גם צד רגיש מאוד שרוצה שיבינו אותו בלי שתצטרכי להוריד את כל ההגנות.",
    ],
  },
  {
    num: 2, accent: "#e0a3b4", tint: "#e0a3b4", label: "רכות",
    kicker: "רכות · רגישות · אינטואיציה",
    title: "רכות, קשב ולב פתוח",
    body: [
      "כשאנשים פוגשים אותך, הם מרגישים ממך רכות. יש בך משהו עדין, נעים, קשוב ואינטואיטיבי, שגורם לאנשים להרגיש שאת קולטת אותם בלי שהם צריכים להסביר יותר מדי. הם מרגישים שאפשר להיפתח לידך.",
      "הרושם הראשוני שלך הוא של אישה רגישה, נעימה, מכילה, עם לב פתוח ויכולת לראות בין השורות. אנשים קולטים שאת שמה לב לפרטים קטנים, לטון, למבט ולאנרגיה בחדר. את לא תמיד צריכה לדבר הרבה כדי שאנשים ירגישו לידך בנוח.",
      "אבל לפעמים, בגלל הרגישות הזו, אנשים עלולים לחשוב שאת פחות חזקה ממה שאת באמת. אבל האמת היא שהכוח שלך נמצא דווקא ביכולת שלך להרגיש לעומק.",
    ],
  },
  {
    num: 3, accent: "#ecae7e", tint: "#ecae7e", label: "קלילות",
    kicker: "קלילות · יצירתיות · חברותיות",
    title: "אנרגיה חיה, צבעונית ומסקרנת",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, הם מרגישים ממך אנרגיה נעימה שמושכת תשומת לב. יש בך משהו חי, קליל, מסקרן ומלא צבע, שגורם לאנשים לרצות להתקרב, לדבר איתך או להבין מי את.",
      "גם אם את לא מנסה להיות במרכז, יש בך נוכחות שמרגישים אותה. הרושם הראשוני שלך הוא של אישה מעניינת, חברותית, יצירתית, עם יכולת להכניס אווירה אחרת למקום.",
      "אנשים יכולים להרגיש שאת מביאה איתך קלילות, הומור, פתיחות ויכולת לגרום לאחרים להרגיש יותר בנוח. יש בך משהו שמשחרר את האווירה וגורם לאנשים להרגיש שפחות צריך להתאמץ לידך.",
      "לפעמים זה מושך אלייך אנשים, כי הם מרגישים שקל להיות לידך. אבל לפעמים זה גם גורם להם לחשוב שאת תמיד שמחה, תמיד זורמת, או שאין מאחורי הקלילות הזאת עומק אמיתי.",
      "אבל האמת היא שמאחורי החיוך, ההומור והיכולת שלך להרים אנרגיה, יש עולם רגשי מאוד עמוק. מה שלא תמיד רואים מיד, זה שלפעמים את משתמשת בקלילות כדי לא להראות כמה את מרגישה בפנים.",
    ],
  },
  {
    num: 4, accent: "#9fc0ae", tint: "#9fc0ae", label: "יציבות",
    kicker: "אחריות · יציבות · גבולות",
    title: "רצינות, יציבות ועמוד שדרה",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, את משדרת רצינות, אחריות ותחושה שאת יודעת לעמוד על הרגליים גם כשלא פשוט. גם אם את לא מדברת הרבה, יש בך משהו שמשדר \"אפשר לסמוך עליי\". הרושם הראשוני שלך הוא של אישה חזקה, מסודרת, מחושבת, עם גבולות ברורים ועמוד שדרה.",
      "אנשים יכולים להרגיש שאת לא מתפזרת בקלות, שאת בודקת לפני שאת נפתחת, ושאת לא נותנת לכל אחד להיכנס אלייך מהר מדי. יש בך נוכחות שמרגישה יציבה, בוגרת ומאוד מקורקעת.",
      "לפעמים זה מושך אלייך אנשים, כי הם מרגישים לידך ביטחון. אבל לפעמים זה גם גורם להם לחשוב שאת סגורה, נוקשה או פחות רגשית ממה שאת באמת.",
      "אבל האמת היא שמתחת לשליטה ולרצינות יש לב מאוד רגיש, שפשוט צריך להרגיש בטוח לפני שהוא נפתח. את פשוט לא חושפת את עצמך לפני שאת מרגישה שיש קרקע אמיתית.",
    ],
  },
  {
    num: 5, accent: "#c3aee0", tint: "#c3aee0", label: "חופש",
    kicker: "חופש · סקרנות · פתיחות",
    title: "סקרנות, חיים ורוח חופשית",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, את משדרת סקרנות, פתיחות, חיים ותחושה שאי אפשר באמת להכניס אותך לתבנית אחת. יש בך משהו שמרגיש לא צפוי, מעניין ומושך. הרושם הראשוני שלך הוא של אישה שיש לה עולם משלה, קצב משלה, מחשבות משלה, ורצון לחוות את החיים באמת ולא רק \"לעשות מה שצריך\".",
      "אנשים יכולים להרגיש שאת מביאה איתך אוויר חדש, זווית אחרת ותחושה שמשעמם לא יהיה לידך. את לא תמיד הולכת לפי הכללים, וזה חלק ממה שהופך אותך למסקרנת.",
      "לפעמים זה מושך אלייך אנשים, כי הם מרגישים שאת מעירה בהם משהו חי. אבל לפעמים זה גם גורם להם לחשוב שאת לא יציבה, לא רצינית, מתפזרת או שקשה לדעת איפה את עומדת.",
      "אבל האמת היא שאת לא מפחדת ממחויבות, את מפחדת לאבד את עצמך בתוך מסגרת שלא משאירה לך אוויר. את צריכה להרגיש שיש לך מרחב להיות מי שאת.",
    ],
  },
  {
    num: 6, accent: "#e2c79a", tint: "#e2c79a", label: "חום",
    kicker: "חום · נשיות · הכלה",
    title: "אכפתיות, חום ותחושת בית",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, את משדרת אכפתיות, רכות, חום, נשיות ותחושה שיש לידך מקום לנשום. יש בך משהו שגורם לאנשים להרגיש שרואים אותם. הרושם הראשוני שלך הוא של אישה עם לב גדול, נוכחות מרגיעה, יכולת להכיל ואנרגיה שמרגישה קרובה גם בלי הרבה מילים.",
      "אנשים יכולים להרגיש לידך נוחות, ביטחון ורצון להתקרב. יש בך משהו שמזכיר בית (לא במובן הפשוט, אלא בתחושה שאפשר לרגע להוריד הגנות לידך).",
      "לפעמים זה מושך אלייך אנשים, כי הם מרגישים שאת מבינה, מחבקת ומכילה. אבל לפעמים זה גם גורם להם לצפות ממך לתת יותר מדי, להקשיב יותר מדי, לסלוח מהר מדי או להיות זמינה רגשית גם כשאין לך כוח.",
      "אבל זה שיש לך לב גדול, לא אומר שאת צריכה להיות מקום המנוחה של כולם. גם את צריכה שיחזיקו אותך לפעמים, ולא רק שתהיי זו שמחזיקה.",
    ],
  },
  {
    num: 7, accent: "#a99ec4", tint: "#a99ec4", label: "עומק",
    kicker: "עומק · חוכמה · מסתורין",
    title: "שקט, עומק ועולם פנימי עשיר",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, את משדרת שקט, חוכמה, עומק, מסתורין ותחושה שלא קל לקרוא אותך מיד. גם אם את מחייכת ומדברת, יש בך חלק שנשאר שמור לעצמו. הרושם הראשוני שלך הוא של אישה עמוקה, רגישה, אינטואיטיבית, עם עולם פנימי עשיר ויכולת לראות מעבר למה שנאמר בקול.",
      "אנשים יכולים להרגיש שאת בוחנת אנרגיה, שאת לא מתרשמת מכל אחד, ושאת צריכה אמת כדי להיפתח. יש בך משהו שמרגיש חכם, חד ומאוד מחובר פנימה.",
      "לפעמים זה מושך אלייך אנשים, כי הם מרגישים שיש בך משהו אחר, לא שטחי ולא צפוי. אבל לפעמים זה גם גורם להם לחשוב שאת מרוחקת, שיפוטית או לא מעוניינת.",
      "אבל האמת היא שאת לא סגורה, את פשוט לא נפתחת לכל אחד. אבל ברגע שאת מרגישה ביטחון אמיתי, יש בך נאמנות ורגש שלא כל אחד זוכה לראות.",
    ],
  },
  {
    num: 8, accent: "#d98a8a", tint: "#d98a8a", label: "כריזמה",
    kicker: "כריזמה · עוצמה · מנהיגות",
    title: "עוצמה, כריזמה ונוכחות שאי אפשר להתעלם ממנה",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, הם קולטים ממך עוצמה. את משדרת כוח, כריזמה, שליטה עצמית ותחושה שיש לך נוכחות שאי אפשר להתעלם ממנה.",
      "גם אם את שקטה, יש בך משהו שממלא את החדר. הרושם הראשוני שלך הוא של אישה חזקה, שאפתנית, עצמאית, עם סטנדרטים גבוהים ויכולת להוביל.",
      "אנשים יכולים להרגיש שאת יודעת מה את רוצה, שאת לא מתפשרת בקלות, ושיש לך אנרגיה מאוד ברורה. יש בך משהו שמרגיש סמכותי, גם בלי שתנסי להוכיח משהו.",
      "לפעמים זה מושך אלייך אנשים, כי הם מרגישים ממך ביטחון וכוח. אבל לפעמים זה גם מאיים עליהם, ויכול לגרום להם לחשוב שאת קשה, שולטת או \"יותר מדי\".",
      "אבל האמת היא שמתחת לעוצמה הזאת יש גם צורך עמוק להרגיש בטוחה, מוערכת ולא מנוצלת. הכוח שלך לא בא ממקום של התנשאות, הוא בא ממקום של מי שלמדה לא להישבר בקלות.",
    ],
  },
  {
    num: 9, accent: "#7fc3c8", tint: "#7fc3c8", label: "נשמה",
    kicker: "נשמה · חמלה · עומק",
    title: "נשמה, חמלה וחוכמת חיים",
    body: [
      "כשאנשים פוגשים אותך בפעם הראשונה, הם מרגישים ממך נשמה. את משדרת עומק רגשי, חמלה, בגרות וחוכמת חיים שלא תמיד אפשר להסביר במילים.",
      "יש בך משהו שגורם לאנשים להרגיש שאת מבינה כאב גם בלי שיספרו לך את כל הסיפור. הרושם הראשוני שלך הוא של אישה רגישה, עמוקה, רחבת לב, עם יכולת לראות מעבר למסכות של אנשים.",
      "אנשים יכולים להרגיש לידך שיש מקום לאמת, לרגש ולשיחה שלא נשארת רק על פני השטח. יש בך משהו שמרגיש גם רך וגם חזק, כאילו עברת דברים, והם הפכו אותך ליותר חכמה ולא לפחות רגישה.",
      "לפעמים זה מושך אלייך אנשים, כי הם מרגישים שאת רואה אותם באמת. אבל לפעמים זה גם גורם להם לחשוב שאת כבדה, רחוקה, עצובה או קשה לקריאה.",
      "אבל האמת היא שאת פשוט מרגישה הרבה, ולא תמיד קל לך להיות במקומות שטחיים מדי. מה שלא תמיד רואים מיד, זה שבתוך העומק שלך יש גם רצון פשוט לשמוח, להתמסר ולהרגיש שלא הכול חייב להיות כל כך עמוק כל הזמן.",
    ],
  },
];

const FOOTER = [
  { label: "דף הבית", href: "/" },
  { label: "קורס מצפן הנשמה", href: "/compass" },
  { label: "מפה נומרולוגית", href: "/map" },
  { label: "מדיניות פרטיות", href: "/privacy" },
];

const WA_FREQ_HREF =
  "https://wa.me/972585577021?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A0%D7%94%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%A2%D7%9E%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%AA%D7%93%D7%A8%20%D7%A9%D7%9C%D7%99%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93.";

// ─── Hero decoration SVG ───────────────────────────────────────────────────

function HeroDeco() {
  return (
    <div className="frq-hero__deco" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring - wave */}
        <circle
          className="frq-ring--wave"
          cx="200" cy="200" r="180"
          stroke="#d8b06a"
          strokeWidth="1"
          strokeDasharray="8 6"
          opacity="0.4"
        />
        {/* Middle ring - breathe */}
        <circle
          className="frq-ring--breathe"
          cx="200" cy="200" r="140"
          stroke="#d8b06a"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.5"
        />
        {/* Inner ring - glow */}
        <circle
          className="frq-ring--glow"
          cx="200" cy="200" r="90"
          stroke="#d8b06a"
          strokeWidth="2"
          opacity="0.6"
        />
        {/* Stars */}
        <path className="frq-star" d="M200 60 L202 66 L208 66 L203 70 L205 76 L200 72 L195 76 L197 70 L192 66 L198 66 Z" fill="#d8b06a" opacity="0.8" />
        <path className="frq-star" d="M340 200 L342 206 L348 206 L343 210 L345 216 L340 212 L335 216 L337 210 L332 206 L338 206 Z" fill="#d8b06a" opacity="0.7" />
        <path className="frq-star" d="M60 200 L62 206 L68 206 L63 210 L65 216 L60 212 L55 216 L57 210 L52 206 L58 206 Z" fill="#d8b06a" opacity="0.7" />
        <path className="frq-star" d="M200 340 L202 346 L208 346 L203 350 L205 356 L200 352 L195 356 L197 350 L192 346 L198 346 Z" fill="#d8b06a" opacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Tile ─────────────────────────────────────────────────────────────────

function FrequencyTile({
  profile,
  picked,
  onPick,
}: {
  profile: FrequencyProfile;
  picked: number | null;
  onPick: (n: number) => void;
}) {
  const isActive = picked === profile.num;
  const isDim = picked !== null && !isActive;

  function handleClick() {
    if (picked === null) onPick(profile.num);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (picked === null && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onPick(profile.num);
    }
  }

  return (
    <button
      className={`frq-tile${isActive ? " frq-tile--active" : ""}${isDim ? " frq-tile--dim" : ""}`}
      style={{ "--frq-tint": profile.tint } as React.CSSProperties}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isActive}
      aria-label={`תדר ${profile.num} — ${profile.label}`}
      tabIndex={isDim ? -1 : 0}
    >
      <span className="frq-tile__num">{profile.num}</span>
      <span className="frq-tile__lbl">{profile.label}</span>
    </button>
  );
}

// ─── Profile card ──────────────────────────────────────────────────────────

function ProfileCard({ profile }: { profile: FrequencyProfile }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.article
      className="cz-glass frq-profile"
      style={{ "--frq-accent": profile.accent } as React.CSSProperties}
      initial={reduced ? {} : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? {} : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="frq-profile__bar" aria-hidden="true" />
      <div className="frq-profile__head">
        <div className="frq-profile__num" aria-hidden="true">{profile.num}</div>
        <div>
          <p className="frq-profile__kicker">{profile.kicker}</p>
          <h2 className="frq-profile__title">{profile.title}</h2>
        </div>
      </div>
      <div className="frq-profile__body">
        {profile.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="frq-profile__cta">
        <CzLink href="/map" className="cz-btn cz-btn--gold">
          להזמנת מפה נומרולוגית כתובה
        </CzLink>
      </div>
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function Frequency() {
  const [picked, setPicked] = useState<number | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  function handlePick(n: number) {
    if (picked !== null) return;
    setPicked(n);
    setTimeout(() => {
      profileRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 80);
  }

  const activeProfile = PROFILES.find((p) => p.num === picked) ?? null;

  return (
    <CosmicShell
      header={{ ctaLabel: "על המפה הכתובה", ctaHref: "#anna-bridge" }}
      footerLinks={FOOTER}
      sticky={{ label: "כתבי לי בוואטסאפ", href: "https://wa.me/972585577021" }}
    >
      {/* 1. Hero */}
      <section className="cz-section frq-hero" aria-labelledby="frq-hero-title">
        <HeroDeco />
        <div className="cz-wrap frq-hero__content">
          <Reveal>
            <h1 className="frq-hero__title" id="frq-hero-title">
              מה אנשים חושבים עלייך
              <em>כשהם פוגשים אותך בפעם הראשונה?</em>
            </h1>
          </Reveal>

          {picked === null && (
            <Reveal>
              <div className="cz-glass frq-howto" role="note" aria-label="איך מחשבים את התדר שלך">
                <p className="frq-howto__title">איך מחשבים את התדר שלך?</p>
                <div className="frq-howto__row">
                  <span>יום הלידה שלך:</span>
                  <span className="frq-howto__calc">18.02.1999</span>
                </div>
                <div className="frq-howto__row">
                  <span>נוטלים רק את היום:</span>
                  <span className="frq-howto__calc">18</span>
                  <span>→</span>
                  <span className="frq-howto__calc">1 + 8 = 9</span>
                </div>
                <div className="frq-howto__row">
                  <span>התדר שלך:</span>
                  <span className="frq-howto__result">9</span>
                </div>
                <p className="frq-howto__note">אם יצא מספר דו-ספרתי, מחברים שוב עד שמגיעים ל-1 עד 9</p>
              </div>
              <p className="frq-lede-hint">לחצי על התדר שלך ↓</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* 2. Picker grid */}
      <section className="cz-section frq-picker" aria-label="בחרי את התדר שלך">
        <div className="cz-wrap">
          <motion.div
            className={`frq-grid${picked !== null ? " frq-grid--picked" : ""}`}
            variants={reduced ? undefined : revealContainer}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "show"}
            viewport={{ once: true, margin: "-40px" }}
            role="group"
            aria-label="תדרים 1 עד 9"
          >
            {PROFILES.map((profile) => (
              <motion.div key={profile.num} variants={reduced ? undefined : revealItem}>
                <FrequencyTile profile={profile} picked={picked} onPick={handlePick} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Profile reveal */}
      <div className="cz-section frq-profile-wrap" ref={profileRef} aria-live="polite" aria-atomic="true">
        <div className="cz-wrap">
          <AnimatePresence mode="wait">
            {activeProfile && <ProfileCard key={activeProfile.num} profile={activeProfile} />}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Nuance section */}
      <section className="cz-section frq-nuance" aria-labelledby="frq-nuance-title">
        <div className="cz-wrap">
          <Reveal>
            <span className="cz-kicker">רגע לפני שאת מסיקה מסקנות</span>
            <h2 className="cz-h2" id="frq-nuance-title">
              הרושם שלך <em className="cz-h2-em">הוא רק נתון אחד.</em>
            </h2>
          </Reveal>
          <Reveal>
            <div className="frq-nuance__body">
              <p>חשוב לי להגיד משהו: התדר שלך נותן הצצה לאיך את משדרת את עצמך לעולם, אבל הוא לא מספר את כל הסיפור.</p>
              <p>וזה לא רק שמדובר ביום הלידה בלבד. גם בתוך יום הלידה עצמו, התדר הזה הוא רק הרושם החיצוני, נקודה קטנה אחת מכל מה שיום הלידה שלך מספר עלייך.</p>
              <p>זה התדר של היום שבו נולדת, צוהר אחד מתוך מפה שלמה. במפה האישית שלך יש עוד הרבה שכבות: מספר הנשמה, מספר הגורל, האתגרים והמתנות, והדרך שבה כל אלה נפגשים דווקא אצלך.</p>
              <p>וזה בדיוק ההבדל בין להכיר 'פירוש של מספר' לבין לדעת לקרוא מפה באמת. בקריאה עמוקה אנחנו לא מסתכלות רק על תדר אחד, אלא על איך כל הכוחות שלך משתלבים, איפה יש הרמוניה, איפה יש מתח, ומה את באמת מבקשת לפתח.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Anna bridge */}
      <section className="cz-band frq-bridge" id="anna-bridge" aria-labelledby="frq-bridge-title">
        <div className="cz-wrap">
          <Reveal>
            <div className="frq-bridge__avatar-wrap">
              <img
                src="/assets/anna-portrait.jpg"
                alt="אנה אשכנזי"
                className="frq-bridge__avatar"
                width={96}
                height={96}
                loading="lazy"
              />
            </div>
            <h2 className="cz-h2" id="frq-bridge-title">
              רוצה לראות <em className="cz-h2-em">את המפה המלאה שלך?</em>
            </h2>
          </Reveal>
          <Reveal>
            <div className="frq-bridge__body">
              <p>התדר שגילית כאן הוא רק נקודה אחת. במפה הנומרולוגית הכתובה שלך אני קוראת את כל השכבות יחד: מספר הנשמה, מספר הגורל, האתגרים והמתנות, והדרך שבה כל אלה נפגשים דווקא אצלך.</p>
              <p>זו לא רשימה של פירושים כלליים, אלא מפה אישית שנכתבת במיוחד עבורך. היא מסבירה איך את משדרת את עצמך, מה מניע אותך מבפנים, ואיפה הכוחות שלך מבקשים תשומת לב.</p>
              <p>את מקבלת מסמך מסודר וברור לקריאה, שאפשר לחזור אליו שוב ושוב. צוהר עמוק להבין את עצמך ואת הדרך שלך.</p>
            </div>
            <CzLink href="/map" className="cz-btn cz-btn--gold cz-btn--lg">
              להזמנת מפה נומרולוגית כתובה
            </CzLink>
          </Reveal>
        </div>
      </section>

      {/* 6. WhatsApp section */}
      <section className="cz-section frq-wa" aria-labelledby="frq-wa-title">
        <div className="cz-wrap">
          <Reveal>
            <span className="cz-kicker">יש לך שאלה?</span>
            <h2 className="cz-h2" id="frq-wa-title">כתבי לי בוואטסאפ</h2>
            <CzLink href={WA_FREQ_HREF} className="cz-btn cz-btn--wa cz-btn--lg">
              <WhatsAppIcon size={22} />
              058-557-7021 · WhatsApp
            </CzLink>
          </Reveal>
        </div>
      </section>
    </CosmicShell>
  );
}
