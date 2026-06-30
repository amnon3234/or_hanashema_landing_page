import "./Compass.css";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CosmicShell,
  CzLink,
  Reveal,
  WhatsAppIcon,
  revealContainer,
  revealItem,
} from "../design3/Cosmic";

// ─── Constants ───────────────────────────────────────────────────────────────

const WA_WAITLIST =
  "https://wa.me/972585577021?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A0%D7%94%2C%20%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%94%D7%A6%D7%98%D7%A8%D7%A3%20%D7%9C%D7%A8%D7%A9%D7%99%D7%9E%D7%AA%20%D7%94%D7%94%D7%9E%D7%AA%D7%A0%D7%94%20%D7%9C%D7%A7%D7%95%D7%A8%D7%A1%20%D7%9E%D7%A6%D7%A4%D7%9F%20%D7%94%D7%A0%D7%A9%D7%9E%D7%94.";
const WA_NEXT_COHORT =
  "https://wa.me/972585577021?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%90%D7%A0%D7%94%2C%20%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%97%D7%96%D7%95%D7%A8%20%D7%94%D7%91%D7%90.";

// ─── Modules data ─────────────────────────────────────────────────────────────

const MODULES = [
  {
    num: "01",
    title: "שפת המספרים",
    desc: "היכרות עמוקה עם התדרים של 1-9: איך הם מתבטאים באישיות, בהתנהגות, בשפת הגוף ובאנרגיה. נלמד לזהות תדרים גם דרך התבוננות, לא רק דרך המפה.",
    result: "תזהי תדר של אדם תוך דקות מהמפגש.",
    meta: "1 מפגש",
  },
  {
    num: "02",
    title: "אבני הבניין של המפה",
    desc: "צלילה לכל הנתונים: יום לידה, שביל גורל, שמות, אהו״י, עיצורים, משולש נומרולוגי, מטריצה, עודפים וחוסרים, וחיבור הכל לקריאה אחת.",
    result: "מפה אחת מסודרת, לא חישובים מפוזרים.",
    meta: "2 מפגשים",
  },
  {
    num: "03",
    title: "קודים וצירופים",
    desc: "זיהוי צירופים מרכזיים והבנה איך שילובי מספרים משפיעים על האישיות, הזוגיות והקריירה, כולל קודים מיוחדים ודפוסים חוזרים.",
    result: "לזהות דפוסים חוזרים שמסבירים התנהגות.",
    meta: "1 מפגש",
  },
  {
    num: "04",
    title: "10 הספירות מעולם הקבלה",
    desc: "חיבור הנומרולוגיה ל-10 הספירות: אור וצל בכל ספירה, מבנה הנפש, חוסרים ועודפים אנרגטיים, וחיבור לשיטת מצפן הנשמה®.",
    result: 'להעמיק את המפה האישית מעבר לנומרולוגיה ה"סטנדרטית".',
    meta: "1 מפגש",
  },
  {
    num: "05",
    title: "מסרים מגלגולים קודמים",
    desc: "הרובד הנשמתי של המפה: זכר נשמתי, תיקון נשמתי, דפוסים חוזרים מהעבר, חסמים נשמתיים וחיבור הייעוד למסע.",
    result: "להבין מה הנשמה מביאה איתה לחיים האלה.",
    meta: "1 מפגש",
  },
  {
    num: "06",
    title: "התאמה זוגית והצלבת מפות",
    desc: "קריאת התאמות זוגיות עמוקה דרך הצלבת מפות: אילו כוחות מחברים, איפה נוצרים קונפליקטים, ואיך לזהות את הדינמיקה האמיתית בקשר.",
    result: "לקרוא דינמיקה זוגית בלי שהאדם יספר לך עליה.",
    meta: "1 מפגש",
  },
  {
    num: "07",
    title: "עיתויים וחלונות זמן",
    desc: "זיהוי תקופות משמעותיות: שנה אישית, חודש ויום אישי, פסגות ואתגרים, וחלונות זמן שבהם נכון לפעול, לשחרר או להתחיל מחדש.",
    result: "לדעת מתי לפעול, מתי להמתין, מתי לשחרר.",
    meta: "1 מפגש",
  },
  {
    num: "08",
    title: "סטאז׳, תרגול וסיום",
    desc: "מפגש מסכם: חזרה על החומר, תרגול קריאת מפות מלא וסטאז׳ מעשי. בסיום הקורס: חלוקת תעודות סיום.",
    result: "ללוות לקוח אמיתי מההתחלה ועד מסירת המפה.",
    meta: "2 מפגשים",
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "למי הקורס מיועד?",
    a: "לכל מי שרוצה ללמוד לקרוא אנשים לעומק דרך נומרולוגיה, גם ללא ניסיון קודם. מתאים במיוחד למטפלים, מאמנים, אנשים בתהליכי התפתחות אישית, ולמי שרוצה להפוך את הנומרולוגיה לכלי אבחוני אמיתי.",
  },
  {
    q: "מה הפורמט של הקורס?",
    a: "קורס פרונטלי בראשון לציון, עזריאלי ראשונים: 10 מפגשים שבועיים של 4 שעות, בקבוצה קטנה ואינטימית. תחילת המחזור הקרוב: 17.6.2026.",
  },
  {
    q: "האם צריך ידע קודם?",
    a: "לא. הקורס מיועד גם למי שכבר למד נומרולוגיה וגם למי שמתחיל מאפס.",
  },
  {
    q: "מה מקבלים בנוסף לקורס?",
    a: "חוברת קורס מושקעת, תיק בד, מחברת ועט, תרגולים שבועיים, סטאז׳ מעשי בסיום, ותעודת סיום.",
  },
  {
    q: "האם יש מדיניות ביטול?",
    a: "ניתן לבטל עד שבועיים לפני תחילת הקורס. אין החזר על דמי הרשמה.",
  },
  {
    q: "איך נרשמים?",
    a: "שלחי לי הודעה בוואטסאפ ואחזור אלייך לשיחת התאמה. נבדוק יחד שהקורס מתאים לך, נסקור את התוכן ונענה על כל שאלה.",
  },
];

