import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  id: string
  title: string
  intro?: ReactNode
  children: ReactNode
}

// Shared section shell: a rule that draws in, the heading, an optional intro.
export function Section({ id, title, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 py-20 md:py-28">
      <div className="wrap">
        <motion.div
          aria-hidden
          className="h-px w-full origin-left bg-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <header className="mb-12 mt-6 grid gap-4 md:mb-16 md:grid-cols-12 md:gap-8">
          <h2
            id={`${id}-title`}
            className="font-display text-4xl font-semibold tracking-[-0.03em] md:col-span-5 md:text-5xl"
          >
            {title}
          </h2>
          {intro && (
            <p className="max-w-[58ch] text-lg leading-relaxed text-muted md:col-span-6 md:col-start-7 md:pt-2">
              {intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
