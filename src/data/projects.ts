export type Project = {
  slug: string;
  title: string;
  date: string; // display date, e.g. "2025 08"
  categories: string[];
  tags: string[]; // languages + tools shown as pills
  oneLiner: string;
  story: string[]; // detail-page paragraphs
  highlights?: string[];
  live?: string;
  github?: string;
  featured?: boolean;
  /** cover art variant 0-3 */
  variant: number;
  /** short mark used on the designed cover */
  mark: string;
};

export const projects: Project[] = [
  {
    slug: "tracex",
    title: "TraceX",
    date: "2026 09",
    categories: ["Full Stack", "Blockchain"],
    tags: ["Python", "FastAPI", "React", "TypeScript", "SQLite", "Tailwind"],
    oneLiner: "From a scam victim's wallet address to a confidence-scored, evidence-backed cash-out report — in under a second.",
    story: [
      "When someone loses money to a crypto scam, the investigating officer gets exactly one lead: a wallet address. From there they need to know where the money went and which exchange cashed it out — normally a manual, multi-hour trace through a block explorer that a scammer splitting funds across 300 addresses can make practically impossible.",
      "TraceX automates that trail: a multi-hop transaction graph clusters hundreds of addresses down to a handful of actors, a seven-signal rule engine flags laundering patterns, and every ranked exchange exit comes with sourced evidence, not a guess. It's built for a legal case file, so it's a hand-tuned rule engine rather than a model — an investigator, and eventually a court, can interrogate exactly why it reached a conclusion. When a trail hits a cross-chain bridge it reports the dead end instead of inventing a destination.",
      "Built for Smart India Hackathon 2026 (SIH26183, Blockchain & Cybersecurity, Ministry of Home Affairs) with 170+ backend tests and a labelled evaluation harness — 16/16 cases matched, 100% precision and recall, zero false positives.",
    ],
    highlights: ["100% precision/recall across 16 labelled cases, zero false positives", "Every flagged pattern traceable to source transaction hashes", "Built for Smart India Hackathon 2026 — SIH26183"],
    github: "https://github.com/Narendran-ds/TraceX",
    featured: true,
    variant: 2,
    mark: "TX",
  },
  {
    slug: "zipforgex",
    title: "ZipForgeX",
    date: "2025 08",
    categories: ["Full Stack", "Live Product"],
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Railway", "Vercel"],
    oneLiner: "Describe a folder structure, get it as a ready-to-use ZIP — live with real users.",
    story: [
      "Developers waste a surprising amount of time hand-creating folder structures for new projects — the same src/, tests/, config skeletons, over and over. ZipForgeX turns a text description of a structure into a downloadable ZIP in seconds.",
      "It's a complete production system, not a demo: a Spring Boot REST API with JWT and OAuth2 authentication, a React frontend, PostgreSQL for accounts and generation history, and a custom domain at zipforgex.in. The backend runs on Railway, the frontend on Vercel, DNS through Cloudflare.",
      "Every generated ZIP is tracked per user, so you can re-download past structures. Shipping it end-to-end — auth flows, CORS, cold starts, domain config — taught me more than any tutorial could.",
    ],
    highlights: ["Live at zipforgex.in with real users", "JWT + OAuth2 auth", "Per-user ZIP history"],
    live: "https://zipforgex.in",
    featured: true,
    variant: 0,
    mark: "ZF",
  },
  {
    slug: "chainsight",
    title: "ChainSight",
    date: "2026 05",
    categories: ["Computer Vision", "AI Reasoning"],
    tags: ["Python", "YOLOv8", "ByteTrack", "Shapely", "NetworkX", "Gemini", "Streamlit"],
    oneLiner: "Warehouse-safety reasoning over recorded video — from detection to plain-English incident reports.",
    story: [
      "ChainSight is a safety-reasoning pipeline for a single fixed warehouse camera, run offline over recorded video. It detects people and equipment with YOLOv8, tracks them across frames with ByteTrack, reasons about zones and proximity with Shapely, and builds a scene graph of the whole clip with NetworkX.",
      "Five deterministic safety rules are evaluated against that graph — and whatever fires gets turned into plain-English narration by Gemini, all browsable afterwards in a Streamlit demo.",
      "The deliberate design choice: only the detector is a trained model. Everything after YOLOv8 — tracking, spatial reasoning, the scene graph, the rule engine — is deterministic, non-learned Python. Every rule decision is traceable back to explicit code, which is exactly what you want in a safety system. 58 tests keep it honest.",
    ],
    highlights: ["58 tests passing", "Deterministic rule engine — every decision traceable", "Scene-graph reasoning over video"],
    github: "https://github.com/Narendran-ds/chainsight",
    featured: true,
    variant: 1,
    mark: "CS",
  },
  {
    slug: "bizop-analytica",
    title: "BizOp Analytica",
    date: "2025 12",
    categories: ["GenAI", "Internship"],
    tags: ["Python", "Gemini API", "PaddleOCR", "FastAPI"],
    oneLiner: "Production menu-extraction pipeline built at Syncorb — one Gemini workflow replaced five scrapers.",
    story: [
      "Built during my AI developer internship at Syncorb Geotech. The team needed structured restaurant and cuisine data at scale, but it was locked in menu images and scattered websites — maintained by manual BeautifulSoup scripts and five separate Scrapy spiders that kept breaking.",
      "I replaced all of it with a single Gemini API pipeline that generates 500+ global cuisines and up to 500 dishes per cuisine, with a history-tracking system that skips completed entries on reruns — no repeated processing, no babysitting.",
      "When Zomato restricted API access mid-project, I rebuilt the menu-extraction side from scratch on PaddleOCR, replacing a broken 70%-complete prototype with a folder-based batch system that ran on real client data in production.",
    ],
    highlights: ["Replaced 5 scrapers with one pipeline", "500+ cuisines generated", "Rebuilt OCR pipeline after API access was cut"],
    featured: true,
    variant: 2,
    mark: "BA",
  },
  {
    slug: "churn-xai",
    title: "Churn Prediction, Explained",
    date: "2025 04",
    categories: ["Machine Learning"],
    tags: ["Python", "XGBoost", "SHAP", "scikit-learn", "Streamlit"],
    oneLiner: "XGBoost churn model at ~81% accuracy — with a SHAP explanation behind every single prediction.",
    story: [
      "Businesses can't act on churn they can't see coming — and they won't act on a model they can't interrogate. This project pairs an XGBoost classifier (~81% accuracy) with SHAP explainability so every prediction comes with its reasons.",
      "The whole thing is wrapped in an interactive Streamlit dashboard built for non-technical users: upload customers, see who's at risk, and — crucially — see which factors (contract type, tenure, charges) are driving each individual prediction.",
      "It's my thesis about ML in one project: a model that can't explain itself doesn't ship.",
    ],
    highlights: ["~81% accuracy", "Per-prediction SHAP explanations", "Dashboard built for non-technical users"],
    github: "https://github.com/Narendran-ds/Customer-churn-prediction-with-XAI-",
    featured: true,
    variant: 3,
    mark: "CX",
  },
  {
    slug: "political-sentiment",
    title: "Political Sentiment Dashboard",
    date: "2025 02",
    categories: ["Machine Learning", "NLP"],
    tags: ["Python", "scikit-learn", "NLTK", "SHAP", "Tweepy"],
    oneLiner: "Six-tab ML dashboard tracking public sentiment across the Ukraine–Russia tweet dataset.",
    story: [
      "Tracking public sentiment on a geopolitical event across thousands of tweets is impossible manually. This project does it with classical ML done properly: NLTK preprocessing, TF-IDF features, and an SVM classifier hitting 78.75% accuracy on the Ukraine–Russia war tweet dataset.",
      "The results surface in a six-tab Streamlit dashboard — sentiment over time, top terms, model comparisons, and SHAP-backed feature analysis showing which words push a tweet positive or negative.",
    ],
    highlights: ["78.75% SVM accuracy", "Six-tab analysis dashboard", "SHAP feature analysis on text"],
    github: "https://github.com/Narendran-ds/Political-Sentiment-Analysis",
    featured: true,
    variant: 0,
    mark: "PS",
  },
  {
    slug: "en-fr-nmt",
    title: "EN→FR Transformer",
    date: "2024 11",
    categories: ["Deep Learning", "NLP"],
    tags: ["Python", "PyTorch", "Transformer", "seq2seq"],
    oneLiner: "A seq2seq transformer for English→French built from scratch in PyTorch — no pretrained weights.",
    story: [
      "You don't really understand attention until you've built it. This is a full English-to-French neural machine translation system written from scratch in PyTorch — embeddings, positional encoding, multi-head attention, the whole transformer — with zero pretrained models.",
      "It includes the complete training pipeline from raw parallel text to a trained model, plus an interactive CLI where you type an English sentence and watch it translate.",
      "A sibling repo (English-to-French-translator) explores the same problem with PyTorch's nn.Transformer module — building it both ways made the architecture click.",
    ],
    highlights: ["No pretrained weights — everything from scratch", "Full training pipeline", "Interactive translation CLI"],
    github: "https://github.com/Narendran-ds/english-french-nmt",
    featured: true,
    variant: 1,
    mark: "NM",
  },
  {
    slug: "retail-pipeline",
    title: "Retail Sales Pipeline",
    date: "2024 09",
    categories: ["Data Engineering"],
    tags: ["Python", "Pandas", "Plotly", "Parquet"],
    oneLiner: "ETL over 2019 retail sales into Parquet, visualised with five advanced Plotly charts.",
    story: [
      "Raw sales CSVs are messy — inconsistent types, junk rows, no structure. This pipeline cleans and transforms a full year of 2019 retail sales data into columnar Parquet, then turns it into five advanced Plotly visualisations: a choropleth map, 3D scatter, waterfall, violin plot, and heatmap.",
      "The point wasn't the charts — it was building a repeatable path from ugly raw data to analysis-ready storage to insight.",
    ],
    github: "https://github.com/Narendran-ds/retail-sales-2019-pipeline",
    featured: true,
    variant: 2,
    mark: "RP",
  },
  {
    slug: "emotion-detector",
    title: "Emotion Detector",
    date: "2024 07",
    categories: ["Computer Vision"],
    tags: ["Python", "Keras", "OpenCV"],
    oneLiner: "Real-time webcam facial emotion detection across eight emotion classes.",
    story: [
      "A real-time facial emotion detection app: OpenCV Haar cascades find faces in the webcam feed, and a Keras CNN classifies each face into one of eight emotions — angry, disgusted, fearful, happy, sad, surprised, neutral, contempt — overlaying the prediction on a live bounding box.",
    ],
    github: "https://github.com/Narendran-ds/emotion-detector",
    variant: 3,
    mark: "ED",
  },
  {
    slug: "greek-dishes-scraper",
    title: "Greek Dishes Scraper",
    date: "2024 06",
    categories: ["Data Engineering"],
    tags: ["Python", "Scrapy"],
    oneLiner: "Scrapy pipeline extracting structured Greek dish data into clean JSON/CSV datasets.",
    story: [
      "A production-style Scrapy project that crawls food websites and extracts structured information about Greek dishes — names, ingredients, details — exporting clean JSON and CSV datasets.",
      "Built with a modular spider architecture, environment-based config, and fast asynchronous crawling. Interesting footnote: this is exactly the class of scraper my later Gemini pipeline at Syncorb made obsolete — I've been on both sides of that trade.",
    ],
    github: "https://github.com/Narendran-ds/greek-dishes-scraper",
    variant: 0,
    mark: "GS",
  },
  {
    slug: "user-session-analysis",
    title: "User Session Analysis",
    date: "2024 04",
    categories: ["Data Engineering"],
    tags: ["Python", "Pandas"],
    oneLiner: "Big-data sessionization of raw event logs using a 30-minute inactivity window.",
    story: [
      "Raw user event logs aren't analysable until they're grouped into sessions. This project performs sessionization at scale with Pandas: events are grouped per user using a 30-minute inactivity threshold, then rolled up into session duration and event-count metrics — the foundation of any product-analytics stack.",
    ],
    github: "https://github.com/Narendran-ds/user-session-analysis",
    variant: 1,
    mark: "UA",
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1",
    date: "2024 12",
    categories: ["Full Stack"],
    tags: ["TypeScript", "Next.js", "Vercel"],
    oneLiner: "The previous iteration of this site — Next.js + TypeScript on Vercel.",
    story: [
      "The first version of my portfolio: Next.js with TypeScript, deployed on Vercel. Superseded by this site, but kept public — I like leaving the trail visible.",
    ],
    github: "https://github.com/Narendran-ds/portfolio",
    variant: 2,
    mark: "P1",
  },
  {
    slug: "cognizant-solutions",
    title: "Cognizant Solutions",
    date: "2025 06",
    categories: ["Practice"],
    tags: ["Python"],
    oneLiner: "Placement-prep coding solutions, kept public.",
    story: [
      "Solutions to Cognizant placement-prep coding problems. Small by design — it's a practice log, and practice logs belong in the open too.",
    ],
    github: "https://github.com/Narendran-ds/Cognizant_solutions",
    variant: 3,
    mark: "CG",
  },
  {
    slug: "dsa-problems",
    title: "DSA Problem Log",
    date: "2025 — ongoing",
    categories: ["Practice"],
    tags: ["Python"],
    oneLiner: "An ongoing log of data-structures & algorithms problem solving.",
    story: [
      "A running log of DSA problems solved in Python. Not glamorous — just the daily reps that make everything else possible.",
    ],
    github: "https://github.com/Narendran-ds/Problems-",
    variant: 0,
    mark: "DS",
  },
  {
    slug: "college-lab",
    title: "College Lab Work",
    date: "2024 — 2025",
    categories: ["Practice"],
    tags: ["JavaScript"],
    oneLiner: "University lab coursework, versioned like everything else.",
    story: [
      "College lab coursework in JavaScript, kept under version control like every other piece of code I write.",
    ],
    github: "https://github.com/Narendran-ds/2117230070097",
    variant: 1,
    mark: "LB",
  },
  {
    slug: "en-fr-translator",
    title: "EN→FR Translator (nn.Transformer)",
    date: "2024 10",
    categories: ["Deep Learning", "NLP"],
    tags: ["Python", "PyTorch"],
    oneLiner: "The same translation problem solved with PyTorch's nn.Transformer — with an interactive CLI.",
    story: [
      "A companion to my from-scratch NMT build: the same English→French translation task, this time using PyTorch's nn.Transformer module. Full training pipeline from raw text, then an interactive prompt where you type English and get French back.",
      "Building the architecture by hand and then with the framework module was the fastest way to understand what the framework is actually doing for you.",
    ],
    github: "https://github.com/Narendran-ds/English-to-French-translator",
    variant: 2,
    mark: "ET",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const allCategories = (() => {
  const counts = new Map<string, number>();
  for (const p of projects)
    for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()].map(([name, count]) => ({ name, count }));
})();

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
