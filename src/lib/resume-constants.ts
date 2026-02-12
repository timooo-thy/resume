export const PROJECTS = [
  {
    name: "CodeOrient 2026",
    description:
      "AI-powered code navigation tool helping developers understand codebases through natural language queries. Features semantic code search, interactive graph visualisation of file dependencies, RAG-based repository indexing, and contextual AI chat. Built with Next.js, OpenAI, React Flow, and Upstash for vector search and caching.",
    technologies: [
      "Next.js",
      "React Flow",
      "PostgreSQL",
      "Prisma",
      "Upstash",
      "LangChain",
      "Vercel AI SDK",
    ],
    url: "https://github.com/timooo-thy/ai-search",
    image: "/projects/codeorient.png",
  },
  {
    name: "HTX Sentinel 2024",
    description:
      "Developed a comprehensive security platform featuring real-time object detection using YOLOv11, Llama 3.2, Florence, and SAM2 models. Implemented an automated training pipeline for CV models and built an interactive admin dashboard with live patrol mapping and incident tracking. Leveraged DeepSort for object reidentification to support efficient policing operations.",
    technologies: ["YOLOv11", "Llama 3.2", "Florence", "SAM2", "DeepSort"],
    url: "https://github.com/timooo-thy/htx-hackx",
  },
  {
    name: "URL Shortener 2024",
    description:
      "Developed a URL shortener using Golang and PostgreSQL, implementing a RESTful API for efficient URL management. Enhanced user experience with link expiry and fast redirects with Redis cache. Deployed on Vercel for scalability and reliability.",
    technologies: ["Golang", "Next.js", "Redis", "PostgreSQL", "Prisma"],
    url: "https://github.com/timooo-thy/url-shortener-go",
  },
  {
    name: "Recommendation System Anomaly Detection 2024",
    description:
      "Competed in a machine learning competition, achieving a 94% anomaly detection AUC-ROC score by employing deep neural networks, logistic regression, and one-class SVM. Enhanced model performance through extensive feature engineering, utilising techniques such as SMOTE and ELU, successfully identifying and mitigating anomalies in a recommendation system.",
    technologies: ["Deep Neural Networks", "Logistic Regression"],
    url: "https://github.com/timooo-thy/CS421-ML-Competition",
  },
  {
    name: "SG Read Already? 2023",
    description:
      "Developed and deployed 'SG read already?', a web application enhancing accessibility with document summarisation and scan-to-speech for the visually impaired, using Next.js. Led the creation of an accessible platform for enhanced document understanding, catering to elderlies and individuals with visual challenges, demonstrating commitment to digital inclusivity.",
    technologies: ["Next.js", "OpenAI API"],
    url: "https://github.com/timooo-thy/sg-read-already",
  },
  {
    name: "AI Product Chatbot 2023",
    description:
      "Designed a conversational AI Streamlit Python app using Langchain and Hugging Face models. Enhanced user experience by incorporating features like Conversational Memory, dynamic interaction, and session management, improving context awareness and user experience. Utilised Retrieval Augmented Generation for precise and relevant real-time FAQ responses.",
    technologies: ["Streamlit", "Python", "Langchain", "Hugging Face"],
    url: "https://github.com/timooo-thy/pyChatBot",
  },
  {
    name: "Singapore University Guide 2023",
    description:
      "Designed, developed, and deployed a comprehensive university guide using the MERN stack. Integrated modern UX techniques, responsive design, ensuring an engaging user experience. Seamlessly incorporated OAuth, email notifications, and OpenAI's GPT API.",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "OAuth",
      "OpenAI API",
    ],
    url: "https://github.com/timooo-thy/university-guide",
  },
  {
    name: "AI Text Summariser 2023",
    description:
      "Integrated SERP and OpenAI's GPT API in Python to automate article curation and summarisation for optimised Instagram content, employing Langchain for strategic information distillation. Enhanced social media engagement by transforming AI-condensed articles into compelling Instagram posts with targeted hashtags for amplified reach.",
    technologies: ["Python", "SERP API", "OpenAI API", "Langchain"],
    url: "https://github.com/timooo-thy/text-summariser",
  },
  {
    name: "AI Image Detection 2023",
    description:
      "Developed an interactive Streamlit Python app designed to enhance users' image journey by offering advanced features such as object detection, image captioning, and metadata tagging.",
    technologies: ["Streamlit", "Python"],
    url: "https://github.com/timooo-thy/image-detection",
  },
  {
    name: "News Classification 2023",
    description:
      "Harnessed the power of natural language processing using Keras, machine learning and deep learning to scrutinise news articles' credibility, yielding 95% accuracy rate on a dedicated dataset.",
    technologies: ["Keras", "Machine Learning", "Deep Learning"],
    url: "https://github.com/timooo-thy/fake-real-news-classifier",
  },
];

