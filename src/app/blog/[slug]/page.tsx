import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogs } from '@/data/blogs'

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug)
  return { title: blog ? `${blog.title} — Adarsh Patel` : 'Blog' }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug)
  if (!blog) notFound()

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-24">
      <article className="max-w-2xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/blog"
          className="font-mono text-xs text-text-muted hover:text-accent transition-colors mb-10 inline-block"
        >
          ← All posts
        </Link>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-border-custom">
          <span className="font-mono text-[10px] text-text-muted bg-bg-elevated border border-border-custom px-2 py-0.5 rounded tracking-wider mb-4 inline-block">
            {blog.category}
          </span>
          <h1 className="font-mono font-extrabold text-3xl text-text-primary leading-tight mt-3 mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
            <span>{blog.date}</span>
            <span>◷ {blog.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose font-mono"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border-custom">
          <Link
            href="/blog"
            className="font-mono text-xs text-accent hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  )
}
