import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectPreview } from './mockups'

type Props = { project: Project | null; onClose: () => void }

export function ProjectDrawer({ project, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // keep Tab inside the drawer
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('a[href], button')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto border-l border-line bg-bg"
            style={{
              paddingTop: 'env(safe-area-inset-top, 0px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              paddingRight: 'env(safe-area-inset-right, 0px)',
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/95 px-6 py-3 backdrop-blur">
              <p className="text-sm text-muted">{project.kind}</p>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-lg text-muted hover:bg-surface hover:text-fg"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 pb-12 pt-6">
              <h2 id="drawer-title" className="font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
                {project.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-fg/80">{project.summary}</p>

              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                <ProjectPreview mockup={project.mockup} image={project.image} alt={`${project.title} preview`} />
              </div>

              <dl className="mt-10 space-y-8">
                <div>
                  <dt className="font-medium">The problem</dt>
                  <dd className="mt-2 leading-relaxed text-muted">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium">
                    My role <span className="font-normal text-accent">/ {project.role}</span>
                  </dt>
                  <dd className="mt-3">
                    <ul className="space-y-2 text-muted">
                      {project.responsibilities.map((r) => (
                        <li key={r} className="flex gap-3 leading-relaxed">
                          <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Key features</dt>
                  <dd className="mt-3">
                    <ul className="space-y-2 text-muted">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-3 leading-relaxed">
                          <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-fg/40" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Built with</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                {project.links.github && (
                  <a className="btn btn-primary" href={project.links.github} target="_blank" rel="noreferrer">
                    <Github size={16} aria-hidden />
                    View on GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a className="btn btn-secondary" href={project.links.demo} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} aria-hidden />
                    Live demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
