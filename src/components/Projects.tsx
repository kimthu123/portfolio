import { useCallback, useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { ProjectPreview } from './mockups'
import { ProjectDrawer } from './ProjectDrawer'
import { Section } from './Section'

const featured = projects.filter((p) => p.featured)
const more = projects.filter((p) => !p.featured)

function Meta({ p }: { p: Project }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
      <span>{p.kind}</span>
      {p.role !== 'Developer' && <span className="text-accent">/ {p.role}</span>}
      {p.status && (
        <span className="rounded-full border border-accent/40 px-2 py-0.5 text-xs text-accent">{p.status}</span>
      )}
    </p>
  )
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const open = (p: Project, el: HTMLElement) => {
    trigger.current = el
    setActive(p)
  }
  const close = useCallback(() => {
    setActive(null)
    requestAnimationFrame(() => trigger.current?.focus())
  }, [])

  return (
    <Section
      id="work"
      title="Selected work"
      intro="The projects closest to what I want to do next: infrastructure in code, pipelines that ship it, and AI services worth deploying. Open any of them for the problem, my role and how it's built."
    >
      <div>
        {featured.map((p) => (
          <article
            key={p.slug}
            className="group grid items-center gap-8 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-12 md:py-14"
          >
            <button
              type="button"
              onClick={(e) => open(p, e.currentTarget)}
              aria-label={`Open details for ${p.title}`}
              className="relative block aspect-[16/10] w-full max-w-full overflow-hidden rounded-xl border border-line bg-surface text-left transition-colors duration-300 hover:border-accent/50 md:col-span-7"
            >
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.015] motion-reduce:transform-none">
                <ProjectPreview mockup={p.mockup} image={p.image} alt={`${p.title} preview`} />
              </div>
            </button>

            <div className="min-w-0 md:col-span-5">
              <Meta p={p} />
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-4 leading-relaxed text-fg/75">{p.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
                {p.tech.map((t) => (
                  <li key={t} className="chip px-2 py-0.5 text-xs">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <button type="button" className="btn btn-secondary" onClick={(e) => open(p, e.currentTarget)}>
                  View details
                </button>
                {p.links.github && (
                  <a className="btn btn-quiet" href={p.links.github} target="_blank" rel="noreferrer">
                    <Github size={16} aria-hidden />
                    Code
                  </a>
                )}
                {p.links.demo && (
                  <a className="btn btn-quiet" href={p.links.demo} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} aria-hidden />
                    Live demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {more.length > 0 && (
        <div className="mt-16 md:mt-20">
          <h3 className="font-display text-2xl font-semibold tracking-tight">More projects</h3>
          <ul className="mt-6 border-b border-line">
            {more.map((p) => (
              <li key={p.slug} className="border-t border-line">
                <button
                  type="button"
                  onClick={(e) => open(p, e.currentTarget)}
                  className="group grid w-full gap-2 py-5 text-left md:grid-cols-12 md:items-center md:gap-8"
                >
                  <span className="min-w-0 md:col-span-4">
                    <span className="block font-medium text-fg transition-colors group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="text-sm text-muted">{p.kind}</span>
                  </span>
                  <span className="min-w-0 leading-relaxed text-muted md:col-span-6">{p.summary}</span>
                  <span className="text-sm text-muted transition-colors group-hover:text-fg md:col-span-2 md:text-right">
                    Details
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ProjectDrawer project={active} onClose={close} />
    </Section>
  )
}
