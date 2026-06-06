# Elyse Residence — Page Topology

## Source URL
https://elyse-residence-dev.webflow.io/

## Global Design Tokens

### Colors (CSS Custom Properties)
| Token | Value | Usage |
|-------|-------|-------|
| `--black-900` | `#121717` | Body background |
| `--white` | `#ffffff` | Primary text |
| `--green-700` | `#254441` | Button hover text |
| `--white-alpha-900` | `#ffffffe6` | Button hover bg |
| `--white-alpha-500` | `#ffffff80` | 50% white |
| `--white-alpha-50` | `#ffffff33` | FAQ borders, subtle lines |
| `--gray-alpha-500` | `#e7e1dc8f` | Warm gray overlay |

### Typography
| Token | Font Family | Usage |
|-------|------------|-------|
| Serif | Fragment Serif | H1-H5 headings |
| Glare | Fragment Glare | H5-glare, H6-H8 subheadings, captions |
| Sans | Inter 28 Pt | B0-B4 body text, buttons |

### Fluid Scaling
```css
html { font-size: calc(16 * (100vw / 1920)); }
@media (max-width: 479px) { html { font-size: calc(16 * (100vw / 375)); } }
@media (min-width: 1920px) { html { font-size: 16px; } }
```

### Container
- Max width: 1200px (via `.container`)
- Page padding: 0 40px (via `.page-padding`)

## Section Map (top to bottom)

| # | Section | Class | Interaction Model | Z-Index |
|---|---------|-------|-------------------|---------|
| 0 | Header/Nav | `.header` | Scroll-triggered (bg change, line hide) | 1000 |
| 1 | Hero | `.hero` | Static + scroll parallax | - |
| 2 | About | `.about` | Scroll-reveal animations + counter | - |
| 3 | Our Livings | `.projects` | Splide slider (loop, drag on mobile) | - |
| 4 | Our Beliefs (intro) | `.our-beliefs` | Scroll-reveal | - |
| 5 | Beliefs Cards | `.beliefs` | Stagger-reveal on scroll | - |
| 6 | Amenities | `.amenities` | Scroll-driven transitions (sticky + mask) | - |
| 7 | FAQ | `.faq` | Hover-reveal (desktop), click accordion (mobile) | - |
| 8 | CTA / Book a Visit | `.cta` | Static form | - |
| 9 | Footer | `.footer` | Stagger-reveal | - |
| 10 | Modal | `.modal` | Click-triggered full-screen gallery | 2000+ |

## Animation Libraries
- GSAP 3.15.0 (ScrollTrigger, ScrollToPlugin, SplitText)
- Splide.js 4.1.4 (carousel)
- jQuery 3.5.1 (DOM manipulation)
- NO Lenis/Locomotive — native browser scroll

## Key Behaviors
1. **Header**: Gains background overlay on scroll > 1px, nav-line fades out
2. **Hero**: SplitText char-by-char reveal (2s timeline), parallax on scroll (yPercent: 30)
3. **About stats**: Counter animation at 50% viewport (gsap.to with snap)
4. **Projects slider**: Splide loop, 1 per page, 14rem gap, center focus
5. **Amenities**: Scroll-driven with sticky container, 30-slice mask gradient reveal between images
6. **FAQ**: CSS hover transition on desktop, jQuery slideUp/slideDown on mobile
7. **Modal**: Full-screen with 30-slice venetian-blind image transitions, thumbnail Splide
