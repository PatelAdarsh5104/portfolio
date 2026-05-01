import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  return { title: project ? `${project.title} — Adarsh Patel` : 'Project' }
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) notFound()

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/#projects"
          className="font-mono text-xs text-text-muted hover:text-accent transition-colors mb-10 inline-block"
        >
          ← All projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-mono font-extrabold text-3xl text-text-primary mb-4">
            {project.title}
          </h1>
          <p className="font-mono text-sm text-text-secondary leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold bg-accent text-bg-primary px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
              >
                GitHub ↗
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs border border-border-custom text-text-secondary px-5 py-2.5 rounded-md hover:border-accent hover:text-accent transition-colors"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>

        {/* Project image */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-bg-elevated mb-10 border border-border-custom">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Detail description */}
        <div className="bg-bg-card border border-border-custom rounded-xl p-6">
          <h2 className="font-mono font-bold text-base text-text-primary mb-5">Project Details</h2>
          <div
            className="prose font-mono"
            dangerouslySetInnerHTML={{ __html: project.detailDescription }}
          />
        </div>
      </div>
    </div>
  )
}
