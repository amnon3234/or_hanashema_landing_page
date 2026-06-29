import "./cosmic.css";
import { useEffect, useId, useState } from "react";
import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";

// ─── Brand mark ──────────────────────────────────────────────────────────────

/** Anna Ashkenazi brand mark — two alephs (her initials, both names start with Aleph) framed in a thin gold ring: one cream, one gold. Scales cleanly to any size. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }): JSX.Element {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="אנה אשכנזי"
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#c8a45a" />
          <stop offset="50%" stopColor="#f0c97d" />
          <stop offset="100%" stopColor="#f7ddA0" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke={`url(#${id}-gold)`} strokeWidth="1.4" />
      <g
        fontFamily="'Frank Ruhl Libre', 'Suez One', Georgia, serif"
        fontWeight={900}
        fontSize="20"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <text x="18" y="25" fill="#f3eefb">א</text>
        <text x="30" y="25" fill={`url(#${id}-gold)`}>א</text>
      </g>
    </svg>
  );
}

// ─── Background ──────────────────────────────────────────────────────────────

const DIGITS = [
  { value: "1", top: "8%", right: "5%", size: "14vw" },
  { value: "3", top: "28%", left: "3%", size: "10vw" },
  { value: "7", top: "52%", right: "8%", size: "12vw" },
  { value: "9", top: "70%", left: "6%", size: "9vw" },
  { value: "11", top: "40%", right: "2%", size: "8vw" },
];

/** Fixed full-viewport animated aurora + floating numerology digits. Decorative; static under reduced motion. */
export function CosmicBackground(): JSX.Element {
  const reduced = useReducedMotion() ?? false;
  return (
    <>
      <div className="cz-bg" aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <motion.div
            key={n}
            className={`cz-blob cz-blob--${n}`}
            animate={
              reduced
                ? {}
                : {
                    scale: [1, 1.12, 0.95, 1],
                    opacity: [0.4, 0.55, 0.35, 0.4],
                    x: n % 2 === 0 ? [0, 20, -10, 0] : [0, -15, 12, 0],
                    y: n % 2 === 0 ? [0, -15, 10, 0] : [0, 18, -8, 0],
                  }
            }
            transition={{ duration: 14 + n * 3, repeat: Infinity, ease: "easeInOut", delay: n * 1.5 }}
          />
        ))}
      </div>
      {!reduced && (
        <div className="cz-digits" aria-hidden="true">
          {DIGITS.map((d, i) => (
            <motion.span
              key={d.value + i}
              className="cz-digit"
              style={{
                top: d.top,
                right: "right" in d ? d.right : undefined,
                left: "left" in d ? d.left : undefined,
                fontSize: d.size,
              }}
              animate={{ y: [0, -18, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 10 + i * 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 1.3 }}
            >
              {d.value}
            </motion.span>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Scroll progress ─────────────────────────────────────────────────────────

/** Top gradient scroll-progress bar driven by scrollYProgress → scaleX. */
export function ScrollProgress(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div className="cz-progress" style={{ scaleX, transformOrigin: "right center" }} aria-hidden="true" />;
}

// ─── WhatsApp icon ─────────────────────────────────────────────────────────

/** Inline WhatsApp glyph SVG. */
export function WhatsAppIcon({ size = 20 }: { size?: number }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.112 1.528 5.836L.057 23.25a.75.75 0 00.918.908l5.478-1.434A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.883 0-3.649-.49-5.183-1.352l-.372-.213-3.848 1.008 1.03-3.755-.232-.384A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

// ─── Link ──────────────────────────────────────────────────────────────────

type CzLinkProps = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

/** Router Link for "/" paths; plain anchor for hashes & external http(s) (with target/rel). */
export function CzLink({ href, children, ...rest }: CzLinkProps): JSX.Element {
  if (href.startsWith("/")) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  const isExternal = /^https?:\/\//.test(href);
  const extra = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} {...extra} {...rest}>
      {children}
    </a>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────

export type CosmicHeaderProps = {
  brandName?: string;
  ctaLabel?: string;
  ctaHref?: string;
  nav?: { label: string; href: string }[];
};

/** Sticky glass header: brand mark + name (links "/"), optional nav, optional CTA pill. */
export function CosmicHeader({
  brandName = "אנה אשכנזי",
  ctaLabel,
  ctaHref,
  nav,
}: CosmicHeaderProps): JSX.Element {
  const reduced = useReducedMotion() ?? false;
  return (
    <header className="cz-header">
      <div className="cz-wrap">
        <div className="cz-header__inner">
          <CzLink href="/" className="cz-header__brand" aria-label={`חזרה לדף הבית · ${brandName}`}>
            <LogoMark size={40} className="cz-header__logo" />
            <span className="cz-header__name">{brandName}</span>
          </CzLink>
          {nav && nav.length > 0 && (
            <nav className="cz-header__nav" aria-label="ניווט ראשי">
              {nav.map((item) => (
                <CzLink key={item.href} href={item.href} className="cz-header__nav-link">
                  {item.label}
                </CzLink>
              ))}
            </nav>
          )}
          {ctaLabel && ctaHref && (
            <div className="cz-header__actions">
              <motion.div
                whileHover={reduced ? {} : { scale: 1.04 }}
                whileTap={reduced ? {} : { scale: 0.96 }}
                style={{ display: "inline-flex" }}
              >
                <CzLink href={ctaHref} className="cz-btn cz-btn--primary cz-btn--sm">
                  {ctaLabel}
                </CzLink>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────

/** Glass footer with logo, brand, links and a small copyright line. */
export function CosmicFooter({ links }: { links: { label: string; href: string }[] }): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="cz-footer">
      <div className="cz-wrap">
        <div className="cz-footer__inner">
          <CzLink href="/" className="cz-footer__brand" aria-label="עמוד הבית · אנה אשכנזי">
            <LogoMark size={36} className="cz-footer__logo" />
            <span className="cz-footer__name">אנה אשכנזי</span>
          </CzLink>
          <nav aria-label="קישורי ניווט">
            <ul className="cz-footer__links">
              {links.map((l) => (
                <li key={l.href}>
                  <CzLink href={l.href} className="cz-footer__link">
                    {l.label}
                  </CzLink>
                </li>
              ))}
            </ul>
          </nav>
          <p className="cz-footer__copy">© {year} אנה אשכנזי · כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Sticky mobile CTA ─────────────────────────────────────────────────────

/** Fixed bottom mobile-only CTA that fades/slides in after ~600px of scroll. */
export function CosmicStickyCta({ label, href }: { label: string; href: string }): JSX.Element {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="cz-sticky"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <CzLink href={href} className="cz-btn cz-btn--gold cz-sticky__btn">
            {label}
          </CzLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Reveal variants & wrapper ───────────────────────────────────────────────

export const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

/** motion.<as> that reveals on scroll into view (once) using revealItem; respects reduced motion. */
export function Reveal({
  children,
  className,
  as = "div",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
}): JSX.Element {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  if (reduced) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      variants={revealItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

// ─── Shell ───────────────────────────────────────────────────────────────

/** Page chrome wrapper: background, progress, header, main, footer, optional sticky CTA. */
export function CosmicShell({
  children,
  header,
  footerLinks,
  sticky,
}: {
  children: React.ReactNode;
  header?: CosmicHeaderProps;
  footerLinks: { label: string; href: string }[];
  sticky?: { label: string; href: string };
}): JSX.Element {
  return (
    <div className="cz-app" dir="rtl">
      <CosmicBackground />
      <ScrollProgress />
      <CosmicHeader {...header} />
      <main className="cz-main">{children}</main>
      <CosmicFooter links={footerLinks} />
      {sticky && <CosmicStickyCta {...sticky} />}
    </div>
  );
}
