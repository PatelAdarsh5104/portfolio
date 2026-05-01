# Portfolio React Redesign — Design Spec

**Date:** 2026-05-02  
**Status:** Approved

---

## Overview

Convert Adarsh Patel's personal portfolio from vanilla HTML/CSS/JS to a full Next.js 14 application. The redesign targets a modern AI engineer aesthetic — dark/light theme, monospace typography, purple accent, typewriter hero animation, alternating experience timeline, and blog preview section. All existing pages (main, blog posts, project details) are migrated to React routes.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Typography | JetBrains Mono (via `next/font/google`) |
| Deployment | Vercel — change Framework setting from "Other" → "Next.js" |

No other framework setting changes required. Build command (`next build`) and output are auto-detected by Vercel.

---

## Color Palette

### Dark Mode (default)
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0a080f` | Page background |
| `bg-card` | `#120e1c` | Cards, sections |
| `bg-elevated` | `#1e1a2e` | Badges, inputs |
| `border` | `#2a2040` | Card borders |
| `accent` | `#a78bfa` | Highlights, links, dots, cursor |
| `text-primary` | `#f1f0ff` | Headings |
| `text-secondary` | `#6b7280` | Body text |
| `text-muted` | `#4b5563` | Meta, labels |

### Light Mode
Background flips to white/light-gray tones; accent `#a78bfa` stays identical.

---

## Typography

- **Font:** JetBrains Mono — applied globally, all weights (400, 600, 700, 800)
- **Style:** Full monospace — hacker/terminal aesthetic throughout
- **Section labels:** `// XX. SECTION` pattern in accent color, `letter-spacing: 3px`, small caps
- **Section headings:** Uppercase, `font-weight: 800`, `letter-spacing: 2–3px`

---

## Project Structure

```
src/
  app/
    layout.tsx                  # Root layout: Navbar, Footer, ThemeProvider, font
    page.tsx                    # Home — all sections stacked
    blog/
      page.tsx                  # Blog list (all posts)
      [slug]/page.tsx           # Individual blog post
    projects/
      [id]/page.tsx             # Project detail page
    globals.css                 # Tailwind base + custom CSS vars
  components/
    Navbar.tsx                  # Sticky frosted-glass nav, hamburger on mobile
    Footer.tsx                  # Social links, copyright
    ThemeToggle.tsx             # Sun/moon toggle, persists to localStorage
    ScrollReveal.tsx            # Framer Motion wrapper for scroll-triggered reveal
  sections/
    Hero.tsx                    # Full-width centered typewriter + grid bg
    About.tsx                   # Text-only, scroll fade-in
    Experience.tsx              # Alternating timeline
    Blog.tsx                    # Blog preview grid (homepage section)
    Skills.tsx                  # Icon grid
    Projects.tsx                # 2-column project cards
    Contact.tsx                 # Mailto button + social links
  data/
    pageInfo.ts                 # Name, role, bio, email, phone, location
    experiences.ts              # Array of experience objects
    skills.ts                   # Array of skill objects
    projects.ts                 # Array of project objects (with slug)
    blogs.ts                    # Array of blog objects (with slug, full content)
```

---

## Routing

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `app/page.tsx` | Home — Hero, About, Experience, Blog, Skills, Projects, Contact |
| `/blog` | `app/blog/page.tsx` | Full blog list page |
| `/blog/rag` | `app/blog/[slug]/page.tsx` | RAG blog post |
| `/blog/llm` | `app/blog/[slug]/page.tsx` | LLM blog post |
| `/blog/finetuning` | `app/blog/[slug]/page.tsx` | Fine-tuning blog post |
| `/blog/kv-cache` | `app/blog/[slug]/page.tsx` | KV cache blog post |
| `/blog/latency` | `app/blog/[slug]/page.tsx` | Latency blog post |
| `/blog/postgresql-locking` | `app/blog/[slug]/page.tsx` | PostgreSQL locking post |
| `/projects/voice-assistant` | `app/projects/[id]/page.tsx` | Voice AI Assistant detail |
| `/projects/spam-detection` | `app/projects/[id]/page.tsx` | Spam detection detail |
| `/projects/resume-matching` | `app/projects/[id]/page.tsx` | Resume matching detail |
| `/projects/botai` | `app/projects/[id]/page.tsx` | BotAI detail |

---

## Navbar

- **Logo:** "AP." in accent purple, links to `/#hero`
- **Links:** About · Experience · Skills · Projects · Blog — smooth scroll to sections on homepage, navigate to `/blog` for blog
- **CTA:** "GET IN TOUCH" button (pill style, accent bg) — scrolls to contact
- **Theme toggle:** Sun/moon icon, top-right
- **Sticky:** `position: fixed`, frosted glass (`backdrop-blur`) on scroll
- **Mobile:** Hamburger icon → slide-in drawer from right, closes on link click

---

## Sections (Homepage)

### 1. Hero

- **Layout:** Full-width, vertically centered, grid background
- **Grid background:** Subtle purple-tinted lines (`rgba(167,139,250,0.06)`), 28×28px
- **Content (centered):**
  - Label: `// hello world` in accent, small, monospace
  - Name: `Adarsh Patel` — typewriter animation (character by character), blinking purple cursor
  - Role: `AI SOFTWARE ENGINEER` fades in after typewriter completes
  - Tech chips: `Python · LLMs · RAG · LangChain · FastAPI` — staggered float-up
  - Buttons: "View Projects" (accent bg) · "Get in Touch" (outlined)
