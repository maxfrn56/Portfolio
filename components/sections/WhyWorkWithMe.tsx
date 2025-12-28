'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const benefits = [
  {
    icon: 'clarity',
    title: 'Clarté',
    description: 'Sites vitrines modernes avec message clair orienté conversion.',
    details: [
      'Design moderne et épuré',
      'Message clair pour vos visiteurs',
      'SEO de base solide et efficace',
    ],
    accent: 'Sites pensés pour être visibles et compris par les bons clients.',
  },
  {
    icon: 'performance',
    title: 'Performance',
    description: 'E-commerce rapides, fiables et capables d\'évoluer.',
    details: [
      'Boutiques en ligne performantes',
      'Connexions API fluides',
      'Rapidité, fiabilité, scalabilité',
    ],
    accent: 'Des sites qui grandissent avec votre business.',
  },
  {
    icon: 'strategy',
    title: 'Stratégie',
    description: 'Automatisation et workflows intelligents pour votre business.',
    details: [
      'Automatisation de processus',
      'Connexions entre outils métiers',
      'IA et workflows intelligents',
    ],
    accent: 'Le site comme levier business, pas une simple vitrine.',
  },
  {
    icon: 'reliability',
    title: 'Fiabilité',
    description: 'Protection des données et sécurité pour votre sérénité.',
    details: [
      'Protection des données',
      'Bonnes pratiques de sécurité',
      'Respect du RGPD',
    ],
    accent: 'Confiance, sécurité et sérénité sur le long terme.',
  },
];

const skills = [
  { name: 'React', category: 'Frontend', url: 'https://fr.react.dev/' },
  { name: 'Next.js', category: 'Frontend', url: 'https://nextjs.org/' },
  { name: 'Node.js', category: 'Backend', url: 'https://nodejs.org/en' },
  { name: 'Express', category: 'Backend', url: 'https://expressjs.com/' },
  { name: 'MySQL', category: 'Database', url: 'https://www.mysql.com/fr/' },
  { name: 'PostgreSQL', category: 'Database', url: 'https://www.postgresql.org/' },
  { name: 'GitHub', category: 'Tools', url: 'https://github.com/' },
  { name: 'API REST', category: 'Backend', url: 'https://restfulapi.net/' },
  { name: 'WebSockets', category: 'Backend', url: 'https://developer.mozilla.org/fr/docs/Web/API/WebSockets_API' },
  { name: 'Stripe', category: 'Payment', url: 'https://stripe.com/fr' },
  { name: 'Webflow', category: 'No-Code', url: 'https://webflow.com/' },
  { name: 'Shopify', category: 'E-commerce', url: 'https://www.shopify.com/fr' },
];

