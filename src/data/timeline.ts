// Timeline entries, oldest first. Only add dates you're sure of.

export type TimelineItem = {
  when: string
  title: string
  body: string
  current?: boolean
}

export const timeline: TimelineItem[] = [
  {
    when: 'Ho Chi Minh City',
    title: 'Started Computer Science at Swinburne',
    body: 'Began my degree at the Ho Chi Minh City campus with a partial Talents Scholarship.',
  },
  {
    when: 'Melbourne',
    title: 'Transferred to the Hawthorn campus',
    body: 'Moved to Melbourne mid-degree and received a Talents Scholarship award at Hawthorn too.',
  },
  {
    when: 'Capstone',
    title: 'Technical Lead, Digital Village industry project',
    body: 'Led a team of six building an AI climate research tool. It cut Digital Village’s manual review time by around 60% and we got a High Distinction.',
  },
  {
    when: 'Dec 2025',
    title: 'Bachelor of Computer Science',
    body: 'Graduated from Swinburne University of Technology.',
  },
  {
    when: 'Apr 2026',
    title: 'AWS Certified Cloud Practitioner',
    body: 'First step into cloud on paper. Since then it has mostly been hands-on work in my own AWS account.',
  },
  {
    when: '2026',
    title: 'Mentor-guided cloud and DevOps roadmap',
    body: 'Five months of focused building. Started with the AI-Ops Assistant (FastAPI, Docker, GitHub Actions), then Kubernetes, pushing images to ECR and deploying to an EKS cluster. SQL, Databricks and interview prep make up the rest.',
  },
  {
    when: 'Now',
    title: 'First commercial project',
    body: 'Building a PTE exam practice platform in a team of three. I work full-stack and on testing, and I’m picking up the architecture side as we work through requirements and mockups with the client.',
    current: true,
  },
]
