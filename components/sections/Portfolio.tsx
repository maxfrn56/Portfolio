'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard';
import { useSectionTransition } from '@/hooks/useSectionTransition';

const projects = [
  {
    id: 1,
    title: 'Application de Gestion',
    description: 'Tableau de bord administrateur pour la gestion de sites vitrines avec système de redirection email automatisé et interface de monitoring.',
    stack: ['Next.js', 'MySQL', 'WebSockets'],
    video: '/videos/Dashboard.mp4',
    link: '#',
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Dashboard interactif avec visualisations de données en temps réel et export de rapports.',
    stack: ['React', 'Express', 'MySQL', 'Chart.js'],
    link: '#',
  },
  {
    id: 3,
    title: 'Bot de trading',
    description: 'Bot de trading automatisé en Python utilisant l\'API Binance pour l\'exécution de stratégies de trading en temps réel.',
    stack: ['Python', 'Binance API', 'Trading', 'Automation'],
    image: '/images/Trading.jpg',
    link: '#',
  },
];

export default function Portfolio() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation subtile de transition entre sections
  useSectionTransition(sectionRef, contentRef, {
    direction: 'up',
    shiftAmount: 3,
  });


  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-ocean-deep section-fullscreen py-12 md:py-20 px-0 md:px-6 retro-distort section-separator overflow-x-hidden"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 md:px-0">
        <motion.div
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-7xl font-medium mb-4 md:mb-6 text-sand">
            Mes autres projets
          </h2>
          <p className="text-base md:text-xl text-sand/80 max-w-2xl mx-auto">
            Découvrez mes projets récents et mes réalisations
          </p>
        </motion.div>

        {/* Carrousel horizontal avec scroll */}
        <div className="relative w-full -mx-4 md:mx-0 px-4 md:px-0">
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto overflow-y-hidden pb-4 hide-scrollbar items-stretch"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x pan-y',
              overscrollBehaviorX: 'contain',
              overscrollBehaviorY: 'auto',
              width: '100%',
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[450px] lg:w-[500px] h-full"
                style={{ 
                  scrollSnapAlign: 'start',
                  minWidth: '320px',
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
          
          {/* Indicateur de scroll horizontal */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue/30" />
              <p className="text-sm text-sand/60 italic">Faites défiler horizontalement pour découvrir</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
