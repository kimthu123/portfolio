import type { MockupKey } from '../components/mockups'

/*
  Adding a project:
  1. Copy one of the objects below and change the fields.
  2. `featured: true` gives it a big row with a preview. Everything else goes
     in the compact "More projects" list (it still opens the detail panel).
  3. For the preview, set `image` to a screenshot in /public
     (e.g. image: '/screens/my-app.png') or reuse a `mockup` key.
  4. Remove a project by deleting its object. Order here is order on the page.
*/

export type Project = {
  slug: string
  title: string
  kind: string
  featured?: boolean
  status?: string
  summary: string
  problem: string
  role: string
  responsibilities: string[]
  features: string[]
  tech: string[]
  mockup?: MockupKey
  image?: string
  links: { github?: string; demo?: string }
}

export const projects: Project[] = [
  {
    slug: 'ai-ops-assistant',
    title: 'AI-Ops Assistant API',
    kind: 'Backend & DevOps',
    featured: true,
    status: 'In progress',
    summary:
      'An API that classifies logs with an LLM and finds similar past tickets with RAG, so whoever is on support starts with some context.',
    problem:
      "When something breaks, the first job is working out what kind of problem it is and whether it's happened before. That usually means reading raw logs and digging through old tickets by hand.",
    role: 'Developer',
    responsibilities: [
      'Built the FastAPI service and its CRUD endpoints',
      'Added log classification with the Claude API',
      'Built ticket similarity search with Voyage AI embeddings stored in Chroma',
      'Wrote tests with pytest, containerised it with Docker and set up CI in GitHub Actions',
    ],
    features: [
      'LLM-based log classification',
      'RAG search for similar tickets',
      'Test suite run on every change in GitHub Actions',
      'Packaged as a Docker image',
    ],
    tech: ['Python', 'FastAPI', 'Claude API', 'Voyage AI', 'Chroma', 'pytest', 'Docker', 'GitHub Actions'],
    mockup: 'aiops',
    // TODO: point this at the repo instead of your profile
    links: { github: 'https://github.com/kimthu123' },
  },
  {
    slug: 'the-collective-house',
    title: 'The Collective House',
    kind: 'Cloud infrastructure',
    featured: true,
    // TODO: add a line about what the site is for
    summary:
      'A Next.js site running on AWS, with hosting, CDN and DNS all defined in Terraform and deployed through GitHub Actions.',
    problem:
      'Setting things up by clicking around the AWS console works once, but it is hard to repeat and easy to get wrong. The goal was to have the whole setup in code so it can be rebuilt or changed safely.',
    role: 'Developer',
    responsibilities: [
      'Wrote the Terraform for S3, CloudFront and Route 53',
      'Set up a GitHub Actions pipeline to build and deploy the site',
      'Used Docker in the build setup',
    ],
    features: [
      'Static hosting on S3 behind CloudFront',
      'Custom domain through Route 53',
      'All infrastructure as code with Terraform',
      'Automated deploys with GitHub Actions',
    ],
    tech: ['Next.js', 'S3', 'CloudFront', 'Route 53', 'Terraform', 'GitHub Actions', 'Docker'],
    mockup: 'cloud',
    links: { github: 'https://github.com/kimthu123' },
  },
  {
    slug: 'ai-climate-research-tool',
    title: 'AI Climate Research Tool',
    kind: 'Industry capstone with Digital Village',
    featured: true,
    summary:
      'A RAG-based research assistant built for Digital Village that cut their manual review time by around 60%.',
    problem:
      'Reviewing climate research by hand is slow, and most of the time goes into finding the parts that actually matter.',
    role: 'Technical Lead',
    responsibilities: [
      'Led the technical side of a team of six',
      'Worked on the FastAPI back end and the retrieval pipeline',
      'Kept the team aligned with what Digital Village needed from the tool',
    ],
    features: [
      'Retrieval-augmented generation over research documents',
      'Voyage AI embeddings stored in Chroma',
      'Answers generated with the OpenAI API',
      'Around 60% less manual review time',
      'Team received a High Distinction',
    ],
    tech: ['Python', 'FastAPI', 'OpenAI API', 'RAG', 'Voyage AI', 'Chroma'],
    mockup: 'rag',
    links: { github: 'https://github.com/kimthu123' },
  },
  {
    slug: 'ai-innovation-observatory',
    title: 'AI Innovation Observatory',
    kind: 'Research platform',
    summary:
      'Pulls AI papers from arXiv and Semantic Scholar and sorts them into topics with zero-shot classification.',
    problem:
      "AI research is spread across several sources. Keeping up meant checking each one and sorting papers by hand, which doesn't scale.",
    role: 'Technical Lead',
    responsibilities: [
      'Led how the React app, FastAPI service and data pipeline fit together',
      'Built the article scraping for arXiv and Semantic Scholar',
      'Added Hugging Face zero-shot classification to tag papers by topic',
    ],
    features: [
      'Collects articles from arXiv and Semantic Scholar',
      'Zero-shot topic tagging with no labelled training data',
      'Papers and topics stored in MongoDB',
    ],
    tech: ['React', 'FastAPI', 'MongoDB', 'Hugging Face'],
    mockup: 'observatory',
    links: { github: 'https://github.com/kimthu123' },
  },
  {
    slug: 'housing-market-dynamics',
    title: 'Housing Market Dynamics',
    kind: 'Data platform',
    summary: 'Housing data cleaned, modelled with scikit-learn and explored through interactive D3.js charts.',
    problem:
      "Raw sales records don't say much until they're cleaned, modelled and shown in a way you can explore.",
    role: 'Developer',
    responsibilities: [
      'Preprocessed the raw housing data in Python',
      'Served scikit-learn models through FastAPI',
      'Built D3.js visualisations in React',
    ],
    features: ['Data preprocessing pipeline', 'Model predictions over a REST API', 'Interactive trend charts'],
    tech: ['React', 'FastAPI', 'scikit-learn', 'D3.js', 'SQLite'],
    mockup: 'housing',
    links: { github: 'https://github.com/kimthu123' },
  },
  {
    slug: 'android-app',
    title: 'Android app in Kotlin',
    kind: 'Mobile',
    summary: 'A Kotlin app structured with MVVM, with local storage in Room and RecyclerView lists.',
    problem: 'Apps get hard to change when UI, state and data access are mixed together. This one was about getting the layers right.',
    role: 'Developer',
    responsibilities: ['Structured the app with MVVM', 'Persisted data locally with Room', 'Built list screens with RecyclerView'],
    features: ['Local storage with Room', 'ViewModels between UI and data', 'RecyclerView lists'],
    tech: ['Kotlin', 'Room', 'MVVM', 'RecyclerView'],
    mockup: 'mobile',
    links: { github: 'https://github.com/kimthu123' },
  },
]
