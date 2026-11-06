import { GraduationCap } from 'lucide-react'
import { timeline } from '../data/timeline'
import { Section } from './Section'

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience & education"
      intro="Study and project work so far, in the order it happened."
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <aside className="md:col-span-4">
          <div className="rounded-xl border border-line bg-surface p-6 md:sticky md:top-24">
            <GraduationCap className="text-accent" size={22} aria-hidden />
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
              Swinburne University of Technology
            </h3>
            <p className="mt-2 leading-relaxed text-muted">
              Bachelor of Computer Science. Ho Chi Minh City and Hawthorn campuses, with a Talents
              Scholarship at both.
            </p>
          </div>
        </aside>

        <ol className="relative border-l border-line md:col-span-7 md:col-start-6">
          {timeline.map((item, i) => (
            <li key={`${item.title}-${i}`} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[5px] top-[0.45rem] h-[9px] w-[9px] rounded-full border-2 ${
                  item.current ? 'border-accent bg-accent' : 'border-accent bg-bg'
                }`}
              />
              <p className="text-sm tabular-nums text-muted">{item.when}</p>
              <h3 className="mt-1 text-lg font-medium text-fg">{item.title}</h3>
              <p className="mt-1.5 max-w-[60ch] leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