export default function WhyWorkWithMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      id="why-work-with-me"
      className="relative bg-ocean-deep pt-8 md:pt-12 pb-24 md:pb-32 overflow-hidden retro-distort"
      style={{ zIndex: 1 }}
    >
      {/* Carrousel de compétences en boucle infinie - pleine largeur */}
      <SkillsCarousel />
      
      <div className="max-w-5xl mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-12 relative">
          <CinematicRevealTitle isInView={isInView} />
          <NarrativeTextReveal isInView={isInView} />
        </div>

        {/* Benefits Grid avec progression visuelle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16 mb-20">
          <ClarityPillar isInView={isInView} benefit={benefits[0]} index={0} />
          <PerformancePillar isInView={isInView} benefit={benefits[1]} index={1} />
          <StrategyPillar isInView={isInView} benefit={benefits[2]} index={2} />
          <ReliabilityPillar isInView={isInView} benefit={benefits[3]} index={3} />
        </div>

        {/* Differentiator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 pt-12 border-t border-accent-blue/20 text-center"
        >
          <motion.p
            className="text-sand/60 text-sm md:text-base italic"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Pas d&apos;animations inutiles. Pas de solutions surcompliquées. Juste ce qui fonctionne.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// Composant d'icônes simples et minimalistes
function IconComponent({ icon }: { icon: string }) {
  const iconSize = 24;
  
  const icons: Record<string, JSX.Element> = {
    clarity: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-blue"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-blue"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-blue"
        />
      </svg>
    ),
    performance: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-blue"
        />
      </svg>
    ),
    strategy: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-blue"
        />
        <path
          d="M12 6V12L16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-blue"
        />
      </svg>
    ),
    reliability: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 11L12 14L22 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-blue"
        />
        <path
          d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-blue"
        />
      </svg>
    ),
  };

  return (
    <div className="text-accent-blue">
      {icons[icon] || icons.clarity}
    </div>
  );
}

// Composant carrousel de compétences en boucle infinie
function SkillsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollSpeedRef = useRef(0.3); // Vitesse de base

  // Dupliquer les compétences plusieurs fois pour créer l'effet de boucle fluide
  const duplicatedSkills = [...skills, ...skills, ...skills];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let position = 0;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let rafId: number | null = null;

    const cardWidth = 180 + 16; // Largeur de la carte (180px) + gap (16px)
    const singleSetWidth = skills.length * cardWidth;

    const checkVisibility = () => {
      const whyWorkSection = document.getElementById('why-work-with-me');
      if (!whyWorkSection) return false;
      const rect = whyWorkSection.getBoundingClientRect();
      return rect.top < window.innerHeight + 200 && rect.bottom > -200;
    };

    const animate = () => {
      // Arrêter l'animation si la section n'est pas visible
      if (!checkVisibility()) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      
      position += scrollSpeedRef.current;
      
      // Réinitialiser la position quand on dépasse un set complet
      if (position >= singleSetWidth) {
        position = position - singleSetWidth;
      }
      
      container.style.transform = `translateX(-${position}px)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    animationRef.current = rafId;

    // Écouter le scroll pour accélérer (sur About et WhyWorkWithMe)
    // Optimisé avec throttling et cache
    let lastScrollTime = 0;
    let cachedAboutRect: DOMRect | null = null;
    let cachedWhyWorkRect: DOMRect | null = null;
    let cacheTime = 0;
    const cacheDuration = 100;
    const throttleDelay = 50; // Réduit pour moins de calculs
    
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollTime < throttleDelay) return;
      lastScrollTime = now;
      
      requestAnimationFrame(() => {
        // Utiliser le cache si récent
        const now = performance.now();
        if (now - cacheTime > cacheDuration) {
          const aboutSection = document.getElementById('about');
          const whyWorkSection = document.getElementById('why-work-with-me');
          
          if (aboutSection) cachedAboutRect = aboutSection.getBoundingClientRect();
          if (whyWorkSection) cachedWhyWorkRect = whyWorkSection.getBoundingClientRect();
          cacheTime = now;
        }
        
        const windowHeight = window.innerHeight;
        let maxSpeed = 0.3; // Vitesse de base
        let shouldAccelerate = false;
        
        // Vérifier la section About avec cache
        if (cachedAboutRect) {
          if (cachedAboutRect.top < windowHeight && cachedAboutRect.bottom > 0) {
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - cachedAboutRect.top) / windowHeight));
            const speed = 0.3 + (scrollProgress * scrollProgress * 1.2);
            maxSpeed = Math.max(maxSpeed, speed);
            shouldAccelerate = true;
          }
        }
        
        // Vérifier la section WhyWorkWithMe avec cache
        if (cachedWhyWorkRect) {
          if (cachedWhyWorkRect.top < windowHeight && cachedWhyWorkRect.bottom > 0) {
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - cachedWhyWorkRect.top) / windowHeight));
            const speed = 0.3 + (scrollProgress * scrollProgress * 1.2);
            maxSpeed = Math.max(maxSpeed, speed);
            shouldAccelerate = true;
          }
        }
        
        scrollSpeedRef.current = maxSpeed;
        
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        if (shouldAccelerate) {
          scrollTimeout = setTimeout(() => {
            scrollSpeedRef.current = 0.3;
          }, 100);
        } else {
          scrollSpeedRef.current = 0.3;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative mb-8 md:mb-12 overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex gap-4"
        style={{
          willChange: 'transform',
        }}
      >
        {duplicatedSkills.map((skill, index) => {
          const isEven = index % 2 === 0;
          return (
            <a
              key={`${skill.name}-${index}`}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 relative group overflow-hidden rounded-xl block"
              style={{ width: '180px' }}
            >
              <div className="relative bg-ocean-blue/20 backdrop-blur-sm rounded-xl p-4 border-2 border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Animation de remplissage alternée */}
                {isEven ? (
                  <div className="absolute bottom-0 left-0 right-0 h-0 bg-accent-blue/30 group-hover:h-full transition-all duration-500 ease-out" />
                ) : (
                  <div className="absolute top-0 left-0 right-0 h-0 bg-accent-blue/30 group-hover:h-full transition-all duration-500 ease-out" />
                )}
                
                <div className="relative z-10 text-center">
                  <h3 className="text-base font-medium text-white mb-1 group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-accent-blue/80 group-hover:text-white/90 transition-colors duration-300">
                    {skill.category}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Composant animation de révélation cinématique pour le titre
