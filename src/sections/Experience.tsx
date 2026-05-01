import ScrollReveal from '@/components/ScrollReveal'
import { experiences } from '@/data/experiences'
import Image from 'next/image'

const sides = ['right', 'left', 'right', 'left'] as const

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-bg-card">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-3 text-center">// 02. EXPERIENCE</p>
          <h2 className="font-mono font-extrabold text-3xl text-text-primary tracking-widest uppercase mb-16 text-center">
            Where I&apos;ve Worked
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line — hidden on mobile */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(167,139,250,0.3) 8%, rgba(167,139,250,0.3) 92%, transparent)',
            }}
          />

          {/* Mobile left line */}
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(167,139,250,0.3) 8%, rgba(167,139,250,0.3) 92%, transparent)',
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, i) => {
              const side = sides[i % 4]
              const isRight = side === 'right'

              return (
                <div key={exp.company} className="relative flex items-start">
                  {/* Dot on center line */}
                  <div
                    className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-accent z-10"
                    style={{ boxShadow: '0 0 12px rgba(167,139,250,0.6)' }}
                  />
                  {/* Mobile dot */}
                  <div
                    className="md:hidden absolute left-4 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-accent z-10 flex-shrink-0"
                    style={{ boxShadow: '0 0 12px rgba(167,139,250,0.6)' }}
                  />

                  {/* Spacer for alternating */}
                  {isRight && <div className="hidden md:block w-1/2" />}

                  {/* Card */}
                  <ScrollReveal
                    direction={isRight ? 'right' : 'left'}
                    delay={0.1}
                    className={`w-full md:w-1/2 pl-10 md:pl-0 ${
                      isRight ? 'md:pl-10' : 'md:pr-10'
                    }`}
                  >
                    <div className="bg-bg-primary border border-border-custom rounded-xl p-6 hover:border-accent/40 transition-colors duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 relative flex-shrink-0 rounded overflow-hidden bg-bg-elevated flex items-center justify-center">
                            {exp.logo ? (
                              <Image
                                src={exp.logo}
                                alt={exp.company}
                                fill
                                className="object-contain p-0.5"
                                unoptimized
                              />
                            ) : (
                              <span className="font-mono text-[10px] text-accent font-bold">
                                {exp.company.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-mono text-xs text-accent">
                              {exp.dateStarted} — {exp.dateEnded}
                              {exp.dateEnded === 'PRESENT' && (
                                <span className="ml-2 bg-accent/10 border border-accent/30 text-accent px-2 py-0.5 rounded-full text-[10px]">
                                  ● CURRENT
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-mono font-bold text-base text-text-primary mb-1">
                        {exp.jobTitle}
                      </h3>
                      <p className="font-mono text-xs text-accent/70 mb-4">{exp.company}</p>

                      {/* Bullet points */}
                      <ul className="space-y-2 mb-5">
                        {exp.points.map((point) => (
                          <li
                            key={point}
                            className="font-mono text-xs text-text-secondary leading-relaxed flex gap-2"
                          >
                            <span className="text-accent/60 flex-shrink-0 mt-0.5">→</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] text-text-muted border border-border-custom px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  {!isRight && <div className="hidden md:block w-1/2" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
