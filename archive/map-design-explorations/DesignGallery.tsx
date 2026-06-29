import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./DesignGallery.css";

interface DesignEntry {
  to: string;
  index: string;
  name: string;
  note: string;
  swatches: string[];
}

const designs: DesignEntry[] = [
  {
    to: "/map/1",
    index: "01",
    name: "Celestial Night",
    note: "פלטת המקור — לילה עמוק ועמום עם זהב, שדה כוכבים וחשיפות מאופקות.",
    swatches: ["#14121c", "#211f2d", "#d0a960", "#f4efe4"],
  },
  {
    to: "/map/2",
    index: "02",
    name: "Luminous Ivory",
    note: "מערכון אדיטוריאלי בהיר — שנהב חם, חציל וזהב, פרלקס ופריחות קו עדינות.",
    swatches: ["#faf6ef", "#2e2230", "#c19a5b", "#c98b86"],
  },
  {
    to: "/map/3",
    index: "03",
    name: "Cosmic Aurora",
    note: "גרדיאנט מיסטי סגול־מג'נטה עם זכוכית, זוהר נע וספרות נומרולוגיות צפות.",
    swatches: ["#0d0a1f", "#7c4dff", "#d946a8", "#f0c97d"],
  },
  {
    to: "/map/4",
    index: "04",
    name: "Modern Bento",
    note: "בנטו עכשווי ונקי — נייטרלי חם וטרהקוטה, גרידים מדורגים וספירת מספרים.",
    swatches: ["#f5f1ea", "#1c1a17", "#c8772e", "#caa45a"],
  },
  {
    to: "/map/5",
    index: "05",
    name: "Botanical Organic",
    note: "טבעי ורגוע — מרווה וטרהקוטה, צורות אורגניות, עלים מצוירים ובלובים נושמים.",
    swatches: ["#f3f1e7", "#2c3023", "#7c8a63", "#c2724a"],
  },
  {
    to: "/map/6",
    index: "06",
    name: "Art Deco Luxe",
    note: "פאר גאומטרי — אזמרגד עמוק ופליז, מניפות שמש, מסגרות סימטריות ועיטורי קו.",
    swatches: ["#0f2a26", "#16403a", "#c8a253", "#f3ecd9"],
  },
  {
    to: "/map/7",
    index: "07",
    name: "Neo-Brutalist",
    note: "נועז וגולמי — נייר חם ומסגרות שחורות, צללים קשיחים, סגול חשמלי וטיקר נע.",
    swatches: ["#fdf6e9", "#1a1714", "#6b4cf0", "#ff6b4a"],
  },
  {
    to: "/map/8",
    index: "08",
    name: "Soft Clay",
    note: "רך ופלסטלינה — לבנדר פסטל ובלאש, משטחים תפוחים, צללים כפולים ובועות צפות.",
    swatches: ["#efeaf6", "#3a3247", "#9b7fd4", "#e8a0b8"],
  },
  {
    to: "/map/9",
    index: "09",
    name: "Celestial Dawn",
    note: "שחר אתרי בהיר — מעבר צבע שמיים, קווי קונסטלציה זהובים, כדור שמש ונשימת אור.",
    swatches: ["#fbf3ec", "#3a3350", "#c89b4e", "#d98aa0"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Gallery index for the four map-page design explorations. */
export default function DesignGallery() {
  return (
    <div className="dg">
      <header className="dg__head">
        <p className="dg__eyebrow">אור הנשמה · מפה נומרולוגית</p>
        <h1 className="dg__title">תשעה כיווני עיצוב</h1>
        <p className="dg__sub">
          אותו תוכן, ארבע שפות עיצוב שונות. בחרי כרטיס כדי לפתוח את העמוד המלא.
        </p>
      </header>

      <motion.ul
        className="dg__grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {designs.map((d) => (
          <motion.li key={d.to} variants={card}>
            <Link to={d.to} className="dg__card">
              <div
                className="dg__preview"
                style={{ background: d.swatches[0] }}
                aria-hidden="true"
              >
                <span className="dg__index" style={{ color: d.swatches[2] }}>
                  {d.index}
                </span>
                <div className="dg__swatches">
                  {d.swatches.map((c) => (
                    <span key={c} style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="dg__body">
                <h2 className="dg__name">{d.name}</h2>
                <p className="dg__note">{d.note}</p>
                <span className="dg__open">פתחי את העיצוב ←</span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
