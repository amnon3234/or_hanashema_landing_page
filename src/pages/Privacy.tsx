import "./Privacy.css";
import { CosmicShell, CzLink } from "../design3/Cosmic";

const FOOTER = [
  { label: "דף הבית", href: "/" },
  { label: "קורס מצפן הנשמה", href: "/compass" },
  { label: "מפה נומרולוגית", href: "/map" },
  { label: "מדיניות פרטיות", href: "/privacy" },
];

export default function Privacy(): JSX.Element {
  return (
    <CosmicShell footerLinks={FOOTER}>
      <section className="cz-section prv-section">
        <div className="prv-wrap">
          <h1 className="prv-title">מדיניות פרטיות</h1>
          <p className="prv-updated">עדכון אחרון: מאי 2026</p>

          <p className="prv-intro">
            תודה שהגעת ל־<strong className="prv-strong">אנה אשכנזי</strong> — מרחב שמאגד את קורס העומק{" "}
            <strong className="prv-strong">״מצפן הנשמה״</strong> (קורס נומרולוגיה של אנה אשכנזי). הפרטיות שלך חשובה
            לנו. במסמך הזה נסביר במשפטים פשוטים איזה מידע נאסף בעת השימוש באתר, למה הוא נאסף, ומה הזכויות שלך.
          </p>

          <div className="cz-glass prv-panel">

            <h2 className="prv-h2">1. מי אחראי על המידע</h2>
            <p className="prv-p">הגורם האחראי על המידע הוא מפעילת הקורס:</p>
            <ul className="prv-ul">
              <li>
                <strong className="prv-strong">מצפן הנשמה</strong> — אנה אשכנזי ·{" "}
                <CzLink href="https://wa.me/972585577021" className="prv-link" dir="ltr">
                  WhatsApp · 058-557-7021
                </CzLink>
              </li>
            </ul>

            <hr className="prv-divider" />

            <h2 className="prv-h2">2. איזה מידע נאסף</h2>
            <p className="prv-p">אני אוספת רק את המידע ההכרחי כדי לחזור אלייך:</p>
            <ul className="prv-ul">
              <li>
                <strong className="prv-strong">שם מלא</strong> — כדי לפנות אלייך באופן אישי.
              </li>
              <li>
                <strong className="prv-strong">מספר טלפון</strong> — כדי שנוכל לדבר על הקורס.
              </li>
              <li>
                <strong className="prv-strong">כתובת דוא״ל</strong> — לתיעוד ולעדכונים על המחזור.
              </li>
              <li>
                <strong className="prv-strong">נתוני שימוש אנונימיים</strong> (כמו עמודים שצפית, סוג הדפדפן) — באמצעות
                Meta Pixel, כדי להבין אילו מודעות עובדות ולשפר את האתר.
              </li>
            </ul>

            <hr className="prv-divider" />

            <h2 className="prv-h2">3. למה אנחנו אוספות את המידע</h2>
            <ul className="prv-ul">
              <li>כדי לחזור אלייך לשיחת התאמה אישית לקורס.</li>
              <li>כדי לשלוח לך מידע ועדכונים על המחזור הקרוב (רק אם הסכמת).</li>
              <li>כדי למדוד את ביצועי האתר ולשפר את חוויית המשתמש.</li>
              <li>כדי למדוד את ביצועי הקמפיינים השיווקיים (פייסבוק, אינסטגרם, גוגל).</li>
            </ul>

            <hr className="prv-divider" />

            <h2 className="prv-h2">4. שירותים חיצוניים</h2>
            <p className="prv-p">
              האתר עושה שימוש בכלים חיצוניים שמעבדים מידע. כל אחד מהם מחויב למדיניות הפרטיות שלו:
            </p>
            <ul className="prv-ul">
              <li>
                <strong className="prv-strong">Formspree</strong> — מקבל את פרטי הטופס שמילאת ושולח אותם אליי במייל.{" "}
                <CzLink href="https://formspree.io/legal/privacy-policy/" className="prv-link">
                  מדיניות הפרטיות של Formspree
                </CzLink>
                .
              </li>
              <li>
                <strong className="prv-strong">Meta Pixel (Facebook/Instagram)</strong> — מאפשר למדוד אילו מודעות
                הביאו אותך לאתר ולהציג מודעות רלוונטיות.{" "}
                <CzLink href="https://www.facebook.com/about/privacy/" className="prv-link">
                  מדיניות הפרטיות של Meta
                </CzLink>
                .
              </li>
              <li>
                <strong className="prv-strong">Vercel</strong> — שירות אחסון האתר. לא נשמר אצלם מידע אישי שזיהיתי.
              </li>
            </ul>

            <hr className="prv-divider" />

            <h2 className="prv-h2">5. עוגיות (Cookies)</h2>
            <p className="prv-p">
              האתר משתמש בעוגיות של Meta Pixel לצורך מדידת ביצועי קמפיינים שיווקיים. אפשר לחסום עוגיות דרך הגדרות
              הדפדפן שלך, אך זה עשוי להשפיע על חלק מהפונקציונליות.
            </p>

            <hr className="prv-divider" />

            <h2 className="prv-h2">6. שמירת המידע</h2>
            <p className="prv-p">
              פרטים שמילאת בטופס נשמרים לצורך יצירת קשר וניהול הקשר עם הסטודנטיות. במקרה שהחלטת לא להירשם לקורס,
              הפרטים שלך יימחקו תוך 6 חודשים — אלא אם ביקשת מפורשות לשמור אותם לצורך עדכונים על מחזורים עתידיים.
            </p>

            <hr className="prv-divider" />

            <h2 className="prv-h2">7. הזכויות שלך</h2>
            <p className="prv-p">על פי חוק הגנת הפרטיות, יש לך זכות:</p>
            <ul className="prv-ul">
              <li>לעיין במידע שאנחנו שומרות עלייך.</li>
              <li>לבקש לתקן מידע לא נכון.</li>
              <li>לבקש למחוק את המידע שלך מהמערכת.</li>
              <li>להפסיק לקבל פניות שיווקיות בכל רגע.</li>
            </ul>

            <div className="prv-callout">
              <span className="prv-callout-title">איך לממש את הזכויות?</span>
              <p>
                פני ישירות לאנה אשכנזי (מצפן הנשמה):{" "}
                <CzLink href="https://wa.me/972585577021" className="prv-link" dir="ltr">
                  WhatsApp · 058-557-7021
                </CzLink>
                . נטפל בבקשתך תוך 14 ימים.
              </p>
            </div>

            <hr className="prv-divider" />

            <h2 className="prv-h2">8. אבטחת מידע</h2>
            <p className="prv-p">
              אני נוקטת באמצעי אבטחה סבירים כדי להגן על המידע שלך — חיבור מוצפן (HTTPS), שירותי צד ג׳ מוכרים
              ובטוחים, וגישה מוגבלת לפרטי הסטודנטיות. עם זאת, אף שיטה אינה אטומה לחלוטין, ולא ניתן להבטיח אבטחה
              מוחלטת של מידע באינטרנט.
            </p>

            <hr className="prv-divider" />

            <h2 className="prv-h2">9. שינויים במדיניות</h2>
            <p className="prv-p">
              מדיניות הפרטיות עשויה להתעדכן מעת לעת. בכל עדכון מהותי נעדכן את התאריך בראש העמוד.
            </p>

            <hr className="prv-divider" />

            <h2 className="prv-h2">10. יצירת קשר</h2>
            <p className="prv-p">
              לכל שאלה, בקשה או תלונה בקשר למדיניות הפרטיות, ניתן לפנות ישירות:
            </p>
            <ul className="prv-ul">
              <li>
                <strong className="prv-strong">אנה אשכנזי · מצפן הנשמה</strong> —{" "}
                <CzLink href="https://wa.me/972585577021" className="prv-link" dir="ltr">
                  WhatsApp · 058-557-7021
                </CzLink>
              </li>
            </ul>

          </div>

          <p className="prv-footnote">
            מסמך זה נכתב בעברית פשוטה כדי לשמור על שקיפות. הוא אינו מהווה ייעוץ משפטי.
          </p>
        </div>
      </section>
    </CosmicShell>
  );
}
