# Style 1: Celestial Minimal — "Quiet Universe"

## Concept
A refined, airy redesign that trades the heavy dark mysticism for a **celestial light-mode experience**. Think: the calm of a planetarium at dawn. The spiritual essence is preserved through cosmic visual metaphors — soft orbits, star-dust textures, and ethereal gradients — but expressed with the restraint and breathing room that Western premium SaaS users expect.

## Why It Works for Western Users
- **Light mode is the default expectation** for mainstream English-speaking audiences (US/UK/CA/AU). Dark mode feels niche or "gamer-y" to many.
- **Minimalism signals premium** — Apple, Notion, Linear, and Calm all use generous whitespace to convey trust and sophistication.
- **Reduced cognitive load** — the current design is dense with gradients, borders, and glass effects. This style strips back to essentials.

## Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#F7F5F0` | Warm off-white page background |
| `--bg-surface` | `#FFFFFF` | Cards, sections |
| `--bg-elevated` | `#EDEAE3` | Hover states, subtle elevation |
| `--color-primary` | `#1A1A2E` | Deep midnight for primary text |
| `--color-accent` | `#C4956A` | Warm bronze (replaces gold) |
| `--color-accent-soft` | `#D4B896` | Lighter bronze for hover |
| `--color-secondary` | `#6B5B95` | Soft lavender for secondary accents |
| `--color-muted` | `#8A8580` | Warm gray for secondary text |
| `--color-border` | `rgba(26, 26, 46, 0.08)` | Invisible-feeling borders |

## Typography
- **Display**: `Cormorant Garamond` (keep) — but use lighter weights (300-400) and much larger sizes
- **Body**: `Inter` → replace with `Source Sans 3` or keep `Inter` but increase line-height to 1.7
- **Accent/Labels**: `Space Grotesk` (medium, 500) — for tags, badges, buttons. Clean, geometric contrast to the serif display

## Key Visual Changes
1. **Hero**: Remove particle canvas. Replace with a **subtle CSS-generated starfield** (tiny dots, very slow drift) or a soft radial gradient orb behind the headline. Headline becomes the visual anchor.
2. **Cards**: Drop glassmorphism entirely. Use **flat white cards** with 1px `rgba(0,0,0,0.04)` borders and soft shadows (`0 4px 24px rgba(0,0,0,0.04)`).
3. **Buttons**: Solid midnight `#1A1A2E` with warm bronze text, or bronze fill with midnight text. No gradients.
4. **Section dividers**: None. Let whitespace do the work. 120px+ vertical padding between sections.
5. **Icons**: Keep Lucide, but use `stroke-width={1.5}` for a lighter feel.

## Motion
- **Page load**: Staggered fade-in (opacity 0→1, translateY 16px→0) over 0.8s with 0.1s delays
- **Scroll**: No parallax. Simple `IntersectionObserver` fade-ups.
- **Hover**: Cards lift 2px with shadow deepening. Buttons scale 1.02.

## Mood
Calm. Trustworthy. Premium. Like opening a beautifully designed book.

## Best For
Users who want AuraPalm to feel like a **modern wellness brand** (Calm, Headspace, Oura) rather than a mystical tool.
