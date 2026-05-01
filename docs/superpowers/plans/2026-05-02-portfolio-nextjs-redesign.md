# Portfolio Next.js Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Adarsh Patel's vanilla HTML/CSS/JS portfolio to a Next.js 14 + TypeScript + Tailwind + Framer Motion site with dark/light theme, typewriter hero, alternating experience timeline, and blog/project routing.

**Architecture:** Next.js 14 App Router. All content in typed data files under `src/data/`. Sections are isolated client components under `src/sections/`. Blog and project detail pages are dynamic routes (`/blog/[slug]`, `/projects/[id]`) that look up data by slug/id. Theme is managed via a React context that toggles the `dark` class on `<html>`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3 (`darkMode: 'class'`), Framer Motion 11, JetBrains Mono via `next/font/google`

---

## File Map

| File | Responsibility |
|------|---------------|
| `tailwind.config.ts` | Custom colors, font, dark mode class |
| `src/app/globals.css` | CSS variables for light/dark, Tailwind base |
| `src/app/layout.tsx` | Root layout: font, ThemeProvider, Navbar, Footer |
| `src/app/page.tsx` | Home: all 7 sections stacked |
| `src/app/blog/page.tsx` | Full blog list |
| `src/app/blog/[slug]/page.tsx` | Blog post detail |
| `src/app/projects/[id]/page.tsx` | Project detail |
| `src/context/ThemeContext.tsx` | Dark/light state + toggle, persists to localStorage |
| `src/components/Navbar.tsx` | Sticky frosted nav, hamburger mobile drawer |
| `src/components/Footer.tsx` | Social links, copyright |
| `src/components/ThemeToggle.tsx` | Sun/moon button, reads ThemeContext |
| `src/components/ScrollReveal.tsx` | Framer Motion `whileInView` wrapper |
| `src/sections/Hero.tsx` | Typewriter name, grid bg, chips, CTA buttons |
| `src/sections/About.tsx` | Bio paragraph with scroll reveal |
| `src/sections/Experience.tsx` | Alternating left/right timeline |
| `src/sections/Projects.tsx` | 2-col project card grid |
| `src/sections/Skills.tsx` | Icon grid, staggered pop-in |
| `src/sections/BlogPreview.tsx` | 2-col compact blog card grid |
| `src/sections/Contact.tsx` | Mailto CTA + social links |
| `src/data/pageInfo.ts` | Name, role, bio, email, phone, location |
| `src/data/experiences.ts` | 4 experience entries |
| `src/data/skills.ts` | 20 skill entries |
| `src/data/projects.ts` | 4 project entries with id/slug |
| `src/data/blogs.ts` | 6 blog entries with slug + HTML content |
| `public/images/` | All images moved from `images/` |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Run create-next-app in the project root**

```bash
cd D:/code/personal-portfolio
npx create-next-app@latest . --typescript --tailwind --app --src-dir --eslint --import-alias "@/*" --yes
```

