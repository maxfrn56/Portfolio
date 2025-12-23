'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Effet de transition de scroll avec recouvrement
  useEffect(() => {
    const section = sectionRef.current;
    const whyWorkSection = document.getElementById('why-work-with-me');
    
    if (!section || !whyWorkSection) return;

    // Obtenir la hauteur initiale de la section About pour créer un spacer
    // Utiliser getBoundingClientRect pour obtenir la hauteur réelle
    const getSectionHeight = () => {
      return section.offsetHeight || section.scrollHeight || section.getBoundingClientRect().height;
    };
    
    let sectionHeight = getSectionHeight();
    
    // Attendre que le DOM soit complètement rendu
    requestAnimationFrame(() => {
      sectionHeight = getSectionHeight();
    });
    
    // Créer un spacer réel pour maintenir l'espace dans le flux
    // Le spacer sera positionné juste après WhyWorkWithMe
    const spacer = document.createElement('div');
    spacer.setAttribute('data-spacer', 'true');
    spacer.style.cssText = `
      height: ${sectionHeight}px;
      visibility: hidden;
      pointer-events: none;
      position: relative;
      z-index: 1;
      width: 100%;
    `;
    
    // Insérer le spacer juste après WhyWorkWithMe
    // Cela garantit que l'espace est maintenu même quand About est en fixed
    if (whyWorkSection.parentNode) {
      // Insérer le spacer juste après WhyWorkWithMe
      if (whyWorkSection.nextSibling) {
        whyWorkSection.parentNode.insertBefore(spacer, whyWorkSection.nextSibling);
      } else {
        whyWorkSection.parentNode.appendChild(spacer);
      }
    }

    // Positionner initialement la section About avec un z-index élevé
    gsap.set(section, {
      position: 'relative',
      y: '0%',
      zIndex: 10,
    });

    // Créer une timeline GSAP pour l'animation fluide
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: whyWorkSection,
        start: 'bottom bottom', // Démarre quand le bas de WhyWorkWithMe atteint le bas de l'écran
        end: 'bottom top', // Se termine quand le bas de WhyWorkWithMe atteint le haut de l'écran
        scrub: 1.2, // Augmenté pour plus de fluidité et moins de jank
        pin: true, // Pinne WhyWorkWithMe pendant la transition
        pinSpacing: false, // Pas d'espace vide automatique, on utilise notre spacer
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false, // Désactiver les markers en production
        onEnter: () => {
          // Quand on entre dans la zone de transition
          // Utiliser requestAnimationFrame pour éviter les reflows
          requestAnimationFrame(() => {
            // Mettre à jour la hauteur du spacer si nécessaire
            const currentHeight = getSectionHeight();
            if (currentHeight > 0) {
              spacer.style.height = `${currentHeight}px`;
            }
            
            // Utiliser fixed pour que About recouvre WhyWorkWithMe
            // Optimisations pour la fluidité : utiliser transform au lieu de top pour meilleures performances GPU
            gsap.set(section, {
              position: 'fixed',
              top: '0', // Position fixe en haut
              left: 0,
              right: 0,
              width: '100%',
              y: '100vh', // Utiliser translateY au lieu de top pour meilleures performances
              zIndex: 20,
              willChange: 'transform', // Transform est plus performant que top
              force3D: true, // Force l'accélération GPU pour plus de fluidité
            });
          });
        },
        onUpdate: (self) => {
          // Optimisation : désactiver les mises à jour du spacer pendant le scroll
          // pour éviter les reflows qui causent le jank lors du scroll rapide
          // Le spacer est mis à jour uniquement dans onEnter et onLeave
        },
        onLeave: () => {
          // Quand on sort de la zone de transition, About reste visible et continue dans le flux
          // Le pin de WhyWorkWithMe est libéré, donc About doit être réintégrée correctement
          
          // Utiliser un seul requestAnimationFrame pour améliorer la fluidité
          requestAnimationFrame(() => {
            // Mettre à jour la hauteur du spacer avec la hauteur réelle
            const currentHeight = getSectionHeight();
            if (currentHeight > 0) {
              spacer.style.height = `${currentHeight}px`;
            }
            
            // IMPORTANT : S'assurer que About est toujours dans le DOM
            // Si elle n'est pas dans le parent, la réinsérer juste après le spacer
            if (!section.parentNode && spacer.parentNode) {
              // Réinsérer About juste après le spacer
              if (spacer.nextSibling) {
                spacer.parentNode.insertBefore(section, spacer.nextSibling);
              } else {
                spacer.parentNode.appendChild(section);
              }
            }
            
            // Réintégrer About dans le flux de manière fluide
            // Utiliser immediateRender et forcer tous les styles
            gsap.set(section, {
              position: 'relative',
              top: 'auto',
              left: 'auto',
              right: 'auto',
              width: 'auto',
              y: '0%',
              zIndex: 10,
              clearProps: 'top,transform,willChange',
              immediateRender: true,
            });
            
            // Forcer TOUS les styles via le style inline avec !important
            // C'est crucial pour garantir qu'About reste visible
            section.style.cssText += `
              position: relative !important;
              z-index: 10 !important;
              visibility: visible !important;
              opacity: 1 !important;
              display: block !important;
              top: auto !important;
              left: auto !important;
              right: auto !important;
              width: auto !important;
            `;
            
            // Forcer un refresh de ScrollTrigger de manière asynchrone pour éviter les reflows
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 0);
          });
        },
        onEnterBack: () => {
          // Quand on revient en arrière dans la zone de transition
          requestAnimationFrame(() => {
            gsap.set(section, {
              position: 'fixed',
              top: '0', // Position fixe en haut
              left: 0,
              right: 0,
              width: '100%',
              y: '0vh', // Utiliser translateY
              zIndex: 20,
              willChange: 'transform', // Transform est plus performant
              force3D: true, // Force l'accélération GPU
            });
          });
        },
        onLeaveBack: () => {
          // Quand on sort en arrière, remettre la section en relative avec z-index élevé
          requestAnimationFrame(() => {
            gsap.set(section, {
              position: 'relative',
              top: 'auto',
              y: '0%',
              zIndex: 10,
              clearProps: 'top,transform,willChange',
            });
            
            // Forcer le z-index et la position
            section.style.zIndex = '10';
            section.style.position = 'relative';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
            
            // Mettre à jour la hauteur du spacer
            const currentHeight = getSectionHeight();
            if (currentHeight > 0) {
              spacer.style.height = `${currentHeight}px`;
            }
          });
        },
      },
    });

    // Animer le translateY de 100vh à 0vh de manière fluide
    // Utiliser transform au lieu de top pour de meilleures performances (moins de reflows)
    // Optimisations pour la fluidité : force3D et lazy
    tl.fromTo(section, 
      {
        y: '100vh', // Commence en bas de l'écran (translateY)
        force3D: true, // Force l'accélération GPU
      },
      {
        y: '0vh', // Remonte progressivement jusqu'en haut (translateY)
        ease: 'none', // Pas d'easing pour un contrôle total du scroll
        duration: 1,
        force3D: true, // Force l'accélération GPU
        lazy: false, // Désactive le lazy rendering pour plus de fluidité
      }
    );

    // Mettre à jour la hauteur du spacer lors du redimensionnement
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const currentHeight = getSectionHeight();
        if (currentHeight > 0) {
          spacer.style.height = `${currentHeight}px`;
        }
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, 150); // Debounce pour éviter trop de refresh
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      tl.kill();
      // Nettoyer les styles GSAP et supprimer le spacer
      try {
        gsap.set(section, { clearProps: 'all' });
        if (spacer && spacer.parentNode) {
          spacer.parentNode.removeChild(spacer);
        }
      } catch (error) {
        // Ignorer les erreurs si l'élément n'existe plus
        console.warn('Erreur lors du nettoyage About:', error);
      }
    };
  }, []);

  const cards = [
    {
      id: 1,
      title: 'Surf & Océan',
      content: 'Passionné de surf depuis des années, je puise mon énergie dans l\'océan. Installé entre Biarritz et les vagues de la Côte Basque, c\'est là que je trouve mon équilibre et mon inspiration.',
      delay: 0.1,
    },
    {
      id: 2,
      title: 'Développement Web',
      content: 'Développeur web créatif, j\'adore transformer des idées en projets concrets. Entre front-end fluide et automatisations intelligentes, j\'aime créer des expériences utiles, propres et bien pensées.',
      delay: 0.2,
    },
    {
      id: 3,
      title: 'Voyages & Découvertes',
      content: 'Toujours en mouvement, j\'aime voyager pour découvrir de nouvelles cultures, paysages et façons de vivre. Chaque voyage alimente ma curiosité et influence ma vision du design et du code.',
      delay: 0.3,
    },
    {
      id: 4,
      title: 'Musique & Lifestyle',
      content: 'La musique fait partie de mon quotidien — que ce soit pour coder, voyager ou surfer. Elle rythme mes journées et nourrit mon imagination.',
      delay: 0.4,
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative bg-ocean-deep section-fullscreen py-20 px-6 retro-distort"
      style={{ 
        zIndex: 10,
        contain: 'layout style paint', // Optimisation pour isoler les repaints
        willChange: 'transform', // Optimisation pour les animations
      }}
    >
      <div ref={containerRef} className="max-w-6xl mx-auto relative">
        {/* Slogan défilant horizontalement - au-dessus des carrés */}
        <div className="absolute left-1/2 -translate-x-1/2 w-screen -top-8 md:-top-12 lg:-top-16">
          <SloganCarousel />
        </div>
        
        {/* Grille 2x2 avec photo centrée */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 z-10 mt-8">
          {cards.map((card, index) => {
            // Position du cercle pour shape-outside selon la position de la carte
            // La photo fait environ 256px (w-64) au centre, donc 128px de rayon
            // Position relative dans chaque carré : coin opposé au centre
            const shapeStyles: React.CSSProperties = {
              0: { // Haut gauche : cercle en bas droite du carré
                float: 'right' as const,
                shapeMargin: '20px',
                width: '280px',
                height: '280px',
                clipPath: 'circle(140px at 100% 100%)',
                shapeOutside: 'circle(140px at 100% 100%)',
              },
              1: { // Haut droite : cercle en bas gauche du carré
                float: 'left' as const,
                shapeMargin: '20px',
                width: '280px',
                height: '280px',
                clipPath: 'circle(140px at 0% 100%)',
                shapeOutside: 'circle(140px at 0% 100%)',
              },
              2: { // Bas gauche : cercle en haut droite du carré
                float: 'right' as const,
                shapeMargin: '20px',
                width: '280px',
                height: '280px',
                clipPath: 'circle(140px at 100% 0%)',
                shapeOutside: 'circle(140px at 100% 0%)',
              },
              3: { // Bas droite : cercle en haut gauche du carré
                float: 'left' as const,
                shapeMargin: '20px',
                width: '280px',
                height: '280px',
                clipPath: 'circle(140px at 0% 0%)',
                shapeOutside: 'circle(140px at 0% 0%)',
              },
            }[index] || {};

            return (
              <div
                key={card.id}
                className="relative group"
              >
                {/* Carte */}
                <div className="bg-ocean-blue/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-4 border-accent-blue/30 relative overflow-hidden retro-card h-[280px] md:h-[320px] shadow-[0_0_20px_rgba(90,143,163,0.2)]">
                  {/* Forme circulaire flottante pour que le texte épouse le contour de la photo */}
                  <div 
                    className="hidden md:block pointer-events-none"
                    style={{
                      ...shapeStyles,
                      opacity: 0,
                    }}
                  />
                  
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-2xl" />
                  
                  {/* Contenu avec shape-outside pour épouser le contour circulaire */}
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-medium mb-4 text-sand">
                      {card.title}
                    </h3>
                    <p 
                      className="text-sand/90 leading-relaxed text-base md:text-lg"
                      style={{
                        shapeOutside: shapeStyles.shapeOutside,
                        shapeMargin: shapeStyles.shapeMargin,
                      }}
                    >
                      {card.content}
                    </p>
                  </div>

                  {/* Effet de bordure animée */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-accent-blue/0 group-hover:border-accent-blue/40 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
          
          {/* Photo ronde au centre exact de la grille 2x2 - statique */}
          <div
            className="hidden md:block absolute z-10 pointer-events-auto"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative group" style={{ width: '256px', height: '256px', maxWidth: '100%' }}>
              {/* Halo rétro - sans animation de mouvement */}
              <div className="absolute inset-0 rounded-full bg-accent-blue/20 blur-2xl" />
              <div className="absolute inset-0 rounded-full bg-accent-blue/10 blur-xl" />
              
              {/* Photo - avec animation flip horizontal au hover */}
              <motion.div 
                className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-accent-blue/30 shadow-[0_0_20px_rgba(90,143,163,0.2)] cursor-pointer"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                whileHover={{
                  scaleX: -1,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
              >
                <img
                  src="/images/portrait.jpg"
                  alt="Maxime Farineau"
                  className="w-full h-full object-cover"
                  style={{
                    transform: 'translateZ(0)',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ff6b35" width="200" height="200"/%3E%3Ctext fill="%23f4e4bc" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EMF%3C/text%3E%3C/svg%3E';
                  }}
                />
                
                {/* Overlay rétro */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/15 via-transparent to-ocean-deep/20 mix-blend-mode-overlay" />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Photo ronde centrée pour mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex justify-center mt-8 md:hidden"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent-blue/20 blur-2xl" />
            <div className="absolute inset-0 rounded-full bg-accent-blue/10 blur-xl" />
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-accent-blue/30 shadow-[0_0_20px_rgba(90,143,163,0.2)]">
              <img
                src="/images/portrait.jpg"
                alt="Maxime Farineau"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ff6b35" width="200" height="200"/%3E%3Ctext fill="%23f4e4bc" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EMF%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/15 via-transparent to-ocean-deep/20 mix-blend-mode-overlay" />
            </div>
          </div>
        </motion.div>

        {/* Classeur photo rétro avec scroll horizontal */}
        <PhotoAlbum />
      </div>
    </section>
  );
}

// Composant classeur photo rétro inspiré de ReadyMag
function PhotoAlbum() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const photos = [
    '/images/Classeur-2.jpg',
    '/images/Classeur-4.jpg',
    '/images/Classeur-5.jpg',
    '/images/Classeur-6.jpg',
    '/images/Classeur-8.jpg',
    '/images/Classeur-10.jpg',
    '/images/Classeur-11.jpg',
    '/images/Classeur-12.jpg',
    '/images/Classeur-13.jpg',
  ];

  // Taille fixe pour toutes les photos
  const photoWidth = 320;
  const photoHeight = 400;
  const photoGap = 20; // Espace entre photos visibles
  const stackOffset = 15; // Décalage pour l'effet de pile

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      setContainerWidth(container.clientWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!container || !scrollContainer) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isHovered) return;
      
      // Détecter le scroll horizontal du trackpad
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Scroll horizontal natif du trackpad
        return; // Laisser le comportement par défaut
      } else {
        // Convertir le scroll vertical en horizontal
        e.preventDefault();
        const currentScroll = scrollContainer.scrollLeft;
        const newScroll = currentScroll + e.deltaY;
        scrollContainer.scrollTo({
          left: newScroll,
          behavior: 'smooth',
        });
      }
    };

    // Optimiser handleScroll avec throttling pour réduire le jank
    let scrollRaf: number | null = null;
    const handleScroll = () => {
      if (scrollRaf) return; // Éviter les appels multiples
      
      scrollRaf = requestAnimationFrame(() => {
        setScrollLeft(scrollContainer.scrollLeft);
        setMaxScroll(scrollContainer.scrollWidth - scrollContainer.clientWidth);
        scrollRaf = null;
      });
    };
    
    // Initialiser maxScroll
    handleScroll();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('wheel', handleWheel, { passive: false });
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (scrollRaf) {
        cancelAnimationFrame(scrollRaf);
      }
    };
  }, [isHovered]);

  // Calculer la position et le z-index de chaque photo
  const getPhotoStyle = (index: number) => {
    const photoPosition = index * (photoWidth + photoGap);
    const isInViewport = photoPosition >= scrollLeft - photoWidth && photoPosition <= scrollLeft + containerWidth;
    const hasPassed = photoPosition < scrollLeft;
    
    // Rotation subtile aléatoire basée sur l'index
    const rotation = (index % 5 - 2) * 1.5; // Entre -3 et 3 degrés
    
    // Calculer le décalage pour l'effet de pile
    let translateX = 0;
    let translateY = 0;
    let zIndex = photos.length - index;
    let opacity = 1;
    let scale = 1;

    if (hasPassed) {
      // Photo qui a passé : créer l'effet de pile à gauche
      const scrollProgress = (scrollLeft - photoPosition) / photoWidth;
      const stackIndex = Math.floor(scrollProgress / 0.3); // Empiler toutes les 30% de scroll
      translateX = -stackIndex * stackOffset;
      translateY = stackIndex * stackOffset * 0.5;
      zIndex = stackIndex + 1; // Les photos empilées ont un z-index plus bas
      opacity = Math.max(0.3, 1 - stackIndex * 0.15); // Opacité décroissante
      scale = Math.max(0.85, 1 - stackIndex * 0.05); // Légère réduction de taille
    } else if (isInViewport) {
      // Photo visible : légère rotation et position normale
      translateX = 0;
      translateY = 0;
    }

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex,
      opacity,
      transition: hasPassed ? 'none' : 'transform 0.1s ease-out',
    };
  };

  return (
    <div 
      ref={containerRef}
      className="mt-20 md:mt-32 relative"
    >
      <h3 className="text-3xl md:text-4xl font-medium mb-8 text-sand text-center">
        Mes Moments
      </h3>
      
      {/* Zone de scroll avec pile visible à gauche */}
      <div className="relative">
        {/* Zone de pile fixe à gauche */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-32 md:w-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, rgba(26, 46, 58, 0.95), transparent)',
          }}
        />
        
        {/* Container de scroll */}
        <div 
          ref={scrollContainerRef}
          className={`overflow-x-auto overflow-y-visible pb-8 ${isHovered ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            contain: 'layout style paint',
            willChange: 'scroll-position',
          }}
        >
          <div 
            className="flex items-start"
            style={{
              width: `${photos.length * (photoWidth + photoGap) + photoGap}px`,
              paddingLeft: `${photoGap}px`,
              paddingRight: `${containerWidth}px`,
            }}
          >
            {photos.map((photo, index) => {
              const photoStyle = getPhotoStyle(index);
              
              return (
                <div
                  key={index}
                  className="flex-shrink-0 relative"
                  style={{
                    width: `${photoWidth}px`,
                    marginRight: `${photoGap}px`,
                    ...photoStyle,
                  }}
                >
                  {/* Ombre portée douce */}
                  <div 
                    className="absolute inset-0 bg-ocean-deep/30 blur-xl"
                    style={{
                      transform: 'translate(8px, 8px)',
                      zIndex: -1,
                    }}
                  />
                  
                  {/* Photo avec bordure blanche */}
                  <div 
                    className="relative bg-white p-2 shadow-lg"
                    style={{
                      width: `${photoWidth}px`,
                      height: `${photoHeight}px`,
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        display: 'block',
                        filter: 'sepia(8%) contrast(103%) brightness(98%)',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="400"%3E%3Crect fill="%235a8fa3" width="320" height="400"/%3E%3Ctext fill="%23e8dcc6" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EPhoto%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    
                    {/* Effet de vieillissement subtil */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-ocean-deep/5 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barre de défilement */}
      {isHovered && maxScroll > 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-64 md:w-96"
          >
            <div className="relative h-1 bg-sand/20 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent-blue rounded-full"
                initial={{ width: '0%' }}
                animate={{
                  width: `${(scrollLeft / maxScroll) * 100}%`,
                }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Style pour masquer la scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Composant slogan défilant horizontalement avec accélération au scroll
function SloganCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollSpeedRef = useRef(0.05); // Vitesse de base (très lente)

  const slogan = "Le bon timing. La bonne vague. Le bon code.";
  // Dupliquer le slogan plusieurs fois pour créer l'effet de boucle fluide
  const duplicatedSlogans = [...Array(5)].map(() => slogan);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let position = 0;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const animate = () => {
      position += scrollSpeedRef.current;
      
      // Calculer la largeur d'un slogan (approximative)
      const sloganWidth = container.scrollWidth / duplicatedSlogans.length;
      
      // Réinitialiser la position quand on dépasse un set complet
      if (position >= sloganWidth) {
        position = position - sloganWidth;
      }
      
      container.style.transform = `translateX(-${position}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Écouter le scroll pour accélérer (sur About et WhyWorkWithMe)
    // Optimisé avec throttling pour réduire le jank
    let lastScrollTime = 0;
    const throttleDelay = 16; // ~60fps
    
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollTime < throttleDelay) return;
      lastScrollTime = now;
      
      // Utiliser requestAnimationFrame pour synchroniser avec le rendu
      requestAnimationFrame(() => {
        const aboutSection = document.getElementById('about');
        const whyWorkSection = document.getElementById('why-work-with-me');
        const windowHeight = window.innerHeight;
        
        let maxSpeed = 0.3; // Vitesse de base
        let shouldAccelerate = false;
        
        // Vérifier la section About (avec cache pour éviter trop de getBoundingClientRect)
        if (aboutSection) {
          const aboutRect = aboutSection.getBoundingClientRect();
          if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - aboutRect.top) / windowHeight));
            const speed = 0.3 + (scrollProgress * scrollProgress * 1.5);
            maxSpeed = Math.max(maxSpeed, speed);
            shouldAccelerate = true;
          }
        }
        
        // Vérifier la section WhyWorkWithMe
        if (whyWorkSection) {
          const whyWorkRect = whyWorkSection.getBoundingClientRect();
          if (whyWorkRect.top < windowHeight && whyWorkRect.bottom > 0) {
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - whyWorkRect.top) / windowHeight));
            const speed = 0.3 + (scrollProgress * scrollProgress * 1.5);
            maxSpeed = Math.max(maxSpeed, speed);
            shouldAccelerate = true;
          }
        }
        
        // Appliquer la vitesse calculée
        scrollSpeedRef.current = maxSpeed;
        
        // Réinitialiser le timeout à chaque événement de scroll
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        // Si on est dans une section et qu'on accélère, réinitialiser après 100ms d'inactivité
        // Si on n'est pas dans une section, réinitialiser immédiatement
        if (shouldAccelerate) {
          scrollTimeout = setTimeout(() => {
            scrollSpeedRef.current = 0.3;
          }, 100);
        } else {
          // Si aucune section n'est visible, réinitialiser immédiatement
          scrollSpeedRef.current = 0.3;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
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
    <div className="relative overflow-hidden w-full" style={{ contain: 'layout style paint' }}>
      <div
        ref={containerRef}
        className="flex gap-8 whitespace-nowrap"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        {duplicatedSlogans.map((text, index) => (
          <h2
            key={index}
            className="flex-shrink-0 text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-anton text-accent-blue/20"
            style={{ fontFamily: 'var(--font-anton)' }}
          >
            {text}
          </h2>
        ))}
      </div>
    </div>
  );
}
