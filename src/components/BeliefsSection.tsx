"use client";

import { useEffect, useRef, useState } from "react";

const beliefs = [
  {
    title: "Quality Construction",
    description:
      "Every development built with premium materials and lasting craftsmanship.",
  },
  {
    title: "Customer First",
    description:
      "Transparency and trust at the forefront of every interaction.",
  },
  {
    title: "Innovation",
    description:
      "Modern design and smart planning for contemporary living.",
  },
  {
    title: "Community Building",
    description:
      "Creating neighborhoods that foster connection and belonging.",
  },
  {
    title: "Sustainable Growth",
    description:
      "Development that respects the environment and future generations.",
  },
];

export function BeliefsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(beliefs.length).fill(false)
  );

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".beliefs-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index
            );
            // Stagger delay: 0.1s per card
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Part A: Our Beliefs intro ─────────────────────────────── */}
      <section
        className="our-beliefs"
        style={{
          padding: "10rem 0",
          position: "relative",
        }}
      >
        <div className="page-padding">
          <div className="container">
            <div className="wrap">
              {/* Heading */}
              <div className="our-beliefs-heading">
                <div className="caption">(Our beliefs)</div>
                <h2
                  style={{
                    fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
                    fontSize: "4.75rem",
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                    lineHeight: "118%",
                    color: "var(--white)",
                    margin: 0,
                  }}
                >
                  A Vision of Inspired Living
                </h2>
              </div>

              {/* Image */}
              <div
                className="our-beliefs-img"
                style={{
                  marginTop: "4rem",
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1440 / 1640",
                }}
              >
                <picture>
                  <source
                    media="(max-width: 479px)"
                    srcSet="/images/beliefs-1-mobile.avif"
                  />
                  <img
                    src="/images/beliefs-1-desktop.avif"
                    alt="A vision of inspired living"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                    }}
                  />
                </picture>
              </div>

              {/* Text */}
              <div
                className="our-beliefs-text"
                style={{
                  marginTop: "3rem",
                  maxWidth: "45rem",
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 300,
                    lineHeight: "125%",
                    letterSpacing: "0.04em",
                    opacity: 0.7,
                    color: "var(--white)",
                    margin: 0,
                  }}
                >
                  To inspire and nurture an enriched lifestyle that harmonizes
                  quality, innovation, and community connection, creating
                  developments that feel like home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Part B: 5 Belief Cards ────────────────────────────────── */}
      <section
        className="beliefs"
        style={{
          padding: "8rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          className="beliefs-bg"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <img
            src="/images/beliefs-2-desktop.avif"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "fixed",
              inset: 0,
            }}
          />
          {/* Dark overlay for readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(18, 23, 23, 0.7)",
            }}
          />
        </div>

        <div className="page-padding" style={{ position: "relative", zIndex: 1 }}>
          <div className="container">
            <div className="wrap">
              <div className="beliefs-grid" ref={cardsRef}>
                {beliefs.map((belief, index) => (
                  <div
                    className="beliefs-card"
                    key={index}
                    data-index={index}
                    style={{
                      opacity: visibleCards[index] ? 1 : 0,
                      transform: visibleCards[index]
                        ? "translateY(0)"
                        : "translateY(1.5rem)",
                      transition:
                        "opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily:
                          "var(--font-serif), ui-serif, Georgia, serif",
                        fontSize: "1.75rem",
                        fontWeight: 400,
                        lineHeight: "123%",
                        letterSpacing: "0.01em",
                        color: "var(--white)",
                        margin: 0,
                      }}
                    >
                      {belief.title}
                    </h3>
                    <p
                      style={{
                        fontFamily:
                          "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 300,
                        lineHeight: "130%",
                        opacity: 0.7,
                        color: "var(--white)",
                        margin: 0,
                      }}
                    >
                      {belief.description}
                    </p>
                    <div
                      className="number"
                      style={{
                        fontFamily:
                          "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                        fontSize: "0.875rem",
                        opacity: 0.4,
                        color: "var(--white)",
                      }}
                    >
                      ( {index + 1} )
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Responsive styles ──────────────────────────────────────── */}
      <style jsx>{`
        .beliefs-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .beliefs-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 2rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 16rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .beliefs-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 1024px) {
          .beliefs-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 479px) {
          .our-beliefs {
            padding: 5rem 0 !important;
          }

          .our-beliefs-heading h2 {
            font-size: 2rem !important;
          }

          .our-beliefs-text p {
            font-size: 1rem !important;
          }

          .beliefs {
            padding: 4rem 0 !important;
          }

          .beliefs-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .beliefs-grid .beliefs-card:last-child {
            grid-column: 1 / -1;
          }

          .beliefs-card {
            min-height: 14rem;
            padding: 1.5rem;
          }

          .beliefs-card h3 {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
    </>
  );
}
