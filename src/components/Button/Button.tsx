import "./Button.css";

export type ButtonVariant = "primary" | "soft" | "ghost" | "whatsapp";
export type ButtonSize = "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow glyph (RTL points left), animates on hover. */
  arrow?: boolean;
  /** Leading icon node (e.g. a brand glyph). */
  icon?: React.ReactNode;
  fullWidth?: boolean;
  /** Opens in a new tab with safe rel. */
  external?: boolean;
  onClick?: () => void;
}

/** Pill call-to-action, rendered as a link or button. */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  icon,
  fullWidth = false,
  external = false,
  onClick,
}: ButtonProps) {
  const className = [
    "btn",
    `btn--${variant}`,
    size === "lg" ? "btn--lg" : "",
    fullWidth ? "btn--full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          ←
        </span>
      )}
    </>
  );

  if (href) {
    const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a className={className} href={href} onClick={onClick} {...ext}>
        {content}
      </a>
    );
  }
  return (
    <button className={className} type="button" onClick={onClick}>
      {content}
    </button>
  );
}
