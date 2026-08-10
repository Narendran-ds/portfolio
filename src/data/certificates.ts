export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  date: string; // display date, e.g. "2026 04"
  description: string;
  file: string; // path under /public
  mark: string; // 2-letter mark for the designed cover
  variant: number; // cover palette 0-3, see ProjectCover / CertificateCover
};

export const certificates: Certificate[] = [
  {
    slug: "syncorb-internship",
    title: "Internship Completion",
    issuer: "Syncorb Geotech Pvt Ltd",
    date: "2026",
    description:
      "Certified for completing an AI Intern role in the Technology department — 8 Oct 2025 to 8 May 2026 — building AI-based solutions, data pipelines and ML-driven automation.",
    file: "/certificates/syncorb-internship-completion-certificate.pdf",
    mark: "SG",
    variant: 0,
  },
  {
    slug: "cognizant-technoverse-hackathon",
    title: "Technoverse Hackathon",
    issuer: "Cognizant",
    date: "2026",
    description:
      "Certificate of appreciation for participating in the Cognizant Technoverse Hackathon 2026.",
    file: "/certificates/cognizant-technoverse-hackathon-2026.pdf",
    mark: "CG",
    variant: 2,
  },
];
