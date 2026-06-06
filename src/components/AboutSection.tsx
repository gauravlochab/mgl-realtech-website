"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";

/* ── inline styles ──────────────────────────────────────────────── */

const styles = `
/* ── About Section ──────────────────────────────────────────────── */
.about {
  padding: 10rem 0;
}

/* ── Two-column grid ─────────────────────────────────────────────── */
.about-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

/* ── Left column ─────────────────────────────────────────────────── */
.about-heading .caption {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  opacity: 0.5;
  letter-spacing: 0.04em;
  margin-bottom: 1.5rem;
  /* scroll-reveal initial state */
  transform: translateY(30px);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.about-heading .caption.revealed {
  transform: translateY(0);
  opacity: 0.5;
}

.about-heading h2 {
  font-family: var(--font-glare), ui-serif, Georgia, serif;
  font-size: 4.75rem;
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 118%;
  text-transform: lowercase;
  color: var(--white);
  /* scroll-reveal initial state */
  transform: translateY(30px);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.12s,
              opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.12s;
}

.about-heading h2.revealed {
  transform: translateY(0);
  opacity: 1;
}

.about-img {
  position: relative;
  margin-top: 3rem;
  overflow: hidden;
  border-radius: 0.5rem;
}

.about-img img,
.about-img .about-image-next {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  will-change: transform;
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: var(--black-900);
  transform-origin: top;
  transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1);
  border-radius: 0.5rem;
  pointer-events: none;
}

.img-overlay.revealed {
  transform: scaleY(0);
}

/* ── Right column ────────────────────────────────────────────────── */
.about-text-box {
  padding-top: 8rem;
}

.about-text-box p {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  line-height: 125%;
  color: rgba(255, 255, 255, 0.7);
}

.about-text-box p + p {
  margin-top: 1.5rem;
}

/* ── Stats ───────────────────────────────────────────────────────── */
.stats {
  margin-top: 6rem;
}

.stats-row {
  display: grid;
  gap: 2.5rem;
}

.stats-row-2 {
  grid-template-columns: 1fr 1fr;
}

.stats-row-1-center {
  grid-template-columns: 1fr;
  justify-items: center;
  text-align: center;
}

.stats-row-1-right {
  grid-template-columns: 1fr;
  justify-items: end;
  text-align: right;
}

.stats-row + .stats-row {
  margin-top: 4rem;
}

.stat-box {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 2rem;
  /* stagger fade-in initial state */
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stat-box.visible {
  transform: translateY(0);
  opacity: 1;
}

.stats-row-2 .stat-box {
  width: 100%;
}

.stats-row-1-center .stat-box,
.stats-row-1-right .stat-box {
  width: 60%;
}

.stat-number {
  font-family: var(--font-serif), ui-serif, Georgia, serif;
  font-size: 11.25rem;
  font-weight: 400;
  line-height: 123%;
  color: var(--white);
}

.stat-number .stat-plus {
  font-size: 5rem;
  vertical-align: super;
  line-height: 1;
}

.stat-number .stat-slash {
  font-size: 8rem;
  margin: 0 0.15em;
  opacity: 0.5;
}

.stat-label {
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 125%;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
  max-width: 24rem;
}

.stats-row-1-center .stat-label,
.stats-row-1-right .stat-label {
  max-width: none;
}

/* ── Mobile ──────────────────────────────────────────────────────── */
@media (max-width: 479px) {
  .about {
    padding: 4rem 0;
  }

  .about-info {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-heading h2 {
    font-size: 2rem;
  }

  .about-text-box {
    padding-top: 0;
  }

  .stats-row-2 {
    grid-template-columns: 1fr;
  }

  .stats-row-1-center .stat-box,
  .stats-row-1-right .stat-box {
    width: 100%;
  }

  .stat-number {
    font-size: 5rem;
  }

  .stat-number .stat-plus {
    font-size: 2.5rem;
  }

  .stat-number .stat-slash {
    font-size: 3.5rem;
  }

  .stat-label {
    font-size: 1rem;
  }
}
`;

/* ── Counter animation hook ─────────────────────────────────────── */

function useCountUp(
  target: number,
  shouldAnimate: boolean,
  duration = 2000,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let start: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [shouldAnimate, target, duration]);

  return value;
}

/* ── Stat display component ─────────────────────────────────────── */

interface StatCounterProps {
  target: number;
  shouldAnimate: boolean;
  suffix?: string;
}

function StatCounter({ target, shouldAnimate, suffix }: StatCounterProps) {
  const displayed = useCountUp(target, shouldAnimate);
  return (
    <>
      {displayed}
      {suffix && <span className="stat-plus">{suffix}</span>}
    </>
  );
}

interface StatSlashProps {
  left: number;
  right: number;
  shouldAnimate: boolean;
}

