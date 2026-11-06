import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site'
import { DotField } from './DotField'

const headline = ['I build apps and', 'the infrastructure', 'they run on.']
const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <DotField className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      <div className="wrap pb-20 pt-32 md:pb-28 md:pt-44">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/70 py-1.5 pl-3 pr-4 text-sm text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-50 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          {site.availability}
        </motion.p>

        <h1
          className="mt-8 max-w-[13ch] font-display text-[clamp(2.5rem,8.4vw,7.25rem)] font-semibold leading-[0.96] tracking-[-0.045em] md:max-w-none"
          style={{ fontVariationSettings: "'wdth' 86, 'opsz' 96" }}
        >
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, delay: 0.12 + i * 0.09, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12"
        >
          <div className="md:col-span-7 lg:col-span-6">
            <p className="text-sm text-muted">{site.roles.join(' / ')}</p>
            <p className="mt-3 max-w-[56ch] text-lg leading-relaxed text-fg/80">
              I'm <span className="font-medium text-fg">{site.name}</span>, though most people call me{' '}
              {site.nickname}. I'm a Computer Science graduate from Swinburne working toward cloud and DevOps
              roles in Melbourne. I've built full-stack and AI apps, and these days most of my time goes into
              what happens after the code: Docker, CI/CD, Kubernetes and AWS.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="btn btn-primary">
                Explore my work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
