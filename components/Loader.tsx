'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Loader d'entrée premium avec animation heartbeat
 * - Fond bleu accent (même couleur que "wave" dans Hero)
 * - Logo centré qui pulse comme un battement de cœur
 * - Disparaît quand le site est prêt
 * - Animation fluide et organique
 */
export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [minDisplayTime, setMinDisplayTime] = useState(true);

  // Ne masquer le loader que si le temps minimum est écoulé ET le site est prêt
  const shouldHide = !isLoading && !minDisplayTime;

  useEffect(() => {
    // Empêcher le scroll pendant le chargement
    document.body.classList.add('loading');

    // Timer minimum de 500ms pour éviter le flash
    const minTimer = setTimeout(() => {
      setMinDisplayTime(false);
    }, 500);

    // Vérifier que le site est prêt
    const checkSiteReady = () => {
      // Attendre que le DOM soit complètement chargé
      if (document.readyState === 'complete') {
        // Attendre un peu plus pour les ressources (images, fonts, etc.) + 1 seconde supplémentaire
        setTimeout(() => {
          setIsLoading(false);
        }, 1300);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1300);
        });
      }
    };

    checkSiteReady();

    return () => {
      clearTimeout(minTimer);
    };
  }, []);

  // Réactiver le scroll quand le loader disparaît
  useEffect(() => {
    if (shouldHide) {
      // Petit délai pour laisser l'animation de fade out se terminer
      const timer = setTimeout(() => {
        document.body.classList.remove('loading');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [shouldHide]);

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1], // Easing organique
            },
          }}
          className="fixed inset-0 z-[9999] bg-ocean-deep flex items-center justify-center"
          style={{
            // Empêcher le scroll pendant le chargement
            overflow: 'hidden',
            // Empêcher la sélection de texte
            userSelect: 'none',
            // Empêcher les interactions
            pointerEvents: 'auto',
          }}
        >
          {/* Logo avec animation heartbeat et effet de disparition */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1, 0.98, 1],
            }}
            transition={{
              duration: 1.8, // Durée d'un cycle complet (inspiré d'un battement cardiaque)
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1], // Easing organique pour un effet naturel
              times: [0, 0.3, 0.5, 0.7, 1], // Timing irrégulier comme un vrai battement
            }}
            style={{
              // Optimisation GPU
              willChange: 'transform',
            }}
          >
            <motion.img
              src="/images/logo-white.png"
              alt="Maxime Farineau"
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
              animate={shouldHide ? {
                opacity: 0,
                scale: 1.2,
                filter: 'blur(20px)',
              } : {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
              style={{
                // Empêcher le drag d'image
                pointerEvents: 'none',
                // Optimisation de rendu
                imageRendering: 'auto',
                willChange: 'opacity, transform, filter',
              }}
            />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

