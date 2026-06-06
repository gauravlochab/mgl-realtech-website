"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";

/* -- inline styles ---------------------------------------------------- */

const styles = `
/* -- CTA Section ------------------------------------------------------ */
.cta {
  padding: 10rem 0;
  position: relative;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.cta-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(18, 23, 23, 0.9) 0%,
    rgba(18, 23, 23, 0.6) 100%
  );
  z-index: 1;
}

.cta .page-padding {
  position: relative;
  z-index: 2;
}

.cta-content {
  display: flex;
  flex-direction: row;
  gap: 4rem;
}

/* -- Left column -- heading ------------------------------------------- */
.cta-heading {
  width: 50%;
}

.cta-heading h2 {
  font-family: var(--font-serif), ui-serif, Georgia, serif;
  font-size: 4.75rem;
  font-weight: 400;
  line-height: 118%;
  letter-spacing: -0.03em;
  color: var(--white);
}

.cta-heading p {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 150%;
  opacity: 0.7;
  margin-top: 2rem;
  max-width: 32rem;
}

/* -- Right column -- form --------------------------------------------- */
.form-wrap {
  width: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-heading h3 {
  font-family: var(--font-serif), ui-serif, Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--white);
}

.form-heading p {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  opacity: 0.5;
  margin-top: 0.5rem;
}

.form-wrap form {
  margin-top: 2rem;
}

.form-wrap input {
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.125rem;
  font-weight: 300;
  color: white;
  margin-bottom: 1.5rem;
  outline: none;
  transition: border-bottom-color 0.3s ease;
}

.form-wrap input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-wrap input:focus {
  border-bottom-color: rgba(255, 255, 255, 0.6);
}

.form-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.form-bottom button {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.75rem 2.5rem;
  background: transparent;
  color: white;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  flex-shrink: 0;
}

.form-bottom button:hover {
  background: white;
  color: #254441;
}

.privacy {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 0.8rem;
  opacity: 0.4;
  text-align: right;
}

/* -- Mobile ----------------------------------------------------------- */
@media (max-width: 479px) {
  .cta {
    padding: 5rem 0;
  }

  .cta-content {
    flex-direction: column;
    gap: 2.5rem;
  }

  .cta-heading {
    width: 100%;
  }

  .cta-heading h2 {
    font-size: 2rem;
  }

  .cta-heading p {
    font-size: 1rem;
  }

  .form-wrap {
    width: 100%;
    padding: 2rem;
  }

  .form-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .privacy {
    text-align: left;
  }
}
`;

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{styles}</style>

      <section className="cta" id="book-a-visit">
        {/* -- Background ---------------------------------------------- */}
        <div className="cta-bg">
          <Image
            src="/images/cta-desktop.avif"
            alt="Premium MGL Realtech development"
            fill
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>
        <div className="cta-overlay" />

        {/* -- Content ------------------------------------------------- */}
        <div className="page-padding">
          <div className="container">
            <div className="wrap">
              <div className="cta-content">
                {/* -- Left -- heading --------------------------------- */}
                <div className="cta-heading">
                  <h2>Discover Your Dream Property</h2>
                  <p>
                    Experience the excellence of MGL Realtech developments.
                    Schedule a site visit or request a brochure to begin your
                    journey toward your dream home.
                  </p>
                </div>

                {/* -- Right -- form ----------------------------------- */}
                <div className="form-wrap">
                  <div className="form-heading">
                    <h3>Connect With Us</h3>
                    <p>Our team will contact you shortly.</p>
                  </div>

                  {submitted ? (
                    <p
                      style={{
                        marginTop: "2rem",
                        fontFamily:
                          "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                        fontSize: "1.125rem",
                        fontWeight: 300,
                        opacity: 0.7,
                      }}
                    >
                      Thank you! We&apos;ll be in touch soon.
                    </p>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        autoComplete="name"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        autoComplete="email"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        autoComplete="tel"
                      />

                      <div className="form-bottom">
                        <button type="submit">request</button>
                        <p className="privacy">
                          By submitting, you agree to our privacy policy.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CTASection;
