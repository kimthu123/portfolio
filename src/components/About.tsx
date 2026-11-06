import { Section } from './Section'

const notes = [
  {
    title: 'Where I studied',
    body: 'Bachelor of Computer Science at Swinburne University of Technology. I started at the Ho Chi Minh City campus and finished in Melbourne in December 2025.',
  },
  {
    title: 'Leading a team',
    body: 'I was technical lead on our industry capstone with Digital Village, in a team of six. The research tool we built cut their manual review time by about 60%, and we got a High Distinction.',
  },
  {
    title: 'Where I’m heading',
    body: 'Most of my uni work was full-stack and AI apps. Since graduating I’ve been focused on what comes after the code: AWS, containers, CI/CD and Kubernetes.',
  },
  {
    title: 'How I’m getting there',
    body: 'A mentor-guided roadmap, done hands-on in my own AWS account. That’s covered S3 and CloudFront hosting, ALB routing, and deploying containers to EKS.',
  },
]

export function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <p className="font-display text-2xl font-medium leading-snug tracking-[-0.015em] text-fg md:col-span-5 md:text-[1.9rem]">
          I started my degree in Ho Chi Minh City and finished it in Melbourne. Now I’m working toward
          cloud and DevOps roles, and I’m most interested in where infrastructure meets AI apps.
        </p>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
          {notes.map((n) => (
            <div key={n.title} className="border-t border-line pt-5">
              <h3 className="font-medium text-fg">{n.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