export const EXPERIENCES = [
  {
    role: "Machine Learning Engineer Intern",
    company: "Tiktok, Singapore",
    period: "Mar 2026",
    responsibilities: ["Incoming MLE at TikTok BRIC."],
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "Tiktok, Singapore",
    period: "Aug 2025 - Dec 2025",
    responsibilities: [
      "Engineered high-precision SLMs via Knowledge Distillation to capture user intent; applied a novel 'Random RAG' fine-tuning strategy for GeoIntent (0.90 P/R) and semantic query analysis for Timeliness (0.96 P/R).",
      "Designed and deployed a near-line cache architecture across 16 countries (US, EU, ROW) to serve these query intent signals in real-time.",
      "Empowered downstream Ranking and Retrieval to optimise local discovery: prioritising location-based services relative to user GPS and ensuring content validity for time-sensitive queries (e.g., promos, operating status).",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Goldman Sachs, Singapore",
    period: "May 2025 – Aug 2025",
    responsibilities: [
      "Engineered a Policy Builder Playground for authorisation policies, featuring custom syntax highlighting, collaborative sharing, and an integrated chatbot delivering 95% compilable, best-practice code.",
      "Developed a graph-based Self Healing Code Agent leveraging Retrieval Augmented Generation, enabling automated code correction and optimisation for an internal language.",
      "Designed and implemented the backend for the agent end-to-end, from architecture to deployment on Kubernetes, ensuring scalable and robust performance.",
    ],
  },
  {
    role: "Machine Learning Researcher Intern",
    company:
      "Digital Trust Centre, Nanyang Technological University, Singapore",
    period: "Jul 2024 – Dec 2024",
    responsibilities: [
      "Led development of secure AI systems, researching and implementing ML defences against adversarial attacks via Machine Unlearning.",
      "Research areas include Machine Unlearning, Backdoor Detection in AI.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "ShopBack, Singapore",
    period: "Jul 2024 – Dec 2024",
    responsibilities: [
      "Spearheaded implementation of Generative AI solutions to optimise internal operations, reducing average handling time (AHT) from 365 seconds to 200 seconds, resulting in a 45% improvement in agent efficiency and customer satisfaction.",
      "Developed a prompt management version control platform integrating Salesforce and Zendesk, resulting in 80% improved consistency, 60% faster workflows, and 30% higher first-contact resolution rates across all customer service channels.",
    ],
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "Home Team Science & Technology Agency, Singapore",
    period: "Apr 2024 – Jul 2024",
    responsibilities: [
      "Developed a multimodal large language model chatbot using open-source LLMs like LLaVA, Whisper, LLaMA3, enhancing government case management by over 40%.",
      "Implemented memory capabilities and response streaming and optimised query retrieval using Langchain and Chroma DB via Retrieval Augmented Generation and advanced metadata filtering.",
      "Finetuned a LLaMA3 large language model using QLoRA with domain knowledge, improving accuracy by 30% after evaluation.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Siftee, Singapore",
    period: "Dec 2023 - Mar 2024",
    responsibilities: [
      "Engineered SEO-optimised web applications using Nuxt.js, mastering state management and dynamic data rendering to enhance user experience and interface responsiveness.",
      "Implemented secure cloud infrastructure using Google Cloud Platform, integrating Stripe for transactions. Optimised data operations and storage, boosting retrieval speed by 40% and transaction success rates by 25%.",
      "Leveraged OpenAI with Python to automate ETL tasks, boosting backend efficiency by 50% and ensuring scalable data transformation and integration workflows.",
    ],
  },
  {
    role: "Cloud Engineer Intern",
    company: "Singapore Land Authority, Singapore",
    period: "May 2023 - Aug 2023",
    responsibilities: [
      "Spearheaded the Proof of Concept (POC) on Microsoft Azure and led data virtualisation initiatives utilising geospatial insights via Denodo, elevating data accessibility and fostering enriched insights.",
      "Designed user-centric dashboards to transform intricate data into actionable insights tailored to users' needs using MicroStrategy.",
    ],
  },
];

export const EDUCATIONS = [
  {
    degree: "Bachelor of Computing - Data Science & Artificial Intelligence",
    school: "Nanyang Technological University",
    year: "Aug 2022 - Current",
    gpa: "CGPA: 4.75/5.00",
    description:
      "Exchange: Singapore Management University (Grade: 4.0/4.0), University of Waterloo (Grade: 3.8/4.0).",
  },
  {
    degree: "Diploma with Merit - Engineering Science",
    school: "Ngee Ann Polytechnic, Singapore",
    year: "Apr 2017 - Apr 2020",
    gpa: "GPA: 3.99/4.00",
    description:
      "Awards: Terasaki Electric Medal, Ngee Ann Scholarship. Diploma Plus in Advanced Engineering Mathematics.",
  },
];

export const SKILLS: Record<string, string[]> = {
  Languages: ["TypeScript", "Python", "Golang", "SQL", "NoSQL", "R"],
  "Frameworks & Libraries": ["React.js", "Next.js", "Langchain", "Langgraph"],
  "Cloud & DevOps": [
    "AWS",
    "Microsoft Azure",
    "Google Cloud Platform",
    "Docker",
    "Kubernetes",
  ],
};

export const AWARDS = [
  "Nanyang Technological College Scholarship",
  "BIGO Excellence Scholarship",
  "Dean's List (AY 2023/2024)",
  "SimplifyNext RPA x Gen AI 2024 (1st Place)",
  "DSTA BrainHack 2024 (1st Runner Up)",
  "GIC Code To Impact 2024 (2nd Runner Up)",
  "HTX HacX 2024 (3rd Runner Up)",
  "The Complete Web Development Bootcamp",
  "Google Analytics Specialisation",
  "Google UX Specialisation",
  "MySQL for Data Analytics and Business Intelligence",
];

export const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/timooo-thy",
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: "https://sg.linkedin.com/in/timooothy",
    icon: "linkedin" as const,
  },
  {
    label: "Email",
    href: "mailto:timothylhy@hotmail.com",
    icon: "mail" as const,
  },
];
