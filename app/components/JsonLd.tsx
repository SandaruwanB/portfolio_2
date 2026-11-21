import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://sandaruwanbandara.dev/#website",
        url: "https://sandaruwanbandara.dev",
        name: "Sandaruwan Bandara — Software Architect & Principal Systems Engineer",
        description:
          "Architecting high-throughput, fault-tolerant distributed systems, enterprise platforms, and cloud performance.",
        author: {
          "@id": "https://sandaruwanbandara.dev/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://sandaruwanbandara.dev/#person",
        name: "Sandaruwan Bandara",
        jobTitle: "Principal Software Engineer & Software Architect",
        url: "https://sandaruwanbandara.dev",
        sameAs: [
          "https://github.com/SandaruwanB",
          "https://www.youtube.com/@SoftwareWithSandaru",
        ],
        knowsAbout: [
          "Distributed Systems",
          "Enterprise Architecture",
          "High Throughput Backends",
          "Java",
          "Node.js",
          "Microservices",
          "Cloud Architecture",
          "Odoo ERP",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
