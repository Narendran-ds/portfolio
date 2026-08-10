export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  date: string; // display date, e.g. "2026 04"
  oneLiner: string;
  story: string[]; // detail-page paragraphs
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
      "Certified for completing an AI Intern role in the Technology department, building AI-based solutions and ML-driven automation.",
    story: [
      "Awarded on completion of an AI Intern role in the Technology department at Syncorb Geotech Pvt Ltd, covering the period from 8 October 2025 to 8 May 2026.",
      "The internship centred on building AI-based solutions end to end: Gemini-powered data pipelines, OCR-based extraction systems, and automation work aimed at improving data analysis and decision-making processes for the team.",
      "Signed off by Saddam Hussain (Project Manager) and Syed Mohammed Buhari (Director), Syncorb Geotech Private Limited.",
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
    oneLiner: "Certificate of appreciation for participating in the Cognizant Technoverse Hackathon 2026.",
    story: [
      "Certificate of appreciation awarded by Cognizant in recognition of participation in the Cognizant Technoverse Hackathon 2026.",
      "Signed by Rajesh Varrier (President — Global Operations, Chairman and Managing Director, Cognizant India) and Atul Sahgal (Senior Vice President, Talent Acquisition).",
    ],
    file: "/certificates/cognizant-technoverse-hackathon-2026.pdf",
    mark: "CG",
    variant: 2,
  },
];

export function getCertificate(slug: string) {
  return certificates.find((c) => c.slug === slug);
}
