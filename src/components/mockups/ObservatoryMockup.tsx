import { Search } from 'lucide-react'

// Sketch of the Observatory feed: papers from two sources, each tagged with a
// zero-shot topic and its confidence score. Text is drawn as bars on purpose.
const rows = [
  { src: 'arXiv', topic: 'NLP', score: 0.91, w: ['82%', '54%'] },
  { src: 'S2', topic: 'Vision', score: 0.84, w: ['66%', '60%'] },
  { src: 'arXiv', topic: 'RL', score: 0.77, w: ['88%', '42%'] },
  { src: 'S2', topic: 'NLP', score: 0.69, w: ['58%', '48%'] },
]
const filters = ['All', 'NLP', 'Vision', 'RL']

export function ObservatoryMockup() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 text-[10px] sm:p-6 sm:text-xs">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-bg px-2.5 py-2 text-muted">
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">Search papers</span>
        </div>
        <div className="hidden gap-1.5 sm:flex">
          {filters.map((f, i) => (
            <span
              key={f}
              className={
                i === 1
                  ? 'rounded-md bg-accent/15 px-2 py-1.5 text-accent'
                  : 'rounded-md border border-line px-2 py-1.5 text-muted'
              }
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-2">
        {rows.map((r, i) => (
          <li key={i} className="flex flex-1 items-center gap-3 rounded-lg border border-line bg-bg/70 px-3">
            <span className="w-11 shrink-0 rounded bg-raised py-0.5 text-center text-muted">{r.src}</span>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="h-1.5 rounded-full bg-fg/25" style={{ width: r.w[0] }} />
              <div className="h-1.5 rounded-full bg-fg/10" style={{ width: r.w[1] }} />
            </div>
            <div className="w-[30%] shrink-0">
              <div className="flex justify-between gap-2">
                <span className="truncate text-fg/80">{r.topic}</span>
                <span className="tabular-nums text-muted">{r.score.toFixed(2)}</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-line">
                <div className="h-full rounded-full bg-accent" style={{ width: `${r.score * 100}%` }} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
