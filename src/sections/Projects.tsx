'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-3">// 03. PROJECTS</p>
          <h2 className="font-mono font-extrabold text-3xl text-text-primary tracking-widest uppercase mb-12">
            Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group bg-bg-card border border-border-custom rounded-xl overflow-hidden hover:border-accent/40 hover:shadow-[0_0_20px_rgba(167,139,250,0.1)] transition-all duration-300 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-44 bg-bg-elevated overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-mono font-bold text-base text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4 flex-1">
                    {project.summary}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-text-muted border border-border-custom px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Link
                      href={`/projects/${project.id}`}
                      className="font-mono text-xs text-accent hover:underline"
                    >
                      View Details →
                    </Link>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-text-muted hover:text-accent transition-colors ml-auto"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