function StatSlash({ left, right, shouldAnimate }: StatSlashProps) {
  const displayedLeft = useCountUp(left, shouldAnimate);
  const displayedRight = useCountUp(right, shouldAnimate);
  return (
    <>
      {displayedLeft}
      <span className="stat-slash">/</span>
      {displayedRight}
    </>
  );
}

/* ── Main component ─────────────────────────────────────────────── */

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [statsVisible, setStatsVisible] = useState(false);

  const setStatBoxRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      statBoxRefs.current[index] = el;
    },
    [],
  );

  /* ── Parallax on about image ─────────────────────────────────── */
  useEffect(() => {
    const imgEl = imageRef.current;
    if (!imgEl) return;

    const handleScroll = () => {
      const rect = imgEl.getBoundingClientRect();
      const windowH = window.innerHeight;
      /* when element centre is at viewport centre → offset = 0 */
      const centre = rect.top + rect.height / 2;
      const offset = (centre - windowH / 2) * 0.08;
      const inner = imgEl.querySelector<HTMLElement>(".about-image-next");
      if (inner) {
        inner.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Caption + heading scroll reveal ─────────────────────────── */
  useEffect(() => {
    const targets: Element[] = [];
    if (captionRef.current) targets.push(captionRef.current);
    if (headingRef.current) targets.push(headingRef.current);

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  /* ── Overlay reveal ──────────────────────────────────────────── */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    io.observe(overlay);
    return () => io.disconnect();
  }, []);

  /* ── Stat boxes stagger fade-in + number counters ────────────── */
  useEffect(() => {
    const boxes = statBoxRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (boxes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const box = entry.target as HTMLDivElement;
            const idx = boxes.indexOf(box);
            const delay = idx * 150; // 0.15s stagger

            setTimeout(() => {
              box.classList.add("visible");
            }, delay);

            io.unobserve(entry.target);

            /* trigger counter animation on first stat observed */
            if (!statsVisible) {
              setStatsVisible(true);
            }
          }
        });
      },
      { threshold: 0.15 },
    );

    boxes.forEach((b) => io.observe(b));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section className="about" ref={sectionRef}>
        <div className="page-padding">
          <div className="container">
            <div className="wrap">
              {/* ── Two-column info ─────────────────────────────── */}
              <div className="about-info">
                {/* left */}
                <div className="about-left">
                  <div className="about-heading">
                    <div className="caption" ref={captionRef}>
                      (About)
                    </div>
                    <h2 ref={headingRef}>
                      timeless design, purposeful development
                    </h2>
                  </div>

                  <div className="about-img" ref={imageRef}>
                    <Image
                      src="/images/about-desktop.avif"
                      alt="Modern luxury interior"
                      width={893}
                      height={1376}
                      className="about-image-next"
                      priority={false}
                    />
                    <div className="img-overlay" ref={overlayRef} />
                  </div>
                </div>

                {/* right */}
                <div className="about-text-box">
                  <p>
                    Every element of MGL Realtech reflects a commitment to
                    excellence. From thoughtfully designed residential spaces to
                    premium commercial developments, we embody a holistic
                    approach to real estate.
                  </p>
                  <p>
                    Whether you&apos;re seeking a dream home, an investment
                    opportunity, or a space that inspires growth, MGL Realtech
                    delivers it all.
                  </p>
                </div>
              </div>

              {/* ── Stats ──────────────────────────────────────── */}
              <div className="stats">
                {/* Row 1 — two columns */}
                <div className="stats-row stats-row-2">
                  <div className="stat-box" ref={setStatBoxRef(0)}>
                    <div className="stat-number">
                      <StatCounter
                        target={10}
                        shouldAnimate={statsVisible}
                        suffix="+"
                      />
                    </div>
                    <div className="stat-label">
                      premium projects across North NCR.
                    </div>
                  </div>
                  <div className="stat-box" ref={setStatBoxRef(1)}>
                    <div className="stat-number">
                      <StatCounter
                        target={7}
                        shouldAnimate={statsVisible}
                        suffix="+"
                      />
                    </div>
                    <div className="stat-label">
                      years of trusted real estate development.
                    </div>
                  </div>
                </div>

                {/* Row 2 — centred */}
                <div className="stats-row stats-row-1-center">
                  <div className="stat-box" ref={setStatBoxRef(2)}>
                    <div className="stat-number">
                      <StatCounter
                        target={500}
                        shouldAnimate={statsVisible}
                        suffix="+"
                      />
                    </div>
                    <div className="stat-label">
                      happy families in quality homes.
                    </div>
                  </div>
                </div>

                {/* Row 3 — right-aligned */}
                <div className="stats-row stats-row-1-right">
                  <div className="stat-box" ref={setStatBoxRef(3)}>
                    <div className="stat-number">
                      <StatSlash
                        left={24}
                        right={7}
                        shouldAnimate={statsVisible}
                      />
                    </div>
                    <div className="stat-label">
                      customer support, meeting every need effortlessly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
