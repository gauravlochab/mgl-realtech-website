"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   MGL Realtech — Complete Single-Page Website (v4)
   Warm cream/ivory editorial luxury design.
   Cormorant Garamond serif + Inter body. Antique gold accents.
   Scroll reveal, parallax, counter animation, FAQ accordion.
   ═══════════════════════════════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    title: "MGL Greens",
    subtitle: "Premium Residential Plots",
    location: "NH-344P, Kharkhoda",
    status: "Delivered",
    desc: "Thoughtfully planned residential plots across 25 acres with landscaped surroundings, 24/7 security, and tree-lined avenues near NH-344P.",
    image: "/images/livings-1.avif",
  },
  {
    title: "MGL Vantage",
    subtitle: "Luxury Villa Floors",
    location: "Central Kharkhoda",
    status: "Selling",
    desc: "Elegant villa floors with private terraces, Italian marble flooring, and curated interiors in the heart of Kharkhoda's emerging township belt.",
    image: "/images/livings-2.avif",
  },
  {
    title: "MGL Square",
    subtitle: "Commercial Hub",
    location: "NH-344P Frontage",
    status: "Upcoming",
    desc: "Strategic commercial spaces with prime highway visibility, modern infrastructure, and walk-to-work convenience for the surrounding residential catchment.",
    image: "/images/livings-3.avif",
  },
];

const BELIEFS = [
  {
    title: "Zero-Delay Track Record",
    desc: "Every project delivered on schedule, 7 years running. We announce possession dates, not excuses.",
  },
  {
    title: "DTCP-First, Always",
    desc: "100% of our plots carry DTCP approval before the first booking. No grey-area layouts, ever.",
  },
  {
    title: "Builder-Grade Construction",
    desc: "In-house civil team, no sub-contracting. We pour every foundation and lay every road ourselves.",
  },
  {
    title: "Community Over Units",
    desc: "Parks, temples, community halls.planned from day one, not afterthoughts squeezed into leftover plots.",
  },
  {
    title: "North NCR Conviction",
    desc: "While others chased Gurugram, we bet on the Kharkhoda-Sonipat corridor. 10 projects later, the KMP is proving us right.",
  },
];

const AMENITIES = [
  {
    title: "Wellness & Fitness",
    desc: "Private fitness studios, meditation gardens, and yoga decks designed for daily well-being, not brochure fillers.",
    big: "/images/amenities-1-big.avif",
    small: "/images/amenities-1-small.avif",
  },
  {
    title: "Community Spaces",
    desc: "Banquet lawns, community halls, and shaded sit-outs where neighbours become friends. Designed for weekend gatherings and festival celebrations.",
    big: "/images/amenities-2-big.avif",
    small: "/images/amenities-2-small.avif",
  },
  {
    title: "Nature & Outdoors",
    desc: "Tree-lined jogging tracks, landscaped courtyards, and children's play zones surrounded by greenery, not concrete.",
    big: "/images/amenities-3-big.avif",
    small: "/images/amenities-3-small.avif",
  },
];

const FAQS = [
  {
    q: "Where exactly are MGL projects located?",
    a: "All our projects are near NH-344P in Kharkhoda, Sonipat district (Haryana). The area is 20 minutes from the KMP Expressway and under development as North NCR's next growth corridor.",
  },
  {
    q: "Are your plots DTCP approved?",
    a: "Yes.100% of MGL plots carry DTCP (Directorate of Town & Country Planning) approval. We never sell unapproved layouts. Licence numbers are shared at the time of booking.",
  },
  {
    q: "What is Mystical Meadows?",
    a: "Mystical Meadows is our upcoming 150-acre integrated golf township in Kharkhoda, MGL's most ambitious project. It includes residential plots, villa floors, a 9-hole golf course, a clubhouse, and commercial zones.",
  },
  {
    q: "Do you offer site visits?",
    a: "Absolutely. We arrange complimentary site visits with pick-up from Sonipat or Delhi. Call +91-6361618181 or fill the contact form to book a visit on any weekend.",
  },
];

const STATS = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 7, suffix: "+", label: "Years, Zero Delays" },
  { value: 500, suffix: "+", label: "Families Settled" },
  { value: 100, suffix: "%", label: "DTCP Approved" },
];

// ── Hooks ─────────────────────────────────────────────────────

