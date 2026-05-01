import ScrollReveal from '@/components/ScrollReveal'
import { pageInfo } from '@/data/pageInfo'

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-bg-card">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-3">// 06. CONTACT</p>
          <h2 className="font-mono font-extrabold text-3xl text-text-primary tracking-widest uppercase mb-4">
            Get In Touch
          </h2>
          <p className="font-mono text-sm text-text-secondary mb-10">
            Let&apos;s build something together.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <a
            href={`mailto:${pageInfo.email}`}
            className="inline-flex items-center gap-2 font-mono text-sm font-bold bg-accent text-bg-primary px-8 py-4 rounded-md hover:opacity-90 transition-opacity mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {pageInfo.email}
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex items-center justify-center gap-8">
            <a
              href={pageInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-muted hover:text-accent transition-colors tracking-wider"
            >
              GitHub ↗
            </a>
            <a
              href={pageInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-muted hover:text-accent transition-colors tracking-wider"
            >
              LinkedIn ↗
            </a>
            <a
              href={pageInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-muted hover:text-accent transition-colors tracking-wider"
            >
              Twitter ↗
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