When prompted about existing files, type `y` to continue. This creates the Next.js scaffold alongside the existing HTML files.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Move images to public/**

```bash
cp -r images public/images
```

Verify `public/images/python-logo.png` exists.

- [ ] **Step 4: Replace tailwind.config.ts with custom theme**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-card': 'var(--bg-card)',
        'bg-elevated': 'var(--bg-elevated)',
        'border-custom': 'var(--border-custom)',
        accent: '#a78bfa',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Replace src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #ffffff;
  --bg-card: #f5f3ff;
  --bg-elevated: #ede9fe;
  --border-custom: #ddd6fe;
  --text-primary: #111111;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;
}

.dark {
  --bg-primary: #0a080f;
  --bg-card: #120e1c;
  --bg-elevated: #1e1a2e;
  --border-custom: #2a2040;
  --text-primary: #f1f0ff;
  --text-secondary: #6b7280;
  --text-muted: #4b5563;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js dev server at `http://localhost:3000` with no errors.

- [ ] **Step 7: Commit scaffold**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 with Tailwind + Framer Motion"
```

---

## Task 2: Theme Context + Toggle

**Files:**
- Create: `src/context/ThemeContext.tsx`
- Create: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: Create ThemeContext**

```tsx
// src/context/ThemeContext.tsx
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const initial = saved ?? 'dark'
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

- [ ] **Step 2: Create ThemeToggle component**

```tsx
// src/components/ThemeToggle.tsx
'use client'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-[var(--text-secondary)] hover:text-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/context/ThemeContext.tsx src/components/ThemeToggle.tsx
git commit -m "feat: add theme context and toggle component"
```

---

## Task 3: Data Files

**Files:**
- Create: `src/data/pageInfo.ts`
- Create: `src/data/experiences.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/blogs.ts`

- [ ] **Step 1: Create pageInfo.ts**

```ts
// src/data/pageInfo.ts
export const pageInfo = {
  name: 'Adarsh Patel',
  role: 'AI SOFTWARE ENGINEER',
  backgroundInformation: `Innovative software developer with extensive experience in Python, RAG, Langchain, LangGraph, and Spacy, complemented by strong proficiency in deep learning frameworks such as PyTorch. I specialize in creating AI-driven solutions that enhance system accuracy and transform user experiences. My work spans developing and fine-tuning custom NLP models—including BERT for sentiment analysis and category suggestion—and implementing retrieval-augmented generation systems that drive user engagement and operational efficiency.

I have built scalable backend APIs with FastAPI and deployed applications on Azure, leveraging tools like SQL and OpenAI to deliver robust, enterprise-grade solutions. A highlight of my career is designing an AI-powered Math Chat Agent that simplifies advanced mathematical concepts into clear, step-by-step explanations for students and parents.

Passionate about integrating innovative technologies and streamlining data processes, I continuously seek to push the boundaries of AI and machine learning to deliver tangible business value and superior user experiences.`,
  email: 'adarshpatel1122001@gmail.com',
  phone: '+91 8866839123',
  location: 'India',
  github: 'https://github.com/PatelAdarsh5104',
  linkedin: 'https://www.linkedin.com/in/pateladarsh57/',
  twitter: 'https://x.com/AdarshP85421702',
  heroChips: ['Python', 'LLMs', 'RAG', 'LangChain', 'FastAPI'],
}
```

- [ ] **Step 2: Create experiences.ts**

```ts
// src/data/experiences.ts
export interface Experience {
  company: string
  jobTitle: string
  dateStarted: string
  dateEnded: string
  logo: string
  points: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Armakuni PVT',
    jobTitle: 'AI Software Engineer',
    dateStarted: 'MAY 2025',
    dateEnded: 'PRESENT',
    logo: '/images/Armakuni_logo.avif',
    points: [
      'Improved cooking time prediction accuracy by 19% through a custom algorithm',
      'Built automated pipeline for recipe generation and video production using Luma AI and Veo, reducing manual effort by 40%',
      'Fine-tuned and deployed LLMs on AWS SageMaker, increasing accuracy from 54% to 86%',
      'Architected a scalable multi-agent system with Claude Agent SDK, Amazon Neptune and OpenSearch, boosting tool-calling accuracy by 44%',
      'Implemented event-driven workflows with AWS EventBridge and Lambda, cutting manual work by 60%',
    ],
    technologies: ['AWS', 'SageMaker', 'Lambda', 'LLM', 'Claude SDK', 'OpenSearch', 'Neptune'],
  },
  {
    company: 'GenAI Novuscode Softtech Pvt Ltd',
    jobTitle: 'AI/ML Developer',
    dateStarted: 'SEP 2023',
    dateEnded: 'MAY 2025',
    logo: '/images/Novuscodelogo.png',
    points: [
      'Developed robust backend APIs using FastAPI and deployed scalable web applications on Azure',
      'Engineered and fine-tuned custom NLP models using BERT and Hugging Face',
      'Leveraged LangGraph to develop multi-agent workflows',
      'Developed an AI-powered Math Chat Agent for students and parents',
    ],
    technologies: ['Python', 'FastAPI', 'Azure', 'LangChain', 'PyTorch', 'BERT', 'HuggingFace', 'RAG'],
  },
  {
    company: 'PHPDots Technologies (Tuvoc Technologies)',
    jobTitle: 'Backend Developer Intern',
    dateStarted: 'FEB 2023',
    dateEnded: 'JUN 2023',
    logo: '/images/phpdotslogo.webp',
    points: [
      'Developed backend APIs using Python and FastAPI',
      'Implemented user authentication and role-based access control',
      'Gained hands-on experience with asynchronous programming using Redis',
    ],
    technologies: ['Python', 'FastAPI', 'Redis', 'Django', 'PostgreSQL'],
  },
  {
    company: 'BrainyBeam Technologies Pvt. Ltd.',
    jobTitle: 'Python Development Intern',
    dateStarted: 'FEB 2022',
    dateEnded: 'MAR 2022',
    logo: '/images/brainybeam-logo.png',
    points: [
      'Completed hands-on Python training covering syntax, data types, operators, control flow, and data structures',
      'Built functions and made HTTP requests using the Requests library; performed numerical computation with NumPy',
      'Strengthened version control skills with GitHub and developed problem-solving and teamwork abilities',
    ],
    technologies: ['Python', 'NumPy', 'Requests', 'GitHub'],
  },
]
```

- [ ] **Step 3: Create skills.ts**

```ts
// src/data/skills.ts
export interface Skill {
  title: string
  icon: string
}

export const skills: Skill[] = [
  { title: 'Python', icon: '/images/python-logo.png' },
  { title: 'FastAPI', icon: '/images/Fastapi-logo.png' },
  { title: 'Django', icon: '/images/django-logo.png' },
  { title: 'Flask', icon: '/images/flask-logo.png' },
  { title: 'LLM', icon: '/images/LLM-logo.webp' },
  { title: 'HuggingFace', icon: '/images/hf-logo.svg' },
  { title: 'NLP', icon: '/images/nlp logo.webp' },
  { title: 'TensorFlow', icon: '/images/TensorFlow_logo.png' },
  { title: 'PyTorch', icon: '/images/Pytorch_logo.png' },
  { title: 'OpenCV', icon: '/images/OpenCV_logo.png' },
  { title: 'LangChain', icon: '/images/langchain-logo.png' },
  { title: 'LangGraph', icon: '/images/langgraph-logo.png' },
  { title: 'Azure', icon: '/images/azure-logo.jpg' },
  { title: 'AWS', icon: '/images/AWS-logo.png' },
  { title: 'MySQL', icon: '/images/mysql-logo.svg' },
  { title: 'Pinecone', icon: '/images/pinecone-logo.png' },
  { title: 'Chroma DB', icon: '/images/chroma-logo.png' },
  { title: 'Git', icon: '/images/Git-Logo.png' },
  { title: 'GitHub', icon: '/images/github.png' },
  { title: 'Streamlit', icon: '/images/streamlit-images.png' },
]
```

- [ ] **Step 4: Create projects.ts**

```ts
// src/data/projects.ts
export interface Project {
  id: string
  title: string
  image: string
  summary: string
  detailDescription: string
  technologies: string[]
  link: string
  github: string
}

export const projects: Project[] = [
  {
    id: 'voice-assistant',
    title: 'Voice AI Assistant',
    image: '/images/voice_assistant.jpg',
    summary: 'Real-time Voice AI Agent with a streaming STT-LLM-TTS pipeline and 70% latency reduction. Features Gmail MCP integration for agentic voice-controlled email management.',
    detailDescription: `<ul>
      <li><strong>Streaming Pipeline Architecture:</strong> Engineered a low-latency, full-duplex voice interaction system utilizing a synchronized STT → LLM → TTS pipeline over WebSockets, integrating Groq Whisper for sub-second transcription and ElevenLabs for neural speech synthesis.</li>
      <li><strong>Latency Optimization:</strong> Achieved a ~70% reduction in Time-to-First-Byte (TTFB) for audio responses (from 10s to ~2s) by implementing chunked stream parallelization and batching LLM token streams for concurrent TTS synthesis.</li>
      <li><strong>Agentic MCP Integration:</strong> Pioneered the use of the Model Context Protocol (MCP) to expose a Gmail Server to the LLM, enabling autonomous agentic operations such as voice-driven inbox summarization, semantic email search, and automated drafting.</li>
      <li><strong>Advanced Frontend Orchestration:</strong> Developed a robust React + TypeScript client featuring a custom FIFO sequential audio queue and Web Audio API integration to handle non-blocking, real-time playback of fragmented MP3 chunks.</li>
      <li><strong>Scalable Backend Design:</strong> Built a high-concurrency FastAPI backend incorporating LangChain for stateful session management, conversational memory persistence, and an event-driven JSON protocol for real-time monitoring.</li>
    </ul>`,
    technologies: ['Groq Whisper', 'LLaMA 3.1', 'ElevenLabs', 'MCP', 'WebSockets', 'React', 'TypeScript', 'LangChain'],
    link: '',
    github: 'https://github.com/PatelAdarsh5104/voiceagent',
  },
  {
    id: 'spam-detection',
    title: 'SMS & Email Spam Detection',
    image: '/images/Email_spam_project.png',
    summary: 'Spam SMS Classifier using machine learning. Achieved 97% accuracy using Naive Bayes algorithm. Deployed as a web application using FastAPI and Streamlit.',
    detailDescription: `<p>This project involves building a robust SMS and Email Spam Detection system. It utilizes the SMS Spam Collection Dataset from Kaggle. The pipeline includes comprehensive data preprocessing (tokenization, stopword removal, stemming), feature engineering using TF-IDF vectorization, and model selection.</p>
    <p>After evaluating several algorithms, Multinomial Naive Bayes was chosen for its high accuracy of 97% and precision. The final model is deployed as an interactive web application using FastAPI for the backend and Streamlit for the frontend.</p>`,
    technologies: ['Python', 'ML', 'Naive Bayes', 'FastAPI', 'Streamlit', 'EDA'],
    link: 'https://mlprojectdemo.streamlit.app/',
    github: 'https://github.com/PatelAdarsh5104/SMS-Spam-Classifier',
  },
  {
    id: 'resume-matching',
    title: 'Resume & Job Description Matching',
    image: '/images/resume_match_project.png',
    summary: 'AI-powered resume analyzer using Groq LLM (Llama 3) that matches resumes with job descriptions. Features ATS optimization suggestions.',
    detailDescription: `<p>An advanced AI-powered recruitment tool that bridges the gap between candidates and job descriptions. Leveraging the Groq Llama 3-8B model, the system analyzes resumes against specific job requirements.</p>
    <p>Key features include semantic similarity matching, ATS score calculation, keyword gap analysis, and personalized suggestions for resume optimization. The application is built with a Streamlit interface for seamless document upload and real-time analysis.</p>`,
    technologies: ['Python', 'GenAI', 'FastAPI', 'Streamlit', 'LLM', 'Groq'],
    link: 'https://resumematchfinder.streamlit.app/',
    github: 'https://github.com/PatelAdarsh5104/Resume-Analyzer',
  },
  {
    id: 'botai',
    title: 'BotAI',
    image: '/images/botai_project.png',
    summary: 'A versatile platform for creating custom AI bots with unique categories, features, and tools. Each bot maintains its own chat history.',
    detailDescription: `<p>BotAI is a sophisticated multi-agent platform that allows users to create, personalize, and manage their own AI bots. Each bot can be assigned specific categories (e.g., Coding Assistant, Creative Writer) and equipped with specialized tools.</p>
    <p>The architecture supports isolated chat histories for each bot, enabling distinct and context-aware interactions. Built with a FastAPI backend and a robust SQL database for session and bot management, it offers a scalable solution for diverse AI needs.</p>`,
    technologies: ['Python', 'GenAI', 'FastAPI', 'SQL'],
    link: 'https://botai-krfx.onrender.com/',
    github: 'https://github.com/PatelAdarsh5104/BotAI',
  },
]
```

- [ ] **Step 5: Create blogs.ts**

```ts
// src/data/blogs.ts
export interface Blog {
  slug: string
  title: string
  category: string
  summary: string
  date: string
  readTime: string
  content: string // raw HTML from existing blog files
}

export const blogs: Blog[] = [
  {
    slug: 'rag',
    title: 'Retrieval-Augmented Generation (RAG) Explained',
    category: 'RAG',
    summary: 'A deep dive into how RAG works, why it outperforms pure LLMs for knowledge-intensive tasks, and how to build one from scratch.',
    date: 'April 2024',
    readTime: '8 min read',
    content: '', // TODO: paste inner HTML content from blogs/rag.html <main> tag
  },
  {
    slug: 'llm',
    title: 'How Large Language Models Actually Work',
    category: 'LLM',
    summary: 'Breaking down transformers, attention mechanisms, and the training process behind LLMs — explained for engineers who want to understand the internals.',
    date: '2024',
    readTime: '10 min read',
    content: '', // TODO: paste inner HTML content from blogs/llm.html <main> tag
  },
  {
    slug: 'finetuning',
    title: 'Fine-Tuning LLMs: A Practical Guide',
    category: 'FINE-TUNING',
    summary: 'When to fine-tune vs. prompt engineer, how to prepare datasets, and lessons from fine-tuning models on AWS SageMaker for production.',
    date: '2024',
    readTime: '12 min read',
    content: '', // TODO: paste inner HTML content from blogs/finetuning.html <main> tag
  },
  {
    slug: 'kv-cache',
    title: 'Reducing LLM Latency: KV Cache & Beyond',
    category: 'PERFORMANCE',
    summary: 'How KV caching works under the hood and how to cut inference latency by 60–70% without sacrificing quality.',
    date: '2024',
    readTime: '7 min read',
    content: '', // TODO: paste inner HTML content from blogs/kv-cache.html <main> tag
  },
  {
    slug: 'latency',
    title: 'Latency in AI Pipelines: What Slows You Down',
    category: 'SYSTEMS',
    summary: 'Where latency hides in STT→LLM→TTS pipelines and how to profile, parallelize, and optimize for real-time AI.',
    date: '2024',
    readTime: '6 min read',
    content: '', // TODO: paste inner HTML content from blogs/latency.html <main> tag
  },
  {
    slug: 'postgresql-locking',
    title: 'PostgreSQL Locking: A Developer\'s Guide',
    category: 'DATABASE',
    summary: 'Row-level vs. table-level locks, deadlock detection, and designing schemas that avoid contention in high-concurrency apps.',
    date: '2024',
    readTime: '9 min read',
    content: '', // TODO: paste inner HTML content from blogs/postgresql-locking.html <main> tag
  },
]

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find(b => b.slug === slug)
}
```

- [ ] **Step 6: Commit data files**

```bash
git add src/data/
git commit -m "feat: add typed data files for pageInfo, experiences, skills, projects, blogs"
```

---

## Task 4: Root Layout + Navbar + Footer + ScrollReveal

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Update root layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Adarsh Patel — AI Software Engineer',
  description: 'Portfolio of Adarsh Patel, AI Software Engineer specializing in LLMs, RAG, LangChain, and FastAPI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} font-mono bg-bg-primary text-[var(--text-primary)]`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create Navbar**

```tsx
// src/components/Navbar.tsx
'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { pageInfo } from '@/data/pageInfo'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-custom)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-accent font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
          AP.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[var(--text-muted)] hover:text-accent transition-colors text-sm tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href={`mailto:${pageInfo.email}`}
            className="bg-accent text-[#0a080f] px-4 py-2 rounded-md text-sm font-bold hover:bg-accent/90 transition-colors tracking-wide"
          >
            GET IN TOUCH
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[var(--text-secondary)] p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-custom)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[var(--text-secondary)] hover:text-accent transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${pageInfo.email}`}
            className="bg-accent text-[#0a080f] px-4 py-2 rounded-md text-sm font-bold text-center"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Create Footer**

```tsx
// src/components/Footer.tsx
import { pageInfo } from '@/data/pageInfo'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-custom)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[var(--text-muted)] text-xs">
          © {new Date().getFullYear()} Adarsh Patel. Built with Next.js.
        </p>
        <div className="flex items-center gap-6">
          <a href={pageInfo.github} target="_blank" rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs">GitHub</a>
          <a href={pageInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs">LinkedIn</a>
          <a href={pageInfo.twitter} target="_blank" rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs">Twitter</a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Create ScrollReveal**

```tsx
// src/components/ScrollReveal.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
}

export default function ScrollReveal({ children, delay = 0, direction = 'up', className }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 40 : 0,
        x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 5: Verify layout renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Navbar with "AP." logo visible, no console errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/components/
git commit -m "feat: add root layout, Navbar, Footer, ScrollReveal"
```

---

## Task 5: Hero Section

**Files:**
- Create: `src/sections/Hero.tsx`

- [ ] **Step 1: Create Hero with typewriter animation**

```tsx
// src/sections/Hero.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { pageInfo } from '@/data/pageInfo'

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [nameComplete, setNameComplete] = useState(false)
  const [showRole, setShowRole] = useState(false)
  const [showChips, setShowChips] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < pageInfo.name.length) {
        setDisplayed(pageInfo.name.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setNameComplete(true)
        setTimeout(() => setShowRole(true), 200)
        setTimeout(() => setShowChips(true), 500)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-accent text-sm mb-4 tracking-widest"
        >
          // hello world
        </motion.p>

        {/* Typewriter name */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight mb-3 leading-none">
          {displayed}
          <span
            className="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle"
            style={{ animation: nameComplete ? 'blink 1s step-end infinite' : 'none' }}
          />
        </h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showRole ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[var(--text-muted)] text-sm tracking-[0.3em] mb-6 uppercase"
        >
          {pageInfo.role}
        </motion.p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {pageInfo.heroChips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 15 }}
              animate={showChips ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-custom)] text-accent px-3 py-1 rounded-full text-xs"
            >
              {chip}
            </motion.span>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showChips ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="#projects"
            className="bg-accent text-[#0a080f] px-6 py-3 rounded-md font-bold text-sm hover:bg-accent/90 transition-colors"
          >
            View Projects
          </a>
          <a
            href={`mailto:${pageInfo.email}`}
            className="border border-[var(--border-custom)] text-[var(--text-secondary)] px-6 py-3 rounded-md font-bold text-sm hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to home page temporarily to verify**

