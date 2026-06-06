"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Our Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#book-a-visit" },
] as const;

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: isScrolled
          ? "rgba(18, 23, 23, 0.95)"
          : "transparent",
        boxShadow: isScrolled
          ? "0 1px 12px rgba(0, 0, 0, 0.35)"
          : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <nav style={{ padding: "0 2.5rem", height: "5rem", position: "relative" }}>
        <div
          className="nav-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="MGL Realtech — Home"
            style={{
              fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
              fontSize: "1.125rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              color: "var(--white)",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            MGL Realtech
          </Link>

          {/* Desktop Navigation */}
          <div
            className="nav-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                  color: "var(--white)",
                  opacity: 0.8,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.8";
                }}
              >
                {link.label}
              </Link>
            ))}

            <BookVisitButton />
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 1100,
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                backgroundColor: "var(--white)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: isMobileMenuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                backgroundColor: "var(--white)",
                marginTop: "6px",
                transition: "opacity 0.3s ease",
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                backgroundColor: "var(--white)",
                marginTop: "6px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: isMobileMenuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </button>
        </div>

        {/* Nav line — opacity transition for smooth hide/show */}
        <div
          className="nav-line"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            opacity: isScrolled ? 0 : 1,
            transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
          }}
        />
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="mobile-menu-overlay"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(18, 23, 23, 0.98)",
          zIndex: 1050,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
              fontSize: "2rem",
              fontWeight: 400,
              letterSpacing: "0.05em",
              color: "var(--white)",
              textDecoration: "none",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            {link.label}
          </Link>
        ))}

        <BookVisitButton onClick={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 479px) {
          nav {
            padding: 0 1.25rem !important;
          }
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

/* ── Book a Visit button (shared between desktop + mobile) ─────── */

function BookVisitButton({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="#book-a-visit"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isHovered
          ? "1px solid white"
          : "1px solid rgba(255, 255, 255, 0.6)",
        padding: "0.625rem 1.75rem",
        fontSize: "0.8125rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        fontWeight: 400,
        color: isHovered ? "#254441" : "var(--white)",
        backgroundColor: isHovered ? "white" : "transparent",
        borderColor: isHovered ? "white" : "rgba(255, 255, 255, 0.6)",
        transition:
          "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
        cursor: "pointer",
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      Book a Visit
    </Link>
  );
}
