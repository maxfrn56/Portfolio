'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseSectionTransitionOptions {
  /**
   * Direction du fade-in : 'up', 'down', 'left', 'right'
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  
  /**
   * Délai avant l'animation (en secondes)
   * @default 0
   */
  delay?: number;
  
  /**
   * Offset du micro-shift en pixels
   * @default 3
   */
  shiftAmount?: number;
  
  /**
   * Point de déclenchement du ScrollTrigger (start)
   * @default 'top 85%'
   */
  start?: string;
}

/**
 * Hook pour créer des transitions subtiles entre sections
 * - Micro-shift de grille (2-4px)
 * - Fade-in directionnel subtil
 * - Effet de "respiration" du layout
 */
export function useSectionTransition(
  containerRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
  options: UseSectionTransitionOptions = {}
) {
  const {
    direction = 'up',
    delay = 0,
    shiftAmount = 3,
    start = 'top 85%',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    // Déterminer les valeurs de transform selon la direction
    const getTransformValues = () => {
      const baseShift = shiftAmount;
      const fadeShift = 8; // Légèrement plus pour le fade-in

      switch (direction) {
        case 'up':
          return {
            initial: { y: fadeShift, x: 0 },
            shift: { y: -baseShift, x: 0 },
          };
        case 'down':
          return {
            initial: { y: -fadeShift, x: 0 },
            shift: { y: baseShift, x: 0 },
          };
        case 'left':
          return {
            initial: { y: 0, x: fadeShift },
            shift: { y: 0, x: -baseShift },
          };
        case 'right':
          return {
            initial: { y: 0, x: -fadeShift },
            shift: { y: 0, x: baseShift },
          };
        default:
          return {
            initial: { y: fadeShift, x: 0 },
            shift: { y: -baseShift, x: 0 },
          };
      }
    };

    const transforms = getTransformValues();

    // État initial : contenu légèrement décalé et transparent
    gsap.set(content, {
      opacity: 0,
      x: transforms.initial.x,
      y: transforms.initial.y,
      force3D: true, // Optimisation GPU
    });

    // Animation principale avec ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: start,
        end: 'top 50%',
        toggleActions: 'play none none reverse', // Se joue à l'entrée, se reverse à la sortie
        once: false, // Permet de rejouer l'animation si on remonte
        markers: false,
      },
    });

    // Phase 1 : Fade-in directionnel (0.6s)
    tl.to(content, {
      opacity: 1,
      x: transforms.shift.x,
      y: transforms.shift.y,
      duration: 0.6,
      ease: 'power2.out',
      delay: delay,
    });

    // Phase 2 : Micro-shift de "respiration" (0.4s)
    // Retour à la position finale avec un léger rebond subtil
    tl.to(content, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'power1.inOut',
    }, '-=0.2'); // Commence légèrement avant la fin de la phase 1

    // Cleanup
    return () => {
      if (tl) {
        tl.kill();
      }
      // Nettoyer les ScrollTriggers associés à ce conteneur
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
      // Réinitialiser les styles du contenu
      gsap.set(content, { clearProps: 'all' });
    };
  }, [containerRef, contentRef, direction, delay, shiftAmount, start]);
}

