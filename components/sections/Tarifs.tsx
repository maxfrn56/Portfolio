'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSectionTransition } from '@/hooks/useSectionTransition';

const pricingPlans = [
  {
    id: 'vitrine',
    title: 'Site Vitrine',
    description: 'Site web élégant pour présenter votre activité et vos services.',
    price: 'Sur devis',
    priceAmount: '',
    features: [
      'Design sur mesure',
      'Responsive (mobile, tablette, desktop)',
      'Optimisation SEO',
      'Formulaire de contact',
      'Hébergement inclus (1 an)',
      'Formation à la gestion',
    ],
    popular: false,
  },
  {
    id: 'ecommerce',
    title: 'Site E-commerce',
    description: 'Boutique en ligne complète avec gestion des commandes et paiements.',
    price: 'Sur devis',
    priceAmount: '',
    features: [
      'Catalogue produits illimité',
      'Paiement en ligne sécurisé',
      'Gestion des commandes',
      'Gestion des stocks',
      'Espace client',
      'Hébergement inclus (1 an)',
      'Formation à la gestion',
    ],
    popular: false,
  },
  {
    id: 'personnalise',
    title: 'Autre Personnalisation',
    description: 'Solution sur mesure adaptée à vos besoins spécifiques.',
    price: 'Sur devis',
    priceAmount: '',
    features: [
      'Analyse de vos besoins',
      'Solution personnalisée',
      'Développement sur mesure',
      'Intégrations spécifiques',
      'Accompagnement complet',
      'Maintenance et support',
    ],
    popular: false,
  },
];

export default function Tarifs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Animation subtile de transition entre sections
  useSectionTransition(containerRef, contentRef, {
    direction: 'up',
    shiftAmount: 3,
  });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="tarifs"
      className="relative bg-ocean-deep py-24 md:py-32 overflow-hidden retro-distort section-separator"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-sand mb-3 md:mb-4">
            Tarifs
          </h2>
          <p className="text-base md:text-xl text-sand/80 max-w-2xl mx-auto">
            Des solutions adaptées à chaque projet, avec transparence et flexibilité
          </p>
        </motion.div>

        {/* Grille de tarifs - Carrousel sur mobile, grille sur desktop */}
        <div className="relative overflow-visible md:overflow-visible pt-6 md:pt-8">
          <div 
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 overflow-x-auto pb-4 md:pb-0 hide-scrollbar"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex-shrink-0 w-[85vw] md:w-auto"
                style={{ scrollSnapAlign: 'start' }}
              >
              {/* Badge "Populaire" */}
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-accent-blue text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium">
                    Populaire
                  </span>
                </div>
              )}

              {/* Carte de tarif */}
              <div
                className={`relative h-full bg-ocean-blue/10 backdrop-blur-sm rounded-xl border-2 p-6 md:p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'border-accent-blue/50 shadow-2xl shadow-accent-blue/20'
                    : 'border-accent-blue/20 hover:border-accent-blue/40'
                }`}
              >
                {/* Fond avec effet au hover */}
                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    plan.popular
                      ? 'bg-accent-blue/5 opacity-100'
                      : 'bg-accent-blue/5 opacity-0 hover:opacity-100'
                  }`}
                />

                {/* Contenu */}
                <div className="relative z-10">
                  {/* Titre */}
                  <h3 className="text-xl md:text-3xl font-medium text-sand mb-2">
                    {plan.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sand/70 mb-4 md:mb-6 text-sm md:text-base">
                    {plan.description}
                  </p>

                  {/* Prix */}
                  <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-accent-blue/20">
                    <p className="text-xs md:text-sm text-sand/60 mb-1">{plan.price}</p>
                    {plan.priceAmount ? (
                      <p className="text-3xl md:text-5xl font-bold text-accent-blue">
                        {plan.priceAmount}
                      </p>
                    ) : (
                      <p className="text-xl md:text-3xl font-semibold text-accent-blue">
                        Sur devis
                      </p>
                    )}
                  </div>

                  {/* Liste des fonctionnalités */}
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2 md:gap-3 text-sand/80"
                      >
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-accent-blue flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-xs md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bouton CTA */}
                  <motion.button
                    onClick={scrollToContact}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2.5 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-accent-blue text-white hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/30'
                        : 'bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 border border-accent-blue/30'
                    }`}
                  >
                    Demander un devis
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
          
          {/* Indicateur de scroll horizontal sur mobile */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue/30" />
              <p className="text-xs text-sand/60 italic">Faites défiler horizontalement</p>
            </div>
          </div>
        </div>

        {/* Note en bas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-accent-blue/20"
        >
          <p className="text-sand/60 text-sm md:text-base">
            Tous les tarifs sont indicatifs et peuvent varier selon la complexité du projet.
            <br />
            N&apos;hésitez pas à me contacter pour un devis personnalisé.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

