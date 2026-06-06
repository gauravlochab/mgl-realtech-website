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

    // === SCROLL REVEALS — every section ===
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        }
      );
    });

    // === STAGGER REVEALS — stat boxes, belief cards, FAQ items ===
    gsap.utils.toArray<HTMLElement>(".gsap-stagger-parent").forEach((parent) => {
      const children = parent.children;
      if (!children.length) return;
      gsap.fromTo(children as unknown as HTMLElement[],
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: parent, start: "top 90%", toggleActions: "play none none none" },
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
        }
      );
    });

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
            ? "bg-[rgba(18,23,23,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] shadow-[0_1px_12px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <nav
          className={`max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 grid grid-cols-[auto_1fr_auto] items-center transition-all duration-500 ${
            scrolled ? "h-[56px]" : "h-[64px]"
          }`}
        >
          {/* Logo — left */}
          <a
            href="#"
            className="font-[family-name:var(--font-serif)] text-[15px] font-normal tracking-[0.08em] uppercase text-white"
          >
            MGL
          </a>

          {/* Links — center */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link-underline relative font-[family-name:var(--font-serif)] text-[10.5px] tracking-[0.04em] uppercase font-normal text-white/90 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Button — right */}
          <div className="hidden md:flex justify-end">
            <a
              href="#contact"
              className="font-[family-name:var(--font-serif)] px-5 py-1.5 text-[10.5px] tracking-[0.04em] uppercase rounded-full bg-white text-[#254441] hover:bg-white/90 transition-all duration-300"
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
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </nav>
        {/* Nav line — full width thin line like Elyse */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/20 transition-opacity duration-500" style={{ opacity: scrolled ? 0 : 1 }} />
      </header>

      {/* ── Mobile menu overlay ────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[99] bg-[#121717] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
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
              className={`font-[family-name:var(--font-serif)] text-4xl font-light tracking-wide uppercase text-white transition-all duration-500 ${
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
            className={`mt-4 bg-white text-[#254441] px-8 py-3 text-sm tracking-[0.14em] uppercase rounded-full hover:bg-transparent hover:text-white border border-white transition-all duration-500 ${
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
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,23,23,0.05)] via-[rgba(18,23,23,0.15)] to-[rgba(18,23,23,0.55)]" />

          {/* Hero content — title fills bottom edge-to-edge, subtitle overlays bottom-right */}
          <div className="relative z-10 w-full pb-8 md:pb-12">
            {/* Giant title — centered at the very bottom */}
            <div className="overflow-hidden hero-title-wrap text-center md:-translate-x-[5%]">
              <h1 className="hero-title font-[family-name:var(--font-serif)] text-[clamp(48px,10.5vw,160px)] font-normal uppercase tracking-[-0.02em] leading-[0.88] text-white">
                MGL Realtech
              </h1>
            </div>
          </div>

          {/* Subtitle + description — positioned above the title on the right side */}
          <div className="absolute right-5 md:right-10 lg:right-12 z-20 max-w-[280px] lg:max-w-[320px] bottom-[clamp(100px,12vw,200px)]">
            <div className="hero-subtitle">
              <p className="font-[family-name:var(--font-glare)] italic text-[clamp(14px,1.4vw,20px)] uppercase tracking-[0.02em] leading-snug text-white/90">
                Holistic Living<br />In Perfect Harmony
              </p>
            </div>
            <div className="hero-desc mt-4">
              <p className="font-[family-name:var(--font-inter)] text-[clamp(12px,1vw,15px)] font-normal leading-[1.7] text-white/60 text-left">
                Welcome to MGL Realtech, where purposeful design and
                community-focused development converge to create
                an unparalleled standard of North NCR living.
              </p>
            </div>
            <div className="hero-desc mt-4">
              <p className="font-[family-name:var(--font-serif)] text-[11px] uppercase tracking-[0.15em] text-white/70">
                Scroll
              </p>
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────── */}
        <section id="about" className="bg-[#121717] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              {/* Section label */}
              <p className="gsap-reveal font-[family-name:var(--font-glare)] italic text-[16px] text-[rgba(255,255,255,0.7)] mb-6">
                (About)
              </p>
              {/* Heading */}
              <h2 className="gsap-reveal font-[family-name:var(--font-serif)] text-[clamp(28px,4vw,56px)] font-normal uppercase tracking-[0.04em] leading-[1.1] text-white">
                Building with purpose
                <br />
                since 2017
              </h2>
              {/* Image with overlay reveal */}
              <div className="gsap-reveal relative rounded-lg overflow-hidden aspect-[3/4] mt-10">
                <Image
                  src="/images/about-desktop.avif"
                  alt="MGL Realtech development project"
                  width={600}
                  height={800}
                  className="gsap-parallax w-full h-full object-cover"
                />
                <div className="img-overlay-reveal" />
              </div>
            </div>
            <div className="lg:pt-20">
              <p className="gsap-reveal font-[family-name:var(--font-inter)] text-[18px] font-normal leading-[1.75] text-[rgba(255,255,255,0.65)] tracking-[0.01em]">
                MGL Realtech started in 2017 with a single conviction: the
                Kharkhoda-Sonipat corridor would become North NCR&apos;s next
                growth frontier. While bigger names chased Gurugram and Noida, we
                committed to this belt, buying land, building roads, delivering
                plots.
              </p>
              <p className="gsap-reveal font-[family-name:var(--font-inter)] text-[18px] font-normal leading-[1.75] text-[rgba(255,255,255,0.65)] tracking-[0.01em] mt-6">
                Ten projects and 500+ families later, the KMP Expressway and
                NH-344P have validated that bet. Now we&apos;re building Mystical
                Meadows, a 150-acre golf township that will anchor this
                corridor&apos;s next chapter.
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────────── */}
        <section className="bg-[#121717] py-20 lg:py-[140px]">
          <div className="gsap-stagger-parent max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="border-t border-[rgba(255,255,255,0.12)] pt-8"
              >
                <p className="font-[family-name:var(--font-serif)] text-[clamp(48px,6vw,96px)] font-light leading-none text-white">
                  <span
                    className="gsap-counter"
                    data-target={String(s.value)}
                  >
                    0
                  </span>
                  <span className="text-[0.5em] ml-1">{s.suffix}</span>
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[14px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.5)] mt-3 font-normal">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────── */}
        <section id="projects" className="bg-[#121717] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Section label */}
            <p className="gsap-reveal font-[family-name:var(--font-glare)] italic text-[16px] text-[rgba(255,255,255,0.7)] mb-6">
              (Our Projects)
            </p>

            {/* Project title + status */}
            <div className="gsap-reveal mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
                <h2 className="font-[family-name:var(--font-serif)] text-[clamp(28px,4vw,56px)] font-normal uppercase tracking-[0.04em] leading-[1.1] text-white transition-opacity duration-300">
                  {PROJECTS[activeProject].title}
                </h2>
                <span
                  className={`inline-block self-start px-4 py-1.5 text-[11px] tracking-[0.14em] uppercase rounded-full border font-normal ${
                    PROJECTS[activeProject].status === "Delivered"
                      ? "border-[rgba(255,255,255,0.3)] text-[rgba(255,255,255,0.7)]"
                      : PROJECTS[activeProject].status === "Selling"
                        ? "border-white text-white"
                        : "border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.5)]"
                  }`}
                >
                  {PROJECTS[activeProject].status}
                </span>
              </div>
              <p className="text-[13px] text-[rgba(255,255,255,0.4)] mt-2">
                {PROJECTS[activeProject].subtitle} &middot;{" "}
                {PROJECTS[activeProject].location}
              </p>
            </div>

            {/* Image + Description */}
            <div className="gsap-reveal grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-14 items-end">
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
                <p className="gsap-reveal font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[1.75] text-[rgba(255,255,255,0.65)] transition-opacity duration-500">
                  {PROJECTS[activeProject].desc}
                </p>
                <div className="flex gap-3 mt-8">
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProject(i)}
                      className={`w-10 h-10 rounded-full border text-sm cursor-pointer transition-all duration-300 ${
                        i === activeProject
                          ? "border-white bg-[rgba(255,255,255,0.12)] text-white"
                          : "border-[rgba(255,255,255,0.2)] bg-transparent text-[rgba(255,255,255,0.4)] hover:border-white"
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
        <section className="relative py-20 lg:py-[140px] overflow-hidden bg-[#121717]">
          <Image
            src="/images/beliefs-1-desktop.avif"
            alt=""
            fill
            className="object-cover opacity-[0.08]"
          />
          {/* Dark overlay on top of image */}
          <div className="absolute inset-0 bg-[rgba(18,23,23,0.8)]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Section label */}
            <p className="gsap-reveal font-[family-name:var(--font-glare)] italic text-[16px] text-[rgba(255,255,255,0.7)] mb-6">
              (Our Beliefs)
            </p>
            <h2 className="gsap-reveal font-[family-name:var(--font-serif)] text-[clamp(28px,4vw,56px)] font-normal uppercase tracking-[0.04em] leading-[1.1] text-white mb-4">
              Built on conviction,
              <br className="hidden md:block" /> not convention
            </h2>
            <p className="gsap-reveal font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[1.75] text-[rgba(255,255,255,0.65)] max-w-[600px] mb-14 lg:mb-16">
              Five principles that have guided every land purchase, every
              foundation pour, and every handover since 2017.
            </p>

            {/* Cards — stagger parent */}
            <div className="gsap-stagger-parent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BELIEFS.map((b, i) => (
                <div
                  key={i}
                  className={`bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-lg p-10 min-h-[220px] flex flex-col justify-between hover:-translate-y-1 hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === 3 ? "lg:col-start-1" : ""
                  } ${i === 4 ? "lg:col-start-2" : ""}`}
                >
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-[14px] font-normal text-[rgba(255,255,255,0.5)] mb-4">
                      ( {i + 1} )
                    </p>
                    <h3 className="font-[family-name:var(--font-serif)] text-[26px] font-normal uppercase tracking-[0.02em] leading-tight text-white mb-3">
                      {b.title}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[15px] font-normal text-[rgba(255,255,255,0.55)] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AMENITIES ───────────────────────────────────────── */}
        <section className="bg-[#121717] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Section label */}
            <p className="gsap-reveal font-[family-name:var(--font-glare)] italic text-[16px] text-[rgba(255,255,255,0.7)] mb-6">
              (Amenities)
            </p>
            <h2 className="gsap-reveal font-[family-name:var(--font-serif)] text-[clamp(28px,4vw,56px)] font-normal uppercase tracking-[0.04em] leading-[1.1] text-white mb-10 lg:mb-14">
              Designed for living
            </h2>

            <div className="gsap-reveal">
              {/* Tabs */}
              <div className="flex flex-wrap gap-6 md:gap-10 mb-10 lg:mb-14">
                {AMENITIES.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveAmenity(i)}
                    className={`bg-transparent border-none cursor-pointer text-[12px] tracking-[0.14em] uppercase pb-3 transition-all duration-300 font-normal ${
                      i === activeAmenity
                        ? "text-white border-b-2 border-b-white"
                        : "text-[rgba(255,255,255,0.4)] border-b-2 border-b-transparent hover:text-white"
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
                      className={`gsap-parallax absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
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
                  <h3 className="font-[family-name:var(--font-serif)] text-[clamp(24px,2.5vw,32px)] font-normal uppercase tracking-[0.02em] text-white mb-4 transition-opacity duration-500">
                    {AMENITIES[activeAmenity].title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[1.75] text-[rgba(255,255,255,0.65)] transition-opacity duration-500">
                    {AMENITIES[activeAmenity].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="bg-[#121717] py-20 lg:py-[140px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
            {/* Section label */}
            <p className="gsap-reveal font-[family-name:var(--font-glare)] italic text-[16px] text-[rgba(255,255,255,0.7)] mb-6">
              (FAQ)
            </p>
            <h2 className="gsap-reveal font-[family-name:var(--font-serif)] text-[clamp(28px,4vw,56px)] font-normal uppercase tracking-[0.04em] leading-[1.1] text-white mb-12 lg:mb-16">
              Your questions, answered
            </h2>

            <div className="gsap-stagger-parent">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className="border-t border-[rgba(255,255,255,0.12)]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full bg-transparent border-none cursor-pointer py-6 lg:py-8 flex items-center gap-4 md:gap-6 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-300"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-[family-name:var(--font-serif)] text-[14px] text-[rgba(255,255,255,0.4)] font-normal shrink-0 w-10 md:w-12">
                      ( {i + 1} )
                    </span>
                    <span className="font-[family-name:var(--font-serif)] text-lg md:text-[22px] font-normal uppercase tracking-[0.02em] flex-1 text-white">
                      {f.q}
                    </span>
                    <span
                      className={`text-2xl text-[rgba(255,255,255,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0 ${
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
                    <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[1.75] text-[rgba(255,255,255,0.55)] pb-6 lg:pb-8 pl-10 md:pl-16 max-w-[600px]">
                      {f.a}
                    </p>
                  </div>
                </div>
              ))}
              {/* Bottom border for last item */}
              <div className="border-t border-[rgba(255,255,255,0.12)]" />
            </div>
          </div>
        </section>

        {/* ── CTA / CONTACT ───────────────────────────────────── */}
        <section
          id="contact"
          className="relative py-20 lg:py-[140px] overflow-hidden bg-[#121717]"
        >
          <Image
            src="/images/beliefs-2-desktop.avif"
            alt=""
            fill
            className="object-cover opacity-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(18,23,23,0.85)] to-[rgba(18,23,23,0.6)]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="gsap-reveal font-[family-name:var(--font-glare)] italic text-[16px] text-[rgba(255,255,255,0.7)] mb-6">
                (Get in Touch)
              </p>
              <h2 className="gsap-reveal font-[family-name:var(--font-serif)] text-[clamp(28px,4vw,56px)] font-normal uppercase tracking-[0.04em] leading-[1.1] text-white">
                Visit Our Sites
                <br />
                in Kharkhoda
              </h2>
              <p className="gsap-reveal font-[family-name:var(--font-inter)] text-[16px] font-normal leading-[1.75] text-[rgba(255,255,255,0.6)] max-w-[440px] mt-8">
                See the land, walk the roads, meet the families who already live
                here. We arrange complimentary site visits every weekend, pick-up
                from Sonipat or Delhi.
              </p>
            </div>

            <div className="gsap-reveal bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-lg p-6 md:p-8 lg:p-10">
              <h3 className="font-[family-name:var(--font-serif)] text-[26px] font-normal uppercase tracking-[0.02em] text-white">
                Connect With Us
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-[rgba(255,255,255,0.5)] mt-1 mb-8">
                Our team will contact you shortly.
              </p>

              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="text-white text-4xl mb-4">&#10003;</div>
                  <p className="font-[family-name:var(--font-serif)] text-xl text-white">
                    Thank you!
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-[rgba(255,255,255,0.6)] mt-2">
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
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(255,255,255,0.15)] py-3.5 text-base font-normal text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus:border-b-white transition-colors duration-300"
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
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(255,255,255,0.15)] py-3.5 text-base font-normal text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus:border-b-white transition-colors duration-300"
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
                      className="block w-full bg-transparent border-0 border-b border-b-[rgba(255,255,255,0.15)] py-3.5 text-base font-normal text-white placeholder:text-[rgba(255,255,255,0.3)] outline-none focus:border-b-white transition-colors duration-300"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
                    <button
                      type="submit"
                      className="bg-white text-[#254441] px-8 py-3 text-[12px] tracking-[0.14em] uppercase rounded-full cursor-pointer border border-white hover:bg-transparent hover:text-white transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    >
                      Request a Visit
                    </button>
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-[rgba(255,255,255,0.3)] max-w-[180px]">
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
      <footer className="bg-[#121717] border-t border-[rgba(255,255,255,0.1)] pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw]">
          {/* Section label */}
          <p className="gsap-reveal font-[family-name:var(--font-glare)] italic text-[16px] text-[rgba(255,255,255,0.5)] mb-10">
            (Get in touch)
          </p>

          <div className="gsap-stagger-parent grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="font-[family-name:var(--font-serif)] text-lg tracking-[0.15em] uppercase text-white">
                MGL Realtech
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-[rgba(255,255,255,0.45)] mt-2 leading-relaxed">
                Premium real estate developer
                <br />
                since 2017. North NCR.
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal leading-snug text-white">
                NH 344P, Kharkhoda
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[16px] font-normal text-[rgba(255,255,255,0.6)]">
                Sonipat, Haryana, India
              </p>
            </div>
            <div>
              <a
                href="mailto:info@mglrealtech.com"
                className="block font-[family-name:var(--font-inter)] text-[16px] font-normal text-[rgba(255,255,255,0.8)] hover:text-white transition-colors duration-300"
              >
                info@mglrealtech.com
              </a>
              <a
                href="tel:+916361618181"
                className="block font-[family-name:var(--font-inter)] text-[16px] font-normal text-[rgba(255,255,255,0.8)] hover:text-white transition-colors duration-300 mt-1"
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
              className="text-[11px] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] hover:text-white transition-colors duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-[6vw] mt-10 border-t border-[rgba(255,255,255,0.1)] pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-[13px] text-[rgba(255,255,255,0.3)]">
            &copy; 2026 MGL Realtech Pvt. Ltd.
          </p>
          <p className="text-[13px] text-[rgba(255,255,255,0.3)]">
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
