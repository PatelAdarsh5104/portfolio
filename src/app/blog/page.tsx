import Link from 'next/link'
import { blogs } from '@/data/blogs'

export const metadata = { title: 'Blog — Adarsh Patel' }

export default function BlogList() {
  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="font-mono text-xs text-text-muted hover:text-accent transition-colors mb-8 inline-block"
          >
            ← Back home
          </Link>
          <p className="font-mono text-xs text-accent tracking-[0.3em] mb-3">// BLOG</p>
          <h1 className="font-mono font-extrabold text-4xl text-text-primary tracking-tight mb-4">
            Writing & Thinking
          </h1>
          <p className="font-mono text-sm text-text-secondary">
            Thoughts on AI engineering, LLMs, and building intelligent systems.
          </p>
        </div>

        {/* All posts */}
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group flex items-start gap-5 bg-bg-card border border-border-custom rounded-xl p-5 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.08)]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-text-muted bg-bg-elevated border border-border-custom px-2 py-0.5 rounded tracking-wider">
                    {blog.category}
                  </span>
                </div>
                <h2 className="font-mono font-bold text-base text-text-primary group-hover:text-accent transition-colors mb-2">
                  {blog.title}
                </h2>
                <p className="font-mono text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
                  {blog.summary}
                </p>
                <div className="flex items-center gap-4 font-mono text-[10px] text-text-muted">
                  <span>{blog.date}</span>
                  <span>◷ {blog.readTime}</span>
                </div>
              </div>
              <span className="font-mono text-xl text-text-muted group-hover:text-accent transition-colors mt-1 flex-shrink-0">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