// ─── Inline icons ─────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="cz-check__icon">
      <circle cx="11" cy="11" r="11" fill="currentColor" fillOpacity="0.18" />
      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M8 1.5L9.6 6.1H14.5L10.5 8.9L12.1 13.5L8 10.7L3.9 13.5L5.5 8.9L1.5 6.1H6.4L8 1.5Z" fill="currentColor" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className={`cmp-faq__chevron${open ? " cmp-faq__chevron--open" : ""}`}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="20" height="20">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const id = `cmp-faq-${q.slice(0, 12).replace(/\s/g, "-")}`;
  return (
    <div className="cmp-faq__item">
      <button className="cmp-faq__trigger" onClick={onToggle} aria-expanded={isOpen} aria-controls={id}>
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
            <p className="cmp-faq__answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Ongoing modal ────────────────────────────────────────────────────────────

function OngoingModal({ onClose }: { onClose: () => void }) {
  const shouldReduce = useReducedMotion() ?? false;
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = "cmp-modal-title";
  const descId = "cmp-modal-desc";

  // Focus the close button on mount
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Escape key dismiss
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const cardVariants = shouldReduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, scale: 0.92 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] } },
        exit: { opacity: 0, scale: 0.94, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
      };

  return (
    <motion.div
      className="cmp-modal-scrim"
      variants={backdropVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      aria-hidden="false"
    >
      <motion.div
        className="cmp-modal cz-glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        variants={cardVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="cmp-modal__close"
          aria-label="סגירת חלון המחזור הנוכחי"
          onClick={onClose}
        >
          <IconClose />
        </button>

        <div className="cmp-modal__pulse-wrap" aria-hidden="true">
          <span className="cmp-modal__pulse" />
        </div>

        <h2 className="cmp-modal__title" id={titleId}>
          הקורס בעיצומו — המחזור הנוכחי כבר רץ
        </h2>

        <p className="cmp-modal__desc" id={descId}>
          מחזור קיץ 2026 מתקיים עכשיו בראשון לציון.
          הצטרפי לרשימת ההמתנה למחזור הבא — נעדכן אותך ראשונה כשהרשמה תיפתח.
        </p>

        <div className="cmp-modal__actions">
          <CzLink
            href={WA_NEXT_COHORT}
            className="cz-btn cz-btn--wa cz-btn--block"
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon size={18} />
            צרי קשר לפרטים על המחזור הבא
          </CzLink>
          <button className="cz-btn cz-btn--ghost cz-btn--block cmp-modal__dismiss" onClick={onClose}>
            הבנתי
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

/** קורס נומרולוגיה מצפן הנשמה — course sales page. */
export default function Compass() {
  const shouldReduce = useReducedMotion() ?? false;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(true);

  function closeModal() {
    setModalOpen(false);
  }

  function handleFaqToggle(i: number) {
    setOpenFaq((prev) => (prev === i ? null : i));
  }

  return (
    <CosmicShell
      header={{ ctaLabel: "רשימת המתנה", ctaHref: WA_WAITLIST }}
      sticky={{ label: "הצטרפי לרשימת ההמתנה", href: WA_WAITLIST }}
    >
      {/* ── Ongoing modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && <OngoingModal onClose={closeModal} />}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="cmp-hero" aria-labelledby="cmp-hero-title">
        <div className="cz-wrap">
          <div className="cmp-hero__inner">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="cz-eyebrow">קורס נומרולוגיה · מצפן הנשמה®</span>

              <h1 className="cmp-hero__title" id="cmp-hero-title">
                רוב המפות הנומרולוגיות{" "}
                <em className="cz-h2-em">שטחיות מדי.</em>
              </h1>
              <p className="cmp-hero__sub">
                קורס עומק שילמד אותך להבין אנשים דרך המספרים, לא דרך שינון, אלא דרך חיבור בין דפוסים, קונפליקטים וכוחות פנימיים.
              </p>
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.96 }}
                style={{ display: "inline-flex" }}
              >
                <CzLink href={WA_WAITLIST} className="cz-btn cz-btn--gold cz-btn--lg">
                  <WhatsAppIcon size={20} />
                  הצטרפי לרשימת ההמתנה
                </CzLink>
              </motion.div>
              <p className="cmp-hero__cta-note">המחזור הנוכחי בעיצומו · הרשמה למחזור הבא פתוחה בקרוב</p>
            </motion.div>

            <div className="cmp-hero__photo-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="cmp-hero__aura" aria-hidden="true" />
                <motion.div
                  className="cmp-hero__photo-frame"
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
                    src="/assets/anna-portrait.jpg"
                    alt="פורטרט אנה אשכנזי"
                    className="cmp-hero__photo"
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

      {/* ── Trust strip ──────────────────────────────────────────────── */}
      <section className="cmp-trust" aria-label="נתוני אמון">
        <div className="cz-wrap">
          <motion.div
            className="cmp-trust__grid"
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div className="cmp-trust__item" variants={revealItem}>
              <span className="cmp-trust__num">10</span>
              <p className="cmp-trust__label">מפגשים · 4 שעות כל אחד</p>
            </motion.div>
            <motion.div className="cmp-trust__item" variants={revealItem}>
              <span className="cmp-trust__num">17.6.26</span>
              <p className="cmp-trust__label">תחילת המחזור הנוכחי</p>
            </motion.div>
            <motion.div className="cmp-trust__item" variants={revealItem}>
              <span className="cmp-trust__num cmp-trust__num--sm">ראשון לציון<br />עזריאלי ראשונים</span>
              <p className="cmp-trust__label">קורס פרונטלי</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why this course ───────────────────────────────────────────── */}
      <section className="cz-section" aria-labelledby="cmp-why-title">
        <div className="cz-wrap">
          <Reveal>
            <span className="cz-kicker">על הקורס</span>
            <h2 className="cz-h2" id="cmp-why-title">
              למה דווקא <em className="cz-h2-em">הקורס הזה</em>
            </h2>
            <p className="cz-lede">
              רוב לימודי הנומרולוגיה נשארים ברמה שטחית. הקורס הזה מלמד איך לחבר את כל חלקי המפה לתמונה אחת מדויקת: דפוסים, קונפליקטים, ייעוד.
            </p>
          </Reveal>
          <motion.ul
            className="cmp-props"
            role="list"
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                title: "מודל חדש שלא קיים בשוק",
                body: 'לא "1 הוא כזה ו-2 היא כזאת". תלמדי איך כל הנתונים עובדים יחד, ומה באמת מנהל את האדם מולך, כולל חישובים שלא קיימים במפות סטנדרטיות.',
              },
              {
                title: "כלי לחיים ולעבודה",
                body: "הידע שתרכשי יעזור לך גם בהתפתחות האישית וגם בעבודה עם אנשים: בזוגיות, במשפחה, בקריירה ובכל מערכת יחסים.",
              },
              {
                title: "מתודולוגיה שלא תמצאי בשום קורס אחר",
                body: "תלמדי לקרוא מפות בצורה מסודרת, להבין קונפליקטים פנימיים ולבנות אבחון ברור ומעמיק. שיטה שעובדת במציאות.",
              },
            ].map((p, i) => (
              <motion.li key={i} variants={revealItem}>
                <motion.div
                  className="cz-glass cmp-prop"
                  whileHover={shouldReduce ? {} : { scale: 1.03, borderColor: "rgba(124,77,255,0.4)" }}
                  whileTap={shouldReduce ? {} : { scale: 0.98 }}
                >
                  <span className="cmp-prop__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="cmp-prop__title">{p.title}</h3>
                    <p className="cmp-prop__body">{p.body}</p>
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── About Anna ────────────────────────────────────────────────── */}
      <section className="cz-section" aria-labelledby="cmp-about-title">
        <div className="cz-wrap">
          <Reveal>
            <span className="cz-kicker">המורה</span>
            <h2 className="cz-h2" id="cmp-about-title">
              היכרות עם <em className="cz-h2-em">אנה</em>
            </h2>
          </Reveal>
          <div className="cmp-about">
            <Reveal className="cmp-about__photo-wrap">
              <img
                src="/assets/anna-side.jpg"
                alt="פורטרט של אנה אשכנזי"
                className="cmp-about__photo"
                width={280}
                height={373}
                loading="lazy"
              />
            </Reveal>
            <Reveal>
              <div className="cmp-about__content">
                <div className="cmp-about__paragraphs">
                  <p className="cmp-about__p">
                    אנה אשכנזי היא מרצה ומפתחת שיטת המגן®, מודל חדש לקריאה נומרולוגית עמוקה. בשנים האחרונות ליוותה מאות אנשים דרך אבחונים, תהליכים ולימודי נומרולוגיה מתוך גישה שמסתכלת על האדם כמכלול ולא כאוסף מספרים.
                  </p>
                  <p className="cmp-about__p">
                    "אחרי שנים של פענוח מפות הבנתי שמשהו חסר בעולם הנומרולוגיה: עומק אמיתי. ראיתי אנשים שלומדים לפרש מספרים אבל לא באמת יודעים לקרוא בן אדם. הקורס נולד מתוך הרצון ללמד שיטה אחרת: מדויקת, אנושית ומחוברת למציאות."
                  </p>
                </div>
                <blockquote className="cmp-about__signature">
                  המטרה שלי היא לא ללמד אותך לזכור מספרים, אלא להבין אנשים.
                </blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Curriculum ────────────────────────────────────────────────── */}
      <section className="cz-section" aria-labelledby="cmp-curriculum-title" id="curriculum">
        <div className="cz-wrap">
          <Reveal>
            <span className="cz-kicker">תכנית הלימודים</span>
            <h2 className="cz-h2" id="cmp-curriculum-title">
              מה <em className="cz-h2-em">לומדים</em>
            </h2>
            <p className="cz-lede">
              10 מפגשים שבועיים של 4 שעות בראשון לציון · קבוצה אינטימית · חוברת לימוד · תרגול מעשי · סטאז׳ ותעודת סיום.
            </p>
          </Reveal>
          <motion.ol
            className="cmp-modules"
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {MODULES.map((m) => (
              <motion.li key={m.num} variants={revealItem}>
                <motion.div
                  className="cz-glass cmp-module"
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.99 }}
                >
                  <span className="cmp-module__num">{m.num}</span>
                  <div className="cmp-module__content">
                    <h3 className="cmp-module__title">{m.title}</h3>
                    <p className="cmp-module__desc">
                      {m.desc}
                      <br />
                      <strong className="cmp-module__result">תוצאה: </strong>
                      {m.result}
                    </p>
                    <span className="cmp-module__meta">{m.meta}</span>
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </motion.ol>
          <Reveal>
            <div className="cmp-center">
              <motion.div whileHover={shouldReduce ? {} : { scale: 1.04 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                <CzLink href={WA_WAITLIST} className="cz-btn cz-btn--ghost">
                  <WhatsAppIcon size={18} />
                  אני רוצה לשמוע עוד
                </CzLink>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Transformation callout ────────────────────────────────────── */}
      <section className="cmp-callout cz-section" aria-labelledby="cmp-callout-title">
        <div className="cz-wrap">
          <Reveal>
            <div className="cz-glass cmp-callout__inner">
              <span className="cz-kicker">בסוף 10 השבועות</span>
              <h2 className="cz-h2" id="cmp-callout-title">
                לא עוד אוסף פירושים —{" "}
                <em className="cz-h2-em">יכולת אמיתית.</em>
              </h2>
              <p className="cmp-callout__body">
                את לא תצאי עם עוד אוסף פירושים. תצאי עם יכולת לפתוח מפה לכל אדם שתפגשי, לראות את הדפוסים, את הקונפליקטים, את הייעוד, ולספר לו את סיפורו תוך שעה.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What's included ───────────────────────────────────────────── */}
      <section className="cz-section" aria-labelledby="cmp-included-title" id="included">
        <div className="cz-wrap">
          <div className="cmp-included__header">
            <Reveal>
              <span className="cz-kicker">מה כלול בקורס</span>
              <h2 className="cz-h2" id="cmp-included-title">
                מגיע איתך <em className="cz-h2-em">הביתה</em>
              </h2>
              <p className="cz-lede">כל מה שצריך להצליח — כלול בתשלום אחד.</p>
            </Reveal>
          </div>
          <ul className="cmp-checks" role="list">
            {[
              "10 מפגשים של 4 שעות — סך הכל 40 שעות לימוד",
              "חוברת קורס מושקעת",
              "תיק בד, מחברת ועט",
              "תרגולים שבועיים מעשיים",
              "סטאז׳ מעשי בסיום הקורס",
              "תעודת סיום",
              "קבוצה קטנה ואינטימית",
            ].map((item) => (
              <Reveal key={item} as="li" className="cz-check">
                <IconCheck />
                <span className="cz-check__text">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Waitlist / pricing section ────────────────────────────────── */}
      <section className="cz-section" id="waitlist" aria-labelledby="cmp-waitlist-title">
        <div className="cz-wrap">
          <div className="cmp-waitlist__header">
            <Reveal>
              <span className="cz-kicker">רשימת המתנה</span>
              <h2 className="cz-h2" id="cmp-waitlist-title">
                הקורס בעיצומו —{" "}
                <em className="cz-h2-em">הצטרפי למחזור הבא</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="cmp-waitlist__lede">
                מחזור קיץ 2026 כבר מתקיים. כדי להצטרף למחזור הבא — שלחי לי הודעה בוואטסאפ ואוסיף אותך לרשימת ההמתנה. תקבלי עדכון ראשונה כשהרשמה תיפתח.
              </p>
            </Reveal>
          </div>

          <div className="cmp-waitlist__grid">
            {/* Info card */}
            <Reveal>
              <motion.div
                className="cz-glass cmp-wcard"
                whileHover={shouldReduce ? {} : { scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 30px rgba(124,77,255,0.3)" }}
                whileTap={shouldReduce ? {} : { scale: 0.98 }}
              >
                <h3 className="cmp-wcard__name">כל הפרטים</h3>
                <p className="cmp-wcard__sub">מה כלול ומה המחיר</p>
                <div className="cmp-wcard__price">
                  <span className="cmp-wcard__currency">₪</span>
                  <span className="cmp-wcard__amount">???</span>
                </div>
                <p className="cmp-wcard__terms">המחיר ייקבע למחזור הבא · פנה לפרטים</p>
                <hr className="cmp-wcard__divider" />
                <ul className="cmp-wcard__features" role="list">
                  {["40 שעות לימוד פרונטלי", "חוברת מושקעת + ציוד", "סטאז׳ ותעודת סיום", "קבוצה קטנה ואינטימית"].map((f) => (
                    <li key={f} className="cmp-wcard__feature">
                      <IconStar />
                      {f}
                    </li>
                  ))}
                </ul>
                <CzLink
                  href={WA_WAITLIST}
                  className="cz-btn cz-btn--block cz-btn--primary"
                  aria-label="כתבי בוואטסאפ לקבלת פרטים ורישום לרשימת המתנה"
                >
                  <WhatsAppIcon size={18} />
                  שמרי את מקומך בתור
                </CzLink>
              </motion.div>
            </Reveal>

            {/* Featured card */}
            <Reveal>
              <motion.div
                className="cz-glass cmp-wcard cmp-wcard--featured"
                whileHover={shouldReduce ? {} : { scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(124,77,255,0.55)" }}
                whileTap={shouldReduce ? {} : { scale: 0.98 }}
              >
                <span className="cz-ribbon" aria-label="מסלול מומלץ">מומלץ</span>
                <h3 className="cmp-wcard__name">רשימת המתנה</h3>
                <p className="cmp-wcard__sub">עדיפות ראשונה + הטבות ראשונים</p>
                <div className="cmp-wcard__price cmp-wcard__price--wa">
                  <WhatsAppIcon size={32} />
                </div>
                <p className="cmp-wcard__terms">תשובה אישית תוך 24 שעות · בלי לחץ</p>
                <hr className="cmp-wcard__divider" />
                <ul className="cmp-wcard__features" role="list">
                  {["עדיפות ראשונה בהרשמה", "עדכון ראשון על פתיחת מחזור", "שיחת התאמה אישית", "בלי טפסים · בלי בירוקרטיה"].map((f) => (
                    <li key={f} className="cmp-wcard__feature">
                      <IconStar />
                      {f}
                    </li>
                  ))}
                </ul>
                <CzLink
                  href={WA_WAITLIST}
                  className="cz-btn cz-btn--wa cz-btn--block"
                  aria-label="שלחי הודעה בוואטסאפ להצטרפות לרשימת ההמתנה"
                >
                  <WhatsAppIcon size={18} />
                  כתבי לי בוואטסאפ
                </CzLink>
              </motion.div>
            </Reveal>
          </div>

          <Reveal>
            <div className="cmp-waitlist__wa">
              <p className="cmp-waitlist__wa-lede">יש שאלות? אשמח לענות ולספר על הקורס</p>
              <motion.div whileHover={shouldReduce ? {} : { scale: 1.04 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                <CzLink href={WA_WAITLIST} className="cz-btn cz-btn--wa" aria-label="פנה לאנה בוואטסאפ לשאלות">
                  <WhatsAppIcon />
                  תשובה ישירה · בלי לחץ
                </CzLink>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="cz-section" aria-labelledby="cmp-faq-title" id="faq">
        <div className="cz-wrap">
          <div className="cmp-faq__header">
            <Reveal>
              <span className="cz-kicker">שאלות נפוצות</span>
              <h2 className="cz-h2" id="cmp-faq-title">
                שאלות לפני <em className="cz-h2-em">שמתחילים</em>
              </h2>
            </Reveal>
          </div>
          <div className="cmp-faq__list" role="list">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={i}>
                <div role="listitem">
                  <FaqItem q={item.q} a={item.a} isOpen={openFaq === i} onToggle={() => handleFaqToggle(i)} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="cmp-lead" aria-labelledby="cmp-lead-title">
        <div className="cz-wrap">
          <Reveal>
            <div className="cmp-lead__inner">
              <h2 className="cmp-lead__title" id="cmp-lead-title">
                <em>המחזור הבא</em> — אני רוצה להיות שם
              </h2>
              <p className="cmp-lead__lede">
                שלחי לי הודעה ואשמח לספר לך על הקורס, לענות על שאלות ולרשום אותך לרשימת ההמתנה. בלי לחץ, בלי התחייבות.
              </p>
              <div className="cmp-lead__actions">
                <motion.div whileHover={shouldReduce ? {} : { scale: 1.05 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                  <CzLink href={WA_WAITLIST} className="cz-btn cz-btn--gold cz-btn--lg" aria-label="כתבי בוואטסאפ להצטרפות לרשימת ההמתנה">
                    <WhatsAppIcon size={20} />
                    כתבי לי בוואטסאפ עכשיו
                  </CzLink>
                </motion.div>
                <motion.div whileHover={shouldReduce ? {} : { scale: 1.04 }} whileTap={shouldReduce ? {} : { scale: 0.96 }} style={{ display: "inline-flex" }}>
                  <CzLink href="tel:+972585577021" className="cz-btn cz-btn--ghost" dir="ltr">
                    058-557-7021
                  </CzLink>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </CosmicShell>
  );
}
