type PersonSchemaProps = {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
  alumniOf?: {
    name: string;
    url: string;
  };
  knowsAbout?: string[];
};

function generatePersonSchema({
  name,
  url,
  image,
  jobTitle,
  sameAs,
  alumniOf,
  knowsAbout,
}: PersonSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    ...(image && { image }),
    ...(jobTitle && { jobTitle }),
    ...(sameAs && { sameAs }),
    ...(alumniOf && {
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: alumniOf.name,
        url: alumniOf.url,
      },
    }),
    ...(knowsAbout && { knowsAbout }),
  };
}

type WebsiteSchemaProps = {
  name: string;
  url: string;
  description?: string;
  author?: {
    name: string;
    url: string;
  };
};

function generateWebsiteSchema({
  name,
  url,
  description,
  author,
}: WebsiteSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    ...(description && { description }),
    ...(author && {
      author: {
        "@type": "Person",
        name: author.name,
        url: author.url,
      },
    }),
  };
}

type BlogPostingSchemaProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  image?: string;
};

export function generateBlogPostingSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: BlogPostingSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Person",
      name: "Timothy Lee",
      url: "https://timooothy.dev",
    },
  };
}

type BreadcrumbSchemaProps = {
  items: Array<{
    name: string;
    url: string;
  }>;
};

export function generateBreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  const schema = generatePersonSchema({
    name: "Timothy Lee",
    url: "https://timooothy.dev",
    jobTitle: "ML Engineer & Software Developer",
    sameAs: [
      "https://github.com/timooo-thy",
      "https://linkedin.com/in/timooothy",
    ],
    alumniOf: {
      name: "Nanyang Technological University",
      url: "https://www.ntu.edu.sg",
    },
    knowsAbout: [
      "Machine Learning",
      "Software Engineering",
      "Web Development",
      "Python",
      "React",
      "TypeScript",
      "Artificial Intelligence",
    ],
  });

  return <JsonLdScript data={schema} />;
}

export function WebsiteJsonLd() {
  const schema = generateWebsiteSchema({
    name: "Timothy Lee Portfolio",
    url: "https://timooothy.dev",
    description:
      "Timothy Lee is an aspiring ML Engineer and Software Developer specialising in machine learning, scalable applications, and modern web development.",
    author: {
      name: "Timothy Lee",
      url: "https://timooothy.dev",
    },
  });

  return <JsonLdScript data={schema} />;
}
