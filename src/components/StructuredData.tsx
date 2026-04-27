interface WebSiteSchema {
  name: string;
  url: string;
  description: string;
  alternateName?: string;
}

interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

export function WebSiteStructuredData({ name, url, description, alternateName }: WebSiteSchema) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    alternateName,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationStructuredData({ name, url, logo, description }: OrganizationSchema) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs: [
      "https://twitter.com/medlenspro",
      "https://linkedin.com/company/medlenspro",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
