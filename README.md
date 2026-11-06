# Tran Kim Thu, portfolio

React + TypeScript + Tailwind CSS + Framer Motion + Lucide icons, built with Vite.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in /dist, ready for Vercel, Netlify or S3 + CloudFront
```

## Where to edit things

| What | File |
| --- | --- |
| Name, email, GitHub, LinkedIn, availability | `src/data/site.ts` |
| Projects (add, edit, remove, reorder) | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Timeline | `src/data/timeline.ts` |
| About notes | `src/components/About.tsx` |
| Colours (dark and light) | `src/index.css`, the `:root` blocks |

## Adding a project

Copy an object in `src/data/projects.ts`. For the preview, put a screenshot in
`public/screens/` and set `image: '/screens/your-file.png'`. If you leave `image`
out and don't set `mockup`, the card shows a plain placeholder.

## Contact form

It opens the visitor's email app with the message filled in. To receive messages
without that step, replace `handleSubmit` in `src/components/Contact.tsx` with a
POST to Formspree, Web3Forms or your own endpoint.

## Before you deploy

- Set your real email in `src/data/site.ts`
- Point each project's `links.github` at its repo, not your profile
- Read through the copy in `About.tsx` and `projects.ts` and change anything that doesn't sound like you
