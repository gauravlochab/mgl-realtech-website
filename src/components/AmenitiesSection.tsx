"use client";

import { useState } from "react";

const amenities = [
  {
    title: "Wellness & Fitness",
    text: "From private fitness studios to meditation spaces, our amenities are designed to enhance your well-being and foster harmony.",
    bigImage: "/images/amenities-1-big.avif",
    smallImage: "/images/amenities-1-small.avif",
  },
  {
    title: "Community Spaces",
    text: "Thoughtfully curated communal lounges and gathering areas that celebrate connection and a rich sense of place.",
    bigImage: "/images/amenities-2-big.avif",
    smallImage: "/images/amenities-2-small.avif",
  },
  {
    title: "Nature & Outdoors",
    text: "Garden pathways, quiet courtyards, and landscaped outdoor rooms providing moments of calm and restorative beauty.",
    bigImage: "/images/amenities-3-big.avif",
    smallImage: "/images/amenities-3-small.avif",
  },
];

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="amenities"
      className="amenities"
      style={{
        padding: "10rem 0",
      }}
    >
      <div className="page-padding">
        <div className="container">
          {/* ── Heading ──────────────────────────────────────────── */}
          <div className="amenities-heading">
            <div className="caption">(Amenities)</div>
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
              Designed for Living
            </h2>
          </div>

          {/* ── Tabs ─────────────────────────────────────────────── */}
          <div
            className="amenities-tabs"
            style={{
              marginTop: "3rem",
              display: "flex",
              gap: "3rem",
            }}
          >
            {amenities.map((amenity, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`amenity-tab ${activeTab === index ? "amenity-tab--active" : ""}`}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom:
                    activeTab === index
                      ? "2px solid white"
                      : "2px solid transparent",
                  cursor: "pointer",
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                  color: "var(--white)",
                  opacity: activeTab === index ? 1 : 0.4,
                  transition: "all 0.3s ease",
                  paddingBottom: "0.5rem",
                  paddingTop: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                {amenity.title}
              </button>
            ))}
          </div>

          {/* ── Content (crossfade stacked panels) ──────────────── */}
          <div
            className="amenities-content"
            style={{
              marginTop: "4rem",
              position: "relative",
            }}
          >
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="amenities-panel"
                style={{
                  position: activeTab === index ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  opacity: activeTab === index ? 1 : 0,
                  pointerEvents: activeTab === index ? "auto" : "none",
                  transition: "opacity 0.5s ease",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "stretch",
                }}
              >
                {/* Big image */}
                <div
                  className="amenities-big-image"
                  style={{
                    width: "55%",
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "1442 / 1815",
                      width: "100%",
                    }}
                  >
                    <img
                      src={amenity.bigImage}
                      alt={amenity.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </div>
                </div>

                {/* Small image */}
                <div
                  className="amenities-small-image"
                  style={{
                    width: "25%",
                    flexShrink: 0,
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                  }}
                >
                  <img
                    src={amenity.smallImage}
                    alt={`${amenity.title} detail`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>

                {/* Text content */}
                <div
                  className="amenities-text"
                  style={{
                    width: "20%",
                    paddingLeft: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-serif), ui-serif, Georgia, serif",
                      fontSize: "2rem",
                      fontWeight: 400,
                      lineHeight: "125%",
                      letterSpacing: "0.01em",
                      color: "var(--white)",
                      margin: 0,
                    }}
                  >
                    {amenity.title}
                  </h3>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                      fontSize: "1.125rem",
                      fontWeight: 300,
                      lineHeight: "130%",
                      letterSpacing: "0.04em",
                      opacity: 0.7,
                      color: "var(--white)",
                      margin: 0,
                      marginTop: "1rem",
                    }}
                  >
                    {amenity.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Responsive styles ──────────────────────────────────────── */}
      <style jsx>{`
        @media (max-width: 479px) {
          .amenities {
            padding: 5rem 0 !important;
          }

          .amenities-heading h2 {
            font-size: 2rem !important;
          }

          .amenities-tabs {
            gap: 1.25rem !important;
            flex-wrap: wrap;
          }

          .amenity-tab {
            font-size: 0.75rem !important;
          }

          .amenities-panel {
            flex-direction: column !important;
            position: relative !important;
          }

          .amenities-content {
            position: static !important;
          }

          .amenities-panel[style*="opacity: 0"] {
            display: none !important;
          }

          .amenities-big-image {
            width: 100% !important;
          }

          .amenities-big-image > div {
            aspect-ratio: 4 / 3 !important;
          }

          .amenities-small-image {
            width: 100% !important;
            aspect-ratio: 16 / 9;
          }

          .amenities-text {
            width: 100% !important;
            padding-left: 0 !important;
            padding-top: 1rem;
          }

          .amenities-text h3 {
            font-size: 1.5rem !important;
          }

          .amenities-text p {
            font-size: 1rem !important;
          }
        }

        @media (min-width: 480px) and (max-width: 1024px) {
          .amenities-panel {
            flex-wrap: wrap !important;
          }

          .amenities-big-image {
            width: 60% !important;
          }

          .amenities-small-image {
            width: calc(40% - 1.5rem) !important;
          }

          .amenities-text {
            width: 100% !important;
            padding-left: 0 !important;
            padding-top: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
