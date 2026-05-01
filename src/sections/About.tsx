import ScrollReveal from '@/components/ScrollReveal'
import { pageInfo } from '@/data/pageInfo'

export default function About() {
  return (
    <section id="about" className="py-24 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-3">// 01. ABOUT</p>
          <h2 className="font-mono font-extrabold text-3xl text-text-primary tracking-widest uppercase mb-10">
            About Me
          </h2>
        </ScrollReveal>

        <div className="space-y-5">
          {pageInfo.bio.trim().split('\n\n').map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                {paragraph.trim()}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
