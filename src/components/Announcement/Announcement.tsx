import "./Announcement.css";

export interface AnnouncementProps {
  children: React.ReactNode;
}

/** Thin centered announcement strip at the top of the page. */
export function Announcement({ children }: AnnouncementProps) {
  return (
    <div className="ann" role="status">
      {children}
    </div>
  );
}
