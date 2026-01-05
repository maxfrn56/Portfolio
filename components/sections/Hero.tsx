'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Animation d'entrée avec GSAP
    const tl = gsap.timeline();
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      tl.from(heroContent, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out',
      });
    }
    
    // Cleanup
    return () => {
      if (tl) tl.kill();
    };
  }, []);

  useEffect(() => {
    // Forcer le chargement et la lecture de la vidéo
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setVideoLoaded(true);
            })
            .catch(() => {
              // Essayer après une interaction utilisateur
              const tryPlay = () => {
                video.play()
                  .then(() => {
                    setVideoLoaded(true);
                  })
                  .catch(() => {});
                document.removeEventListener('click', tryPlay);
                document.removeEventListener('touchstart', tryPlay);
                document.removeEventListener('scroll', tryPlay);
              };
              document.addEventListener('click', tryPlay, { once: true });
              document.addEventListener('touchstart', tryPlay, { once: true });
              document.addEventListener('scroll', tryPlay, { once: true });
            });
        }
      }
    };

    const handleLoadedMetadata = () => {
      playVideo();
    };

    const handleCanPlay = () => {
      playVideo();
    };

    const handlePlaying = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      setVideoError(true);
    };

    // Écouter tous les événements
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('play', handlePlaying);
    video.addEventListener('error', handleError);

    // Forcer le chargement
    video.load();

    // Essayer de jouer immédiatement
    setTimeout(() => {
      playVideo();
    }, 100);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('play', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    // Trouver la section WhyWorkWithMe pour vérifier si elle bloque
    const whyWorkSection = document.getElementById('why-work-with-me');
    
    // Désactiver temporairement tous les ScrollTriggers
    const triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
      trigger.disable();
      // Forcer le kill du pin si actif
      if (trigger.pin) {
        gsap.set(trigger.pin, { clearProps: 'all' });
      }
    });
    
    // Calculer la position de l'élément cible
    const elementRect = contactSection.getBoundingClientRect();
    let targetPosition = elementRect.top + window.pageYOffset;
    
    // Si l'élément cible est après WhyWorkWithMe et que WhyWorkWithMe est pinnée,
    // forcer le scroll à aller un peu plus loin pour dépasser le pin
    if (whyWorkSection && contactSection.offsetTop > whyWorkSection.offsetTop) {
      const whyWorkRect = whyWorkSection.getBoundingClientRect();
      const whyWorkBottom = whyWorkRect.bottom + window.pageYOffset;
      
      // Si la cible est proche de la fin de WhyWorkWithMe, ajouter un offset
      if (targetPosition <= whyWorkBottom + 100) {
        targetPosition = whyWorkBottom + 50;
      }
    }
    
    // Forcer le scroll directement avec window.scrollTo
    // Utiliser scrollTo deux fois pour forcer le passage du pin
    window.scrollTo({
      top: targetPosition,
      behavior: 'auto' // Scroll instantané d'abord
    });
    
    // Puis scroller smooth vers la position exacte
    requestAnimationFrame(() => {
      const currentContactSection = document.getElementById('contact');
      if (!currentContactSection) return;
      
      const finalPosition = currentContactSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });
    });
    
    // Réactiver les ScrollTriggers après le scroll
    setTimeout(() => {
      triggers.forEach(trigger => trigger.enable());
      ScrollTrigger.refresh();
    }, 800);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="section-fullscreen relative overflow-hidden retro-distort bg-ocean-deep"
    >
      {/* Vidéo ou Image de fond avec effet parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Vidéo */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ 
            transform: 'scale(1.1)',
            opacity: videoLoaded && !videoError ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
          onLoadedData={() => {
            const video = videoRef.current;
            if (video) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setVideoLoaded(true);
                  })
                  .catch(() => {});
              }
            }
          }}
          onCanPlay={() => {
            const video = videoRef.current;
            if (video && !videoLoaded) {
              video.play().catch(() => {});
            }
          }}
          onPlaying={() => {
            setVideoLoaded(true);
          }}
          onError={() => {
            setVideoError(true);
          }}
        >
          <source src="/videos/Pecheur.mp4" type="video/mp4" />
        </video>

        {/* Image de fallback */}
        {(videoError || !videoLoaded) && (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: 'url(/images/1E613098-773F-439F-8944-CC75F174742F_1_105_c.jpeg)',
              transform: 'scale(1.1)',
              opacity: videoError ? 1 : 0,
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 via-ocean-blue/20 to-ocean-deep/60 vignette" 
             style={{
               background: 'radial-gradient(ellipse at center, transparent 0%, rgba(26, 46, 58, 0.6) 100%), linear-gradient(to bottom, rgba(45, 74, 90, 0.1) 0%, rgba(26, 46, 58, 0.5) 100%)'
             }} />
      </motion.div>

      {/* Contenu mobile - Sans carré, directement sur le fond */}
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-[28%] md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-12 lg:right-20 md:translate-x-0 z-20 w-full md:w-auto md:max-w-md px-4 md:px-0"
      >
        {/* Version mobile - Avec cadre (sans slogan) */}
        <div className="md:hidden flex flex-col items-center text-center w-full max-w-full mx-auto">
          {/* Nom - Au-dessus du cadre */}
          <h1 className="text-5xl font-medium text-accent-blue mb-8 -mt-12" style={{ fontFamily: 'var(--font-anton)' }}>
            Maxime Farineau
          </h1>

          {/* Cadre autour des informations (sans slogan) */}
          <div className="bg-ocean-blue/20 backdrop-blur-sm rounded-2xl p-6 border border-accent-blue/30 w-full max-w-sm">
            {/* Titre */}
            <div className="text-base font-bold text-sand/90 leading-relaxed mb-4">
              Créateur de site web de A à Z 100% personnalisé
            </div>
            
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-wrap gap-2 justify-center mb-4"
            >
              <span className="px-3 py-1.5 bg-transparent text-sand text-xs rounded-full border-2 border-accent-blue font-semibold">
                React
              </span>
              <span className="px-3 py-1.5 bg-transparent text-sand text-xs rounded-full border-2 border-accent-blue font-semibold">
                Webflow
              </span>
              <span className="px-3 py-1.5 bg-transparent text-sand text-xs rounded-full border-2 border-accent-blue font-semibold">
                Shopify
              </span>
              <span className="px-3 py-1.5 bg-transparent text-sand text-xs rounded-full border-2 border-accent-blue font-semibold">
                Node.js
              </span>
            </motion.div>

            {/* Bouton */}
            <motion.button
              onClick={scrollToContact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-accent-blue text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg mb-4"
            >
              Demander un devis
            </motion.button>

            {/* Icônes réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.a
                href="https://www.instagram.com/farinexx/"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-accent-blue transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/maxime-farineau-5a2b3b228/"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-accent-blue transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </motion.a>
              <motion.a
                href="mailto:contact@maximefarineau.com"
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-accent-blue transition-colors"
                aria-label="Email"
              >
                <EmailIcon />
              </motion.a>
            </motion.div>
          </div>

          {/* Slogan sur une seule ligne sous le cadre avec animation */}
          <MobileSlogan />
        </div>

        {/* Version desktop - Avec carré */}
        <div className="hidden md:block">
          <div className="bg-ocean-deep/60 backdrop-blur-xl rounded-2xl p-8 border border-accent-blue/20 shadow-2xl">
            {/* Nom */}
            <div className="mb-3">
              <h1 className="text-4xl lg:text-5xl font-medium text-accent-blue">
                Maxime Farineau
              </h1>
            </div>
            
            {/* Titre */}
            <div className="text-xl lg:text-2xl font-light mb-4 text-sand/80">
              Créateur de site web de A à Z 100% personnalisé
            </div>
            
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              <span className="px-3 py-1 bg-accent-blue/15 text-accent-blue text-sm rounded-full border border-accent-blue/25">
                React
              </span>
              <span className="px-3 py-1 bg-accent-blue/15 text-accent-blue text-sm rounded-full border border-accent-blue/25">
                Webflow
              </span>
              <span className="px-3 py-1 bg-accent-blue/15 text-accent-blue text-sm rounded-full border border-accent-blue/25">
                Shopify
              </span>
            </motion.div>

            {/* Bouton */}
            <motion.button
              onClick={scrollToContact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-accent-blue text-white text-base font-semibold rounded-lg hover:bg-accent-blue/90 transition-all duration-300 shadow-lg hover:shadow-accent-blue/30 mb-6"
            >
              Demander un devis
            </motion.button>

            {/* Icônes réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.a
                href="https://www.instagram.com/farinexx/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-accent-blue transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/maxime-farineau-5a2b3b228/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-accent-blue transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </motion.a>
              <motion.a
                href="mailto:contact@maximefarineau.com"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-accent-blue transition-colors"
                aria-label="Email"
              >
                <EmailIcon />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slogan - Uniquement sur desktop (mobile: intégré dans le contenu) */}
      <div className="hidden md:block">
        <SloganSection />
      </div>

    </section>
  );
}

// Composant pour le slogan avec état partagé
function SloganSection() {
  const [isWavesFirst, setIsWavesFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWavesFirst((prev) => !prev);
    }, 2500); // Change toutes les 2.5 secondes (plus rapide)

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="absolute left-0 right-0 md:left-12 lg:left-20 md:right-auto top-[10%] md:top-1/2 md:-translate-y-1/2 z-10 w-full md:w-auto px-4 md:px-0"
    >
      <div className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl text-white/70 md:text-white/90 leading-tight text-center md:text-left" style={{ fontFamily: 'var(--font-anton), sans-serif' }}>
        <div className="mb-0.5 text-sm md:text-base">Powered by</div>
        <div className="mb-1 relative min-h-[1.4em] md:min-h-[1.5em] overflow-hidden md:overflow-visible">
          <AnimatePresence mode="sync">
            <AnimatedWord 
              key={isWavesFirst ? 'Waves' : 'Code'}
              word={isWavesFirst ? 'Waves' : 'Code'} 
              direction="up"
            />
          </AnimatePresence>
        </div>
        <div className="mb-0.5 text-sm md:text-base">Driven by</div>
        <div className="relative min-h-[1.4em] md:min-h-[1.5em] overflow-hidden md:overflow-visible">
          <AnimatePresence mode="sync">
            <AnimatedWord 
              key={isWavesFirst ? 'Code' : 'Waves'}
              word={isWavesFirst ? 'Code' : 'Waves'} 
              direction="down"
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Composant pour animer un seul mot avec direction
function AnimatedWord({ word, direction }: { word: string; direction: 'up' | 'down' }) {
  const yOffset = direction === 'up' ? -50 : 50;
  const exitYOffset = direction === 'up' ? 50 : -50;

  return (
    <motion.span
      key={word}
      initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: exitYOffset, scale: 0.95 }}
      transition={{
        duration: 1.2, // Plus lent pour l'entrée (apparition plus lente)
        exit: {
          duration: 1.8, // Encore plus lent pour la sortie (disparition plus lente)
          ease: [0.22, 1, 0.36, 1],
        },
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 text-accent-blue font-semibold whitespace-nowrap min-w-[100px] md:min-w-[150px] lg:min-w-[180px] w-full md:w-auto"
    >
      {word}
    </motion.span>
  );
}

// Composant slogan mobile avec animation sur une seule ligne
function MobileSlogan() {
  const [isWavesFirst, setIsWavesFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWavesFirst((prev) => !prev);
    }, 2500); // Change toutes les 2.5 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.2 }}
      className="text-white/70 font-anton whitespace-nowrap flex items-center justify-center"
      style={{ marginTop: '32px', fontSize: '21px', fontFamily: 'var(--font-anton)' }}
    >
      <span>Powered by</span>
      <span className="relative inline-block w-[3.2rem] overflow-visible ml-1" style={{ verticalAlign: 'baseline' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={isWavesFirst ? 'Waves' : 'Code'}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block text-accent-blue font-semibold whitespace-nowrap"
            style={{ verticalAlign: 'baseline' }}
          >
            {isWavesFirst ? 'Waves' : 'Code'}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="ml-3">Driven by</span>
      <span className="relative inline-block w-[3.2rem] overflow-visible ml-1" style={{ verticalAlign: 'baseline' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={isWavesFirst ? 'Code' : 'Waves'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block text-accent-blue font-semibold whitespace-nowrap"
            style={{ verticalAlign: 'baseline' }}
          >
            {isWavesFirst ? 'Code' : 'Waves'}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.div>
  );
}

// Composants d'icônes pour la section Hero
function InstagramIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
        fill="currentColor"
      />
    </svg>
  );
}

