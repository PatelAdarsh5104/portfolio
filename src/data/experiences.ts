export interface Experience {
  company: string
  jobTitle: string
  dateStarted: string
  dateEnded: string
  logo: string
  points: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Armakuni PVT',
    jobTitle: 'AI Software Engineer',
    dateStarted: 'MAY 2025',
    dateEnded: 'PRESENT',
    logo: '/images/Armakuni_logo.avif',
    points: [
      'Improved cooking time prediction accuracy by 19% through a custom algorithm',
      'Built automated pipeline for recipe generation & video production using Luma AI and Veo, reducing manual effort by 40%',
      'Fine-tuned and deployed LLMs on AWS SageMaker, increasing accuracy from 54% to 86%',
      'Architected scalable multi-agent system with Claude Agent SDK, Amazon Neptune & OpenSearch, boosting tool-calling accuracy by 44%',
      'Implemented event-driven workflows with AWS EventBridge and Lambda, cutting manual work by 60%',
    ],
    technologies: ['AWS', 'SageMaker', 'Lambda', 'EventBridge', 'LLM', 'Fine-tuning', 'Claude SDK', 'OpenSearch', 'Amazon Neptune', 'Multi-agent'],
  },
  {
    company: 'GenAI Novuscode Softtech Pvt Ltd',
    jobTitle: 'AI/ML Developer',
    dateStarted: 'SEP 2023',
    dateEnded: 'MAY 2025',
    logo: '/images/Novuscodelogo.png',
    points: [
      'Developed robust backend APIs using FastAPI and deployed scalable web applications on Azure',
      'Engineered and fine-tuned custom NLP models using BERT and Hugging Face',
      'Leveraged LangGraph to develop multi-agent workflows',
      'Developed an AI-powered Math Chat Agent simplifying advanced mathematical concepts',
    ],
    technologies: ['Python', 'FastAPI', 'Azure', 'LangChain', 'OpenAI', 'PyTorch', 'LangGraph', 'BERT', 'HuggingFace', 'RAG'],
  },
  {
    company: 'PHPDots Technologies (Tuvoc Technologies)',
    jobTitle: 'Backend Developer Intern',
    dateStarted: 'FEB 2023',
    dateEnded: 'JUN 2023',
    logo: '/images/phpdotslogo.webp',
    points: [
      'Developed backend APIs using Python and FastAPI',
      'Implemented user authentication and role-based access control',
      'Gained hands-on experience with asynchronous programming using Redis',
      'Collaborated with front-end team for seamless API integration',
    ],
    technologies: ['Python', 'FastAPI', 'Redis', 'Django', 'PostgreSQL'],
  },
  {
    company: 'BrainyBeam Technologies Pvt. Ltd.',
    jobTitle: 'Python Development Intern',
    dateStarted: 'FEB 2022',
    dateEnded: 'MAR 2022',
    logo: '',
    points: [
      'Completed hands-on training in core Python: syntax, data types, operators, and control flow',
      'Worked with data structures (lists, tuples, dicts), functions, and HTTP requests via Requests library',
      'Utilized NumPy for numerical computations and enhanced version control skills using GitHub',
    ],
    technologies: ['Python', 'NumPy', 'Requests', 'GitHub'],
  },
]
