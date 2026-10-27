// Text supports **highlight** and [label](/path-or-url) markup, rendered by RichText.

export const whoAmI =
  "I'm **Sachi**, a CS & Economics student at **Barnard College of Columbia University**, continuing into a 4+1 MS in CS on the Machine Learning pathway. I care about writing clean, efficient code that solves real problems.";

export const whatIDo =
  "I enjoy building agentic systems and working on backend/cloud infrastructure. Most recently I worked on observability and agent tooling for a data and AI platform at **Goldman Sachs**. Before that I built cloud cost-optimization tools at DTCC and did research on prediction markets and NLP/LLM evaluation. Now I'm developing multi-agent LLM systems at Columbia Build Lab. I'm actively looking for **2027 summer internships** in AI/ML and SWE roles.";

export const beyondCode =
  "When I'm not coding, I'm probably DJing, curating Spotify playlists, hunting for new coffee/matcha spots, or scrolling on Beli for restaurant recs. I also shoot film-style photography on my Fujifilm — check out some shots in the [photos](/photos) tab.";

export interface Experience {
  // Terminal file name; roles sharing a file are shown together.
  file: string;
  role: string;
  company: string;
  period: string;
  description: string;
  logo: string;
}

export const experiences: Experience[] = [
  {
    file: 'build-lab.txt',
    role: 'Software Engineer – Kernel',
    company: 'Columbia Build Lab',
    period: 'Sep. 2026 – Present',
    description: 'Building a multi-agent LLM system to detect and resolve conflicting customer records across pharma data sources. Developing a web-scraping agent and a source-agnostic data pipeline feeding a human-in-the-loop review queue.',
    logo: '/images/logos/columbia.png',
  },
  {
    file: 'goldman.txt',
    role: 'Software Engineering Intern',
    company: 'Goldman Sachs',
    period: 'Jun. 2026 – Aug. 2026',
    description: 'Architected SRE observability infrastructure for a Python data/AI platform serving 15+ teams. Deployed OTel Collector, Prometheus, and Grafana on ECS Fargate. Built MCP tooling that lets agents query lakehouse data to assist with metric creation, dashboards, and alerting.',
    logo: '/images/logos/goldman.png',
  },
  {
    file: 'dtcc.txt',
    role: 'Software Engineering Intern',
    company: 'Depository Trust & Clearing Corporation',
    period: 'Jun. 2025 – Aug. 2025',
    description: 'Built internal automation detecting idle EC2/EBS volumes across 25+ SYSIDs, driving $350K in annualized savings. Developed MVP cost-savings dashboard integrating CloudAware and AWS Cost Explorer data.',
    logo: '/images/logos/dtcc.png',
  },
  {
    file: 'research.txt',
    role: 'Research Assistant',
    company: 'Rajiv Sethi Lab, Barnard College',
    period: 'Jan. 2024 – Present',
    description: "Scraped Polymarket probabilities across 41 electoral events. Implemented trading strategy simulations comparing forecasting models vs. market accuracy. Co-authored paper published in ACM CI '25.",
    logo: '/images/logos/barnard.png',
  },
  {
    file: 'csc.txt',
    role: 'Senior Computing Fellow',
    company: 'Barnard Computational Science Center',
    period: 'Aug. 2024 – Present',
    description: 'Mentored 120+ students in Python, R, and MATLAB across 3 data science courses. Led 30+ office hours sessions and designed 3 workshops on data wrangling, visualization, and scripting.',
    logo: '/images/logos/barnard.png',
  },
  {
    file: 'research.txt',
    role: 'Research Assistant',
    company: 'Martina Jasova Lab, Barnard College',
    period: 'Jul. 2024 – Dec. 2024',
    description: 'Built text extraction pipeline parsing 12K+ pages of bank reports. Integrated GPT-4o mini for ESG sentiment classification with batched inference and exponential backoff.',
    logo: '/images/logos/barnard.png',
  },
];
