import "./Zug.css";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CosmicShell, Reveal, revealContainer, revealItem, WhatsAppIcon, CzLink } from "../design3/Cosmic";

// ─── Types ────────────────────────────────────────────────────────────────────

type ZugNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface ZugProfile {
  number: ZugNumber;
  accent: string;           // CSS color for the accent bar / circle
  tint: string;             // background tint for picker tile
  kicker: string;           // subtitle keywords
  title: string;
  body: string[];           // paragraphs
  strengths: string;
  challenges: string;
  question: string;         // key question
  romance: string;          // romance tip
  pickerLabel: string;      // one-word label under number in grid
}

// ─── Profile data ─────────────────────────────────────────────────────────────

const PROFILES: ZugProfile[] = [
  {
    number: 1,
    accent: "#b08542",
    tint: "#c9a96a",
    kicker: "עצמאות · מנהיגות · מרחב אישי",
    title: "זוגיות של עצמאות, מנהיגות ומרחב אישי",
    body: [
      "זוגיות בתדר 1 היא זוגיות שיש בה הרבה כוח, יוזמה ונוכחות. זה קשר שבו כל אחד מבני הזוג צריך להרגיש שיש לו מקום להיות הוא עצמו. לא להיבלע בתוך הקשר, ולא לוותר על הזהות האישית שלו.",
      'החיבור הזה יכול ליצור תחושה חזקה של "אנחנו נגד העולם". שני אנשים שבונים דרך, דוחפים קדימה, מחזקים אחד את השני ורוצים להצליח יחד.',
      "אבל האתגר כאן הוא לא לתת לאגו, לשליטה או לביקורת לנהל את הקשר. כשהתדר הזה לא מאוזן, כל אחד עלול להרגיש שהוא צריך להוכיח, להוביל, לנצח או להיות צודק.",
    ],
    strengths: "כוח · עצמאות · יוזמה · מנהיגות · תחושת דרך משותפת",
    challenges: "אגו · שליטה · ביקורת · קושי לבקש עזרה · קושי לוותר",
    question: "האם לכל אחד מאיתנו יש מקום להיות מי שהוא באמת?",
    romance: "תנו אחד לשני מרחב אישי, העריכו הישגים, עודדו עצמאות, ואל תנסו לשלוט אחד בשני. בתדר הזה אהבה מתחזקת כשיש כבוד הדדי לעצמאות של כל צד.",
    pickerLabel: "עצמאות",
  },
  {
    number: 2,
    accent: "#c9889a",
    tint: "#e8b8c4",
    kicker: "רגש · קרבה · רומנטיקה",
    title: "זוגיות רגשית, קרובה ורומנטית",
    body: [
      "זוגיות בתדר 2 היא זוגיות של רגש, קרבה, אינטימיות ורכות. זה קשר שיש בו צורך עמוק בביחד, במגע, בשייכות ובתחושה שמישהו באמת רואה ומרגיש אותך.",
      "כשהתדר הזה מאוזן, זו זוגיות מאוד מחבקת. יש בה הכלה, רגישות, הקשבה, אהבה ורצון אמיתי להיות שם אחד בשביל השני.",
      "אבל כשהתדר הזה יוצא מאיזון, יכולים להופיע תלותיות, רגישות יתר, פחד מנטישה או תחושה שכל שינוי קטן במצב הרוח של הצד השני מערער את כל הקשר.",
    ],
    strengths: "הכלה · אהבה · אינטימיות · רגישות · קרבה רגשית",
    challenges: "תלותיות · פחד מנטישה · רגישות יתר · צורך מתמיד באישור",
    question: 'האם אנחנו מצליחים לשמור גם על עצמנו בתוך ה"ביחד"?',
    romance: "צרו אווירה רומנטית, רכה ואינטימית. מילים טובות, מגע, זמן איכות ושיחות מהלב הם חלק גדול מהדלק של הקשר הזה.",
    pickerLabel: "רגש",
  },
  {
    number: 3,
    accent: "#d77c4a",
    tint: "#f0a878",
    kicker: "שמחה · קלילות · תקשורת",
    title: "זוגיות שמחה, קלילה וחברתית",
    body: [
      "זוגיות בתדר 3 היא זוגיות שיש בה שמחת חיים, תקשורת, הומור וקלילות. זה קשר שיכול להרגיש כמו חברות טובה, צחוק, חוויות, יצירתיות ורצון ליהנות יחד מהחיים.",
      "כשהתדר הזה מאוזן, יש בקשר הרבה אוויר. הזוגיות לא מרגישה כבדה מדי, ויש יכולת לדבר, לשתף, לצחוק ולהכניס אור גם לרגעים מורכבים.",
      "אבל האתגר כאן הוא לא לברוח מעומק. לפעמים בתדר 3, כשמתחיל להיות קשה או רגשי מדי, יש נטייה להסיח את הדעת, להקליל, לצחוק או לעבור הלאה במקום באמת להישאר ולפגוש את מה שקורה.",
    ],
    strengths: "תקשורת · הומור · שמחת חיים · יצירתיות · חברות",
    challenges: "חוסר רצינות · בריחה מעומק רגשי · קושי בהתמדה · פיזור",
    question: "האם אנחנו יודעים ליהנות יחד גם בתקופות מאתגרות?",
    romance: "הכניסו הומור, חוויות, טיולים, שיחות קלילות ותחושת משחק. הקשר הזה צריך שמחה, אבל לא על חשבון עומק רגשי.",
    pickerLabel: "שמחה",
  },
  {
    number: 4,
    accent: "#6f8479",
    tint: "#8fa69a",
    kicker: "יציבות · בית · בנייה",
    title: "זוגיות של יציבות, בית ובנייה",
    body: [
      "זוגיות בתדר 4 היא זוגיות שמבקשת לבנות משהו אמיתי. יש כאן צורך ביציבות, ביטחון, אחריות, מחויבות ותחושה שיש על מה להישען.",
      "כשהתדר הזה מאוזן, זו יכולה להיות זוגיות מאוד יציבה ונאמנה. שני בני הזוג מרגישים שיש בסיס, שיש בית, שיש תוכנית, ושאפשר לבנות יחד חיים בצורה מסודרת ובטוחה.",
      'אבל האתגר הוא לא להפוך את הקשר למשימה. בתדר 4 לפעמים הזוגיות יכולה להיות מאוד אחראית, אבל פחות רומנטית. יותר "מה צריך לעשות" ופחות "איך אנחנו מרגישים".',
    ],
    strengths: "אמינות · אחריות · יציבות · מחויבות · בנייה משותפת",
    challenges: "שגרה כבדה · ביקורתיות · תקיעות · קושי בגמישות",
    question: "האם אנחנו מאזנים בין יציבות לרומנטיקה?",
    romance: "בנו שגרה זוגית יציבה ומרגיעה, אבל הכניסו לתוכה רגעים של רוך. דייט קבוע, זמן איכות בבית, מחוות קטנות ותחושת ביטחון יכולים לחזק מאוד את הקשר.",
    pickerLabel: "יציבות",
  },
  {
    number: 5,
    accent: "#a07ec1",
    tint: "#b89cd1",
    kicker: "חופש · תשוקה · חוויות",
    title: "זוגיות של חופש, תשוקה וחוויות",
    body: [
      "זוגיות בתדר 5 היא זוגיות עם הרבה תנועה, משיכה, סקרנות ורצון לחוות. זה קשר שצריך אוויר, גיוון, תשוקה, חופש ותחושה שהחיים לא הופכים לשגרה צפויה מדי.",
      "כשהתדר הזה מאוזן, הזוגיות יכולה להיות מלאת חיים. יש בה פתיחות, ריגוש, משיכה, חוויות, שיחות מעניינות ורצון לגלות יחד עוד ועוד.",
      "אבל האתגר כאן הוא יציבות. כשהתדר לא מאוזן, יכולים להופיע פחד ממחויבות, חוסר שקט, קושי בשגרה או רצון לברוח כשהקשר נהיה רציני מדי.",
    ],
    strengths: "משיכה · ריגוש · חופש · פתיחות · חוויות משותפות",
    challenges: "חוסר יציבות · פחד ממחויבות · קושי בשגרה · צורך מתמיד בגירוי",
    question: "האם אנחנו מאפשרים חופש בלי לאבד ביטחון?",
    romance: "הפתיעו, גוונו, צאו מהמוכר ושמרו על ריגוש. בתדר הזה חשוב לא לכלוא את הקשר אלא ליצור חופש שיש בתוכו ביטחון.",
    pickerLabel: "חופש",
  },
  {
    number: 6,
    accent: "#c9a47e",
    tint: "#e8d3b8",
    kicker: "בית · משפחה · אהבה",
    title: "זוגיות של בית, משפחה ואהבה",
    body: [
      "זוגיות בתדר 6 היא זוגיות של אהבה, בית, חמימות, נאמנות ודאגה הדדית. זה קשר שיש בו רצון לטפל, להעניק, לבנות משפחה או תחושת משפחה, וליצור מרחב רגשי נעים ובטוח.",
      "כשהתדר הזה מאוזן, זו זוגיות מאוד אוהבת ומכילה. יש בה אכפתיות, מחוות קטנות, דאגה, נאמנות ורצון אמיתי שיהיה טוב לצד השני.",
      'אבל האתגר כאן הוא לא להפוך את האהבה לריצוי או לביקורת. לפעמים מתוך רצון שהכול יהיה "כמו שצריך", יכולים להופיע עומס, ציפיות, ביקורת או שכחה של הזוגיות עצמה לטובת הבית, הילדים, המשפחה או המחויבויות.',
    ],
    strengths: "נאמנות · חמימות · משפחתיות · דאגה הדדית · אהבה",
    challenges: "ביקורת · ריצוי · עומס רגשי · שכחת הזוגיות לטובת כולם",
    question: "האם אנחנו זוכרים לטפח גם את האינטימיות שלנו?",
    romance: "השקיעו בבית, באינטימיות ובמחוות קטנות. אבל חשוב לזכור: זוגיות בתדר 6 לא צריכה רק לתפקד טוב, היא צריכה גם להרגיש אהובה.",
    pickerLabel: "בית",
  },
  {
    number: 7,
    accent: "#5a5066",
    tint: "#6e6478",
    kicker: "עומק · רוחני · פנימי",
    title: "זוגיות רוחנית, עמוקה ופנימית",
    body: [
      "זוגיות בתדר 7 היא זוגיות שיש בה עומק, חיפוש, אמת וחיבור פנימי. זה קשר שלא תמיד מתבטא בצורה מוחצנת או רועשת, אבל יכול להרגיש מאוד משמעותי ברמה הנשמתית.",
      "כשהתדר הזה מאוזן, יש בקשר עומק מיוחד. שיחות משמעותיות, חיבור רוחני, אמונה, התפתחות, ותחושה שיש כאן משהו שמעבר ליומיום.",
      "אבל האתגר כאן הוא פתיחות רגשית. בתדר 7 יכולים להופיע סגירות, ריחוק, צורך בהרבה מרחב אישי או קושי לחשוף באמת את מה שקורה בפנים.",
    ],
    strengths: "אמת · חיבור נשמתי · עומק · אמונה · התפתחות",
    challenges: "סגירות · ריחוק רגשי · צורך במרחב · קושי לשתף",
    question: "האם אנחנו מרגישים בטוחים לחשוף את העולם הפנימי שלנו?",
    romance: "צרו שיחות עומק, זמן שקט, חיבור רוחני ורגעים שבהם לא חייבים לעשות אלא פשוט להיות יחד. הקשר הזה צריך עומק, אבל גם רכות ונגישות רגשית.",
    pickerLabel: "עומק",
  },
  {
    number: 8,
    accent: "#7a2a3a",
    tint: "#8b3a3a",
    kicker: "הצלחה · הישגים · עוצמה",
    title: "זוגיות של הצלחה, הישגים ועוצמה",
    body: [
      "זוגיות בתדר 8 היא זוגיות עם הרבה כוח, שאפתנות ונוכחות. זה קשר שיכול לדחוף את שני בני הזוג קדימה, לעזור להם לבנות, להצליח, להתפתח ולהרגיש חזקים יותר יחד.",
      "כשהתדר הזה מאוזן, יש בזוגיות הזו תמיכה, עוצמה, מיקוד והרגשה ששני בני הזוג יכולים לכבוש מטרות יחד. זה קשר שיכול להיות מאוד בונה מבחינת קריירה, כסף, מעמד, יציבות והגשמה.",
      "אבל האתגר כאן הוא לא להפוך את הקשר למאבק כוח. בתדר 8 יכולים להופיע שליטה, חומריות, לחץ להצליח, מאבקי אגו או תחושה שהערך של הקשר נמדד רק לפי הישגים.",
    ],
    strengths: "שאפתנות · תמיכה · כוח · הצלחה משותפת · יכולת לבנות",
    challenges: "שליטה · חומריות · מאבקי כוח · קושי להראות חולשה",
    question: "האם אנחנו תומכים אחד בשני גם רגשית ולא רק בהישגים?",
    romance: 'תמכו במטרות ובהצלחה של בן או בת הזוג, אבל אל תשכחו את הרגש. בתדר הזה חשוב לזכור שאהבה היא לא רק "בוא נתקדם" אלא גם "אני איתך, גם כשאתה לא חזק".',
    pickerLabel: "הצלחה",
  },
  {
    number: 9,
    accent: "#5a8e94",
    tint: "#6ba4a8",
    kicker: "שליחות · נתינה · התפתחות",
    title: "זוגיות של שליחות, נתינה והתפתחות",
    body: [
      "זוגיות בתדר 9 היא זוגיות עם אנרגיה רחבה, עמוקה ומשמעותית. זה קשר שיכול לפתוח את הלב, ללמד חמלה, נתינה, שחרור, אהבה גדולה והתפתחות אישית.",
      "כשהתדר הזה מאוזן, יש בזוגיות הזו השראה. שני בני הזוג יכולים להרגיש שהקשר מרחיב אותם, פותח אותם לעולם, מחבר אותם למשמעות ומלמד אותם לאהוב בצורה פחות אגואיסטית.",
      "אבל האתגר כאן הוא לא ללכת לאיבוד בתוך אידיאל. בתדר 9 יכולים להופיע פיזור, אידיאליזציה, נתינה מוגזמת, קושי בפרקטיקה או ציפייה שהקשר תמיד יהיה גדול, עמוק או נשמתי.",
    ],
    strengths: "נתינה · השראה · חמלה · אהבה ללא תנאים · התפתחות",
    challenges: "פיזור · אידיאליזציה · קושי בפרקטיקה · נתינה על חשבון עצמנו",
    question: "האם אנחנו מאפשרים גם חופש וגם יציבות בתוך הקשר?",
    romance: "עשו יחד דברים עם משמעות. שיחות על חלומות, נתינה משותפת, יצירה, השראה וחיבור למשהו גדול יותר יכולים לחזק מאוד את הזוגיות הזו.",
    pickerLabel: "שליחות",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_HREF =
  "https://wa.me/972585577021?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A0%D7%94%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%A2%D7%9E%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%A4%D7%A8%20%D7%94%D7%9E%D7%A9%D7%95%D7%AA%D7%A3%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93.";

// ─── Profile reveal animation ─────────────────────────────────────────────────

const profileVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Decorative hero SVG (two overlapping rings) */
function HeroDeco(): JSX.Element {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="zug-ringA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8a45a" />
          <stop offset="100%" stopColor="#7c4dff" />
        </linearGradient>
        <linearGradient id="zug-ringB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="#d946a8" />
        </linearGradient>
        <radialGradient id="zug-aura" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#7c4dff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0d0a1f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="80" r="72" fill="url(#zug-aura)" />
      <circle cx="78" cy="80" r="40" fill="none" stroke="url(#zug-ringA)" strokeWidth="1.6" opacity="0.85" />
      <circle cx="122" cy="80" r="40" fill="none" stroke="url(#zug-ringB)" strokeWidth="1.6" opacity="0.85" />
      <text x="100" y="88" textAnchor="middle" fontFamily="serif" fontSize="22" fill="#d946a8" opacity="0.75">
        ∞
      </text>
      <circle cx="38" cy="36" r="2" fill="#c8a45a" opacity="0.7" />
      <circle cx="162" cy="36" r="1.5" fill="#7c4dff" opacity="0.7" />
      <circle cx="172" cy="120" r="2" fill="#c8a45a" opacity="0.6" />
      <circle cx="30" cy="120" r="1.5" fill="#d946a8" opacity="0.7" />
    </svg>
  );
}

/** Rendered profile card */
function ProfileCard({ profile }: { profile: ZugProfile }): JSX.Element {
  return (
    <article
      className="zug-profile"
      style={{ "--zug-accent": profile.accent } as React.CSSProperties}
      aria-label={`תדר זוגי ${profile.number} – ${profile.title}`}
    >
      <div className="zug-profile__head">
        <div
          className="zug-profile__num"
          aria-hidden="true"
          style={{ background: profile.accent } as React.CSSProperties}
        >
          {profile.number}
        </div>
        <div>
          <span className="zug-profile__kicker">{profile.kicker}</span>
          <h2 className="zug-profile__title">{profile.title}</h2>
        </div>
      </div>

      <div className="zug-profile__body">
        {profile.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <motion.div className="zug-pillars" variants={revealContainer} initial="hidden" animate="show">
        <motion.div className="zug-pillar" variants={revealItem} style={{ "--zug-accent": profile.accent } as React.CSSProperties}>
          <span className="zug-pillar__lbl">חוזקות</span>
          <p className="zug-pillar__text">{profile.strengths}</p>
        </motion.div>
        <motion.div className="zug-pillar zug-pillar--challenges" variants={revealItem}>
          <span className="zug-pillar__lbl">אתגרים</span>
          <p className="zug-pillar__text">{profile.challenges}</p>
        </motion.div>
      </motion.div>

      <div className="zug-question">
        <span className="zug-question__lbl">שאלת מפתח</span>
        <p className="zug-question__text">{profile.question}</p>
      </div>

      <div className="zug-romance">
        <span className="zug-romance__lbl">להגביר רומנטיקה</span>
        <p className="zug-romance__text">{profile.romance}</p>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

/** התדר הזוגי שלכם — pick a couple frequency (1-9) and reveal the matching profile. */
export default function Zug(): JSX.Element {
  const [picked, setPicked] = useState<ZugNumber | null>(null);
  const reduced = useReducedMotion() ?? false;
  const profileRef = useRef<HTMLDivElement>(null);

  const handlePick = useCallback(
    (n: ZugNumber) => {
      if (picked !== null) return;
      setPicked(n);
      // scroll profile into view after paint
      requestAnimationFrame(() => {
        setTimeout(
          () => profileRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }),
          120,
        );
      });
    },
    [picked, reduced],
  );

  // Support URL hash like /zug#n3 on mount
  useEffect(() => {
    const hash = window.location.hash;
    const match = /^#n([1-9])$/.exec(hash);
    if (match) {
      const n = parseInt(match[1], 10) as ZugNumber;
      setPicked(n);
    }
  }, []);

  const activeProfile = picked !== null ? PROFILES.find((p) => p.number === picked) ?? null : null;

  return (
    <CosmicShell
      header={{ ctaLabel: "עוד על הקורס", ctaHref: "/compass" }}
      sticky={{ label: "כתבי לי בוואטסאפ", href: WA_HREF }}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="cz-section zug-hero" aria-labelledby="zug-main-heading">
        <div className="cz-wrap">
          <Reveal>
            <span className="cz-eyebrow zug-hero__eyebrow">התדר הזוגי שלכם · אנה אשכנזי</span>
          </Reveal>
          <Reveal>
            <h1 id="zug-main-heading" className="zug-hero__title">
              האנרגיה{" "}
              <em className="zug-hero__title-em">של הזוגיות שלכם</em>
            </h1>
          </Reveal>

          <div className="zug-hero__deco" aria-hidden="true">
            <HeroDeco />
          </div>

          {/* How-to calculation explainer */}
          {picked === null && (
            <div className="zug-how">
              <Reveal>
                <span className="zug-how__kicker">לפני שתבחרי</span>
                <h2 className="zug-how__title">
                  איך מחשבים את התדר הזוגי?
                </h2>
                <p className="zug-how__lede">
                  קחי את היום שבו נולדת, חברי לו את היום שבו נולד/ה בן/בת הזוג, וצמצמי לספרה אחת (1–9).
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="zug-how__example" aria-label="דוגמה לחישוב תדר זוגי">
                  <span className="zug-how__example-lbl">דוגמה</span>
                  <div className="zug-how__row">
                    <span className="zug-how__row-lbl">תאריך הלידה שלך</span>
                    <span className="zug-how__row-date" dir="ltr">02.08.1995</span>
                    <span className="zug-how__row-day" aria-label="יום 2">02</span>
                  </div>
                  <div className="zug-how__row">
                    <span className="zug-how__row-lbl">תאריך הלידה של בן/בת הזוג</span>
                    <span className="zug-how__row-date" dir="ltr">18.02.1999</span>
                    <span className="zug-how__row-day" aria-label="יום 18">18</span>
                  </div>
                  <div className="zug-how__calc" aria-label="חישוב: 02 ועוד 18 שווה 20, ולאחר מכן 2 ועוד 0 שווה 2">
                    <span className="zug-how__calc-line">02 + 18 = 20</span>
                    <span className="zug-how__calc-arrow" aria-hidden="true">↓</span>
                    <span className="zug-how__calc-line">2 + 0 = 2</span>
                  </div>
                  <p className="zug-how__result">
                    התדר הזוגי לדוגמה{" "}
                    <span className="zug-how__result-badge" aria-label="תדר 2">2</span>
                  </p>
                </div>
              </Reveal>
            </div>
          )}

          {/* Number picker grid */}
          <div className="zug-picker" aria-label="בחירת תדר זוגי">
            <p className="zug-picker__lede">
              {picked === null ? "לחצי על התדר הזוגי שלכם ↓" : `בחרת תדר ${picked}`}
            </p>
            <div
              className="zug-picker__grid"
              role="group"
              aria-label="מספרי התדר הזוגי 1 עד 9"
            >
              {PROFILES.map((p) => {
                const isActive = picked === p.number;
                const isDimmed = picked !== null && !isActive;
                return (
                  <button
                    key={p.number}
                    className={[
                      "zug-pick",
                      isActive ? "zug-pick--active" : "",
                      isDimmed ? "zug-pick--dimmed" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ "--zug-tint": p.tint } as React.CSSProperties}
                    onClick={() => handlePick(p.number)}
                    aria-pressed={isActive}
                    aria-label={`תדר ${p.number} – ${p.pickerLabel}`}
                    disabled={isDimmed}
                    type="button"
                  >
                    <span className="zug-pick__num" aria-hidden="true">
                      {p.number}
                    </span>
                    <span className="zug-pick__lbl" aria-hidden="true">
                      {p.pickerLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Profile reveal ────────────────────────────────────────────────────── */}
      <section className="cz-section zug-profiles" ref={profileRef} aria-live="polite" aria-atomic="true">
        <div className="cz-wrap">
          <AnimatePresence mode="wait">
            {activeProfile !== null && (
              <motion.div
                key={activeProfile.number}
                variants={reduced ? {} : profileVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
                exit={reduced ? undefined : "exit"}
              >
                <ProfileCard profile={activeProfile} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Nuance ───────────────────────────────────────────────────────────── */}
      <section className="cz-section cz-band zug-nuance" aria-labelledby="zug-nuance-heading">
        <div className="cz-wrap">
          <Reveal>
            <span className="cz-kicker">רגע לפני שאת מסיקה מסקנות</span>
            <h2 id="zug-nuance-heading" className="zug-nuance__title">
              התדר הזוגי{" "}
              <em className="zug-hero__title-em">הוא רק נתון אחד.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="zug-nuance__body">
              חשוב לי להגיד משהו חשוב: התדר הזוגי נותן הצצה לאנרגיה הכללית של הקשר, אבל הוא לא מספר את כל הסיפור.
            </p>
          </Reveal>
          <Reveal>
            <p className="zug-nuance__body">
              עוד נקודה חשובה: תדר זוגי 1 שנוצר מחיבור של 1 ו-9 לא יתבטא כמו תדר זוגי 1 שנוצר מחיבור של 2 ו-8. בשני המקרים התוצאה היא 1, אבל הדרך שבה האנרגיה הזו נוצרת שונה לגמרי.
            </p>
          </Reveal>
          <Reveal>
            <p className="zug-nuance__body">
              וזה בדיוק ההבדל בין להכיר "פירוש של מספר" לבין לדעת לקרוא מפה באמת. בקריאה עמוקה יותר אנחנו לא מסתכלות רק על התוצאה הסופית, אלא גם על השורש שלה: מאילו מספרים היא בנויה, איזה כוחות נפגשים שם, איפה יש הרמוניה, איפה יש קונפליקט, ומה הקשר הזה באמת מבקש משני בני הזוג לפתח.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Anna bridge ──────────────────────────────────────────────────────── */}
      <section className="cz-section zug-bridge" id="anna-bridge" aria-labelledby="zug-bridge-heading">
        <div className="cz-wrap">
          <Reveal>
            <div className="zug-bridge__avatar">
              <img src="/assets/anna-portrait.jpg" alt="אנה אשכנזי · מייסדת אנה אשכנזי" loading="lazy" />
            </div>
          </Reveal>
          <Reveal>
            <h2 id="zug-bridge-heading" className="zug-bridge__title">
              רוצה ללמוד{" "}
              <em className="zug-hero__title-em">לקרוא מפות לעומק?</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="zug-bridge__body">
              בקורס אנחנו לא לומדות רק "מה כל מספר אומר". אנחנו לומדות איך לקרוא בן אדם. איך לחבר בין נתונים. איך לזהות קונפליקטים. איך להבין דפוסים שחוזרים שוב ושוב. ואיך לראות את הסיפור העמוק שמסתתר מאחורי המפה.
            </p>
          </Reveal>
          <Reveal>
            <p className="zug-bridge__body">
              בין היתר נלמד גם על חיבורים זוגיים, התאמה, מספרים משותפים, וההבדל בין התוצאה הסופית לבין המספרים שמהם היא נבנית.
            </p>
          </Reveal>
          <Reveal>
            <p className="zug-bridge__body">
              כי נומרולוגיה אמיתית היא לא אוסף של פירושים. היא שפה. וכשלומדים לקרוא אותה נכון, אפשר להבין הרבה יותר לעומק את עצמנו, את האנשים סביבנו, ואת הקשרים שאנחנו יוצרים.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CzLink href="/compass#lead" className="cz-btn cz-btn--primary cz-btn--lg">
              <span>פרטים על המחזור הקרוב</span>
              <span aria-hidden="true">←</span>
            </CzLink>
          </Reveal>
        </div>
      </section>

      {/* ── WhatsApp section (revealed after pick) ───────────────────────────── */}
      <AnimatePresence>
        {picked !== null && (
          <motion.section
            className="cz-section cz-band zug-wa"
            aria-labelledby="zug-wa-heading"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="cz-wrap">
              <span className="cz-kicker">יש לכם שאלה?</span>
              <h2 id="zug-wa-heading" className="zug-wa__title">
                כתבי לי בוואטסאפ
              </h2>
              <p className="zug-wa__body">
                בא לך לשאול עוד על הקורס, על התדר הזוגי שלכם או על משהו אחר?
              </p>
              <CzLink
                href={WA_HREF}
                className="cz-btn cz-btn--wa cz-btn--lg"
                aria-label="כתבי לאנה בוואטסאפ"
              >
                <WhatsAppIcon size={22} />
                <span>058-557-7021 · WhatsApp</span>
              </CzLink>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </CosmicShell>
  );
}
