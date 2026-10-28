export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  year: string;
  bullets: string[];
  technologies: string[];
  link?: string;
  github?: string;
}

// Reverse chronological.

export const projects: Project[] = [
  {
    id: 1,
    name: 'Agentic Stock Prediction',
    description: 'Multi-agent system that researches a stock like a small investment team and issues BUY / SELL / HOLD calls.',
    category: 'ML / Agents',
    year: '2026',
    bullets: [
      'Built a Google ADK workflow graph that fans out technical, market, and fundamental analyst agents concurrently, then joins their reports for a portfolio-manager agent',
      'Portfolio manager emits a Pydantic-validated BUY / SELL / HOLD recommendation with a confidence score and rationale',
      'Prevented lookahead bias by reading the as-of date from ADK session state and slicing yfinance history to it inside every tool',
      'Built a resumable backtest harness scoring calls against realized returns vs. buy-and-hold and SMA trend baselines, with confidence calibration',
    ],
    technologies: ['Python', 'Google ADK', 'Gemini', 'yfinance', 'Pydantic', 'pytest'],
    github: 'https://github.com/sdp-dev/agentic-stock-prediction',
  },
  {
    id: 2,
    name: 'RAG-Powered Codebase Assistant',
    description: 'Intelligent assistant that ingests GitHub repos and answers questions via natural language queries.',
    category: 'ML / NLP',
    year: '2026',
    bullets: [
      'Built a RAG pipeline that clones GitHub repos and parses Python source into function-, class-, and method-level chunks with tree-sitter',
      'Embedded chunks with sentence-transformers (all-mpnet-base-v2) into a cosine-similarity FAISS index with multi-repo filtering',
      'Served grounded answers through LangChain + Ollama (llama3), citing file:line sources; sub-second retrieval across 10K+ lines of code',
    ],
    technologies: ['Python', 'LangChain', 'FAISS', 'tree-sitter', 'Ollama', 'sentence-transformers'],
    github: 'https://github.com/sdp-dev/rag-codebase-assistant',
  },
  {
    id: 3,
    name: 'LLM Factuality Evaluation',
    description: 'Benchmarking factual consistency of open-source LLMs on medical literature summarization.',
    category: 'ML / NLP',
    year: '2025',
    bullets: [
      'Built a QAGS-style factual-consistency pipeline evaluating LLaMA-3.1-8B, Mistral-7B, and DeepSeek-R1-Distill-Qwen-7B on 250 CORD-19 papers',
      'Generated questions with FLAN-T5 and answered them against source and summary with RoBERTa extractive QA, scored by BERTScore F1',
      'Ran bf16 inference with 8K-token inputs and low-temperature decoding; every model scored below 0.50 F1 (Mistral best at 0.45)',
    ],
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'BERTScore', 'FLAN-T5'],
    github: 'https://github.com/sdp-dev/llm-factuality-eval',
  },
  {
    id: 4,
    name: 'Restaurant Reservation System',
    description: 'Full-stack booking platform with real-time availability and secure authentication.',
    category: 'Full Stack',
    year: '2025',
    bullets: [
      'Architected a Flask REST API and React SPA with JWT auth, real-time reservation availability, and a normalized PostgreSQL schema',
      'Reached 85% test coverage with 40+ pytest unit tests across API endpoints',
      'Containerized with Docker and deployed to AWS EC2 through a GitHub Actions CI/CD pipeline',
    ],
    technologies: ['Flask', 'React', 'PostgreSQL', 'Docker', 'AWS EC2', 'GitHub Actions'],
    github: 'https://github.com/sdp-dev',
  },
  {
    id: 5,
    name: 'HTTP Web Server',
    description: 'Low-level HTTP server implementation handling concurrent requests and static file serving.',
    category: 'Systems',
    year: '2024',
    bullets: [
      'Built an HTTP/1.0 server in C on POSIX sockets, forking a child process per connection to handle concurrent requests',
      'Implemented request parsing, URI validation, MIME type detection, and directory-traversal prevention',
      'Returned standard status codes (200/301/400/404/501) while serving static HTML, CSS, and image assets',
    ],
    technologies: ['C', 'Socket Programming', 'HTTP', 'POSIX'],
    github: 'https://github.com/sdp-dev',
  },
];
