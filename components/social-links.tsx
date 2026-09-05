const iconProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
function Instagram() { return <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>; }
function Facebook() { return <svg {...iconProps}><path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5A25 25 0 0 0 15 1c-3 0-5 1.9-5 5.4V9H7v4h3v9z"/></svg>; }
function Linkedin() { return <svg {...iconProps}><path d="M4 8h4v13H4V8zm2-6a2.3 2.3 0 1 1 0 4.6A2.3 2.3 0 0 1 6 2zm5 6h3.8v1.8C15.4 8.6 16.7 8 18 8c3.3 0 4 2.1 4 5V21h-4v-7c0-1.6-.3-2.8-1.8-2.8-1.7 0-2.2 1.2-2.2 2.8v7h-3V8z"/></svg>; }

// Supply verified profile URLs here when the founders provide them.
const profiles = [
  { name: "Instagram", Icon: Instagram, url: "" },
  { name: "Facebook", Icon: Facebook, url: "" },
  { name: "LinkedIn", Icon: Linkedin, url: "" },
];
export function SocialLinks() {
  return <div className="social-links" aria-label="Brown and Gaines social profiles">
    <div className="social-icons">{profiles.map(({ name, Icon, url }) => url
      ? <a key={name} href={url} aria-label={`Brown and Gaines on ${name}`}><Icon /></a>
      : <span key={name} role="img" aria-label={`${name}: link coming soon`} title={`${name}: link coming soon`}><Icon /></span>
    )}</div>
    {!profiles.some(profile => profile.url) && <span className="social-pending">Coming soon</span>}
  </div>;
}
