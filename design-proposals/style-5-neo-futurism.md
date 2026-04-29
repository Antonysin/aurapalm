# Style 5: Neo-Futurism — "Digital Mystic"

## Concept
Lean fully into the **AI + mysticism intersection** with a futuristic, tech-forward aesthetic. This isn't "mystical dark" — it's "cyberpunk meets spiritual." Think: holographic interfaces, glitch-art textures, grid systems, and neon accents. The message: "This isn't your grandmother's palm reading — this is AI-powered insight for the digital age."

## Why It Works for Western Users
- **Tech-forward aesthetics** appeal to younger demographics (18-35) who are AI-native.
- **Neon-on-dark** is visually arresting and highly shareable on social media.
- **Futurism signals innovation** — users perceive the AI as more advanced when the UI looks cutting-edge.
- **Differentiation** — no competitor in the palm reading space looks like this.

## Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#030308` | Deep space blue-black |
| `--bg-surface` | `#0A0A1A` | Navy-black for cards |
| `--bg-elevated` | `#12122A` | Slightly lighter navy |
| `--color-cyan` | `#00F0FF` | Primary neon accent — CTAs, highlights |
| `--color-magenta` | `#FF006E` | Secondary neon — featured badges, alerts |
| `--color-violet` | `#8338EC` | Tertiary accent — gradients, decorative |
| `--color-gold` | `#FFD700` | Retained for "premium" pricing context |
| `--color-text-primary` | `#E8E8F0` | Cool white text |
| `--color-text-secondary` | `#6B6B8A` | Cool gray text |
| `--color-border` | `rgba(0, 240, 255, 0.15)` | Cyan-tinted borders |

## Typography
- **Display**: `Space Grotesk` or `Orbitron` (Google Fonts) — geometric, futuristic sans-serif. Tight tracking (`letter-spacing: -0.02em`) for headlines.
- **Body**: `Inter` or `Satoshi` — clean, neutral sans. But use **tabular nums** for all numbers.
- **Data/Labels**: `JetBrains Mono` — monospace for all technical elements, prices, and stats.

## Key Visual Changes
1. **Hero**: Full-screen **WebGL grid floor** (retro-futuristic perspective grid in cyan, fading into distance) with a subtle scanline overlay. Headline has a **glitch text effect** on hover.
2. **Background**: Subtle **animated noise texture** (CSS `background-image` with animated `background-position`) — like old CRT static, very low opacity (3%).
3. **Cards**: **Sharp corners** with 1px cyan borders. On hover, border brightens and a **subtle inner glow** appears (`box-shadow: inset 0 0 20px rgba(0,240,255,0.05)`).
4. **Buttons**: **Neon glow buttons** — cyan fill with `box-shadow: 0 0 20px rgba(0,240,255,0.4), 0 0 40px rgba(0,240,255,0.2)`. On hover, glow intensifies.
5. **Progress/loading**: The analysis progress becomes a **circular neon loader** with cyan arc that draws itself.
6. **Grid overlay**: Some sections have a **faint CSS grid pattern** overlaid (like architectural blueprints) at 5% opacity.
7. **Images**: All photos (palm samples, etc.) get a **duotone treatment** — cyan/black or magenta/black using CSS `filter` or overlay blend modes.

## Motion
- **Hero grid**: Slow infinite scroll of perspective grid (CSS animation, 20s linear infinite).
- **Scroll-triggered**: Elements "decode" into view — text starts as random characters and resolves into words (scramble effect).
- **Hover**: Interactive elements get a **1px cyan outline pulse** (like a terminal cursor).
- **Page transitions**: Quick "digital wipe" — a cyan line scans down the screen between routes.

## Mood
Electric. Daring. Forward-looking. Like stepping into a sci-fi movie interface.

## Best For
Users who want AuraPalm to feel **cutting-edge, viral, and Gen-Z/Millennial focused**. Perfect for TikTok/Instagram marketing, influencer partnerships, and positioning as "the future of self-discovery."
