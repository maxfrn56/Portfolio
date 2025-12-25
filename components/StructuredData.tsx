'use client';

export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maxime Farineau',
    jobTitle: 'Développeur Web Freelance',
    description: 'Créateur de site web de A à Z 100% personnalisé. Spécialisé en React, Next.js, Node.js, MySQL.',
    url: 'https://maximefarineau.com',
    email: 'contact@maximefarineau.com',
    telephone: '+33669347443',
    sameAs: [
      'https://www.linkedin.com/in/maxime-farineau-5a2b3b228/',
      'https://www.instagram.com/farinexx/',
      'https://github.com/maxfrn56',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressLocality: 'Biarritz',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Maxime Farineau - Développeur Web',
    description: 'Création de sites web personnalisés (vitrine, e-commerce, automatisation)',
    url: 'https://maximefarineau.com',
    email: 'contact@maximefarineau.com',
    telephone: '+33669347443',
    areaServed: 'FR',
    serviceType: [
      'Développement Web',
      'Création de site vitrine',
      'E-commerce',
      'Automatisation',
      'Intégration API',
    ],
    priceRange: '€€',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Maxime Farineau - Développeur Web',
    url: 'https://maximefarineau.com',
    description: 'Créateur de site web de A à Z 100% personnalisé',
    publisher: {
      '@type': 'Person',
      name: 'Maxime Farineau',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

