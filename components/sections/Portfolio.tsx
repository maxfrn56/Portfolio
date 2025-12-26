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
      className="relative bg-ocean-deep section-fullscreen py-20 px-6 retro-distort section-separator"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-medium mb-6 text-sand">
            Mes autres projets
          </h2>
          <p className="text-xl text-sand/80 max-w-2xl mx-auto">
            Découvrez mes projets récents et mes réalisations
          </p>
        </motion.div>

        {/* Carrousel horizontal avec scroll */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar items-stretch"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-full sm:w-[400px] md:w-[450px] lg:w-[500px] h-full"
                style={{ scrollSnapAlign: 'start' }}
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