- **No photo** — text + chips replace the image
- **Animation:** Typewriter via Framer Motion sequence on mount

### 2. About

- **Layout:** Single column, constrained width, centered
- **Content:** Bio paragraph from `pageInfo.backgroundInformation`
- **Animation:** Fade + slide-up on scroll via `ScrollReveal` wrapper

### 3. Experience

- **Layout:** Alternating left/right timeline with vertical center line
- **Center line:** 1px, `rgba(167,139,250,0.27)`, gradient fades at top/bottom
- **Dot:** 12px purple circle with glow (`box-shadow: 0 0 12px #a78bfa99`) at each position
- **Card order (right → left → right → left):**
  1. **Armakuni PVT** — AI Software Engineer (MAY 2025–PRESENT) → RIGHT — "● CURRENT" badge
  2. **GenAI Novuscode** — AI/ML Developer (SEP 2023–MAY 2025) → LEFT
  3. **PHPDots Technologies (Tuvoc)** — Backend Developer Intern (FEB 2023–JUN 2023) → RIGHT
  4. **BrainyBeam Technologies Pvt. Ltd.** — Python Development Intern (FEB 2022 – MAR 2022) → LEFT
- **Card content:** Date, job title, company, 3 bullet points (condensed), tech tag pills
- **Animation:** Cards slide in from their respective side on scroll
- **Mobile:** Collapses to single-column (all cards full-width, line moves to left edge)

### 4. Blog (Homepage Preview)

- **Layout:** Constrained grid (~78% width, centered) → 2-column card grid
- **Cards (6 total):** Smaller compact size
  - Category badge (top-left) · Arrow icon `↗` (top-right, turns purple on hover)
  - Blog title (turns purple on hover)
  - Short summary
  - Date + read time meta
- **Slugs:** `rag`, `llm`, `finetuning`, `kv-cache`, `latency`, `postgresql-locking`
- **"View all posts →"** button below grid → routes to `/blog`
- **Animation:** Staggered card fade-in on scroll

### 5. Skills

- **Layout:** Icon grid — 5 columns desktop, 3 columns tablet, 2 columns mobile
- **Items (20):** Python, FastAPI, Django, Flask, LLM, HuggingFace, NLP, TensorFlow, PyTorch, OpenCV, LangChain, LangGraph, Azure, AWS, MySQL, Pinecone, Chroma DB, Git, GitHub, Streamlit
- **Card:** Icon image + skill name label
- **Animation:** Staggered pop-in on scroll

### 6. Projects

- **Layout:** 2-column grid desktop, 1-column mobile
- **Cards (4):** Project image, title, summary, tech tags, links (GitHub + Live)
- **Click:** Routes to `/projects/[id]` for full detail
- **Animation:** Slide-up on scroll, hover → card lifts + purple border glow

### 7. Contact

- **Layout:** Centered
- **Heading:** "Let's build something together."
- **CTA:** Large mailto button → `mailto:adarshpatel1122001@gmail.com`
- **Social links:** GitHub · LinkedIn · Twitter
- **No form** — mailto opens user's email client directly

---

## Blog Post Page (`/blog/[slug]`)

- Full blog content migrated from existing HTML files to TypeScript data
- Content rendered as JSX (or `dangerouslySetInnerHTML` for existing HTML content)
- Layout: constrained reading width (~700px), monospace body text
- Back link → `/blog`

---

## Project Detail Page (`/projects/[id]`)

- Full detail content migrated from existing `projects/*.html` files
- Sections: title, tech tags, summary, detailed description (HTML → JSX), GitHub + Live links
- Back link → `/#projects`

---

## Animations Summary

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero name | Typewriter (char by char) | On mount |
| Hero role | Fade in | After typewriter |
| Hero chips | Staggered float up | After role |
| All sections | Fade + slide up | `whileInView` scroll |
| Experience cards | Slide in from side | `whileInView` scroll |
| Blog cards | Staggered fade-in | `whileInView` scroll |
| Skill icons | Staggered pop-in | `whileInView` scroll |
| Card hover | Lift + border glow | `whileHover` |
| Page transition | Fade | Route change |
| Navbar | Frosted glass appears | On scroll |

---

## Mobile Responsiveness

- **Breakpoints:** Tailwind `sm` (640px), `md` (768px), `lg` (1024px)
- **Navbar:** Links hidden → hamburger → slide-in drawer
- **Hero:** Name scales down, chips wrap to 2–3 per row
- **Experience timeline:** Center line moves to left edge, all cards full-width stacked
- **Blog grid:** 2-col → 1-col on mobile
- **Skills grid:** 5-col → 3-col → 2-col
- **Projects grid:** 2-col → 1-col

---

## Data to Confirm

The following needs Adarsh to fill in before implementation:

1. **BrainyBeam logo image** — need a logo file added to `public/images/` before implementation
2. **Blog post dates & read times:** Actual publish dates for the 6 posts
3. **Blog category tags:** Confirm: RAG, LLM, FINE-TUNING, PERFORMANCE, SYSTEMS, DATABASE

---

## Out of Scope

- Backend / API routes (no server-side logic needed)
- Authentication
- CMS integration
- Comments system
- Analytics (can be added later via Vercel Analytics trivially)
