"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const projects = [
  {
    title: "Premium Residential Plots",
    image: "/images/livings-1.avif",
    description:
      "Thoughtfully planned residential plots offering sunlit spaces, landscaped surroundings, and a selection of exclusive community amenities near NH-344P.",
  },
  {
    title: "Luxury Villa Floors",
    image: "/images/livings-2.avif",
    description:
      "Elegant villa floors with private terraces, curated interiors, and spaces shaped for comfort and sophistication in the heart of Kharkhoda.",
  },
  {
    title: "Commercial Developments",
    image: "/images/livings-3.avif",
    description:
      "Strategic commercial spaces offering prime visibility, modern infrastructure, and seamless connectivity for growing businesses.",
  },
] as const;

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [titleKey, setTitleKey] = useState(0);
  const [isHoveredLearnMore, setIsHoveredLearnMore] = useState(false);
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);
  const [isHoveredNext, setIsHoveredNext] = useState(false);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTitleKey((k) => k + 1);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTitleKey((k) => k + 1);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1
      );
      setTitleKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className="projects"
      style={{
        padding: "10rem 0",
      }}
    >
      <div className="page-padding">
        <div className="container">
          <div className="wrap">
            {/* Caption */}
            <div className="projects-heading">
              <span className="caption">(our projects)</span>
            </div>

            {/* Content */}
            <div
              className="projects-content"
              style={{ marginTop: "4rem" }}
            >
              {/* Active project title — fades in on switch */}
              <div
                className="project-titles"
                style={{ marginBottom: "2rem" }}
              >
                <h2
                  key={titleKey}
                  ref={titleRef}
                  className="project-title-fade"
                  style={{
                    fontFamily:
                      "var(--font-serif), ui-serif, Georgia, serif",
                    fontSize: "4.75rem",
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                    lineHeight: "118%",
                    color: "var(--white)",
                  }}
                >
                  {currentProject.title}
                </h2>
              </div>

              {/* Slider */}
              <div
                className="projects-slider"
                style={{
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  className="projects-track"
                  style={{
                    display: "flex",
                    gap: "2rem",
                    transition:
                      "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: `translateX(calc(-${activeIndex} * (100% + 2rem)))`,
                  }}
                >
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="project-slide"
                      style={{
                        flex: "0 0 100%",
                        minWidth: 0,
                        overflow: "hidden",
                        borderRadius: "0.5rem",
                      }}
                      onMouseEnter={() => setHoveredSlide(index)}
                      onMouseLeave={() => setHoveredSlide(null)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100%",
                          aspectRatio: "807 / 1058",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                          transition: "transform 0.6s ease",
                          transform:
                            hoveredSlide === index
                              ? "scale(1.02)"
                              : "scale(1)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Info row */}
              <div
                className="project-info"
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "2rem",
                }}
              >
                {/* Description text */}
                <div
                  className="project-text"
                  style={{ maxWidth: "35rem" }}
                >
                  <p
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                      lineHeight: "125%",
                      opacity: 0.7,
                      color: "var(--white)",
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    {currentProject.description}
                  </p>
                </div>

                {/* Navigation */}
                <div
                  className="project-nav"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {/* Learn More button with expanding bottom border */}
                  <button
                    className="learn-more-btn"
                    onMouseEnter={() => setIsHoveredLearnMore(true)}
                    onMouseLeave={() => setIsHoveredLearnMore(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--white)",
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      paddingBottom: "0.25rem",
                      opacity: isHoveredLearnMore ? 1 : 0.8,
                      transition: "opacity 0.3s ease",
                      position: "relative",
                    }}
                  >
                    Learn More
                    {/* Expanding bottom border */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: "1px",
                        backgroundColor: "white",
                        width: isHoveredLearnMore ? "100%" : "0%",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </button>

                  {/* Prev arrow */}
                  <button
                    onClick={goToPrev}
                    onMouseEnter={() => setIsHoveredPrev(true)}
                    onMouseLeave={() => setIsHoveredPrev(false)}
                    aria-label="Previous project"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      background: isHoveredPrev
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                      color: "var(--white)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition:
                        "background-color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Next arrow */}
                  <button
                    onClick={goToNext}
                    onMouseEnter={() => setIsHoveredNext(true)}
                    onMouseLeave={() => setIsHoveredNext(false)}
                    aria-label="Next project"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      background: isHoveredNext
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                      color: "var(--white)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition:
                        "background-color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles + title fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .project-title-fade {
          animation: fadeIn 0.4s ease forwards;
        }

        @media (max-width: 479px) {
          .projects {
            padding: 5rem 0 !important;
          }

          .project-titles h2 {
            font-size: 2rem !important;
          }

          .project-info {
            flex-direction: column !important;
          }

          .project-text {
            max-width: 100% !important;
          }

          .project-text p {
            font-size: 1rem !important;
          }

          .project-nav {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (min-width: 480px) and (max-width: 768px) {
          .project-titles h2 {
            font-size: 3rem !important;
          }

          .project-info {
            flex-direction: column !important;
          }

          .project-text {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
