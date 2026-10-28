// Text supports **highlight** and [label](href) markup, rendered by RichText.

export const profile = {
  name: 'Sachi Patel',
  school: "CS & Economics @ **Barnard College of Columbia University** ('27), continuing into a 4+1 MS in CS on the Machine Learning pathway @ **Columbia** ('28).",
  status: 'seeking 2027 summer internships',
  location: 'New York, NY',
  pronouns: 'she/her',
};

export const whoAmI =
  "I'm **Sachi**, a CS & Economics student at **Barnard College of Columbia University**, continuing into a 4+1 MS in CS on the Machine Learning pathway. I care about writing clean, efficient code that solves real problems.";

export const whatIDo =
  "I enjoy building agentic systems and working on backend/cloud infrastructure. Most recently I worked on observability and agent tooling for a data and AI platform at **Goldman Sachs**. Before that I built cloud cost-optimization tools at DTCC and did research on prediction markets and NLP/LLM evaluation. Now I'm developing multi-agent LLM systems at Columbia Build Lab. I'm actively looking for **2027 summer internships** in AI/ML and SWE roles.";

export const beyondCode =
  "When I'm not coding, I'm probably DJing, curating Spotify playlists, hunting for new coffee/matcha spots, or scrolling on Beli for restaurant recs. I also shoot film-style photography on my Fujifilm.";

export const factSheet: [string, string][] = [
  ['name', profile.name],
  ['focus', 'Agents · Backend · Cloud'],
  ['b.a.', "CS & Econ, Barnard '27"],
  ['m.s.', "CS (ML), Columbia '28"],
  ['location', profile.location],
  ['status', 'open to 2027 internships'],
];

export const currently = ['building multi-agent LLM systems', 'at Columbia Build Lab.'];

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  // Either one list of bullets, or labeled groups for several roles collapsed into one block.
  bullets?: string[];
  groups?: { label: string; period: string; bullets: string[] }[];
}

// Reverse chronological by start date.
export const experiences: Experience[] = [
  {
    role: 'Software Engineer – Kernel',
    company: 'Columbia Build Lab',
    period: 'Sep. 2026 – Present',
    location: 'New York, NY',
    bullets: [
      'Building a multi-agent LLM system that detects and resolves conflicting customer records across pharma data sources.',
      'Developing a web-scraping agent that parses hospital webpages for evidence of clinic-to-health-system ownership.',
      'Building a source-agnostic data pipeline (Supabase, AWS S3, Doppler) that feeds a human-in-the-loop review queue.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Goldman Sachs',
    period: 'Jun. 2026 – Aug. 2026',
    location: 'New York, NY',
    bullets: [
      'Architected SRE observability infrastructure in AWS CDK and Terraform for a Python data/AI platform serving 15+ teams.',
      'Deployed OTel Collector, Prometheus, Grafana, and CloudWatch Exporter services on ECS Fargate for metric aggregation.',
      'Collected 99 application and infrastructure metrics and ingested them into a lakehouse DB for long-term analytics.',
      'Built MCP tooling for querying lakehouse data, with agent skills that assist custom metric creation, dashboards, and alerting.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Depository Trust & Clearing Corporation',
    period: 'Jun. 2025 – Aug. 2025',
    location: 'Jersey City, NJ',
    bullets: [
      'Built internal automation detecting idle EC2/EBS resources across 25+ SYSIDs; its alerts drove $350K in annualized savings.',
      'Developed an MVP cost-savings dashboard (Python, Flask, REST APIs) integrating CloudAware and AWS Cost Explorer data.',
      'Drove decommissioning of 200+ idle resources org-wide by presenting cost insights to CloudOps teams and SYSID owners.',
    ],
  },
  {
    role: 'Senior Computing Fellow',
    company: 'Barnard Computational Science Center',
    period: 'Aug. 2024 – Present',
    location: 'New York, NY',
    bullets: [
      'Mentored 120+ students in Python, R, and MATLAB across 3 data science courses, debugging code and guiding final projects.',
      'Designed and led 3 workshops with modular Colab exercises on data wrangling, visualization, and scripting; ran 30+ office hours.',
    ],
  },
  {
    role: 'Research Assistant',
    company: 'Barnard College',
    period: 'Jan. 2024 – Present',
    location: 'New York, NY',
    groups: [
      {
        label: 'Rajiv Sethi Lab',
        period: 'Jan. 2024 – Present',
        bullets: [
          'Built a Python/BeautifulSoup pipeline scraping prediction-market and model probabilities across 41 events.',
          'Implemented profitability tests in Python/MATLAB simulating trading strategies to compare model vs. market accuracy.',
          "Co-authored a paper finding FiveThirtyEight beat Polymarket by 17.9% on the popular vote, published in ACM CI '25.",
        ],
      },
      {
        label: 'Martina Jasova Lab',
        period: 'Jul. 2024 – Dec. 2024',
        bullets: [
          'Built a text-extraction pipeline parsing 12K+ pages of bank reports.',
          'Integrated GPT-4o mini for ESG sentiment classification, with batched inference and exponential-backoff retries.',
        ],
      },
    ],
  },
];
