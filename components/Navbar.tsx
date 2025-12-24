'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname, useRouter } from 'next/navigation';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour scroller vers une section sur la page d'accueil
  const scrollToSectionOnHome = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
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
    const elementRect = element.getBoundingClientRect();
    let targetPosition = elementRect.top + window.pageYOffset;
    
    // Si l'élément cible est après WhyWorkWithMe et que WhyWorkWithMe est pinnée,
    // forcer le scroll à aller un peu plus loin pour dépasser le pin
    if (whyWorkSection && element.offsetTop > whyWorkSection.offsetTop) {
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
      const finalPosition = element.getBoundingClientRect().top + window.pageYOffset;
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

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    
    // Si on n'est pas sur la page d'accueil, rediriger vers la page d'accueil avec le hash
    if (pathname !== '/') {
      router.push(`/#${id}`);
      // Attendre que la page soit chargée puis scroller
      setTimeout(() => {
        scrollToSectionOnHome(id);
      }, 100);
      return;
    }
    
    // Si on est sur la page d'accueil, scroller normalement
    scrollToSectionOnHome(id);
  };

  const scrollToHome = () => {
    setIsMenuOpen(false);
    
    // Si on n'est pas sur la page d'accueil, rediriger vers la page d'accueil
    if (pathname !== '/') {
      router.push('/');
      // Attendre que la page soit chargée puis scroller vers le haut
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      return;
    }
    
    // Si on est sur la page d'accueil, scroller vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Solution et service', id: 'why-work-with-me' },
    { label: 'Mes projets', id: 'portfolio' },
    { label: 'Tarifs', id: 'tarifs' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ocean-deep/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo à gauche */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/images/logo-white.png" 
              alt="Logo Maxime Farineau - Développeur Web Freelance" 
              className="h-12 md:h-16 w-auto"
            />
          </motion.button>

          {/* Desktop Menu - Centré */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-base lg:text-lg font-medium text-white hover:text-accent-blue transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Logo GitHub à droite */}
          <motion.a
            href="https://github.com/maxfrn56"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-accent-blue transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white z-50"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-white"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ocean-deep/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-4 px-6 py-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-lg font-medium text-white hover:text-accent-blue transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Logo GitHub mobile */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                <a
                  href="https://github.com/maxfrn56"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent-blue transition-colors"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Composants d'icônes
function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
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
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        fill="currentColor"
      />
    </svg>
  );
}

