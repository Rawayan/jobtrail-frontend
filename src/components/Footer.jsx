import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  "About us",
  "Contact",
  "Jobs",
  "Press kit",
];

const SOCIAL_ICONS = [
  {
    label: "Twitter",
    path:
      "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  },
  {
    label: "YouTube",
    path:
      "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
  },
  {
    label: "Facebook",
    path:
      "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* BRAND */}

        <div className="footer-top">
          <Link to="/" className="footer-brand">
            <span className="footer-brand-mark">J</span>

            <span className="footer-brand-text">
              Job<span>Trail</span>
            </span>
          </Link>

          <p className="footer-tagline">
            Turn your search into momentum.
          </p>
        </div>

        {/* NAVIGATION */}

        <nav className="footer-nav" aria-label="Footer">
          {FOOTER_LINKS.map((label) => (
            <a key={label} className="footer-link">
              {label}
            </a>
          ))}
        </nav>

        {/* SOCIAL */}

        <nav className="footer-social" aria-label="Social media">
          {SOCIAL_ICONS.map(({ label, path }) => (
            <a
              key={label}
              className="footer-social-link"
              title={label}
            >
              <svg
                aria-label={label}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={path} />
              </svg>
            </a>
          ))}
        </nav>

        {/* COPYRIGHT */}

        <aside className="footer-bottom">
          <p>
            Copyright © {year} — All right reserved by
            Raufir Alam Ayan
          </p>
        </aside>
      </div>
    </footer>
  );
}

export default Footer;

/* =========================
   FOOTER STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.footer {
  position: relative;

  overflow: hidden;

  color: #fff;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(195, 214, 56, 0.18),
      transparent 42%
    ),
    linear-gradient(
      160deg,
      var(--color-teal) 0%,
      #195f70 58%,
      #0d4d5d 100%
    );
}

.footer::after {
  content: "";

  position: absolute;

  width: 420px;
  height: 420px;

  right: -180px;
  bottom: -230px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;

  pointer-events: none;
}

.footer-inner {
  position: relative;
  z-index: 1;

  width: min(100% - 40px, var(--container));
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 54px 0 30px;

  text-align: center;
}

/* BRAND */

.footer-top {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 13px;

  margin-bottom: 30px;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.footer-brand-mark {
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border-radius: 13px;

  color: var(--color-ink);
  background: var(--color-lime);

  font-family: "DM Serif Display", serif;
  font-size: 1.3rem;

  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.18);
}

.footer-brand-text {
  color: #fff;

  font-family: "DM Serif Display", serif;
  font-size: 1.45rem;
  letter-spacing: -0.02em;
}

.footer-brand-text span {
  color: var(--color-lime);
}

.footer-tagline {
  max-width: 400px;

  margin: 0;

  color: rgba(255, 255, 255, 0.72);

  font-size: 0.86rem;
  line-height: 1.6;
}

/* NAV */

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  gap: 10px;
}

.footer-link {
  padding: 8px 15px;

  border-radius: var(--radius-pill);

  color: rgba(255, 255, 255, 0.82);

  font-size: 0.82rem;
  font-weight: 700;

  transition:
    color 180ms ease,
    background 180ms ease;
}

.footer-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

/* SOCIAL */

.footer-social {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  margin-top: 22px;
}

.footer-social-link {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;

  color: #fff;
  background: rgba(255, 255, 255, 0.1);

  transition:
    transform 180ms ease,
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease;
}

.footer-social-link:hover {
  border-color: transparent;
  background: var(--color-lime);
  color: var(--color-ink);
  transform: translateY(-3px);
}

/* BOTTOM */

.footer-bottom {
  width: 100%;

  margin-top: 34px;
  padding-top: 22px;

  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.footer-bottom p {
  margin: 0;

  color: rgba(255, 255, 255, 0.62);

  font-size: 0.76rem;
  line-height: 1.6;
}

/* RESPONSIVE */

@media (max-width: 760px) {
  .footer-inner {
    width: min(100% - 28px, var(--container));

    padding: 44px 0 26px;
  }
}

@media (max-width: 430px) {
  .footer-inner {
    width: min(100% - 22px, var(--container));

    padding: 38px 0 24px;
  }

  .footer-brand-text {
    font-size: 1.25rem;
  }

  .footer-brand-mark {
    width: 35px;
    height: 35px;
  }

  .footer-nav {
    gap: 7px;
  }

  .footer-link {
    padding: 7px 12px;
    font-size: 0.78rem;
  }

  .footer-tagline {
    font-size: 0.82rem;
  }
}
`;

document.head.appendChild(style);