function CinematicRevealTitle({ isInView }: { isInView: boolean }) {
  const title = "Solution et service";
  const letters = title.split('');

  return (
    <div className="inline-block mb-6 relative overflow-hidden">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-sand mb-4 relative inline-block">
        {/* Container avec masque de révélation */}
        <span className="relative inline-block overflow-hidden">
          {/* Masque qui se déplace de gauche à droite */}
          <motion.div
            className="absolute inset-0 bg-ocean-deep z-10"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '100%' } : { x: '-100%' }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2
            }}
            style={{ 
              width: '100%',
              height: '100%'
            }}
          />
          
          {/* Texte avec blur qui devient net */}
          <motion.span
            className="relative inline-block"
            initial={{ filter: 'blur(8px)', opacity: 0.3 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : { filter: 'blur(8px)', opacity: 0.3 }}
            transition={{ 
              duration: 1.0, 
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.3
            }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + (index * 0.025), // Micro retard lettre par lettre (soft)
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.span>
        </span>
        
        {/* Ligne de soulignement animée */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-accent-blue/30 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.0,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />
      </h2>
    </div>
  );
}

// Composant animation narrative avec révélation mot par mot
function NarrativeTextReveal({ isInView }: { isInView: boolean }) {
  const text = "Je construis des sites web comme outils business, pas seulement comme vitrines visuelles.";
  const words = text.split(' ');

  // Identifier les mots spéciaux "outils business"
  const isSpecialWord = (word: string, index: number) => {
    const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
    return cleanWord === 'outils' || cleanWord === 'business';
  };

  return (
    <p className="text-lg md:text-xl text-sand/70 max-w-2xl mx-auto mt-6 leading-relaxed">
      {words.map((word, index) => {
        const isSpecial = isSpecialWord(word, index);
        const delay = 1.2 + (index * 0.08); // Délai progressif pour chaque mot
        
        return (
          <motion.span
            key={index}
            className={`inline-block ${isSpecial ? 'relative' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {isSpecial ? (
              <span className="relative inline-block">
                {/* Texte avec couleur accent et glow */}
                <motion.span
                  className="text-accent-blue/90 relative z-10"
                  initial={{ filter: 'blur(0px)' }}
                  animate={isInView ? { 
                    filter: 'blur(0px)',
                    textShadow: '0 0 8px rgba(90, 143, 163, 0.3)'
                  } : { 
                    filter: 'blur(0px)',
                    textShadow: '0 0 0px rgba(90, 143, 163, 0)'
                  }}
                  transition={{
                    duration: 0.6,
                    delay: delay + 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {word}
                </motion.span>
                
                {/* Underline animé */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue/50"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: delay + 0.3,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            ) : (
              <span className="text-sand/70">{word}</span>
            )}
            {/* Espace après chaque mot sauf le dernier */}
            {index < words.length - 1 && <span className="inline-block w-1" />}
          </motion.span>
        );
      })}
    </p>
  );
}

// ① Composant Clarté - Enrichi avec détails et animations fluides
function ClarityPillar({ isInView, benefit, index }: { isInView: boolean; benefit: typeof benefits[0]; index: number }) {
  const baseDelay = 0.3 + (index * 0.1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: baseDelay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group relative p-6 md:p-8 rounded-xl bg-ocean-blue/5 backdrop-blur-sm border border-accent-blue/10 hover:border-accent-blue/30 transition-all duration-500"
    >
      {/* Fond avec glow au hover */}
      <motion.div
        className="absolute inset-0 bg-accent-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          boxShadow: '0 0 30px rgba(90, 143, 163, 0.1)',
        }}
      />
      
      {/* Accent visuel - ligne décorative en haut */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: baseDelay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ scaleX: 1.1, transition: { duration: 0.3 } }}
      />
      
      <div className="flex gap-4">
        <motion.div
          className="flex-shrink-0 mt-1"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: baseDelay + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-accent-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <IconComponent icon={benefit.icon} />
          </div>
        </motion.div>
        
        <div className="flex-1">
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-sand mb-3 group-hover:text-accent-blue transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {benefit.title}
          </motion.h3>
          
          <motion.p
            className="text-base md:text-lg text-sand/90 mb-4 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {benefit.description}
          </motion.p>
          
          {/* Liste de détails */}
          <motion.ul
            className="space-y-2 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.6 }}
          >
            {benefit.details.map((detail, detailIndex) => (
              <motion.li
                key={detailIndex}
                className="flex items-start gap-2 text-sm md:text-base text-sand/75"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: baseDelay + 0.7 + (detailIndex * 0.1) }}
              >
                <motion.span
                  className="text-accent-blue mt-1.5 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: baseDelay + 0.8 + (detailIndex * 0.1), type: 'spring', stiffness: 200 }}
                >
                  ✓
                </motion.span>
                <span>{detail}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Accent phrase */}
          <motion.p
            className="text-sm md:text-base text-accent-blue/80 italic border-l-2 border-accent-blue/30 pl-4 mt-4"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {benefit.accent}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

// ② Composant Performance - Enrichi avec détails et animations de vitesse
function PerformancePillar({ isInView, benefit, index }: { isInView: boolean; benefit: typeof benefits[0]; index: number }) {
  const baseDelay = 0.3 + (index * 0.1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: baseDelay,
        ease: [0.34, 1.56, 0.64, 1] // Easing "snap" pour effet de vitesse
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative p-6 md:p-8 rounded-xl bg-accent-blue/5 backdrop-blur-sm border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-500"
    >
      {/* Fond avec shadow - toujours visible */}
      <motion.div
        className="absolute inset-0 bg-accent-blue/5 rounded-xl -z-10 shadow-lg shadow-accent-blue/10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: baseDelay + 0.1 }}
      />
      
      {/* Barre de chargement animée au hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue/60 via-accent-blue to-accent-blue/60 opacity-0 group-hover:opacity-100"
        initial={{ scaleX: 0 }}
        whileHover={{ 
          scaleX: 1,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        style={{ transformOrigin: 'left' }}
      />
      
      <div className="flex gap-4">
        <motion.div
          className="flex-shrink-0 mt-1"
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ 
            duration: 0.4, 
            delay: baseDelay + 0.1,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.4 }
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-accent-blue/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <IconComponent icon={benefit.icon} />
          </div>
        </motion.div>
        
        <div className="flex-1">
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-sand mb-3 group-hover:text-accent-blue transition-colors duration-300"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.4, 
              delay: baseDelay + 0.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            {benefit.title}
          </motion.h3>
          
          <motion.p
            className="text-base md:text-lg text-sand/90 mb-4 leading-relaxed font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: baseDelay + 0.3 }}
          >
            {benefit.description}
          </motion.p>
          
          {/* Liste de détails */}
          <motion.ul
            className="space-y-2 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: baseDelay + 0.4 }}
          >
            {benefit.details.map((detail, detailIndex) => (
              <motion.li
                key={detailIndex}
                className="flex items-start gap-2 text-sm md:text-base text-sand/75"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: baseDelay + 0.5 + (detailIndex * 0.08) }}
              >
                <motion.span
                  className="text-accent-blue mt-1.5 flex-shrink-0"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.4, delay: baseDelay + 0.6 + (detailIndex * 0.08), type: 'spring', stiffness: 300 }}
                >
                  ⚡
                </motion.span>
                <span>{detail}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Accent phrase */}
          <motion.p
            className="text-sm md:text-base text-accent-blue/80 italic border-l-2 border-accent-blue/30 pl-4 mt-4"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: baseDelay + 0.8 }}
          >
            {benefit.accent}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

// ③ Composant Stratégie - Enrichi avec détails et effet parallax amélioré
function StrategyPillar({ isInView, benefit, index }: { isInView: boolean; benefit: typeof benefits[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const baseDelay = 0.3 + (index * 0.1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: baseDelay, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group relative p-6 md:p-8 rounded-xl bg-accent-blue/5 backdrop-blur-sm border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-500"
    >
      {/* Couche 1 : Fond avec parallax */}
      <motion.div
        className="absolute inset-0 bg-accent-blue/5 rounded-xl -z-10 shadow-lg shadow-accent-blue/10"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: hovered ? -3 : 0 } : {}}
        transition={{ duration: hovered ? 0.3 : 0.6, delay: baseDelay + 0.3 }}
      />
      
      {/* Accent visuel - grille subtile */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: 'linear-gradient(rgba(90, 143, 163, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90, 143, 163, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      <div className="flex gap-4 relative z-10">
        <motion.div
          className="flex-shrink-0 mt-1"
          initial={{ opacity: 0, y: 10, rotate: -5 }}
          animate={isInView ? { opacity: 1, y: hovered ? -4 : 0, rotate: hovered ? 5 : 0 } : {}}
          transition={{ duration: hovered ? 0.3 : 0.6, delay: baseDelay + 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-accent-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <IconComponent icon={benefit.icon} />
          </div>
        </motion.div>
        
        <div className="flex-1">
          {/* Couche 2 : Titre */}
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-sand mb-3 group-hover:text-accent-blue transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: hovered ? -5 : 0 } : {}}
            transition={{ duration: hovered ? 0.3 : 0.6, delay: baseDelay + 0.7 }}
          >
            {benefit.title}
          </motion.h3>
          
          <motion.p
            className="text-base md:text-lg text-sand/90 mb-4 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: hovered ? -6 : 0 } : {}}
            transition={{ duration: hovered ? 0.3 : 0.6, delay: baseDelay + 0.8 }}
          >
            {benefit.description}
          </motion.p>
          
          {/* Liste de détails */}
          <motion.ul
            className="space-y-2 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.9 }}
          >
            {benefit.details.map((detail, detailIndex) => (
              <motion.li
                key={detailIndex}
                className="flex items-start gap-2 text-sm md:text-base text-sand/75"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: hovered ? -7 - (detailIndex * 2) : 0 } : {}}
                transition={{ duration: hovered ? 0.3 : 0.5, delay: baseDelay + 1.0 + (detailIndex * 0.1) }}
              >
                <motion.span
                  className="text-accent-blue mt-1.5 flex-shrink-0"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.4, delay: baseDelay + 1.1 + (detailIndex * 0.1), type: 'spring', stiffness: 250 }}
                >
                  ◊
                </motion.span>
                <span>{detail}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Accent phrase */}
          <motion.p
            className="text-sm md:text-base text-accent-blue/80 italic border-l-2 border-accent-blue/30 pl-4 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: hovered ? -8 : 0 } : {}}
            transition={{ duration: hovered ? 0.3 : 0.6, delay: baseDelay + 1.3 }}
          >
            {benefit.accent}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

// ④ Composant Fiabilité - Enrichi avec détails et animations calmes
function ReliabilityPillar({ isInView, benefit, index }: { isInView: boolean; benefit: typeof benefits[0]; index: number }) {
  const baseDelay = 0.3 + (index * 0.1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: baseDelay,
        ease: [0.25, 0.1, 0.25, 1] // Easing très doux et calme
      }}
      whileHover={{ y: -2, transition: { duration: 0.4 } }}
      className="group relative p-6 md:p-8 rounded-xl bg-ocean-blue/5 backdrop-blur-sm border border-accent-blue/10 hover:border-accent-blue/30 transition-all duration-500"
    >
      {/* Fond avec shadow légère - pas d'animation excessive */}
      <motion.div
        className="absolute inset-0 bg-accent-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 shadow-lg shadow-accent-blue/5"
        style={{
          boxShadow: '0 0 20px rgba(90, 143, 163, 0.08)',
        }}
      />
      
      {/* Accent visuel - badge de sécurité */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="flex gap-4">
        <motion.div
          className="flex-shrink-0 mt-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 0.7, 
            delay: baseDelay + 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-accent-blue/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <IconComponent icon={benefit.icon} />
          </div>
        </motion.div>
        
        <div className="flex-1">
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-sand mb-3 group-hover:text-accent-blue transition-colors duration-500"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: baseDelay + 0.7,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {benefit.title}
          </motion.h3>
          
          <motion.p
            className="text-base md:text-lg text-sand/90 mb-4 leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: baseDelay + 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {benefit.description}
          </motion.p>
          
          {/* Liste de détails */}
          <motion.ul
            className="space-y-2 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: baseDelay + 0.9 }}
          >
            {benefit.details.map((detail, detailIndex) => (
              <motion.li
                key={detailIndex}
                className="flex items-start gap-2 text-sm md:text-base text-sand/75"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: baseDelay + 1.0 + (detailIndex * 0.1) }}
              >
                <motion.span
                  className="text-accent-blue mt-1.5 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: baseDelay + 1.1 + (detailIndex * 0.1), type: 'spring', stiffness: 150 }}
                >
                  🛡️
                </motion.span>
                <span>{detail}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Accent phrase */}
          <motion.p
            className="text-sm md:text-base text-accent-blue/80 italic border-l-2 border-accent-blue/30 pl-4 mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: baseDelay + 1.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {benefit.accent}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
