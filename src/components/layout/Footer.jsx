import { useState } from "react";
import { sendEmail } from "../../lib/emailjs";

function LogoWordmark() {
  return (
    <span className="footer__logo-text">
      C<span><span style={{ color: "#22c55e" }}>oo</span></span>kpal
    </span>
  );
}

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About us" },
  { href: "/activity", label: "Activity" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/insights", label: "Insights" },
];

function SocialLinks() {
  return (
    <div className="footer__social">
      <a
        href="https://instagram.com"
        className="footer__social-link"
        aria-label="Instagram"
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881.001 1.44 1.44 0 012.881-.001z" />
        </svg>
      </a>
      <a
        href="https://twitter.com"
        className="footer__social-link"
        aria-label="Twitter"
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href="https://linkedin.com"
        className="footer__social-link"
        aria-label="LinkedIn"
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href="https://facebook.com"
        className="footer__social-link"
        aria-label="Facebook"
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("sending");
    setErrorMessage("");
    try {
      const params = {
        user_email: trimmed,
        subscribed_at: new Date().toLocaleString(),
      };

      await sendEmail(import.meta.env.VITE_EMAILJS_SUBSCRIBE_TEMPLATE_ID, params);

      const welcomeId = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID;
      if (welcomeId) {
        await sendEmail(welcomeId, { user_email: trimmed });
      }

      setEmail("");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Could not subscribe.");
      setStatus("error");
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner footer">
        <div className="footer__grid">
          <div className="footer__col footer__col--about">
            <LogoWordmark />
            <p className="footer__about-text">
              Cookpal is a recipe website with a wide variety of delicious recipes, easy-to-use
              search function. Join our community and let&apos;s cook together!
            </p>
          </div>

          <nav className="footer__col" aria-labelledby="footer-company-heading">
            <h2 id="footer-company-heading" className="footer__heading">
              Company
            </h2>
            <ul className="footer__list">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} className="footer__link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-labelledby="footer-resources-heading">
            <h2 id="footer-resources-heading" className="footer__heading">
              Resources
            </h2>
            <ul className="footer__list">
              {resourceLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} className="footer__link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--newsletter">
            <LogoWordmark />
            <p className="footer__newsletter-text">
              Ut risus mattis interdum faucibus facilisi. Facilisi purus accumsan aliquam.
            </p>
            <form
              className="footer__subscribe"
              onSubmit={handleSubscribe}
              aria-label="Newsletter signup"
            >
              <label className="visually-hidden" htmlFor="footer-email">
                Your email
              </label>
              <div className="footer__email-wrap">
                <input
                  id="footer-email"
                  type="email"
                  className="footer__email-input"
                  placeholder="Your Email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                />
                <span className="footer__email-at" aria-hidden>
                  @
                </span>
              </div>
              <button
                type="submit"
                className="footer__subscribe-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Subscribe"}
              </button>
            </form>
            {status === "success" && (
              <p className="footer__subscribe-status footer__subscribe-status--success" role="status">
                Subscribed! Check your inbox.
              </p>
            )}
            {status === "error" && (
              <p className="footer__subscribe-status footer__subscribe-status--error" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
