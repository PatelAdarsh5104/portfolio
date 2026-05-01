'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { blogs } from '@/data/blogs'

export default function BlogPreview() {
  return (
    <section id="blog" className="py-24 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-3">// 05. BLOG</p>
          <h2 className="font-mono font-extrabold text-3xl text-text-primary tracking-widest uppercase mb-4">
            Writing & Thinking
          </h2>
          <p className="font-mono text-sm text-text-secondary mb-12">
            Thoughts on AI engineering, LLMs, and building intelligent systems.
          </p>
        </ScrollReveal>

        {/* Constrained grid with side breathing room */}
        <div className="max-w-[85%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogs.map((blog, i) => (
              <ScrollReveal key={blog.slug} delay={i * 0.07} className="h-full">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="h-full">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group flex flex-col h-full bg-bg-card border border-border-custom rounded-lg p-4 hover:border-accent/40 hover:shadow-[0_0_16px_rgba(167,139,250,0.08)] transition-all duration-300"
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-text-muted bg-bg-elevated border border-border-custom px-2 py-0.5 rounded tracking-wider">
                        {blog.category}
                      </span>
                      <span className="font-mono text-sm text-text-muted group-hover:text-accent transition-colors">
                        ↗
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-mono font-bold text-sm text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors">
                      {blog.title}
                    </h3>

                    {/* Summary — flex-1 pushes meta to bottom */}
                    <p className="font-mono text-[11px] text-text-secondary leading-relaxed mb-3 flex-1 line-clamp-3">
                      {blog.summary}
                    </p>

                    {/* Meta — always at bottom */}
                    <div className="flex items-center gap-4 font-mono text-[10px] text-text-muted mt-auto">
                      <span>{blog.date}</span>
                      <span>◷ {blog.readTime}</span>
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="font-mono text-xs text-accent border border-border-custom hover:border-accent/50 px-6 py-2.5 rounded-md transition-colors hover:bg-accent/5"
            >
              → View all posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
