import { pageInfo } from '@/data/pageInfo'

export default function Footer() {
  return (
    <footer className="border-t border-border-custom py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} Adarsh Patel. Built with Next.js & Tailwind.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={pageInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href={pageInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={pageInfo.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}
