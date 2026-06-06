# Elyse Residence — Behaviors Bible

## Header Scroll Behavior
- **Trigger:** `window.scrollY > 1`
- **State A (top):** Nav overlay opacity 0, nav-line visible (opacity 1, scaleX 1)
- **State B (scrolled):** Nav overlay opacity 1 (dark bg appears), nav-line opacity 0
- **Class toggle:** `header.is-scrolled`

## Hero Animation Timeline (plays on load)
1. Title chars — SplitText mask, `yPercent: 100 → 0`, duration 2s, stagger 0.1, delay 0.8s
2. Subtitle words — `opacity: 0, y: 30, rotationX: -45 → 0`, 1.2s, stagger 0.04, delay 1.6s
3. Description — `opacity: 0, y: 40 → 0`, 1.5s, delay 2s
4. Scroll indicator — `opacity: 0, y: 20 → 0`, 1s, delay 2.8s
5. Nav — `opacity: 0, yPercent: -100 → 0`, 1s, delay 2.8s
6. Nav line — `opacity: 0, scaleX: 0 → 1`, 1s, delay 4s

## Hero Scroll Parallax
- Background image: `yPercent: progress * 30` (moves down)
- Title: moves up and fades
- Content: fades faster

## Number Counter Animation
- **Trigger:** ScrollTrigger at `50% bottom`
- **Animation:** `gsap.to` with `snap: { textContent: 1 }` over 2s
- **Elements:** `[data-number]` attributes

## Scroll-Reveal Animations (data-anim system)
| Attribute | Behavior |
|-----------|----------|
| `[data-anim="element"]` | Fade-in on scroll (opacity 0 → 1, y offset) |
| `[data-anim="split"]` | SplitText line-by-line reveal |
| `[data-anim="img-overlay"]` | Image overlay slides away to reveal image |
| `[data-anim="img-paralax"]` | `yPercent: 15, scale: 1.05` on scrub |
| `[data-anim="slideUp-once"]` | Slide up, plays once |
| `[data-anim="stagger"]` | Stagger fade-in within parent |

## Projects Slider (Splide)
- Type: `loop`
- perPage: 1
- Gap: `14rem` (desktop), `1.5rem` (mobile at 480px)
- Speed: 1000ms
- Focus: `center`
- Drag: `false` (desktop), `true` (mobile)
- Title and text swap synced with slide change

## Amenities Scroll-Driven Animation
- Sticky container pins while user scrolls through trigger zones
- Big image transitions: 30-slice mask gradient reveal (venetian-blind effect)
- Small images: `clipPath: inset(100% 0% 0% 0%) → inset(0%)` wipe up
- Text: SplitText lines slide out upward, new lines slide in from below
- Progress line tracks scroll position
- Header hides during amenities zone (`yPercent: -100`)

## FAQ Interaction
- **Desktop:** Hover reveals answer (CSS transition, `max-height` + `opacity`)
- **Mobile:** Click-to-toggle accordion (jQuery `slideUp/slideDown`)

## Modal Gallery
- Full-screen overlay, z-index 2000+
- 30-slice venetian-blind mask transition between gallery images
- Thumbnail Splide slider: `fixedWidth: 6.25rem`, `fixedHeight: 6.25rem`
- Opens via `[data-open-modal]` click
- Closes via Escape key, close button, or overlay click
- SplitText animation on title when modal opens
- Image preloading via IntersectionObserver on hover

## Footer Stagger
- `[data-footer="step-1"]`, `[data-footer="step-2"]` etc.
- Timed sequential reveals on scroll
