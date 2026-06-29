/** Static content for the אנה אשכנזי hub page. */

export interface Course {
  id: string;
  teacher: string;
  title: string;
  /** Optional trademark/superscript glyph after the title. */
  titleSup?: string;
  type: string;
  photo: string;
  photoAlt: string;
  pitch: string;
  bullets: string[];
  ctaLabel: string;
  href: string;
}

export interface Instructor {
  id: string;
  kicker: string;
  photo: string;
  photoAlt: string;
  photoObjectPosition?: string;
  body: string;
  signature: string;
  linkLabel: string;
  href: string;
}

export const brand = {
  name: "אנה אשכנזי",
  logo: "",
  tagline: "שני קורסים. דרך אחת חזרה אל הפנים שלך.",
};

export const hero = {
  eyebrow: "אנה אשכנזי",
  titleLine1: "שיטת המגן",
  titleEm: "מפת הנשמה דרך ששת קודקודי החיים",
  sub: "קורסי עומק לנשים שמחפשות חיבור אמיתי לעצמן, למסע שלהן ולשורש שמניע אותן. בחרי את המסלול שמדבר אלייך עכשיו.",
};

export const courses: Course[] = [
  {
    id: "compass",
    teacher: "עם אנה אשכנזי",
    title: "מצפן הנשמה",
    titleSup: "®",
    type: "קורס נומרולוגיה פרונטלי · ראשון לציון",
    photo: "/assets/anna-portrait.jpg",
    photoAlt: "פורטרט אנה אשכנזי",
    pitch:
      "ללמוד לקרוא אנשים דרך המספרים — לא דרך שינון אלא דרך חיבור בין דפוסים, קונפליקטים וכוחות פנימיים. מתודולוגיה שלא תמצאי בשום קורס אחר.",
    bullets: [
      "10 מפגשים שבועיים · 4 שעות לכל מפגש",
      "פתיחת מחזור 17.6.2026 · עזריאלי ראשונים",
      "חוברת לימוד, סטאז׳ מלווה ותעודת סיום",
    ],
    ctaLabel: "פרטים מלאים על הקורס",
    href: "compass.html",
  },
  {
    id: "shoresh",
    teacher: "עם נטלי בכר",
    title: "שורש הנשמה",
    type: "קורס עומק פרונטלי · טיפול דרך תת מודע · ראשון לציון",
    photo: "/assets/natalie-portrait.jpg",
    photoAlt: "פורטרט נטלי בכר",
    pitch:
      "ללמוד לרפא חרדות, פחדים ודפוסים מעכבים, דרך חיבור ישיר לבורא ולתת המודע שלך. לא רק להבין — לדעת איך לגשת פנימה, להתחבר, ולרפא את עצמך באמת.",
    bullets: [
      "3 ימי לימוד מרוכזים · עזריאלי ראשונים",
      "תרגול מעשי וליווי בתהליך",
      "חיבור ישיר וצינור לקבל מסרים",
    ],
    ctaLabel: "פרטים מלאים על הקורס",
    href: "shoresh.html",
  },
];

export const bridge =
  "אנה אשכנזי הוא מרחב לנשים שמוכנות לחזור אל עצמן — דרך המספרים, דרך השורש, ודרך כל מה שמחבר בין השניים.";

export const instructors: Instructor[] = [
  {
    id: "anna",
    kicker: "אנה אשכנזי · מצפן הנשמה",
    photo: "/assets/anna-side.jpg",
    photoAlt: "פורטרט אנה אשכנזי",
    body: "מרצה ומפתחת שיטת המגן®, מודל חדש לקריאה נומרולוגית עמוקה. ליוותה מאות אנשים דרך אבחונים, תהליכים ולימודי נומרולוגיה מתוך גישה שמסתכלת על האדם כמכלול ולא כאוסף מספרים.",
    signature: "המטרה שלי היא לא ללמד אותך לזכור מספרים, אלא להבין אנשים.",
    linkLabel: "לקורס של אנה ←",
    href: "compass.html",
  },
  {
    id: "natalie",
    kicker: "נטלי בכר · שורש הנשמה",
    photo: "/assets/natalie-side.jpg",
    photoAlt: "פורטרט נטלי בכר",
    photoObjectPosition: "center 25%",
    body: "מלמדת טיפול דרך תת מודע. הקורס שלה נולד מתוך החיים שלה — מסע אישי דרך חרדות ופחדים, חיפוש אחרי תשובות שבסופו הגיעה לעולם הטיפול דרך תת מודע ולחיבור ישיר לבורא עולם.",
    signature: "שינוי אמיתי קורה רק כשאני מחוברת לשורש.",
    linkLabel: "לקורס של נטלי ←",
    href: "shoresh.html",
  },
];
