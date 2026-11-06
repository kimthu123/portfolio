import { BrainCircuit, Cloud, Container } from 'lucide-react'
import { Section } from './Section'

const services = [
  {
    icon: Cloud,
    title: 'Cloud infrastructure',
    body: 'AWS set up as code with Terraform. S3 and CloudFront for static sites, Route 53 for DNS, load balancer routing, and EKS when it needs to run containers.',
  },
  {
    icon: Container,
    title: 'CI/CD and containers',
    body: 'Docker images built and tested in GitHub Actions, pushed to ECR and deployed to Kubernetes, plus the troubleshooting that comes with Deployments, Services, Secrets and volumes.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-powered backends',
    body: 'FastAPI services that use LLMs and RAG for a real job, like classifying logs or finding similar tickets, with tests and a pipeline behind them.',
  },
]

export function Services() {
  return (
    <Section id="services" title="What I do">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {services.map(({ icon: Icon, title, body }) => (
          <div key={title} className="border-t border-line pt-6">
            <Icon className="text-accent" size={22} aria-hidden />
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
