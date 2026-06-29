import "./AuthorBio.css";

export interface AuthorBioProps {
  photo: string;
  photoAlt: string;
  paragraphs: string[];
  signature: string;
}

/** Portrait + multi-paragraph bio with a closing signature line. */
export function AuthorBio({ photo, photoAlt, paragraphs, signature }: AuthorBioProps) {
  return (
    <div className="author">
      <div className="author__photo">
        <img src={photo} alt={photoAlt} loading="lazy" decoding="async" />
      </div>
      <div className="author__copy">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p className="author__signature">{signature}</p>
      </div>
    </div>
  );
}