```tsx
// src/app/page.tsx
import Hero from '@/sections/Hero'

export default function Home() {
  return <Hero />
}
```

- [ ] **Step 3: Run dev and verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Name types out character by character, cursor blinks, role fades in, chips float up, grid background visible.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with typewriter animation"
```

---

## Task 6: About Section

**Files:**
- Create: `src/sections/About.tsx`

- [ ] **Step 1: Create About**

```tsx
// src/sections/About.tsx
import ScrollReveal from '@/components/ScrollReveal'
import { pageInfo } from '@/data/pageInfo'

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-accent text-xs tracking-[0.3em] mb-3">// 01. ABOUT</p>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-widest mb-10 uppercase">
            About Me
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="space-y-5">
            {pageInfo.backgroundInformation.split('\n\n').map((para, i) => (
              <p key={i} className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {para}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/About.tsx
git commit -m "feat: add About section"
```

---

## Task 7: Experience Timeline

**Files:**
- Create: `src/sections/Experience.tsx`

- [ ] **Step 1: Create Experience with alternating timeline**

```tsx
// src/sections/Experience.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experiences } from '@/data/experiences'
import Image from 'next/image'

function ExperienceCard({ exp, side, index }: {
  exp: typeof experiences[0]
  side: 'left' | 'right'
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isRight = side === 'right'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-[var(--bg-card)] border border-[var(--border-custom)] rounded-xl p-6 hover:border-accent/30 transition-colors"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-8 h-8 flex-shrink-0 mt-1">
          <Image
            src={exp.logo}
            alt={exp.company}
            fill
            className="object-contain rounded"
            onError={() => {}}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-accent text-xs font-mono">
              {exp.dateStarted} — {exp.dateEnded}
            </span>
            {exp.dateEnded === 'PRESENT' && (
              <span className="bg-accent/10 border border-accent/30 text-accent text-[10px] px-2 py-0.5 rounded-full">
                ● CURRENT
              </span>
            )}
          </div>
          <h3 className="text-[var(--text-primary)] font-bold text-base mt-1">{exp.jobTitle}</h3>
          <p className="text-accent text-xs mt-0.5">{exp.company}</p>
        </div>
      </div>

      <ul className="space-y-2 mb-4 mt-4">
        {exp.points.map((point, i) => (
          <li key={i} className="text-[var(--text-secondary)] text-xs leading-relaxed flex gap-2">
            <span className="text-accent mt-0.5 flex-shrink-0">→</span>
            {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {exp.technologies.map(tech => (
          <span
            key={tech}
            className="border border-[var(--border-custom)] text-[var(--text-muted)] px-2 py-0.5 rounded text-[10px]"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const sides: ('right' | 'left')[] = ['right', 'left', 'right', 'left']

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-[0.3em] mb-3">// 02. EXPERIENCE</p>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-widest uppercase">
            Where I&apos;ve Worked
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(167,139,250,0.27) 10%, rgba(167,139,250,0.27) 90%, transparent)',
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const side = sides[i]
              return (
                <div key={exp.company} className="relative flex items-start">
                  {/* Desktop: spacer for left side */}
                  {side === 'right' && <div className="hidden md:block w-1/2" />}

                  {/* Center dot */}
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-accent z-10 hidden md:block"
                    style={{ boxShadow: '0 0 12px #a78bfa99' }}
                  />

                  {/* Card */}
                  <div className={`w-full md:w-1/2 ${side === 'right' ? 'md:pl-8' : 'md:pr-8'}`}>
                    <ExperienceCard exp={exp} side={side} index={i} />
                  </div>

                  {/* Desktop: spacer for right side */}
                  {side === 'left' && <div className="hidden md:block w-1/2" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Experience.tsx
git commit -m "feat: add Experience alternating timeline section"
```

---

## Task 8: Projects Section

**Files:**
- Create: `src/sections/Projects.tsx`

- [ ] **Step 1: Create Projects section**

```tsx
// src/sections/Projects.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block bg-[var(--bg-card)] border border-[var(--border-custom)] rounded-xl overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
        style={{ boxShadow: undefined }}
      >
        {/* Image */}
        <div className="relative h-44 bg-[var(--bg-elevated)] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <h3 className="text-[var(--text-primary)] font-bold text-base mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-4 line-clamp-3">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 5).map(tech => (
              <span
                key={tech}
                className="border border-[var(--border-custom)] text-[var(--text-muted)] px-2 py-0.5 rounded text-[10px]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-xs">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-[var(--text-muted)] hover:text-accent transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-[var(--text-muted)] hover:text-accent transition-colors"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-[0.3em] mb-3">// 03. PROJECTS</p>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-widest uppercase">
            Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Projects.tsx
git commit -m "feat: add Projects section with card grid"
```

---

## Task 9: Skills Section

**Files:**
- Create: `src/sections/Skills.tsx`

- [ ] **Step 1: Create Skills section**

```tsx
// src/sections/Skills.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { skills } from '@/data/skills'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 px-6 bg-[var(--bg-card)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-[0.3em] mb-3">// 04. SKILLS</p>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-widest uppercase">
            Skills
          </h2>
        </div>
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-custom)] rounded-xl p-4 flex flex-col items-center gap-2 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={skill.icon}
                  alt={skill.title}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[var(--text-secondary)] text-[11px] text-center leading-tight">
                {skill.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Skills.tsx
git commit -m "feat: add Skills icon grid section"
```

---

## Task 10: Blog Preview Section

**Files:**
- Create: `src/sections/BlogPreview.tsx`

- [ ] **Step 1: Create BlogPreview**

```tsx
// src/sections/BlogPreview.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { blogs } from '@/data/blogs'

function BlogCard({ blog, index }: { blog: typeof blogs[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${blog.slug}`}
        className="group block bg-[var(--bg-card)] border border-[var(--border-custom)] rounded-xl p-5 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 h-full"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[var(--bg-elevated)] border border-[var(--border-custom)] text-[var(--text-muted)] px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest">
            {blog.category}
          </span>
          <span className="text-[var(--text-muted)] group-hover:text-accent transition-colors text-sm">↗</span>
        </div>
        <h3 className="text-[var(--text-primary)] font-bold text-sm mb-2 leading-snug group-hover:text-accent transition-colors">
          {blog.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-4 line-clamp-3">
          {blog.summary}
        </p>
        <div className="flex items-center gap-4 text-[var(--text-muted)] text-[10px]">
          <span>{blog.date}</span>
          <span>◷ {blog.readTime}</span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogPreview() {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent text-xs tracking-[0.3em] mb-3">// 05. BLOG</p>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-widest uppercase">
            Writing & Thinking
          </h2>
          <p className="text-[var(--text-muted)] text-xs mt-3">
            Thoughts on AI engineering, LLMs, and building intelligent systems.
          </p>
        </div>

        {/* Inset grid with breathing room */}
        <div className="max-w-[82%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="border border-[var(--border-custom)] text-accent px-6 py-2.5 rounded-md text-xs hover:bg-accent/10 transition-colors inline-block"
            >
              → View all posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/BlogPreview.tsx
git commit -m "feat: add BlogPreview section with compact 2-col grid"
```

---

## Task 11: Contact Section

**Files:**
- Create: `src/sections/Contact.tsx`

- [ ] **Step 1: Create Contact**

```tsx
// src/sections/Contact.tsx
import ScrollReveal from '@/components/ScrollReveal'
import { pageInfo } from '@/data/pageInfo'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[var(--bg-card)]">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-accent text-xs tracking-[0.3em] mb-3">// 06. CONTACT</p>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-widest uppercase mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-10">
            Let&apos;s build something together.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <a
            href={`mailto:${pageInfo.email}`}
            className="inline-flex items-center gap-2 bg-accent text-[#0a080f] px-8 py-4 rounded-lg font-bold text-sm hover:bg-accent/90 transition-colors mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {pageInfo.email}
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex items-center justify-center gap-8">
            <a href={pageInfo.github} target="_blank" rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs tracking-widest">
              GitHub
            </a>
            <a href={pageInfo.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs tracking-widest">
              LinkedIn
            </a>
            <a href={pageInfo.twitter} target="_blank" rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs tracking-widest">
              Twitter
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Contact.tsx
git commit -m "feat: add Contact section with mailto CTA"
```

---

## Task 12: Assemble Home Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Wire all sections into page.tsx**

```tsx
// src/app/page.tsx
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import BlogPreview from '@/sections/BlogPreview'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <BlogPreview />
      <Contact />
    </>
  )
}
```

- [ ] **Step 2: Run dev and do full visual walkthrough**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll through all sections and verify:
- Hero: typewriter works, grid background visible, chips animate
- About: text fades in on scroll
- Experience: 4 cards alternate left/right on desktop, center line visible
- Projects: 2-col grid, images load, hover lifts card
- Skills: 5-col grid on desktop, icons pop in staggered
- Blog: compact 2-col cards, inset from edges
- Contact: mailto button, social links

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

## Task 13: Blog List Page

**Files:**
- Create: `src/app/blog/page.tsx`

- [ ] **Step 1: Create blog list page**

```tsx
// src/app/blog/page.tsx
import Link from 'next/link'
import { blogs } from '@/data/blogs'

export const metadata = {
  title: 'Blog — Adarsh Patel',
  description: 'Thoughts on AI engineering, LLMs, RAG, and building intelligent systems.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-accent text-xs tracking-[0.3em] mb-3">// BLOG</p>
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] tracking-widest uppercase mb-4">
          Writing & Thinking
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mb-16">
          Thoughts on AI engineering, LLMs, and building intelligent systems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogs.map(blog => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group bg-[var(--bg-card)] border border-[var(--border-custom)] rounded-xl p-5 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="bg-[var(--bg-elevated)] border border-[var(--border-custom)] text-[var(--text-muted)] px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest">
                  {blog.category}
                </span>
                <span className="text-[var(--text-muted)] group-hover:text-accent transition-colors text-sm">↗</span>
              </div>
              <h2 className="text-[var(--text-primary)] font-bold text-sm mb-2 leading-snug group-hover:text-accent transition-colors">
                {blog.title}
              </h2>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-4 flex-1">
                {blog.summary}
              </p>
              <div className="flex items-center gap-4 text-[var(--text-muted)] text-[10px]">
                <span>{blog.date}</span>
                <span>◷ {blog.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat: add blog list page"
```

---

## Task 14: Blog Detail Page

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Migrate HTML content into blogs.ts**

For each blog, open the corresponding HTML file and copy the inner content of the `<main>` or `<div class="blog-post-content">` element into the `content` field in `src/data/blogs.ts`. 

For example, for `blogs/rag.html`, copy everything inside the `<div class="blog-post-content">` tag and paste it as the `content` string for the `rag` entry.

- [ ] **Step 2: Create blog detail page**

```tsx
// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogs, getBlogBySlug } from '@/data/blogs'

export async function generateStaticParams() {
  return blogs.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug)
  if (!blog) return {}
  return { title: `${blog.title} — Adarsh Patel`, description: blog.summary }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug)
  if (!blog) notFound()

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs mb-10 inline-flex items-center gap-1"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <div className="mt-6 mb-10 pb-6 border-b border-[var(--border-custom)]">
          <span className="bg-[var(--bg-elevated)] border border-[var(--border-custom)] text-[var(--text-muted)] px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest mb-4 inline-block">
            {blog.category}
          </span>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight mt-3 mb-3">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-[var(--text-muted)] text-xs">
            <span>{blog.date}</span>
            <span>◷ {blog.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose-custom text-[var(--text-secondary)] text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Add prose styles for blog content to globals.css**

```css
/* Append to src/app/globals.css */
.prose-custom h2 {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  color: #a78bfa;
}
.prose-custom p { margin-bottom: 1.2rem; }
.prose-custom ul { padding-left: 1.5rem; margin-bottom: 1.2rem; }
.prose-custom li { margin-bottom: 0.5rem; }
.prose-custom strong { color: var(--text-primary); }
.prose-custom code {
  background: var(--bg-elevated);
  border: 1px solid var(--border-custom);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/blog/ src/data/blogs.ts src/app/globals.css
git commit -m "feat: add blog detail page with HTML content rendering"
```

---

## Task 15: Project Detail Page

**Files:**
- Create: `src/app/projects/[id]/page.tsx`

- [ ] **Step 1: Create project detail page**

```tsx
// src/app/projects/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/data/projects'

export async function generateStaticParams() {
  return projects.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id)
  if (!project) return {}
  return { title: `${project.title} — Adarsh Patel`, description: project.summary }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id)
  if (!project) notFound()

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#projects"
          className="text-[var(--text-muted)] hover:text-accent transition-colors text-xs mb-10 inline-flex items-center gap-1"
        >
          ← Back to Projects
        </Link>

        <div className="mt-6">
          {/* Project image */}
          <div className="relative h-56 rounded-xl overflow-hidden bg-[var(--bg-elevated)] mb-8">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">{project.title}</h1>

          {/* Links */}
          <div className="flex gap-4 mb-6">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="border border-[var(--border-custom)] text-[var(--text-muted)] hover:text-accent hover:border-accent px-4 py-2 rounded-md text-xs transition-colors">
                GitHub ↗
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="bg-accent text-[#0a080f] px-4 py-2 rounded-md text-xs font-bold hover:bg-accent/90 transition-colors">
                Live Demo ↗
              </a>
            )}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-[var(--border-custom)]">
            {project.technologies.map(tech => (
              <span key={tech}
                className="border border-[var(--border-custom)] text-[var(--text-muted)] px-3 py-1 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>

          {/* Summary */}
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">{project.summary}</p>

          {/* Detail description */}
          <div
            className="prose-custom text-[var(--text-secondary)] text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.detailDescription }}
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/
git commit -m "feat: add project detail page"
```

---

## Task 16: Cleanup Old Files + next.config

**Files:**
- Modify: `next.config.ts`
- Delete: `index.html`, `styles.css`, `script.js`, `blog.html`, `blogs/*.html`, `projects/*.html`

- [ ] **Step 1: Update next.config.ts to allow external image domains if needed**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // for Vercel free tier with many images
  },
}

export default nextConfig
```

- [ ] **Step 2: Delete old HTML/CSS/JS files**

```bash
cd D:/code/personal-portfolio
rm index.html styles.css script.js blog.html
rm -rf blogs/ projects/
```

Verify `public/images/` still exists with all image files.

- [ ] **Step 3: Verify full build passes**

```bash
npm run build
```

Expected: Build completes with no errors. All routes shown in output.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: remove old HTML files, finalize Next.js portfolio"
```

---

## Task 17: Vercel Deploy

- [ ] **Step 1: Push to GitHub**

```bash
git push origin master
```

- [ ] **Step 2: Update Vercel Framework setting**

In Vercel dashboard:
1. Go to your project → Settings → General
2. Find "Framework Preset"
3. Change from **"Other"** → **"Next.js"**
4. Click Save

- [ ] **Step 3: Trigger redeploy**

In Vercel dashboard → Deployments → click "Redeploy" on the latest commit, or push a new commit.

- [ ] **Step 4: Verify production**

Open your Vercel URL. Check:
- Hero typewriter animates
- Dark mode toggle works and persists on refresh
- `/blog` lists all 6 posts
- `/blog/rag` renders the post content
- `/projects/voice-assistant` renders project detail
- Mobile: navbar hamburger opens drawer, experience stacks single-column
