'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { skills } from '@/data/skills'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 bg-bg-card">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-3">// 04. SKILLS</p>
          <h2 className="font-mono font-extrabold text-3xl text-text-primary tracking-widest uppercase mb-12">
            Skills
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -3, borderColor: 'rgba(167,139,250,0.5)' }}
              className="bg-bg-primary border border-border-custom rounded-xl p-4 flex flex-col items-center gap-3 cursor-default transition-colors duration-200"
            >
              <div className="relative w-9 h-9">
                <Image
                  src={skill.icon}
                  alt={skill.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="font-mono text-[11px] text-text-secondary text-center leading-tight">
                {skill.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
