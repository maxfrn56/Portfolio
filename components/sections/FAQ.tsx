'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
  {
    question: 'Pourquoi choisir un développeur web à Biarritz pour la création de votre site web ?',
    answer: 'En tant que développeur web basé à Biarritz, je comprends les besoins locaux des entreprises de la Côte Basque. Je propose une création de site web sur mesure, avec un suivi personnalisé et une proximité qui facilite la communication. Mon expertise en développement web couvre tous les aspects : sites vitrine, e-commerce, et automatisations.',
  },
  {
    question: 'Quels types de sites web créez-vous ?',
    answer: 'En tant que développeur web freelance, je crée différents types de sites web : sites vitrine pour présenter votre activité, sites e-commerce pour vendre en ligne, et solutions personnalisées avec automatisations. Chaque création de site web est adaptée à vos besoins spécifiques.',
  },
  {
    question: 'Combien coûte la création d\'un site web ?',
    answer: 'Le prix de création d\'un site web dépend de vos besoins : complexité, fonctionnalités, design personnalisé. En tant que développeur web à Biarritz, je propose des devis personnalisés pour chaque projet. Contactez-moi pour discuter de votre projet de création de site web.',
  },
  {
    question: 'Quel est le délai pour la création d\'un site web ?',
    answer: 'Le délai de création d\'un site web varie selon la complexité du projet. Un site vitrine simple peut être livré en 2-3 semaines, tandis qu\'un site e-commerce avec fonctionnalités avancées peut prendre 6-8 semaines. En tant que développeur web, je m\'engage à respecter les délais convenus.',
  },
  {
    question: 'Proposez-vous la maintenance après la création du site web ?',
    answer: 'Oui, en tant que développeur web freelance à Biarritz, je propose des services de maintenance et de mise à jour après la création de votre site web. Cela inclut les mises à jour de contenu, les corrections de bugs, et l\'optimisation continue pour le SEO.',
  },
  {
    question: 'Votre création de site web est-elle optimisée pour le référencement (SEO) ?',
    answer: 'Absolument. Chaque création de site web que je réalise est optimisée pour le SEO dès le départ. En tant que développeur web, j\'intègre les bonnes pratiques : structure sémantique, meta tags, vitesse de chargement, et contenu optimisé pour les moteurs de recherche.',
  },
];

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative bg-ocean-deep py-24 md:py-32 overflow-hidden retro-distort section-separator"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-sand mb-3 md:mb-4" style={{ fontFamily: 'var(--font-polya)', fontWeight: 'bold' }}>
            Questions fréquentes
          </h2>
          <p className="text-base md:text-xl text-sand/80 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur la création de site web avec un développeur web à Biarritz
          </p>
        </motion.div>

        {/* Liste des FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-ocean-blue/10 backdrop-blur-sm rounded-xl border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 md:px-8 md:py-6 text-left flex items-center justify-between gap-4 group"
              >
                <h3 className="text-lg md:text-xl font-semibold text-sand group-hover:text-accent-blue transition-colors pr-4">
                  {faq.question}
                </h3>
                <motion.svg
                  className="w-6 h-6 text-accent-blue flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 md:px-8 md:pb-6">
                  <p className="text-sand/80 leading-relaxed text-base md:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
