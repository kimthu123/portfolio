// Only list things you've actually used. Each group renders as one row.
// Cloud and DevOps go first because that's the direction.

export type SkillGroup = { group: string; items: string[] }

export const skills: SkillGroup[] = [
  { group: 'AWS', items: ['EKS', 'ECR', 'S3', 'CloudFront', 'Route 53', 'ALB'] },
  { group: 'Containers', items: ['Docker', 'Kubernetes'] },
  { group: 'IaC & CI/CD', items: ['Terraform', 'GitHub Actions'] },
  { group: 'Backend', items: ['Python', 'FastAPI', 'REST APIs', 'pytest'] },
  {
    group: 'AI',
    items: ['Claude API', 'OpenAI API', 'RAG', 'Voyage AI', 'Chroma', 'Hugging Face Transformers', 'scikit-learn'],
  },
  { group: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'JavaScript', 'HTML & CSS'] },
  { group: 'Data', items: ['SQL', 'MongoDB', 'SQLite', 'Pandas'] },
  { group: 'Also', items: ['Kotlin', 'C++', 'Git & GitHub', 'Figma'] },
]
