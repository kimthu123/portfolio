import { skills } from '../data/skills'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="skills"
      title="Technical skills"
      intro="What I've used hands-on, with the cloud and DevOps side first since that's where I'm heading."
    >
      <dl className="border-b border-line">
        {skills.map((s) => (
          <div
            key={s.group}
            className="grid gap-3 border-t border-line py-5 md:grid-cols-12 md:items-center md:gap-8"
          >
            <dt className="font-medium text-fg md:col-span-3">{s.group}</dt>
            <dd className="md:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li key={item} className="chip hover:border-accent/60">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
