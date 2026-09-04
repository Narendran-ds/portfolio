export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  date: string; // display date, e.g. "2026 04"
  oneLiner: string;
  story: string[]; // detail-page paragraphs
  highlights?: string[];
  file: string; // path under /public
  mark: string; // 2-letter mark for the designed cover
  variant: number; // cover palette 0-3, see ProjectCover / CertificateCover
};

export const certificates: Certificate[] = [
  {
    slug: "syncorb-internship",
    title: "Internship Completion",
    issuer: "Syncorb Geotech Pvt Ltd",
    date: "2026 04",
    oneLiner:
      "Built Gemini-powered data pipelines and OCR-based extraction systems as an AI Intern — replacing broken scrapers and prototypes with production systems.",
    story: [
      "Awarded on completion of an AI Intern role in the Technology department at Syncorb Geotech Pvt Ltd, covering the period from 8 October 2025 to 8 May 2026.",
      "The internship centred on building AI-based solutions end to end: Gemini-powered data pipelines, OCR-based extraction systems, and automation work aimed at improving data analysis and decision-making processes for the team.",
      "Signed off by Saddam Hussain (Project Manager) and Syed Mohammed Buhari (Director), Syncorb Geotech Private Limited.",
    ],
    highlights: [
      "Replaced 5 Scrapy spiders with a single Gemini API pipeline",
      "Rebuilt the menu-extraction pipeline from scratch with PaddleOCR",
      "Added history tracking that skips completed entries on reruns",
    ],
    file: "/certificates/syncorb-internship-completion-certificate.pdf",
    mark: "SG",
    variant: 0,
  },
  {
    slug: "cognizant-technoverse-hackathon",
    title: "Technoverse Hackathon",
    issuer: "Cognizant",
    date: "2026",
    oneLiner: "Took part in Cognizant's national-level Technoverse Hackathon 2026 — a fast-paced, build-and-pitch sprint.",
    story: [
      "Certificate of appreciation awarded by Cognizant in recognition of participation in the Cognizant Technoverse Hackathon 2026.",
      "Signed by Rajesh Varrier (President — Global Operations, Chairman and Managing Director, Cognizant India) and Atul Sahgal (Senior Vice President, Talent Acquisition).",
    ],
    file: "/certificates/cognizant-technoverse-hackathon-2026.pdf",
    mark: "CG",
    variant: 2,
  },
  {
    slug: "foundations-of-modern-ai",
    title: "Foundations of Modern AI",
    issuer: "Cognizant Skillspring",
    date: "2026 07",
    oneLiner:
      "Studied the core architectures and concepts underpinning today's AI systems, from neural networks to modern model design.",
    story: [
      "Certificate of completion awarded by Cognizant Skillspring on 25 July 2026 for completing Foundations of Modern AI.",
      "Covered the building blocks behind contemporary AI systems — the concepts and architectures that modern generative and agentic tools are built on.",
    ],
    file: "/certificates/foundations-of-modern-ai.pdf",
    mark: "MA",
    variant: 1,
  },
  {
    slug: "fundamentals-of-generative-ai",
    title: "Fundamentals of Generative AI",
    issuer: "Cognizant Skillspring",
    date: "2026 07",
    oneLiner:
      "Learned how generative models work under the hood — from training approaches to practical use cases across text, image, and code generation.",
    story: [
      "Certificate of completion awarded by Cognizant Skillspring on 23 July 2026 for completing Fundamentals of Generative AI.",
      "Covered how generative AI models are trained and applied, forming the groundwork used later in the Gemini-powered pipelines built during the Syncorb internship.",
    ],
    file: "/certificates/fundamentals-of-generative-ai.pdf",
    mark: "GA",
    variant: 3,
  },
  {
    slug: "github-copilot-fundamentals",
    title: "GitHub Copilot Fundamentals Virtual Training",
    issuer: "Cognizant Skillspring",
    date: "2026 07",
    oneLiner:
      "Trained on pairing effectively with GitHub Copilot — prompting it inside the editor to move faster without losing code quality.",
    story: [
      "Certificate of completion awarded by Cognizant Skillspring on 23 July 2026 for completing GitHub Copilot Fundamentals Virtual Training.",
      "Covered practical workflows for AI-assisted coding with GitHub Copilot, directly applied in day-to-day development.",
    ],
    file: "/certificates/github-copilot-fundamentals.pdf",
    mark: "GC",
    variant: 0,
  },
  {
    slug: "introduction-to-agentic-ai",
    title: "Introduction to Agentic AI",
    issuer: "Cognizant Skillspring",
    date: "2026 07",
    oneLiner:
      "Explored how autonomous AI agents plan, use tools, and act on multi-step tasks — the concepts behind the automation systems built at Syncorb.",
    story: [
      "Certificate of completion awarded by Cognizant Skillspring on 23 July 2026 for completing Introduction to Agentic AI.",
      "Covered the shift from single-shot AI responses to agents that reason, call tools, and complete multi-step workflows on their own.",
    ],
    file: "/certificates/introduction-to-agentic-ai.pdf",
    mark: "AA",
    variant: 2,
  },
  {
    slug: "itpm-introduction-to-agile",
    title: "ITPM — Introduction to Agile [101-Basics]",
    issuer: "Cognizant Skillspring",
    date: "2026 07",
    oneLiner:
      "Learned Agile project management fundamentals — sprints, backlogs, and iterative delivery — as the basis for working in structured dev teams.",
    story: [
      "Certificate of completion awarded by Cognizant Skillspring on 24 July 2026 for completing ITPM - Introduction to Agile [101-Basics].",
      "Covered the fundamentals of Agile IT project management, including sprint planning, backlog management, and iterative delivery cycles.",
    ],
    file: "/certificates/itpm-introduction-to-agile.pdf",
    mark: "IA",
    variant: 1,
  },
  {
    slug: "prompt-engineering-foundation",
    title: "Prompt Engineering Foundation",
    issuer: "Cognizant Skillspring",
    date: "2026 07",
    oneLiner:
      "Built a systematic approach to prompting LLMs reliably — structuring instructions and context to get consistent, high-quality outputs.",
    story: [
      "Certificate of completion awarded by Cognizant Skillspring on 26 July 2026 for completing Prompt Engineering Foundation.",
      "Covered core prompt-design techniques for getting consistent, high-quality outputs from large language models — skills used directly in building the Gemini-based pipelines at Syncorb.",
    ],
    file: "/certificates/prompt-engineering-foundation.pdf",
    mark: "PE",
    variant: 3,
  },
  {
    slug: "selenium-interactive-course",
    title: "Selenium Interactive Course [101-Basic]",
    issuer: "Cognizant Skillspring",
    date: "2026 07",
    oneLiner:
      "Learned browser automation and testing fundamentals with Selenium — locating elements, driving interactions, and scripting test flows.",
    story: [
      "Certificate of completion awarded by Cognizant Skillspring on 26 July 2026 for completing Selenium Interactive Course [101-BASIC].",
      "Covered the fundamentals of browser automation with Selenium, including element location strategies and scripted UI test flows.",
    ],
    file: "/certificates/selenium-interactive-course.pdf",
    mark: "SC",
    variant: 0,
  },
];

export function getCertificate(slug: string) {
  return certificates.find((c) => c.slug === slug);
}
