'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Désactiver la restauration automatique du scroll du navigateur
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Fonction pour scroller vers le haut
    const scrollToTop = () => {
      // Méthode 1: Scroll vers la section Hero explicitement
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      
      // Méthode 2: Forcer le scroll à 0 via window
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
      
      // Méthode 3: Forcer via document.documentElement et document.body
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };
    
    // Exécuter immédiatement
    scrollToTop();
    
    // Réessayer après un court délai pour s'assurer que le DOM est prêt
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 0);
    
    // Réessayer après que le DOM soit complètement chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', scrollToTop, { once: true });
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}

