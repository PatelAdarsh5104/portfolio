'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { pageInfo } from '@/data/pageInfo'

const FULL_NAME = pageInfo.name
const TYPE_SPEED = 80

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [nameComplete, setNameComplete] = useState(false)
  const [showRole, setShowRole] = useState(false)
  const [showChips, setShowChips] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < FULL_NAME.length) {
        setDisplayed(FULL_NAME.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setNameComplete(true)
        setTimeout(() => setShowRole(true), 200)
        setTimeout(() => setShowChips(true), 500)
        setTimeout(() => setShowButtons(true), 800)
      }
    }, TYPE_SPEED)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--bg-primary) 100%)'
      }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-accent text-sm tracking-widest mb-6"
        >
          // hello world
        </motion.p>

        {/* Name with typewriter */}
        <h1 className="font-mono font-extrabold text-5xl sm:text-6xl md:text-7xl text-text-primary leading-tight tracking-tight mb-4">
          {displayed}
          <span
            className={`inline-block w-[3px] h-[0.9em] bg-accent ml-1 align-middle ${
              nameComplete ? 'animate-pulse' : ''
            }`}
          />
        </h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showRole ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-text-secondary text-sm tracking-[0.25em] uppercase mb-8"
        >
          {pageInfo.role}
        </motion.p>

        {/* Tech chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: showChips ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {pageInfo.chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: showChips ? 1 : 0, y: showChips ? 0 : 12 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 12 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#projects"
            className="font-mono text-sm font-bold bg-accent text-bg-primary px-6 py-3 rounded-md hover:opacity-90 transition-opacity tracking-wider"
          >
            View Projects
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-sm border border-border-custom text-text-secondary px-6 py-3 rounded-md hover:border-accent hover:text-accent transition-colors tracking-wider"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButtons ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="font-mono text-xs text-text-muted tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-6 bg-gradient-to-b from-text-muted to-transparent"
        />
      </motion.div>
    </section>
  )
}
