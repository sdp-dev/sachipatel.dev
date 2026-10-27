import type { Project } from '../components/ProjectCard';

export const projects: Project[] = [
  {
    id: 1,
    name: 'RAG-Powered Codebase Assistant',
    description: 'Intelligent assistant that ingests GitHub repos and answers questions via natural language queries.',
    category: 'ML / NLP',
    bullets: [
      'Built RAG assistant that ingests GitHub repos, parses Python code with tree-sitter, answers questions via natural language queries',
      'Implemented semantic search using sentence-transformers/FAISS for efficient code retrieval',
      'Integrated LangChain + Ollama for conversational UI',
    ],
    technologies: ['Python', 'LangChain', 'FAISS', 'tree-sitter', 'Ollama', 'sentence-transformers'],
    github: 'https://github.com/sdp-dev',
  },
  {
    id: 2,
    name: 'LLM Factuality Evaluation',
    description: 'Benchmarking factual consistency of open-source LLMs on medical literature summarization.',
    category: 'ML / NLP',
    bullets: [
      'Built QAGS-style pipeline evaluating LLaMA-8B, Mistral-7B, DeepSeek-7B across 250 CORD-19 papers',
      'Engineered automated question generation (FLAN-T5) + extractive QA (RoBERTa) with F1/BERTScore metrics',
      'Optimized inference for 8K-token documents; findings on weak factual grounding (<0.50 F1) published',
    ],
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'BERTScore', 'FLAN-T5'],
    github: 'https://github.com/sdp-dev',
  },
  {
    id: 3,
    name: 'Restaurant Reservation System',
    description: 'Full-stack booking platform with real-time availability and secure authentication.',
    category: 'Full Stack',
    bullets: [
      'Architected Flask + React app with JWT auth, real-time reservations, and normalized PostgreSQL schema',
      'Achieved 85% test coverage with 40+ pytest unit tests across API endpoints',
      'Containerized with Docker and deployed on AWS EC2 via GitHub Actions CI/CD pipeline',
    ],
    technologies: ['Flask', 'React', 'PostgreSQL', 'Docker', 'AWS EC2', 'GitHub Actions'],
    github: 'https://github.com/sdp-dev',
  },
  {
    id: 4,
    name: 'HTTP Web Server',
    description: 'Low-level HTTP server implementation handling concurrent requests and static file serving.',
    category: 'Systems',
    bullets: [
      'Implemented HTTP/1.1 server in C using POSIX socket programming for GET request handling',
      'Built custom request parser with URI validation, MIME type detection, and error handling',
      'Integrated dynamic file routing for serving static HTML, CSS, and image assets',
    ],
    technologies: ['C', 'Socket Programming', 'HTTP', 'POSIX'],
    github: 'https://github.com/sdp-dev',
  },
];
