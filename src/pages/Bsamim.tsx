import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CosmicShell,
  Reveal,
  revealContainer,
  revealItem,
  WhatsAppIcon,
  CzLink,
} from "../design3/Cosmic";
import "./Bsamim.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Bottle {
  brand: string;
  name: string;
  svgId: string; // gradient id suffix, unique per bottle
  gradFrom: string;
  gradTo: string;
  capColor: string;
  neckColor?: string;
  shape: "rect" | "rounded" | "ellipse" | "triangle" | "trapezoid" | "circle";
  labelText?: string;
  labelSize?: number;
}

interface ScentData {
  n: number;
  accent: string;
  pickTint: string;
  archetype: string;
  kicker: string;
  title: string;
  body: string[];
  notes: string;
  notesLabel?: string; // bold prefix if present
  examples: Bottle[];
  sig: string;
  pickerLabel: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCENTS: ScentData[] = [
  {
    n: 1,
    accent: "#b08542",
    pickTint: "#c9a96a",
    archetype: "המנהיגה",
    kicker: "המנהיגה · נוכחות מגנטית",
    title: "ביטחון שאי אפשר להתעלם ממנו",
    body: [
      "האנרגיה שלך היא של מנהיגה. מה שממגנט אצלך זה ביטחון ונוכחות שאי אפשר להתעלם ממנה.",
      "בשבילך עובדים הכי טוב ריחות דומיננטיים, עמוקים ויוקרתיים, כאלה שנשארים באוויר גם אחרי שאת הולכת.",
    ],
    notes: "חפשי בשמים עם תווים של אמבר, עצים, תבלינים או נגיעות אוד.",
    examples: [
      {
        brand: "Yves Saint Laurent",
        name: "Libre Intense",
        svgId: "b1a",
        gradFrom: "#d4a55b",
        gradTo: "#8b5e2a",
        capColor: "#3a2410",
        shape: "rounded",
        labelText: "",
      },
      {
        brand: "Tom Ford",
        name: "Black Orchid",
        svgId: "b1b",
        gradFrom: "#5a3920",
        gradTo: "#2a1a0c",
        capColor: "#d4a55b",
        shape: "rect",
        labelText: "",
      },
      {
        brand: "Giorgio Armani",
        name: "Sì Intense",
        svgId: "b1c",
        gradFrom: "#c89060",
        gradTo: "#7d4b1f",
        capColor: "#3a2410",
        shape: "ellipse",
        labelText: "Sì",
      },
    ],
    sig: "זה הריח שגורם לאנשים להרגיש אותך עוד לפני שדיברת ✨",
    pickerLabel: "המנהיגה",
  },
  {
    n: 2,
    accent: "#c9889a",
    pickTint: "#e8b8c4",
    archetype: "הרומנטית",
    kicker: "הרומנטית · עדינות וחיבור",
    title: "רכות שמושכת לבבות",
    body: [
      "האנרגיה שלך עדינה, רגשית ומקרבת. מה שממגנט אצלך זה הרכות והנשיות הטבעית.",
      "ריחות פרחוניים נקיים עם נגיעה של מאסק עובדים עלייך מושלם וגורמים לאנשים להרגיש בנוח לידך.",
    ],
    notes: "חפשי תווים של יסמין, ורדים, פרחים לבנים ומאסק עדין.",
    examples: [
      {
        brand: "Chanel",
        name: "Chance Eau Tendre",
        svgId: "b2a",
        gradFrom: "#fce6ec",
        gradTo: "#e8b8c4",
        capColor: "#a8616f",
        shape: "rounded",
        labelText: "",
      },
      {
        brand: "Dior",
        name: "J'adore Eau de Parfum",
        svgId: "b2b",
        gradFrom: "#f5d59c",
        gradTo: "#d4a45e",
        capColor: "#8a6a32",
        shape: "trapezoid",
        labelText: "",
      },
      {
        brand: "Gucci",
        name: "Bloom",
        svgId: "b2c",
        gradFrom: "#fde8e8",
        gradTo: "#e8b8c4",
        capColor: "#a8616f",
        shape: "rect",
        labelText: "",
      },
    ],
    sig: "זה ריח שמושך דרך עדינות וחיבור רגשי 💫",
    pickerLabel: "הרומנטית",
  },
  {
    n: 3,
    accent: "#d77c4a",
    pickTint: "#f0a878",
    archetype: "הכריזמטית",
    kicker: "הכריזמטית · שמחה וקלילות",
    title: "הווייב שמושך בלי לחשוב פעמיים",
    body: [
      "יש לך אנרגיה שמחה, קלילה וסופר כריזמטית. מה שממגנט אצלך זה הווייב הפלרטטני והכיפי.",
      "בשמים מתוקים עם נגיעות פירותיות או וניל מדגישים בדיוק את זה.",
    ],
    notes: "חפשי תווים של פירות, קרמל, וניל או פרחים מתוקים.",
    examples: [
      {
        brand: "Yves Saint Laurent",
        name: "Mon Paris",
        svgId: "b3a",
        gradFrom: "#f7c89c",
        gradTo: "#d77c4a",
        capColor: "#a04020",
        shape: "rect",
        labelText: "MON PARIS",
        labelSize: 7,
      },
      {
        brand: "Viktor & Rolf",
        name: "Flowerbomb",
        svgId: "b3b",
        gradFrom: "#fde0e8",
        gradTo: "#e890a8",
        capColor: "#a04060",
        shape: "triangle",
        labelText: "",
      },
      {
        brand: "Ariana Grande",
        name: "Cloud",
        svgId: "b3c",
        gradFrom: "#e0eaff",
        gradTo: "#a8bce8",
        capColor: "#fff",
        shape: "trapezoid",
        labelText: "",
      },
    ],
    sig: "זה ריח שאנשים פשוט נמשכים אליו בלי לחשוב פעמיים 🍓",
    pickerLabel: "הכריזמטית",
  },
  {
    n: 4,
    accent: "#6f8479",
    pickTint: "#8fa69a",
    archetype: "המקורקעת",
    kicker: "המקורקעת · יציבות ושקט",
    title: "השקט הטוב שאת משאירה אחרייך",
    body: [
      "האנרגיה שלך יציבה, רגועה ואמינה. מה שממגנט אצלך זה תחושת הביטחון והקרקוע.",
      "ריחות נקיים, ירוקים או עציים עדינים עובדים עלייך הכי טוב.",
    ],
    notes: "חפשי תווים של תה, עשבים, עצים רכים ומאסק נקי.",
    examples: [
      {
        brand: "Chloé",
        name: "Eau de Parfum",
        svgId: "b4a",
        gradFrom: "#f0e8dc",
        gradTo: "#c8b89a",
        capColor: "#8a7a5a",
        shape: "rect",
        labelText: "Chloé",
        labelSize: 8,
      },
      {
        brand: "Hermès",
        name: "Un Jardin Sur Le Nil",
        svgId: "b4b",
        gradFrom: "#d8e8d4",
        gradTo: "#8fa69a",
        capColor: "#5a6a5a",
        shape: "rect",
        labelText: "Hermès",
        labelSize: 6,
      },
      {
        brand: "Byredo",
        name: "Blanche",
        svgId: "b4c",
        gradFrom: "#faf6f1",
        gradTo: "#e2dbd1",
        capColor: "#222",
        shape: "rect",
        labelText: "BYREDO",
        labelSize: 5,
      },
    ],
    sig: "זה ריח שגורם לאנשים להרגיש 'שקט טוב' לידך 🌱",
    pickerLabel: "המקורקעת",
  },
  {
    n: 5,
    accent: "#a07ec1",
    pickTint: "#b89cd1",
    archetype: "המגוונת",
    kicker: "המגוונת · הקסם שבשינוי",
    title: "חוסר הצפיות הוא הקסם שלך",
    body: [
      "מה שממגנט אצלך זה דווקא חוסר הצפיות. אי אפשר לדעת איזה וייב תביאי היום וזה מה שמושך.",
      "לא נכון לך להיצמד לבושם אחד. את צריכה כמה ריחות שונים לפי מצב רוח.",
    ],
    notes: "להחזיק 2–3 בשמים שונים: אחד קליל, אחד מתוק ואחד עמוק יותר.",
    notesLabel: "המלצה:",
    examples: [
      {
        brand: "Maison Margiela",
        name: "Replica Beach Walk (קליל)",
        svgId: "b5a",
        gradFrom: "#d8e8f0",
        gradTo: "#8eb8d4",
        capColor: "#5a7a8a",
        shape: "rect",
        labelText: "Beach Walk",
        labelSize: 6,
      },
      {
        brand: "Lancôme",
        name: "La Vie Est Belle (מתוק)",
        svgId: "b5b",
        gradFrom: "#f5b8c4",
        gradTo: "#d47898",
        capColor: "#fff",
        shape: "rounded",
        labelText: "",
      },
      {
        brand: "Yves Saint Laurent",
        name: "Black Opium (עמוק)",
        svgId: "b5c",
        gradFrom: "#3a2a4a",
        gradTo: "#1a0a1a",
        capColor: "#caa055",
        shape: "rect",
        labelText: "BLACK OPIUM",
        labelSize: 6,
      },
    ],
    sig: "הקסם שלך הוא בגיוון וזה מה שממגנט הכי חזק אצלך 🔥",
    pickerLabel: "המגוונת",
  },
  {
    n: 6,
    accent: "#c9a47e",
    pickTint: "#e8d3b8",
    archetype: "העוטפת",
    kicker: "העוטפת · חום ואהבה",
    title: "החום שגורם לאנשים להישאר",
    body: [
      "האנרגיה שלך אוהבת, עוטפת ומחברת. מה שממגנט אצלך זה תחושת החום והביטחון.",
      "ריחות של וניל, אבקה ומושק רך עובדים עלייך מושלם.",
    ],
    notes: "חפשי תווים של וניל, טונקה, פרחים רכים ופודרה.",
    examples: [
      {
        brand: "Lancôme",
        name: "La Vie Est Belle",
        svgId: "b6a",
        gradFrom: "#f5d4dc",
        gradTo: "#d49bb0",
        capColor: "#fff",
        shape: "rect",
        labelText: "",
      },
      {
        brand: "Dior",
        name: "Hypnotic Poison",
        svgId: "b6b",
        gradFrom: "#3a1a2a",
        gradTo: "#1a0a14",
        capColor: "#caa055",
        shape: "trapezoid",
        labelText: "Hypnotic Poison",
        labelSize: 5,
      },
      {
        brand: "Narciso Rodriguez",
        name: "Poudrée",
        svgId: "b6c",
        gradFrom: "#fde8d4",
        gradTo: "#e8c4a0",
        capColor: "#a08060",
        shape: "rect",
        labelText: "narciso",
        labelSize: 5,
      },
    ],
    sig: "זה ריח שגורם לאנשים לרצות להתקרב ולהישאר 🤍",
    pickerLabel: "העוטפת",
  },
  {
    n: 7,
    accent: "#5a5066",
    pickTint: "#6e6478",
    archetype: "המסתורית",
    kicker: "המסתורית · עומק וסקרנות",
    title: "האנרגיה שלא יוצאת מהראש",
    body: [
      "יש לך עומק ומסתורין טבעי. מה שממגנט אצלך זה האנרגיה שלא כולם מצליחים לפענח.",
      "ריחות עציים, קטורת וסנדלווד מדגישים בדיוק את זה.",
    ],
    notes: "חפשי תווים של sandalwood, ענבר כהה, מאסק עמוק.",
    examples: [
      {
        brand: "Le Labo",
        name: "Santal 33",
        svgId: "b7a",
        gradFrom: "#faf6f1",
        gradTo: "#e2dbd1",
        capColor: "#222",
        shape: "rect",
        labelText: "SANTAL 33",
        labelSize: 9,
      },
      {
        brand: "Byredo",
        name: "Gypsy Water",
        svgId: "b7b",
        gradFrom: "#a89878",
        gradTo: "#6a5a3a",
        capColor: "#222",
        shape: "rect",
        labelText: "Gypsy Water",
        labelSize: 6,
      },
      {
        brand: "Juliette Has a Gun",
        name: "Not a Perfume",
        svgId: "b7c",
        gradFrom: "#f5e8d4",
        gradTo: "#c8a878",
        capColor: "#2a2a2a",
        shape: "rect",
        labelText: "Not a Perfume",
        labelSize: 5,
      },
    ],
    sig: "זה ריח שמשאיר סקרנות ולא יוצא מהראש 🌙",
    pickerLabel: "המסתורית",
  },
  {
    n: 8,
    accent: "#7a2a3a",
    pickTint: "#8b3a3a",
    archetype: "הנועזת",
    kicker: "הנועזת · כוח ודומיננטיות",
    title: "הריח שלא שוכחים",
    body: [
      "האנרגיה שלך חזקה ודומיננטית. מה שממגנט אצלך זה כוח ונוכחות.",
      "בשמים עמוקים, עשירים וקצת 'נועזים' עובדים עלייך הכי טוב.",
    ],
    notes: "חפשי תווים של עור, אמבר, פצ׳ולי ותבלינים.",
    examples: [
      {
        brand: "Tom Ford",
        name: "Velvet Orchid",
        svgId: "b8a",
        gradFrom: "#6a2a4a",
        gradTo: "#2a0a1a",
        capColor: "#caa055",
        shape: "rect",
        labelText: "VELVET ORCHID",
        labelSize: 5,
      },
      {
        brand: "Yves Saint Laurent",
        name: "Black Opium",
        svgId: "b8b",
        gradFrom: "#3a2a4a",
        gradTo: "#1a0a1a",
        capColor: "#caa055",
        shape: "rect",
        labelText: "BLACK OPIUM",
        labelSize: 6,
      },
      {
        brand: "Carolina Herrera",
        name: "Good Girl",
        svgId: "b8c",
        gradFrom: "#d4a878",
        gradTo: "#8a5a2a",
        capColor: "#5a3a2a",
        shape: "ellipse",
        labelText: "GOOD GIRL",
        labelSize: 6,
      },
    ],
    sig: "זה ריח שלא שוכחים 👑",
    pickerLabel: "הנועזת",
  },
  {
    n: 9,
    accent: "#5a8e94",
    pickTint: "#6ba4a8",
    archetype: "האוניברסלית",
    kicker: "האוניברסלית · חיבור רחב",
    title: "ריח שמרגיש אחר, וזה הקסם",
    body: [
      "האנרגיה שלך אוניברסלית, רחבה ומחברת. מה שממגנט אצלך זה משהו לא צפוי וקצת שונה.",
      "ריחות יוניסקס עם שילוב של הדרים, עצים ומאסק עובדים עלייך מדהים.",
    ],
    notes: "חפשי בשמים מיוחדים וכאלה שהם לא 'רק נשיים'.",
    examples: [
      {
        brand: "Maison Francis Kurkdjian",
        name: "Baccarat Rouge 540",
        svgId: "b9a",
        gradFrom: "#f5d4d4",
        gradTo: "#c87878",
        capColor: "#caa055",
        shape: "rect",
        labelText: "BACCARAT 540",
        labelSize: 5,
      },
      {
        brand: "Escentric Molecules",
        name: "Molecule 01",
        svgId: "b9b",
        gradFrom: "#faf6f1",
        gradTo: "#c8d4e0",
        capColor: "#8a98a8",
        shape: "circle",
        labelText: "01",
        labelSize: 9,
      },
      {
        brand: "Byredo",
        name: "Mojave Ghost",
        svgId: "b9c",
        gradFrom: "#e8d4b8",
        gradTo: "#a88a5a",
        capColor: "#222",
        shape: "rect",
        labelText: "Mojave Ghost",
        labelSize: 5,
      },
    ],
    sig: "זה ריח שמרגיש אחר וזה בדיוק מה שמושך אלייך אנשים 🌍",
    pickerLabel: "האוניברסלית",
  },
];

const FOOTER = [
  { label: "דף הבית", href: "/" },
  { label: "קורס מצפן הנשמה", href: "/compass" },
  { label: "מפה נומרולוגית", href: "/map" },
  { label: "מדיניות פרטיות", href: "/privacy" },
];

const WA_HREF =
  "https://wa.me/972585577021?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A0%D7%94%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%A2%D7%9E%D7%95%D7%93%20%D7%A9%D7%9C%20%D7%94%D7%91%D7%A9%D7%9E%D7%99%D7%9D%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93.";

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Inline SVG perfume bottle illustration. Keeps all gradient IDs unique. */
function BottleArt({ b }: { b: Bottle }): JSX.Element {
  const gId = `grad-${b.svgId}`;
  return (
    <svg viewBox="0 0 60 90" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={b.gradFrom} />
          <stop offset="100%" stopColor={b.gradTo} />
        </linearGradient>
      </defs>
      {b.shape === "rect" && (
        <>
          <rect x="22" y="2" width="16" height="10" rx="1.5" fill={b.capColor} />
          <rect x="26" y="12" width="8" height="6" fill={b.capColor} />
          <rect x="12" y="18" width="36" height="68" rx="3" fill={`url(#${gId})`} />
          {b.labelText && (
            <text
              x="30"
              y="54"
              textAnchor="middle"
              fontFamily="serif"
              fontSize={b.labelSize ?? 7}
              fill="rgba(255,255,255,0.7)"
              letterSpacing="1"
            >
              {b.labelText}
            </text>
          )}
        </>
      )}
      {b.shape === "rounded" && (
        <>
          <rect x="24" y="2" width="12" height="10" rx="1" fill={b.capColor} />
          <rect x="27" y="12" width="6" height="6" fill={b.capColor} />
          <path
            d="M14 22 Q 14 18 18 18 L 42 18 Q 46 18 46 22 L 46 78 Q 46 86 38 86 L 22 86 Q 14 86 14 78 Z"
            fill={`url(#${gId})`}
          />
          {b.labelText && (
            <text
              x="30"
              y="56"
              textAnchor="middle"
              fontFamily="serif"
              fontSize={b.labelSize ?? 7}
              fill="rgba(255,255,255,0.65)"
            >
              {b.labelText}
            </text>
          )}
        </>
      )}
      {b.shape === "ellipse" && (
        <>
          <rect x="24" y="2" width="12" height="8" rx="1" fill={b.capColor} />
          <rect x="26" y="10" width="8" height="6" fill={b.capColor} />
          <ellipse cx="30" cy="52" rx="20" ry="34" fill={`url(#${gId})`} />
          {b.labelText && (
            <text
              x="30"
              y="56"
              textAnchor="middle"
              fontFamily="serif"
              fontSize={b.labelSize ?? 7}
              fill="rgba(255,255,255,0.7)"
            >
              {b.labelText}
            </text>
          )}
        </>
      )}
      {b.shape === "triangle" && (
        <>
          <circle cx="30" cy="8" r="6" fill={b.capColor} />
          <path
            d="M10 32 Q 30 12 50 32 L 50 76 Q 50 86 40 86 L 20 86 Q 10 86 10 76 Z"
            fill={`url(#${gId})`}
          />
        </>
      )}
      {b.shape === "trapezoid" && (
        <>
          <circle cx="30" cy="8" r="6" fill={b.capColor} />
          <rect x="27" y="14" width="6" height="6" fill={b.capColor} />
          <path
            d="M16 22 Q 30 18 44 22 L 44 78 Q 44 86 36 86 L 24 86 Q 16 86 16 78 Z"
            fill={`url(#${gId})`}
          />
          {b.labelText && (
            <text
              x="30"
              y="52"
              textAnchor="middle"
              fontFamily="serif"
              fontSize={b.labelSize ?? 7}
              fill="rgba(255,255,255,0.65)"
            >
              {b.labelText}
            </text>
          )}
        </>
      )}
      {b.shape === "circle" && (
        <>
          <circle cx="30" cy="48" r="22" fill={`url(#${gId})`} stroke={b.capColor} strokeWidth="0.5" />
          {b.labelText && (
            <text
              x="30"
              y="52"
              textAnchor="middle"
              fontFamily="serif"
              fontSize={b.labelSize ?? 9}
              fill={b.capColor}
            >
              {b.labelText}
            </text>
          )}
        </>
      )}
    </svg>
  );
}

/** Luxe glass scent result card that animates in/out. */
function ScentCard({ scent }: { scent: ScentData }): JSX.Element {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      key={scent.n}
      className="bsm-result"
      style={{ "--bsm-accent": scent.accent } as React.CSSProperties}
      initial={reduced ? false : { opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.42, ease: [0.34, 1.2, 0.64, 1] }}
    >
      {/* Head */}
      <div className="bsm-result__head">
        <div className="bsm-result__badge" aria-hidden="true">
          {scent.n}
        </div>
        <div className="bsm-result__meta">
          <span className="bsm-result__kicker">{scent.kicker}</span>
          <h2 className="bsm-result__title">{scent.title}</h2>
        </div>
      </div>

      {/* Body paragraphs */}
      {scent.body.map((p, i) => (
        <p key={i} className="bsm-result__body">
          {p}
        </p>
      ))}

      {/* Notes */}
      <p className="bsm-result__notes">
        {scent.notesLabel && <b>{scent.notesLabel}</b>}
        {scent.notes}
      </p>

      {/* Bottle examples */}
      <span className="bsm-ex-label" aria-label="דוגמאות לבשמים">
        דוגמאות
      </span>
      <div className="bsm-bottles" role="list" aria-label={`דוגמאות בשמים למספר ${scent.n}`}>
        {scent.examples.map((bottle) => (
          <div key={bottle.svgId} className="bsm-bottle" role="listitem">
            <div className="bsm-bottle__art">
              <BottleArt b={bottle} />
            </div>
            <span className="bsm-bottle__brand">{bottle.brand}</span>
            <span className="bsm-bottle__name">{bottle.name}</span>
          </div>
        ))}
      </div>

      {/* Signature */}
      <p className="bsm-result__sig" aria-label={`סיכום: ${scent.sig}`}>
        {scent.sig}
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Bsamim(): JSX.Element {
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion() ?? false;

  const activeScent = selected !== null ? SCENTS.find((s) => s.n === selected) ?? null : null;

  function handlePick(n: number): void {
    setSelected((prev) => (prev === n ? null : n));
  }

  function handleKeyDown(e: React.KeyboardEvent, n: number): void {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePick(n);
    }
  }

  return (
    <CosmicShell
      header={{ ctaLabel: "עוד על אנה", ctaHref: "#anna-bridge" }}
      footerLinks={FOOTER}
      sticky={{ label: "כתבי לי בוואטסאפ", href: WA_HREF }}
    >
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="cz-section bsm-hero" aria-labelledby="bsm-hero-heading">
        <div className="cz-wrap">
          {/* Decorative bottle SVG */}
          <div className="bsm-hero__bottle" aria-hidden="true">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cec0b0" />
                  <stop offset="100%" stopColor="#8fa69a" />
                </linearGradient>
                <radialGradient id="heroAura" cx="50%" cy="55%" r="55%">
                  <stop offset="0%" stopColor="#faf6f1" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#faf6f1" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="105" r="92" fill="url(#heroAura)" />
              <rect x="80" y="38" width="40" height="22" rx="3" fill="url(#heroGrad)" />
              <rect x="88" y="60" width="24" height="12" fill="#6f8479" />
              <path
                d="M58 78 Q 58 72 64 72 L 136 72 Q 142 72 142 78 L 142 168 Q 142 184 124 184 L 76 184 Q 58 184 58 168 Z"
                fill="url(#heroGrad)"
              />
              <rect x="74" y="108" width="52" height="50" rx="3" fill="#faf6f1" opacity="0.6" />
              <text x="100" y="136" textAnchor="middle" fontFamily="Bellefair, serif" fontSize="14" fill="#6f8479" letterSpacing="2">
                OR
              </text>
              <text x="100" y="152" textAnchor="middle" fontFamily="Bellefair, serif" fontSize="9" fill="#6f8479" letterSpacing="3">
                HANESHAMA
              </text>
              <circle cx="38" cy="62" r="3" fill="#cec0b0" />
              <circle cx="166" cy="50" r="2.5" fill="#8fa69a" />
              <circle cx="170" cy="120" r="3" fill="#cec0b0" />
              <circle cx="32" cy="140" r="2.5" fill="#8fa69a" />
              <circle cx="178" cy="170" r="2" fill="#cec0b0" />
            </svg>
          </div>

          <p className="cz-eyebrow">המספר שגילית · אנה אשכנזי</p>
          <h1 id="bsm-hero-heading" className="cz-h2">
            הבושם שמושך <em className="cz-h2-em">אנשים אלייך</em>
          </h1>
          <p className="cz-lede">
            לכל אנרגיה יש שפת ריחות משלה. בחרי את המספר שקיבלת באינסטגרם וגלי איזה ריח באמת מסתדר איתך, ולמה
            אנשים נמשכים אלייך בלי להבין למה.
          </p>
        </div>
      </section>

      {/* ── Number Picker ─────────────────────────────────────────── */}
      <section className="cz-section bsm-picker" aria-labelledby="bsm-picker-heading">
        <div className="cz-wrap">
          <p id="bsm-picker-heading" className="bsm-picker__lede">
            לחצי על המספר שלך כדי לגלות את הבושם שלך
          </p>

          <motion.div
            className="bsm-picker__grid"
            role="group"
            aria-label="בחרי את המספר הנומרולוגי שלך"
            variants={reduced ? undefined : revealContainer}
            initial={reduced ? undefined : "hidden"}
            whileInView={reduced ? undefined : "show"}
            viewport={{ once: true, margin: "-60px" }}
          >
            {SCENTS.map((s) => (
              <motion.button
                key={s.n}
                className={`bsm-pick${selected === s.n ? " bsm-pick--active" : ""}`}
                style={{ "--bsm-pick-tint": s.pickTint } as React.CSSProperties}
                onClick={() => handlePick(s.n)}
                onKeyDown={(e) => handleKeyDown(e, s.n)}
                aria-pressed={selected === s.n}
                aria-label={`מספר ${s.n} · ${s.pickerLabel}${selected === s.n ? " · נבחר" : ""}`}
                type="button"
                variants={reduced ? undefined : revealItem}
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
              >
                <span className="bsm-pick__num" aria-hidden="true">
                  {s.n}
                </span>
                <span className="bsm-pick__lbl" aria-hidden="true">
                  {s.pickerLabel}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Result ────────────────────────────────────────────────── */}
      <section className="cz-section" aria-live="polite" aria-atomic="true" aria-label="תוצאת הבושם שלך">
        <div className="cz-wrap bsm-result-wrap">
          <AnimatePresence mode="wait">
            {activeScent ? (
              <ScentCard key={activeScent.n} scent={activeScent} />
            ) : (
              <motion.div
                key="prompt"
                className="bsm-prompt"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="bsm-prompt__icon" aria-hidden="true">
                  <svg width="52" height="52" viewBox="0 0 200 200" aria-hidden="true">
                    <defs>
                      <linearGradient id="promptGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#cec0b0" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#8fa69a" stopOpacity="0.7" />
                      </linearGradient>
                    </defs>
                    <rect x="80" y="38" width="40" height="22" rx="3" fill="url(#promptGrad)" />
                    <rect x="88" y="60" width="24" height="12" fill="#8fa69a" opacity="0.6" />
                    <path
                      d="M58 78 Q 58 72 64 72 L 136 72 Q 142 72 142 78 L 142 168 Q 142 184 124 184 L 76 184 Q 58 184 58 168 Z"
                      fill="url(#promptGrad)"
                    />
                  </svg>
                </span>
                <p>בחרי מספר למעלה כדי לגלות את הבושם שלך</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bridge to Anna ────────────────────────────────────────── */}
      <section className="cz-section cz-band bsm-bridge" id="anna-bridge" aria-labelledby="bsm-bridge-heading">
        <div className="cz-wrap">
          <Reveal>
            <div className="bsm-bridge__avatar">
              <img
                src="/assets/anna-portrait.jpg"
                alt="אנה אשכנזי, מייסדת אנה אשכנזי"
                loading="lazy"
                width={96}
                height={96}
              />
            </div>
          </Reveal>

          <Reveal>
            <p className="cz-kicker">הנתון הזה הוא רק התחלה</p>
          </Reveal>

          <Reveal>
            <h2 id="bsm-bridge-heading" className="cz-h2">
              הנתון שלך מספר <em className="cz-h2-em">הרבה יותר מבושם.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p className="cz-lede">
              במפה הנומרולוגית שלך, אפשר לראות הרבה יותר מאיזה בושם הכי נכון לך. מה האופי שלך, החוזקות שלך,
              החולשות שלך, איך את אוהבת, איך את עובדת, מה את מסתירה ומה מניע אותך באמת. זה מה שאני מלמדת
              בקורס מצפן הנשמה ועוד הרבה מעבר.
            </p>
          </Reveal>

          <Reveal>
            <CzLink href="/compass" className="cz-btn cz-btn--gold cz-btn--lg">
              קורס מצפן הנשמה®
            </CzLink>
          </Reveal>

          <Reveal>
            <p className="bsm-bridge__more">
              או <CzLink href="/">חזרה לאנה אשכנזי</CzLink> · שני הקורסים שלנו
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WhatsApp ──────────────────────────────────────────────── */}
      <section className="cz-section bsm-wa" aria-labelledby="bsm-wa-heading">
        <div className="cz-wrap">
          <Reveal>
            <p className="cz-kicker">יש לך שאלה?</p>
          </Reveal>
          <Reveal>
            <h2 id="bsm-wa-heading" className="cz-h2">
              כתבי לי <em className="cz-h2-em">בוואטסאפ</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="cz-lede">
              בא לך לשאול עוד על הקורס, על המספר שלך או על משהו אחר לגמרי? אני פה.
            </p>
          </Reveal>
          <Reveal>
            <a
              className="bsm-wa__btn"
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="שלחי לי הודעה בוואטסאפ, מספר 058-557-7021"
            >
              <WhatsAppIcon size={22} />
              <span>058-557-7021 · WhatsApp</span>
            </a>
          </Reveal>
        </div>
      </section>
    </CosmicShell>
  );
}
