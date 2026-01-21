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
      streetAddress: '44 avenue Reine Victoria',
      addressLocality: 'Biarritz',
      postalCode: '64200',
      addressRegion: 'Nouvelle-Aquitaine',
      addressCountry: 'FR',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://maximefarineau.com',
    name: 'Maxime Farineau - Développeur Web',
    alternateName: 'Création de site web Biarritz',
    description: 'Développeur web freelance à Biarritz, spécialisé en création de sites web personnalisés. Création de site web sur mesure : sites vitrine, e-commerce, automatisation.',
    url: 'https://maximefarineau.com',
    email: 'contact@maximefarineau.com',
    telephone: '+33669347443',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '44 avenue Reine Victoria',
      addressLocality: 'Biarritz',
      postalCode: '64200',
      addressRegion: 'Nouvelle-Aquitaine',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.4832',
      longitude: '-1.5596',
    },
    areaServed: {
      '@type': 'City',
      name: 'Biarritz',
    },
    serviceType: [
      'Création de site web',
      'Développement Web',
      'Création de site vitrine',
      'E-commerce',
      'Automatisation',
      'Intégration API',
    ],
    priceRange: '€€',
    sameAs: [
      'https://www.linkedin.com/in/maxime-farineau-5a2b3b228/',
      'https://www.instagram.com/farinexx/',
    ],
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

