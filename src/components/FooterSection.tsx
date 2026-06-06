"use client";

/* -- inline styles ---------------------------------------------------- */

const styles = `
/* -- Footer Section --------------------------------------------------- */
.footer {
  padding: 6rem 0 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  flex-wrap: wrap;
}

.footer-col {
  min-width: 200px;
}

.footer-caption {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  opacity: 0.5;
  letter-spacing: 0.04em;
  color: var(--white);
  margin-bottom: 1rem;
}

.footer-logo-text {
  font-family: var(--font-serif), ui-serif, Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--white);
}

.footer-text {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--white);
  line-height: 160%;
}

.footer-text-muted {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--white);
  opacity: 0.7;
  line-height: 160%;
}

.footer-link {
  display: block;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--white);
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  line-height: 160%;
}

.footer-link:hover {
  opacity: 1;
}

.footer-link + .footer-link {
  margin-top: 0.25rem;
}

.footer-bottom {
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-text {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 0.8125rem;
  opacity: 0.4;
  color: var(--white);
}

/* -- Mobile ----------------------------------------------------------- */
@media (max-width: 479px) {
  .footer {
    padding: 4rem 0 2rem;
  }

  .footer-grid {
    flex-direction: column;
    gap: 2.5rem;
  }

  .footer-bottom {
    margin-top: 2.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
}
`;

export function FooterSection() {
  return (
    <>
      <style>{styles}</style>

      <footer className="footer">
        <div className="page-padding">
          <div className="container">
            <div className="wrap">
              {/* -- 3-column grid ------------------------------------ */}
              <div className="footer-grid">
                {/* -- Column 1: Brand -------------------------------- */}
                <div className="footer-col">
                  <p className="footer-caption">(Get in touch)</p>
                  <p className="footer-logo-text">MGL Realtech</p>
                </div>

                {/* -- Column 2: Location ----------------------------- */}
                <div className="footer-col">
                  <p className="footer-caption">(Location)</p>
                  <p className="footer-text">NH 344P, Kharkhoda</p>
                  <p className="footer-text-muted">
                    Sonipat, Haryana, India
                  </p>
                </div>

                {/* -- Column 3: Contact ------------------------------ */}
                <div className="footer-col">
                  <p className="footer-caption">(Contact)</p>
                  <a
                    href="mailto:info@mglrealtech.com"
                    className="footer-link"
                  >
                    info@mglrealtech.com
                  </a>
                  <a href="tel:+916361618181" className="footer-link">
                    +91-6361618181
                  </a>
                </div>
              </div>

              {/* -- Bottom bar --------------------------------------- */}
              <div className="footer-bottom">
                <p className="footer-bottom-text">
                  &copy;2025. MGL Realtech Pvt. Ltd.
                </p>
                <p className="footer-bottom-text">All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterSection;
