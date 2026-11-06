import type { LucideIcon } from 'lucide-react'
import { ArrowUp, Database, Github, Globe, Network, User, Workflow } from 'lucide-react'

// How The Collective House is wired: requests go Route 53 -> CloudFront -> S3,
// everything inside the dashed box is Terraform, and GitHub Actions deploys to S3.

function Node({ icon: Icon, label, accent = false }: { icon: LucideIcon; label: string; accent?: boolean }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <span
        className={`grid h-8 w-8 place-items-center rounded-lg border sm:h-10 sm:w-10 ${
          accent ? 'border-accent/60 bg-accent/10 text-accent' : 'border-line bg-bg text-fg/80'
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="whitespace-nowrap text-muted">{label}</span>
    </div>
  )
}

const Link = () => <span className="mb-5 h-px min-w-2 flex-1 bg-line" aria-hidden />

export function CloudMockup() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-4 text-[9px] sm:gap-6 sm:p-8 sm:text-xs">
      <div className="flex items-center">
        <Node icon={User} label="Visitor" />
        <Link />
        <div className="relative flex flex-[4] items-center rounded-xl border border-dashed border-accent/50 px-2 pb-2 pt-4 sm:px-4 sm:pt-5">
          <span className="absolute -top-2 left-3 bg-surface px-1.5 text-accent">Terraform</span>
          <Node icon={Globe} label="Route 53" />
          <Link />
          <Node icon={Network} label="CloudFront" />
          <Link />
          <Node icon={Database} label="S3" accent />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pr-1 sm:pr-3">
        <Node icon={Github} label="GitHub" />
        <Link />
        <Node icon={Workflow} label="Actions" />
        <span className="mb-5 flex items-center gap-1 pl-2 text-accent">
          <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          deploy
        </span>
      </div>
    </div>
  )
}
