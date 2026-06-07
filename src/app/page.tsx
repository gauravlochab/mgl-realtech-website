"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════════════════════
   MGL Realtech — Complete Single-Page Website (v5)
   Dark luxury editorial design — inspired by Elyse Residence.
   Background #121717, white text, teal #254441 accents.
   Cormorant Garamond serif + Inter body. GSAP ScrollTrigger.
   ═══════════════════════════════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "MGL Greens", href: "#projects" },
  { label: "Mystical Meadows", href: "#projects" },
  { label: "MGL Vantage", href: "#projects" },
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
    desc: "Parks, temples, community halls — planned from day one, not afterthoughts squeezed into leftover plots.",
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
    a: "Yes — 100% of MGL plots carry DTCP (Directorate of Town & Country Planning) approval. We never sell unapproved layouts. Licence numbers are shared at the time of booking.",
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

// ── Main Page ─────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeAmenity, setActiveAmenity] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // ── Scroll handler (header bg) ────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // ── GSAP Master Effect ───────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // === HERO ENTRANCE ANIMATION ===
    const heroTl = gsap.timeline();
    heroTl
      .from(".hero-title", {
        yPercent: 100,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
      })
      .from(
        ".hero-subtitle",
        { opacity: 0, y: 30, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .from(
        ".hero-desc",
        { opacity: 0, y: 30, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      // Nav stays visible — no animation that hides it

    // Scroll reveals removed — they hid content via opacity:0

    // === IMAGE PARALLAX — all images with .gsap-parallax ===
    gsap.utils.toArray<HTMLElement>(".gsap-parallax").forEach((img) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        yPercent: 15,
        scale: 1.05,
        ease: "none",
      });
    });

    // === IMAGE OVERLAY REVEAL ===
    gsap.utils.toArray<HTMLElement>(".img-overlay-reveal").forEach((overlay) => {
      gsap.fromTo(overlay,
        { scaleY: 1 },
        {
        scrollTrigger: {
          trigger: overlay.parentElement!,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        scaleY: 0,
        duration: 1.2,
        ease: "power3.inOut",
      });
    });

    // === STAT COUNTER ===
    gsap.utils.toArray<HTMLElement>(".gsap-counter").forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0");
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
        textContent: target,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          el.textContent = String(Math.round(parseFloat(el.textContent || "0")));
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
        className={`site-nav fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(11,20,17,0.95)] backdrop-blur-xl border-b border-[rgba(244,241,232,0.08)] shadow-[0_1px_12px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <nav
          className={`max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[56px]" : "h-[64px]"
          }`}
        >
          {/* Logo — left */}
          <a
            href="#"
            className="font-[family-name:var(--font-serif)] text-[22px] font-normal tracking-[0.03em] uppercase text-[#f4f1e8]"
          >
            MGL Realtech
          </a>

          {/* Links — center */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link-underline relative font-[family-name:var(--font-inter)] text-[11px] tracking-[0.02em] uppercase font-normal text-[rgba(244,241,232,0.78)] hover:text-[#f4f1e8] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Button — right */}
          <div className="hidden md:flex justify-end">
            <a
              href="#contact"
              className="font-[family-name:var(--font-inter)] px-5 py-1.5 text-[11px] tracking-[0.03em] uppercase rounded-full bg-white text-[#254441] hover:bg-white/90 transition-all duration-300"
            >
              Book a Visit
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden justify-self-end w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px bg-[#f4f1e8] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#f4f1e8] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </nav>
        {/* Nav line — full width thin line like Elyse */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-[rgba(244,241,232,0.2)] transition-opacity duration-500" style={{ opacity: scrolled ? 0 : 1 }} />
      </header>

      {/* ── Mobile menu overlay ────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[99] bg-[#0b1411] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
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
              className={`font-[family-name:var(--font-serif)] text-3xl font-light tracking-wide uppercase text-[#f4f1e8] text-center transition-all duration-500 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: menuOpen ? `${i * 100 + 200}ms` : "0ms",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className={`mt-4 bg-white text-[#254441] px-8 py-3 text-sm tracking-[0.14em] uppercase rounded-full hover:bg-transparent hover:text-[#f4f1e8] border border-white transition-all duration-500 ${
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
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,20,17,0.05)] via-[rgba(11,20,17,0.15)] to-[rgba(11,20,17,0.55)]" />

          {/* Hero content — title fills bottom edge-to-edge, subtitle overlays bottom-right */}
          <div className="relative z-10 w-full pb-8 md:pb-12">
            {/* Giant title — centered at the very bottom */}
            <div className="overflow-hidden hero-title-wrap text-center md:-translate-x-[5%]">
              <h1 className="hero-title font-[family-name:var(--font-serif)] text-[clamp(130px,20vw,260px)] font-normal uppercase tracking-[-0.08em] leading-[0.78] text-[#f4f1e8]">
                MGL
              </h1>
            </div>
          </div>

          {/* Subtitle + description — positioned above the title on the right side */}
          <div className="absolute left-5 bottom-[55%] md:left-auto md:bottom-auto md:right-10 lg:right-12 md:top-auto z-20 max-w-[280px] lg:max-w-[320px] md:bottom-[clamp(80px,10vw,180px)]">
            <div className="hero-subtitle">
              <p className="font-[family-name:var(--font-serif)] text-[clamp(22px,2vw,34px)] uppercase tracking-[-0.045em] leading-[0.95] font-normal text-[#f4f1e8]">
                Holistic Living<br />In Perfect Harmony
              </p>
            </div>
            <div className="hero-desc mt-4">
              <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.78)] text-left max-w-[330px]">
                Welcome to MGL Realtech, where purposeful design and
                community-focused development converge to create
                an unparalleled standard of North NCR living.
              </p>
            </div>
            <div className="hero-desc mt-4">
              <p className="font-[family-name:var(--font-serif)] text-[11px] uppercase tracking-[0.15em] text-[rgba(244,241,232,0.7)]">
                Scroll
              </p>
            </div>
          </div>
        </section>

        {/* ── ABOUT — 3-column Elyse layout ────────────────── */}
        <section id="about" className="bg-[#0b1411] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Top row: label | image | text */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-8 lg:gap-10 items-start">
              {/* Left — label */}
              <div className="">
                <p className="font-[family-name:var(--font-serif)] italic text-[20px] font-normal tracking-[-0.04em] text-[rgba(244,241,232,0.82)]">
                  (About)
                </p>
              </div>

              {/* Center — large portrait image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src="/images/about-desktop.avif"
                  alt="Modern luxury interior"
                  width={700}
                  height={933}
                  className="gsap-parallax w-full h-full object-cover"
                />
                <div className="img-overlay-reveal" />
              </div>

              {/* Right — body text */}
              <div className="lg:pt-4">
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] text-[rgba(244,241,232,0.76)] tracking-[-0.01em]">
                  Every element of MGL Realtech reflects a commitment to excellence.
                  From thoughtfully designed residential spaces to premium
                  commercial developments, we embody a holistic approach
                  to real estate.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] text-[rgba(244,241,232,0.76)] tracking-[-0.01em] mt-5">
                  Whether you&apos;re seeking a dream home, an investment
                  opportunity, or a space that inspires growth, MGL Realtech
                  offers it all.
                </p>
              </div>
            </div>

            {/* Bottom — massive heading */}
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(58px,7vw,98px)] font-normal uppercase tracking-[-0.065em] leading-[0.88] text-[#f4f1e8] mt-10 lg:mt-14 max-w-[450px]">
              <span className="italic tracking-[-0.075em]">Timeless</span> Design <span className="italic tracking-[-0.075em]">Purposeful</span> Development
            </h2>
          </div>
        </section>

        {/* ── STATS — clean 4-column grid with thin dividers ────── */}
        <section className="bg-[#0b1411] py-20 lg:py-[100px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-0">
              {[
                { target: "10", suffix: "+", label: "Projects delivered across Kharkhoda-Sonipat" },
                { target: "7", suffix: "+", label: "Years of on-time delivery, zero delays" },
                { target: "500", suffix: "+", label: "Families settled in MGL colonies" },
                { target: "100", suffix: "%", label: "DTCP approved plots, clean titles" },
              ].map((s, i) => (
                <div key={i} className={`py-8 md:py-10 md:px-8 lg:px-10 ${i > 0 ? "md:border-l md:border-[rgba(244,241,232,0.1)]" : ""} ${i >= 2 ? "border-t md:border-t-0 border-[rgba(244,241,232,0.1)]" : ""}`}>
                  <p className="font-[family-name:var(--font-serif)] text-[clamp(56px,7vw,96px)] font-light leading-[0.9] tracking-[-0.04em] text-[#f4f1e8]">
                    <span className="gsap-counter" data-target={s.target}>0</span>
                    <span className="font-[family-name:var(--font-serif)] text-[28px] font-normal ml-1">{s.suffix}</span>
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.18] tracking-[-0.01em] text-[rgba(244,241,232,0.72)] mt-3 max-w-[210px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────── */}
        <section id="projects" className="bg-[#0b1411] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Section label */}
            <p className="font-[family-name:var(--font-serif)] italic text-[20px] font-normal tracking-[-0.04em] text-[rgba(244,241,232,0.82)] mb-6">
              (Our Projects)
            </p>

            {/* Project title + status */}
            <div className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(48px,6vw,88px)] font-normal uppercase tracking-[-0.06em] leading-[0.9] text-[#f4f1e8] transition-opacity duration-300">
                  {PROJECTS[activeProject].title}
                </h2>
                <span
                  className={`inline-block self-start px-4 py-1.5 text-[11px] tracking-[0.14em] uppercase rounded-full border font-normal ${
                    PROJECTS[activeProject].status === "Delivered"
                      ? "border-[rgba(244,241,232,0.3)] text-[rgba(244,241,232,0.7)]"
                      : PROJECTS[activeProject].status === "Selling"
                        ? "border-[#f4f1e8] text-[#f4f1e8]"
                        : "border-[rgba(244,241,232,0.2)] text-[rgba(244,241,232,0.5)]"
                  }`}
                >
                  {PROJECTS[activeProject].status}
                </span>
              </div>
              <p className="text-[13px] text-[rgba(244,241,232,0.4)] mt-2">
                {PROJECTS[activeProject].subtitle} &middot;{" "}
                {PROJECTS[activeProject].location}
              </p>
            </div>

            {/* Image + Description */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-14 items-end">
              <div className="rounded-lg overflow-hidden aspect-[4/3] relative group">
                {PROJECTS.map((proj, i) => (
                  <Image
                    key={i}
                    src={proj.image}
                    alt={proj.title}
                    width={800}
                    height={600}
                    className={`gsap-parallax absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] ${
                      i === activeProject
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-[1.04]"
                    }`}
                  />
                ))}
              </div>
              <div>
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.76)] transition-opacity duration-500">
                  {PROJECTS[activeProject].desc}
                </p>
                <div className="flex gap-3 mt-8">
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProject(i)}
                      className={`w-10 h-10 rounded-full border text-sm cursor-pointer transition-all duration-300 ${
                        i === activeProject
                          ? "border-[#f4f1e8] bg-[rgba(244,241,232,0.12)] text-[#f4f1e8]"
                          : "border-[rgba(244,241,232,0.2)] bg-transparent text-[rgba(244,241,232,0.4)] hover:border-[#f4f1e8]"
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

        {/* ── BELIEFS — Elyse layout: vivid bg, frosted glass cards, 2+3 stagger ── */}
        <section className="relative py-20 lg:py-[140px] overflow-hidden">
          {/* Vivid background image — visible through frosted cards */}
          <Image
            src="/images/beliefs-1-desktop.avif"
            alt=""
            fill
            className="object-cover"
          />
          {/* Light overlay — just enough to read white text */}
          <div className="absolute inset-0 bg-[rgba(11,20,17,0.35)]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Row 1: 2 frosted cards + body text on right */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start">
              {/* Card 1 */}
              <div className="bg-[rgba(244,241,232,0.1)] backdrop-blur-2xl border border-[rgba(244,241,232,0.15)] rounded-lg p-8 min-h-[240px] flex flex-col justify-center text-center">
                <h3 className="font-[family-name:var(--font-serif)] text-[20px] font-normal uppercase tracking-[0.02em] leading-tight text-[#f4f1e8] mb-3">
                  {BELIEFS[0].title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal text-[rgba(244,241,232,0.76)] leading-[1.22] tracking-[-0.01em]">
                  {BELIEFS[0].desc}
                </p>
              </div>
              {/* Card 2 */}
              <div className="bg-[rgba(244,241,232,0.1)] backdrop-blur-2xl border border-[rgba(244,241,232,0.15)] rounded-lg p-8 min-h-[240px] flex flex-col justify-center text-center">
                <h3 className="font-[family-name:var(--font-serif)] text-[20px] font-normal uppercase tracking-[0.02em] leading-tight text-[#f4f1e8] mb-3">
                  {BELIEFS[1].title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal text-[rgba(244,241,232,0.76)] leading-[1.22] tracking-[-0.01em]">
                  {BELIEFS[1].desc}
                </p>
              </div>
              {/* Body text — right column */}
              <div className="pt-4">
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.76)]">
                  At MGL Realtech, we believe that a home is more than a physical space. It is a reflection of your aspirations, well-being, and values.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.76)] mt-4">
                  Our mission is to build developments that balance quality construction, community connection, and lasting value.
                </p>
              </div>
            </div>

            {/* Number labels for row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-2">
              <p className="font-[family-name:var(--font-serif)] text-[13px] text-[rgba(244,241,232,0.4)]">( 1 )</p>
              <p className="font-[family-name:var(--font-serif)] text-[13px] text-[rgba(244,241,232,0.4)]">( 2 )</p>
              <div />
            </div>

            {/* Row 2: 3 frosted cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-8 border-t border-[rgba(244,241,232,0.1)] pt-8">
              {BELIEFS.slice(2).map((b, i) => (
                <div key={i} className="bg-[rgba(244,241,232,0.1)] backdrop-blur-2xl border border-[rgba(244,241,232,0.15)] rounded-lg p-8 min-h-[220px] flex flex-col justify-center text-center">
                  <h3 className="font-[family-name:var(--font-serif)] text-[20px] font-normal uppercase tracking-[0.02em] leading-tight text-[#f4f1e8] mb-3">
                    {b.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal text-[rgba(244,241,232,0.76)] leading-[1.22] tracking-[-0.01em]">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Number labels for row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-2">
              <p className="font-[family-name:var(--font-serif)] text-[13px] text-[rgba(244,241,232,0.4)]">( 3 )</p>
              <p className="font-[family-name:var(--font-serif)] text-[13px] text-[rgba(244,241,232,0.4)]">( 4 )</p>
              <p className="font-[family-name:var(--font-serif)] text-[13px] text-[rgba(244,241,232,0.4)]">( 5 )</p>
            </div>
          </div>
        </section>

        {/* ── AMENITIES — Elyse layout: text LEFT + overlapping images RIGHT ── */}
        <section className="bg-[#0b1411] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {AMENITIES.map((a, i) => (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center ${i > 0 ? "mt-12 lg:mt-32" : ""}`}>
                {/* Left — text with vertical accent line */}
                <div className="flex gap-4">
                  <div className="w-[3px] bg-[rgba(244,241,232,0.2)] shrink-0 hidden lg:block" />
                  <div>
                    <h2 className="font-[family-name:var(--font-serif)] text-[clamp(52px,6vw,88px)] font-normal uppercase tracking-[-0.06em] leading-[0.9] text-[#f4f1e8] mb-6">
                      {a.title}
                    </h2>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.76)] max-w-[380px]">
                      {a.desc}
                    </p>
                  </div>
                </div>
                {/* Right — overlapping images */}
                <div className="relative h-[280px] md:h-[400px] lg:h-[600px]">
                  <div className="absolute top-0 right-0 w-[65%] h-[75%] rounded-lg overflow-hidden">
                    <Image src={a.big} alt={a.title} width={600} height={750} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-[55%] h-[65%] rounded-lg overflow-hidden">
                    <Image src={a.small} alt="" width={400} height={500} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ — Elyse layout: (FAQ) + heading center-right, numbers far-left, questions far-right ── */}
        <section className="bg-[#0b1411] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Header: label left, heading right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mb-16 lg:mb-20">
              <p className="font-[family-name:var(--font-serif)] italic text-[20px] font-normal tracking-[-0.04em] text-[rgba(244,241,232,0.82)]">
                (FAQ)
              </p>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(52px,6vw,88px)] font-normal uppercase tracking-[-0.06em] leading-[0.9] text-[#f4f1e8]">
                Your questions, answered
              </h2>
            </div>

            {/* FAQ items — number far-left, question far-right, answer center */}
            {FAQS.map((f, i) => (
              <div key={i} className="border-t border-[rgba(244,241,232,0.1)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full bg-transparent border-none cursor-pointer py-8 lg:py-10 grid grid-cols-[auto_1fr] lg:grid-cols-[80px_1fr_1fr] gap-4 items-start text-left hover:bg-[rgba(244,241,232,0.015)] transition-colors duration-300"
                  aria-expanded={openFaq === i}
                >
                  {/* Number — far left */}
                  <span className="font-[family-name:var(--font-serif)] italic text-[18px] tracking-[-0.03em] text-[rgba(244,241,232,0.65)]">
                    ({i + 1})
                  </span>
                  {/* Spacer on desktop */}
                  <span className="hidden lg:block" />
                  {/* Question — far right */}
                  <span className="font-[family-name:var(--font-serif)] text-[clamp(24px,2.4vw,38px)] font-normal tracking-[-0.045em] text-[#f4f1e8] leading-[1]">
                    {f.q}
                  </span>
                </button>
                {/* Answer — appears in center column */}
                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${openFaq === i ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-4 pb-8">
                    <span className="hidden lg:block" />
                    <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.76)] max-w-[500px]">
                      {f.a}
                    </p>
                    <span className="hidden lg:block" />
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-[rgba(244,241,232,0.1)]" />
          </div>
        </section>

        {/* ── CTA / CONTACT ───────────────────────────────────── */}
        <section
          id="contact"
          className="relative py-20 lg:py-[140px] overflow-hidden bg-[#0b1411]"
        >
          <Image
            src="/images/beliefs-2-desktop.avif"
            alt=""
            fill
            className="object-cover opacity-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,20,17,0.85)] to-[rgba(11,20,17,0.6)]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-[family-name:var(--font-serif)] italic text-[20px] font-normal tracking-[-0.04em] text-[rgba(244,241,232,0.82)] mb-6">
                (Get in Touch)
              </p>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(52px,6vw,88px)] font-normal uppercase tracking-[-0.06em] leading-[0.9] text-[#f4f1e8]">
                Visit Our Sites
                <br />
                in Kharkhoda
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.76)] max-w-[440px] mt-8">
                See the land, walk the roads, meet the families who already live
                here. We arrange complimentary site visits every weekend, pick-up
                from Sonipat or Delhi.
              </p>
            </div>

            <div className="bg-[#254441] p-8 md:p-10 lg:p-12">
              <h3 className="font-[family-name:var(--font-serif)] text-[clamp(28px,3vw,48px)] font-normal uppercase tracking-[-0.04em] leading-[1.1] text-[#f4f1e8] text-center">
                Envision Your<br />Life at MGL
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[rgba(244,241,232,0.76)] mt-3 mb-10 text-center">
                Our manager will contact you as soon as possible.
              </p>

              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="text-[#f4f1e8] text-4xl mb-4">&#10003;</div>
                  <p className="font-[family-name:var(--font-serif)] text-xl text-[#f4f1e8]">
                    Thank you!
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-[rgba(244,241,232,0.76)] mt-2">
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
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(244,241,232,0.15)] py-3.5 text-base font-normal text-[#f4f1e8] placeholder:text-[rgba(244,241,232,0.3)] outline-none focus:border-b-[#f4f1e8] transition-colors duration-300"
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
                        (
                          e.currentTarget as HTMLInputElement
                        ).setCustomValidity("")
                      }
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(244,241,232,0.15)] py-3.5 text-base font-normal text-[#f4f1e8] placeholder:text-[rgba(244,241,232,0.3)] outline-none focus:border-b-[#f4f1e8] transition-colors duration-300"
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
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(244,241,232,0.15)] py-3.5 text-base font-normal text-[#f4f1e8] placeholder:text-[rgba(244,241,232,0.3)] outline-none focus:border-b-[#f4f1e8] transition-colors duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-[#254441] py-4 text-[12px] tracking-[0.14em] uppercase rounded-full cursor-pointer border border-white hover:bg-transparent hover:text-[#f4f1e8] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] mt-8"
                  >
                    Request
                  </button>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] text-[rgba(244,241,232,0.3)] mt-4 text-center leading-relaxed">
                    By sending your request, you&apos;re agreeing to our privacy policy.<br />
                    We promise to keep your personal information safe and secure.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#0b1411] border-t border-[rgba(244,241,232,0.1)] pt-20 lg:pt-28 pb-8">
        <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
          {/* 3-column: labels + content like Elyse */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1 — Get in Touch + Logo */}
            <div>
              <p className="font-[family-name:var(--font-serif)] italic text-[20px] font-normal tracking-[-0.04em] text-[rgba(244,241,232,0.82)] mb-6">
                (Get in touch)
              </p>
              <p className="font-[family-name:var(--font-serif)] text-[clamp(28px,3vw,42px)] font-normal uppercase tracking-[0.06em] text-[#f4f1e8] leading-tight">
                MGL Realtech
              </p>
            </div>
            {/* Column 2 — Location */}
            <div>
              <p className="font-[family-name:var(--font-serif)] italic text-[20px] font-normal tracking-[-0.04em] text-[rgba(244,241,232,0.82)] mb-6">
                (Location)
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[#f4f1e8]">
                NH 344P, Kharkhoda
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] font-normal leading-[1.22] tracking-[-0.01em] text-[rgba(244,241,232,0.76)]">
                Sonipat, Haryana, India
              </p>
            </div>
            {/* Column 3 — Contact */}
            <div>
              <p className="font-[family-name:var(--font-serif)] italic text-[20px] font-normal tracking-[-0.04em] text-[rgba(244,241,232,0.82)] mb-6">
                (Contact)
              </p>
              <a
                href="mailto:info@mglrealtech.com"
                className="block font-[family-name:var(--font-serif)] text-[clamp(16px,1.4vw,22px)] font-normal uppercase tracking-[0.04em] text-[#f4f1e8] hover:text-[rgba(244,241,232,0.8)] transition-colors duration-300"
              >
                info@mglrealtech.com
              </a>
              <a
                href="tel:+916361618181"
                className="block font-[family-name:var(--font-serif)] text-[clamp(16px,1.4vw,22px)] font-normal uppercase tracking-[0.04em] text-[#f4f1e8] hover:text-[rgba(244,241,232,0.8)] transition-colors duration-300 mt-2"
              >
                +91-6361618181
              </a>
            </div>
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
              className="text-[11px] tracking-[0.14em] uppercase text-[rgba(244,241,232,0.35)] hover:text-[#f4f1e8] transition-colors duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw] mt-10 border-t border-[rgba(244,241,232,0.1)] pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-[13px] text-[rgba(244,241,232,0.3)]">
            &copy; 2026 MGL Realtech Pvt. Ltd.
          </p>
          <p className="text-[13px] text-[rgba(244,241,232,0.3)]">
            All rights reserved.
          </p>
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

      {/* ── Scroll indicator bounce animation ─────────────── */}
      <style jsx>{`
        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-8px);
          }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
