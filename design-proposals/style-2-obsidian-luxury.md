# Style 2: Obsidian Luxury — "Dark Jewels"

## Concept
Take the current dark theme and **elevate it to true luxury standards**. The current design reads as "dark generic SaaS" — this direction commits fully to an **obsidian-black, jewel-toned aesthetic** inspired by high-end jewelry brands (Cartier, Van Cleef) and premium fintech (Mercury, Ramp). Every pixel should feel expensive.

## Why It Works for Western Users
- **Dark themes with true blacks** are associated with premium tech products (Apple Pro displays, OLED-optimized apps).
- **Jewel tones** (emerald, sapphire, ruby) feel sophisticated and globally understood as "valuable."
- **High contrast** satisfies WCAG AAA and signals professionalism to discerning users.

## Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#050505` | True black background |
| `--bg-surface` | `#0A0A0A` | Slightly lifted surfaces |
| `--bg-elevated` | `#111111` | Cards, modals |
| `--color-gold` | `#D4AF37` | True metallic gold (brighter, less brown) |
| `--color-emerald` | `#2D9C6C` | Jewel accent for success/positive states |
| `--color-sapphire` | `#3B5BDB` | Deep blue for links and secondary CTAs |
| `--color-ruby` | `#C0395A` | Deep red for featured badges, urgency |
| `--color-text-primary` | `#F5F5F5` | Almost-white text |
| `--color-text-secondary` | `#8A8A8A` | Warm gray secondary text |
| `--color-border` | `rgba(255, 255, 255, 0.06)` | Nearly invisible borders |

## Typography
- **Display**: `Playfair Display` (Google Fonts) — high-contrast serif with editorial authority. Weight 600-700.
- **Body**: `Inter` — but at `font-weight: 400` with `letter-spacing: -0.011em` for that crisp modern feel.
- **Monospace/Labels**: `JetBrains Mono` for prices, data points, and small labels. Creates a "precision" feeling.

## Key Visual Changes
1. **Hero**: Full-bleed video background (subtle, slow-moving abstract light particles on black) OR a **WebGL shader** with slow gold/amber light caustics. No canvas particles.
2. **Cards**: **No rounded corners** — or 4px max. Sharp edges read as luxury. Use `background: #111` with `border: 1px solid rgba(255,255,255,0.06)`.
3. **Pricing cards**: The featured plan gets a **subtle gold border glow** (`box-shadow: 0 0 40px rgba(212, 175, 55, 0.08)`) instead of a ring.
4. **Buttons**: Pill-shaped (full radius) for primary CTAs with gold fill. Rectangular with 1px white border for secondary.
5. **Navigation**: Transparent over hero, then transitions to `rgba(5,5,5,0.9)` with `backdrop-filter: blur(20px)` on scroll.
6. **Testimonials**: Horizontal scroll becomes a **2x3 masonry grid** on desktop — more editorial, less carousel.

## Motion
- **Hero text**: Split-line reveal animation (each line slides up from 100% Y, masked) on load.
- **Scroll**: Lenis smooth scroll with velocity-based skew on images (subtle, 1-2deg max).
- **Cursor**: Custom cursor — small gold dot that scales up on hover over interactive elements.

## Mood
Expensive. Confident. Timeless. Like a black-tie invitation.

## Best For
Users who want AuraPalm to feel like a **luxury service** worth paying premium prices for. Appeals to older, higher-income demographics.
