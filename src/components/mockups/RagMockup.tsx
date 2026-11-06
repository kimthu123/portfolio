import { Search } from 'lucide-react'

// RAG in one picture: a question, the chunks retrieved for it with their
// similarity scores, and an answer that cites them. Illustrative values only.
const chunks = [
  { n: 1, score: 0.89, w: ['86%', '60%'] },
  { n: 2, score: 0.83, w: ['72%', '50%'] },
  { n: 3, score: 0.77, w: ['80%', '44%'] },
]

export function RagMockup() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 text-[10px] sm:p-6 sm:text-xs">
      <div className="flex items-center gap-2 rounded-md border border-line bg-bg px-2.5 py-2 text-muted">
        <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="truncate">Ask about the research</span>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-muted">Retrieved</span>
          {chunks.map((c) => (
            <div key={c.n} className="flex-1 rounded-md border border-line bg-bg/70 px-2.5 py-2">
              <div className="flex justify-between">
                <span className="text-accent">[{c.n}]</span>
                <span className="tabular-nums text-muted">{c.score.toFixed(2)}</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-fg/20" style={{ width: c.w[0] }} />
              <div className="mt-1 h-1 rounded-full bg-fg/10" style={{ width: c.w[1] }} />
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-muted">Answer</span>
          <div className="flex flex-1 flex-col gap-2 rounded-md border border-accent/40 bg-accent/5 p-3">
            {['92%', '84%', '96%', '70%', '88%', '52%'].map((w, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-fg/20" style={{ width: w }} />
            ))}
            <span className="mt-auto flex gap-1.5">
              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">[1]</span>
              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">[2]</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
