"use client";

export function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        isolation: "isolate",
        zIndex: 0,
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {/* ── Background video ───────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          muted
          playsInline
          loop
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
        </video>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(18, 23, 23, 0.25) 0%, rgba(18, 23, 23, 0.45) 50%, rgba(18, 23, 23, 0.75) 100%)",
          }}
        />
      </div>

      {/* ── Foreground content ─────────────────────────────────────── */}
      <div
        className="page-padding"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
        }}
      >
        <div
          className="container"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            className="hero-content-wrap"
            style={{
              paddingBottom: "5rem",
              width: "100%",
            }}
          >
            {/* ── Title row: h1 + subtitle block ─────────────────── */}
            <div
              className="hero-heading"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "2rem",
              }}
            >
              {/* Giant title */}
              <h1
                className="hero-h1"
                style={{
                  fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
                  fontSize: "20rem",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                  color: "var(--white)",
                  margin: 0,
                  flexShrink: 0,
                }}
              >
                MGL
              </h1>

              {/* Right-side content — subtitle + description */}
              <div
                className="hero-right"
                style={{
                  maxWidth: "26rem",
                  paddingBottom: "0.5rem",
                }}
              >
                <div
                  className="hero-subtitle"
                  style={{
                    fontFamily:
                      "var(--font-glare), ui-serif, Georgia, serif",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    lineHeight: "123%",
                    opacity: 0.85,
                    color: "var(--white)",
                  }}
                >
                  building excellence in every foundation
                </div>

                <p
                  className="hero-description"
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 300,
                    letterSpacing: "0.03em",
                    lineHeight: "140%",
                    maxWidth: "26rem",
                    opacity: 0.65,
                    marginTop: "1.25rem",
                    color: "var(--white)",
                  }}
                >
                  Welcome to MGL Realtech — a premier real estate developer
                  committed to crafting exceptional living spaces in North NCR.
                  With 7+ years of expertise, we transform visions into
                  landmark developments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator — bottom center ─────────────────────── */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.5,
          color: "var(--white)",
        }}
      >
        <span
          style={{
            fontFamily:
              "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{ opacity: 0.7 }}
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2" fill="currentColor">
            <animate
              attributeName="cy"
              values="8;14;8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* ── Responsive styles ──────────────────────────────────────── */}
      <style jsx>{`
        @media (max-width: 479px) {
          .hero-heading {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem !important;
          }
          .hero-h1 {
            font-size: 5rem !important;
            line-height: 0.9 !important;
          }
          .hero-right {
            padding-bottom: 0 !important;
            max-width: 100% !important;
          }
          .hero-subtitle {
            font-size: 1.25rem !important;
          }
          .hero-description {
            font-size: 0.95rem !important;
            max-width: 100% !important;
          }
          .hero-content-wrap {
            padding-bottom: 4rem !important;
          }
        }

        @media (min-width: 480px) and (max-width: 1024px) {
          .hero-h1 {
            font-size: 14rem !important;
          }
          .hero-right {
            max-width: 22rem !important;
          }
        }
      `}</style>
    </section>
  );
}