/** Scroll-triggered reveal using React state (not classList — avoids Tailwind purge) */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

/** Style object for a reveal element — luxury easing with blur */
function revealStyle(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(48px)",
    filter: visible ? "blur(0px)" : "blur(8px)",
    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  };
}

/** Animated counter that starts counting when element scrolls into view */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

// ── Main Page ─────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeAmenity, setActiveAmenity] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // ── Scroll reveal refs ────────────────────────────────────
  const heroEyebrow = useReveal();
  const heroTitle = useReveal();
  const heroSubtitle = useReveal();
  const aboutEyebrow = useReveal();
  const aboutHeading = useReveal();
  const aboutText = useReveal();
  const aboutImage = useReveal();
  const statsGrid = useReveal();
  const projectsEyebrow = useReveal();
  const projectsHeading = useReveal();
  const projectsImage = useReveal();
  const beliefsEyebrow = useReveal();
  const beliefsHeading = useReveal();
  const beliefsCards = useReveal();
  const amenitiesEyebrow = useReveal();
  const amenitiesHeading = useReveal();
  const amenitiesContent = useReveal();
  const faqEyebrow = useReveal();
  const faqHeading = useReveal();
  const faq0 = useReveal();
  const faq1 = useReveal();
  const faq2 = useReveal();
  const faq3 = useReveal();
  const faqReveals = [faq0, faq1, faq2, faq3];
  const ctaHeading = useReveal();
  const ctaForm = useReveal();
  const footerCols = useReveal();

  // ── Image parallax refs ──────────────────────────────────
  const aboutImgRef = useRef<HTMLImageElement>(null);

  // ── Stat counters ─────────────────────────────────────────
  const stat0 = useCountUp(STATS[0].value);
  const stat1 = useCountUp(STATS[1].value);
  const stat2 = useCountUp(STATS[2].value);
  const stat3 = useCountUp(STATS[3].value);
  const statCounters = [stat0, stat1, stat2, stat3];

  // ── Scroll handler (header bg) ────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── About image parallax ─────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const img = aboutImgRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const centerOffset =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        window.innerHeight;
      img.style.transform = `translateY(${centerOffset * -30}px) scale(1.05)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Auto-advance projects ────────────────────────────────
  useEffect(() => {
    const id = setInterval(
      () => setActiveProject((p) => (p + 1) % PROJECTS.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  // ── Lock body scroll when menu open ──────────────────────
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Form handler ─────────────────────────────────────────
  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const emailInput = form.querySelector(
        'input[name="email"]'
      ) as HTMLInputElement;
      if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInput.setCustomValidity("Please enter a valid email address");
        emailInput.reportValidity();
        return;
      }
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      form.reset();
    },
    []
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ── NAV ──────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(251,247,239,0.86)] backdrop-blur-[18px] border-b border-[rgba(191,164,106,0.18)] shadow-[0_1px_12px_rgba(31,31,28,0.04)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <nav
          className={`max-w-[1400px] mx-auto px-5 md:px-[6vw] flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[72px]" : "h-[84px]"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className={`font-[family-name:var(--font-serif)] text-[17px] font-normal tracking-[0.22em] uppercase transition-colors duration-500 ${
              scrolled ? "text-[#1F1F1C]" : "text-[#FBF7EF]"
            }`}
          >
            MGL<span className="text-[#BFA46A]">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-[12px] tracking-[0.14em] uppercase font-normal transition-colors duration-300 group ${
                  scrolled ? "text-[#1F1F1C]" : "text-[#FBF7EF]"
                }`}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#BFA46A] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className={`px-6 py-2.5 text-[12px] tracking-[0.14em] uppercase rounded-[2px] border transition-all duration-300 ${
                scrolled
                  ? "border-[#BFA46A] text-[#BFA46A] hover:bg-[#BFA46A] hover:text-[#FBF7EF]"
                  : "border-[rgba(191,164,106,0.7)] text-[#BFA46A] hover:bg-[#BFA46A] hover:text-[#FBF7EF]"
              }`}
            >
              Book a Visit
            </a>
          </div>

          {/* Hamburger button, mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                scrolled ? "bg-[#1F1F1C]" : "bg-[#FBF7EF]"
              } ${menuOpen ? "rotate-45 translate-y-[3.5px] !bg-[#1F1F1C]" : ""}`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                scrolled ? "bg-[#1F1F1C]" : "bg-[#FBF7EF]"
              } ${menuOpen ? "-rotate-45 -translate-y-[3.5px] !bg-[#1F1F1C]" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile menu overlay ────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[99] bg-[#FBF7EF] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className={`font-[family-name:var(--font-serif)] text-4xl font-normal tracking-wide text-[#1F1F1C] transition-all duration-500 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 100 + 200}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className={`mt-4 border border-[#BFA46A] text-[#BFA46A] px-8 py-3 text-sm tracking-[0.14em] uppercase rounded-[2px] hover:bg-[#BFA46A] hover:text-[#FBF7EF] transition-all duration-500 ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
          >
            Book a Visit
          </a>
        </nav>
      </div>

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
          <Image
            src="/images/cta-desktop.avif"
            alt="Aerial view of MGL township"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(31,31,28,0.15)] via-[rgba(31,31,28,0.3)] to-[rgba(31,31,28,0.65)]" />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-[6vw] pb-12 md:pb-24">
            {/* Eyebrow */}
            <div ref={heroEyebrow.ref} style={revealStyle(heroEyebrow.isVisible, 0)}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#BFA46A] mb-4">
                The Address of Tomorrow
              </p>
              {/* Gold thin line */}
              <div className="w-12 h-px bg-[#BFA46A] mb-8" />
            </div>

            {/* Title */}
            <div ref={heroTitle.ref} style={revealStyle(heroTitle.isVisible, 0.14)}>
              <h1 className="font-[family-name:var(--font-serif)] text-[clamp(64px,9vw,140px)] font-normal tracking-[-0.02em] leading-[0.86] text-[#FBF7EF]">
                MGL
              </h1>
            </div>

            {/* Subtitle */}
            <div ref={heroSubtitle.ref} style={revealStyle(heroSubtitle.isVisible, 0.28)} className="mt-6 max-w-[540px]">
              <p className="text-[clamp(15px,1.2vw,19px)] font-normal leading-relaxed text-[rgba(251,247,239,0.82)]">
                Crafting North NCR&apos;s next landmark addresses. 10 projects delivered. 500+ families settled. Now building
                Mystical Meadows, a 150-acre golf township.
              </p>
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────── */}
        <section id="about" className="bg-[#FBF7EF] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              {/* Eyebrow */}
              <div ref={aboutEyebrow.ref} style={revealStyle(aboutEyebrow.isVisible, 0)}>
                <p className="text-[11px] tracking-[0.22em] uppercase text-[#BFA46A] mb-6">
                  About
                </p>
              </div>
              {/* Heading */}
              <div ref={aboutHeading.ref} style={revealStyle(aboutHeading.isVisible, 0.14)}>
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(38px,5vw,72px)] font-normal leading-[1.1] tracking-[-0.01em] text-[#1F1F1C]">
                  Building with purpose
                  <br />
                  since 2017
                </h2>
                {/* Gold divider */}
                <div className="w-12 h-px bg-[#BFA46A] mt-8 mb-8" />
              </div>
              {/* Image */}
              <div ref={aboutImage.ref} style={revealStyle(aboutImage.isVisible, 0.28)} className="rounded-lg overflow-hidden aspect-[3/4]">
                <Image
                  ref={aboutImgRef}
                  src="/images/about-desktop.avif"
                  alt="MGL Realtech development project"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:pt-20" ref={aboutText.ref} style={revealStyle(aboutText.isVisible, 0.14)}>
              <p className="text-[16px] font-normal leading-[1.75] text-[#6F6256] tracking-[0.01em]">
                MGL Realtech started in 2017 with a single conviction: the
                Kharkhoda-Sonipat corridor would become North NCR&apos;s next
                growth frontier. While bigger names chased Gurugram and Noida, we
                committed to this belt, buying land, building roads, delivering
                plots.
              </p>
              <p className="text-[16px] font-normal leading-[1.75] text-[#6F6256] tracking-[0.01em] mt-6">
                Ten projects and 500+ families later, the KMP Expressway and
                NH-344P have validated that bet. Now we&apos;re building Mystical
                Meadows, a 150-acre golf township that will anchor this
                corridor&apos;s next chapter.
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────── */}
        <section className="bg-[#F7F2E8] py-20 lg:py-[140px]">
          <div
            ref={statsGrid.ref}
            style={revealStyle(statsGrid.isVisible, 0)}
            className="max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {STATS.map((s, i) => {
              const counter = statCounters[i];
              return (
                <div
                  key={i}
                  ref={counter.ref}
                  className="border-t border-[rgba(191,164,106,0.3)] pt-8"
                  style={revealStyle(statsGrid.isVisible, i * 0.14)}
                >
                  <p className="font-[family-name:var(--font-serif)] text-[clamp(48px,6vw,96px)] font-normal leading-none text-[#1F1F1C]">
                    {counter.count}
                    {s.suffix}
                  </p>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#A8894F] mt-3 font-normal">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────── */}
        <section id="projects" className="bg-[#FBF7EF] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Eyebrow */}
            <div ref={projectsEyebrow.ref} style={revealStyle(projectsEyebrow.isVisible, 0)}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#BFA46A] mb-6">
                Our Projects
              </p>
            </div>

            {/* Project title + status */}
            <div ref={projectsHeading.ref} style={revealStyle(projectsHeading.isVisible, 0.14)} className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(38px,5vw,72px)] font-normal leading-[1.1] text-[#1F1F1C] transition-opacity duration-300">
                  {PROJECTS[activeProject].title}
                </h2>
                <span
                  className={`inline-block self-start px-4 py-1.5 text-[11px] tracking-[0.14em] uppercase rounded-[2px] border font-normal ${
                    PROJECTS[activeProject].status === "Delivered"
                      ? "border-[#BFA46A] text-[#BFA46A]"
                      : PROJECTS[activeProject].status === "Selling"
                        ? "border-[#BFA46A] text-[#BFA46A]"
                        : "border-[rgba(191,164,106,0.5)] text-[#A8894F]"
                  }`}
                >
                  {PROJECTS[activeProject].status}
                </span>
              </div>
              <p className="text-[13px] text-[#8A8178] mt-2">
                {PROJECTS[activeProject].subtitle} &middot;{" "}
                {PROJECTS[activeProject].location}
              </p>
            </div>

            {/* Image + Description */}
            <div
              ref={projectsImage.ref}
              style={revealStyle(projectsImage.isVisible, 0.28)}
              className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-14 items-end"
            >
              <div className="rounded-lg overflow-hidden aspect-[4/3] relative group">
                {PROJECTS.map((proj, i) => (
                  <Image
                    key={i}
                    src={proj.image}
                    alt={proj.title}
                    width={800}
                    height={600}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      i === activeProject ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                    }`}
                  />
                ))}
              </div>
              <div>
                <p className="text-[16px] font-normal leading-[1.75] text-[#6F6256] transition-opacity duration-500">
                  {PROJECTS[activeProject].desc}
                </p>
                <div className="flex gap-3 mt-8">
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProject(i)}
                      className={`w-10 h-10 rounded-full border text-sm cursor-pointer transition-all duration-300 ${
                        i === activeProject
                          ? "border-[#BFA46A] bg-[rgba(191,164,106,0.12)] text-[#1F1F1C]"
                          : "border-[rgba(191,164,106,0.3)] bg-transparent text-[#8A8178] hover:border-[#BFA46A]"
                      }`}
                      aria-label={`View project ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BELIEFS ─────────────────────────────────────────── */}
        <section className="relative py-20 lg:py-[140px] overflow-hidden bg-[#F7F2E8]">
          <Image
            src="/images/beliefs-1-desktop.avif"
            alt=""
            fill
            className="object-cover opacity-[0.06]"
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Eyebrow */}
            <div ref={beliefsEyebrow.ref} style={revealStyle(beliefsEyebrow.isVisible, 0)}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#BFA46A] mb-6">
                Our Beliefs
              </p>
            </div>
            <div ref={beliefsHeading.ref} style={revealStyle(beliefsHeading.isVisible, 0.14)}>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(38px,5vw,72px)] font-normal leading-[1.1] text-[#1F1F1C] mb-4">
                Built on conviction,
                <br className="hidden md:block" /> not convention
              </h2>
              <p className="text-[16px] font-normal leading-[1.75] text-[#6F6256] max-w-[600px] mb-14 lg:mb-16">
                Five principles that have guided every land purchase, every
                foundation pour, and every handover since 2017.
              </p>
            </div>

            {/* 3-col grid: 3 top, 2 bottom centered */}
            <div
              ref={beliefsCards.ref}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {BELIEFS.map((b, i) => (
                <div
                  key={i}
                  className={`bg-[rgba(251,247,239,0.72)] backdrop-blur-sm border border-[rgba(191,164,106,0.22)] rounded-lg p-10 min-h-[220px] flex flex-col justify-between hover:-translate-y-2 hover:border-[rgba(191,164,106,0.5)] hover:shadow-[0_12px_40px_rgba(31,31,28,0.06)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i >= 3 ? "sm:col-span-1 lg:col-start-1 lg:col-span-1" : ""
                  } ${i === 3 ? "lg:col-start-1" : ""} ${i === 4 ? "lg:col-start-2" : ""}`}
                  style={revealStyle(beliefsCards.isVisible, i * 0.14)}
                >
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-[48px] font-normal leading-none text-[#BFA46A] mb-4">
                      {i + 1}
                    </p>
                    <h3 className="font-[family-name:var(--font-serif)] text-[26px] font-normal leading-tight text-[#1F1F1C] mb-3">
                      {b.title}
                    </h3>
                    <p className="text-[15px] font-normal text-[#6F6256] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AMENITIES ───────────────────────────────────────── */}
        <section className="bg-[#FBF7EF] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Eyebrow */}
            <div ref={amenitiesEyebrow.ref} style={revealStyle(amenitiesEyebrow.isVisible, 0)}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#BFA46A] mb-6">
                Amenities
              </p>
            </div>
            <div ref={amenitiesHeading.ref} style={revealStyle(amenitiesHeading.isVisible, 0.14)}>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(38px,5vw,72px)] font-normal leading-[1.1] text-[#1F1F1C] mb-10 lg:mb-14">
                Designed for living
              </h2>
            </div>

            <div ref={amenitiesContent.ref} style={revealStyle(amenitiesContent.isVisible, 0.28)}>
              {/* Tabs */}
              <div className="flex flex-wrap gap-6 md:gap-10 mb-10 lg:mb-14">
                {AMENITIES.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveAmenity(i)}
                    className={`bg-transparent border-none cursor-pointer text-[12px] tracking-[0.14em] uppercase pb-3 transition-all duration-300 font-normal ${
                      i === activeAmenity
                        ? "text-[#1F1F1C] border-b-2 border-b-[#BFA46A]"
                        : "text-[#8A8178] border-b-2 border-b-transparent hover:text-[#1F1F1C]"
                    }`}
                  >
                    {a.title}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] gap-4 lg:gap-6 min-h-0 md:min-h-[300px] lg:min-h-[400px]">
                <div className="rounded-lg overflow-hidden relative aspect-[4/5] md:aspect-auto group">
                  {AMENITIES.map((a, i) => (
                    <Image
                      key={i}
                      src={a.big}
                      alt={a.title}
                      width={600}
                      height={750}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
                        i === activeAmenity ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
                <div className="rounded-lg overflow-hidden relative aspect-[4/5] md:aspect-auto hidden md:block group">
                  {AMENITIES.map((a, i) => (
                    <Image
                      key={i}
                      src={a.small}
                      alt=""
                      width={400}
                      height={500}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
                        i === activeAmenity ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-end pb-4 lg:pb-5">
                  <h3 className="font-[family-name:var(--font-serif)] text-[clamp(24px,2.5vw,32px)] font-normal text-[#1F1F1C] mb-4 transition-opacity duration-500">
                    {AMENITIES[activeAmenity].title}
                  </h3>
                  <p className="text-[16px] font-normal leading-[1.75] text-[#6F6256] transition-opacity duration-500">
                    {AMENITIES[activeAmenity].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="bg-[#F7F2E8] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Eyebrow */}
            <div ref={faqEyebrow.ref} style={revealStyle(faqEyebrow.isVisible, 0)}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#BFA46A] mb-6">
                FAQ
              </p>
            </div>
            <div ref={faqHeading.ref} style={revealStyle(faqHeading.isVisible, 0.14)}>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(38px,5vw,72px)] font-normal leading-[1.1] text-[#1F1F1C] mb-12 lg:mb-16">
                Your questions, answered
              </h2>
            </div>

            {FAQS.map((f, i) => (
              <div
                key={i}
                ref={faqReveals[i].ref}
                style={revealStyle(faqReveals[i].isVisible, i * 0.1)}
                className="border-t border-[rgba(191,164,106,0.22)]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full bg-transparent border-none cursor-pointer py-6 lg:py-8 flex items-center gap-4 md:gap-6 text-left hover:bg-[rgba(191,164,106,0.04)] transition-colors duration-300"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-[14px] text-[#A8894F] font-normal shrink-0 w-10 md:w-12 font-[family-name:var(--font-serif)]">
                    0{i + 1}
                  </span>
                  <span className="font-[family-name:var(--font-serif)] text-lg md:text-[22px] font-normal flex-1 text-[#1F1F1C]">
                    {f.q}
                  </span>
                  <span
                    className={`text-2xl text-[#BFA46A] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 ${
                      openFaq === i ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    openFaq === i
                      ? "max-h-[200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[16px] font-normal leading-[1.75] text-[#6F6256] pb-6 lg:pb-8 pl-10 md:pl-16 max-w-[600px]">
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
            {/* Bottom border for last item */}
            <div className="border-t border-[rgba(191,164,106,0.22)]" />
          </div>
        </section>

        {/* ── CTA / CONTACT ───────────────────────────────────── */}
        <section id="contact" className="relative py-20 lg:py-[140px] overflow-hidden bg-[#3F4A38]">
          <Image
            src="/images/beliefs-2-desktop.avif"
            alt=""
            fill
            className="object-cover opacity-[0.15]"
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div ref={ctaHeading.ref} style={revealStyle(ctaHeading.isVisible, 0)}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#BFA46A] mb-6">
                Get in Touch
              </p>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(38px,5vw,72px)] font-normal leading-[1.1] text-[#FBF7EF]">
                Visit Our Sites
                <br />
                in Kharkhoda
              </h2>
              <div className="w-12 h-px bg-[#BFA46A] mt-8 mb-8" />
              <p className="text-[16px] font-normal leading-[1.75] text-[rgba(251,247,239,0.72)] max-w-[440px]">
                See the land, walk the roads, meet the families who already live
                here. We arrange complimentary site visits every weekend,
                pick-up from Sonipat or Delhi.
              </p>
            </div>

            <div ref={ctaForm.ref} style={revealStyle(ctaForm.isVisible, 0.14)} className="bg-[rgba(251,247,239,0.08)] backdrop-blur-2xl border border-[rgba(191,164,106,0.22)] rounded-lg p-6 md:p-8 lg:p-10">
              <h3 className="font-[family-name:var(--font-serif)] text-[26px] font-normal text-[#FBF7EF]">
                Connect With Us
              </h3>
              <p className="text-[14px] text-[rgba(251,247,239,0.5)] mt-1 mb-8">
                Our team will contact you shortly.
              </p>

              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="text-[#BFA46A] text-4xl mb-4">&#10003;</div>
                  <p className="font-[family-name:var(--font-serif)] text-xl text-[#FBF7EF]">
                    Thank you!
                  </p>
                  <p className="text-[14px] text-[rgba(251,247,239,0.6)] mt-2">
                    We&apos;ll contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="mb-5">
                    <label htmlFor="form-name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="form-name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      required
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(191,164,106,0.45)] py-3.5 text-base font-normal text-[#FBF7EF] placeholder:text-[rgba(251,247,239,0.3)] outline-none focus:border-b-[#BFA46A] transition-colors duration-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="form-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="form-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                      onInput={(e) =>
                        (e.currentTarget as HTMLInputElement).setCustomValidity("")
                      }
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(191,164,106,0.45)] py-3.5 text-base font-normal text-[#FBF7EF] placeholder:text-[rgba(251,247,239,0.3)] outline-none focus:border-b-[#BFA46A] transition-colors duration-300"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="form-phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      id="form-phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone"
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(191,164,106,0.45)] py-3.5 text-base font-normal text-[#FBF7EF] placeholder:text-[rgba(251,247,239,0.3)] outline-none focus:border-b-[#BFA46A] transition-colors duration-300"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
                    <button
                      type="submit"
                      className="bg-[#BFA46A] text-[#FBF7EF] px-8 py-3 text-[12px] tracking-[0.14em] uppercase rounded-[2px] cursor-pointer border border-[#BFA46A] hover:bg-transparent hover:text-[#BFA46A] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    >
                      Request a Visit
                    </button>
                    <p className="text-[12px] text-[rgba(251,247,239,0.3)] max-w-[180px]">
                      By submitting, you agree to our privacy policy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#1F1F1C] pt-16 pb-8">
        <div
          ref={footerCols.ref}
          style={revealStyle(footerCols.isVisible, 0)}
          className="max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#A8894F] mb-4 font-normal">
              Brand
            </p>
            <p className="font-[family-name:var(--font-serif)] text-lg tracking-[0.15em] uppercase text-[#FBF7EF]">
              MGL Realtech
            </p>
            <p className="text-[14px] text-[rgba(251,247,239,0.45)] mt-2 leading-relaxed">
              Premium real estate developer
              <br />
              since 2017. North NCR.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#A8894F] mb-4 font-normal">
              Location
            </p>
            <p className="text-[16px] font-normal leading-snug text-[#FBF7EF]">
              NH 344P, Kharkhoda
            </p>
            <p className="text-[16px] font-normal text-[rgba(251,247,239,0.6)]">
              Sonipat, Haryana, India
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#A8894F] mb-4 font-normal">
              Contact
            </p>
            <a
              href="mailto:info@mglrealtech.com"
              className="block text-[16px] font-normal text-[rgba(251,247,239,0.8)] hover:text-[#BFA46A] transition-colors duration-300"
            >
              info@mglrealtech.com
            </a>
            <a
              href="tel:+916361618181"
              className="block text-[16px] font-normal text-[rgba(251,247,239,0.8)] hover:text-[#BFA46A] transition-colors duration-300 mt-1"
            >
              +91-6361618181
            </a>
          </div>
        </div>

        {/* Social links */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw] mt-10 flex gap-6 items-center">
          {[
            { name: "Instagram", href: "#" },
            { name: "Facebook", href: "#" },
            { name: "YouTube", href: "#" },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="text-[11px] tracking-[0.14em] uppercase text-[rgba(251,247,239,0.35)] hover:text-[#BFA46A] transition-colors duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw] mt-10 border-t border-[rgba(191,164,106,0.22)] pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-[13px] text-[rgba(251,247,239,0.3)]">
            &copy; 2026 MGL Realtech Pvt. Ltd.
          </p>
          <p className="text-[13px] text-[rgba(251,247,239,0.3)]">All rights reserved.</p>
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ──────────────────────── */}
      <a
        href="https://wa.me/916361618181"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.004 2.667A13.28 13.28 0 002.72 15.948a13.2 13.2 0 001.787 6.636L2.667 29.333l6.96-1.824A13.28 13.28 0 0016.004 29.333c7.353 0 13.329-5.973 13.329-13.333S23.357 2.667 16.004 2.667zm0 24.31a10.92 10.92 0 01-5.57-1.525l-.4-.237-4.14 1.085 1.104-4.035-.26-.413A10.93 10.93 0 015.07 15.948c0-6.04 4.914-10.95 10.934-10.95 6.02 0 10.93 4.91 10.93 10.95 0 6.043-4.91 10.95-10.93 11.029z"
            fill="white"
          />
          <path
            d="M23.013 19.16c-.373-.187-2.21-1.09-2.553-1.215-.343-.124-.593-.187-.843.187-.25.374-.967 1.215-1.186 1.465-.218.25-.437.28-.81.093-.374-.187-1.578-.581-3.006-1.853-1.111-.99-1.862-2.213-2.08-2.587-.218-.374-.023-.576.164-.763.168-.168.374-.437.56-.656.187-.218.25-.374.374-.624.125-.25.063-.468-.031-.656-.093-.187-.843-2.03-1.155-2.78-.305-.73-.614-.63-.843-.643h-.718c-.25 0-.655.094-1 .468-.342.374-1.31 1.28-1.31 3.122 0 1.842 1.342 3.622 1.53 3.872.186.25 2.64 4.03 6.398 5.65.894.387 1.592.618 2.137.79.897.286 1.714.246 2.36.15.72-.108 2.21-.904 2.523-1.778.312-.874.312-1.623.218-1.778-.093-.156-.343-.25-.717-.437z"
            fill="white"
          />
        </svg>
      </a>
    </>
  );
}
