'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionTransition } from '@/hooks/useSectionTransition';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SalineProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleMaskRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Animation subtile de transition entre sections
  useSectionTransition(sectionRef, contentRef, {
    direction: 'up',
    shiftAmount: 3,
  });

  // Gestion du hover pour la vidéo
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Gestion silencieuse si autoplay échoue
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Animations haut de gamme avec GSAP + ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    const videoContainer = videoContainerRef.current;
    const title = titleRef.current;
    const titleMask = titleMaskRef.current;
    const subtitle = subtitleRef.current;
    const textContent = textContentRef.current;

    if (!section || !videoContainer || !title || !titleMask || !subtitle || !textContent) return;

    // Timeline principale pour coordonner toutes les animations
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: false, // Pas de scrub pour les animations de texte (on veut qu'elles se déclenchent une fois)
        invalidateOnRefresh: true,
        once: true, // Animation une seule fois
      },
    });

    // 1. ANIMATION DU TITRE "Saline Project" - Reveal cinématique avec blur
    // Masque qui révèle le titre verticalement (de bas en haut)
    // Initialiser les états initiaux pour l'animation
    gsap.set(titleMask, {
      display: 'block',
      clipPath: 'inset(0% 0% 0% 0%)', // Masque cache tout le titre initialement
      zIndex: 10,
      force3D: true,
    });

    gsap.set(title, {
      filter: 'blur(12px)',
      opacity: 0.3,
      zIndex: 1,
      force3D: true,
    });

    // Animation du masque (reveal vertical de bas en haut) - le masque se retire pour révéler le titre
    const titleReveal = gsap.fromTo(
      titleMask,
      {
        clipPath: 'inset(0% 0% 0% 0%)', // Masque cache tout
        force3D: true,
      },
      {
        clipPath: 'inset(0% 0% 100% 0%)', // Masque se retire vers le haut (révèle le titre de bas en haut)
        duration: 1.2,
        ease: 'power2.out', // Easing cinématique
        force3D: true,
      }
    );

    // Animation du blur → net en parallèle
    const titleBlur = gsap.fromTo(
      title,
      {
        filter: 'blur(12px)',
        opacity: 0.3,
        force3D: true,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1.0,
        ease: 'power2.out',
        force3D: true,
      }
    );

    // 2. ANIMATION DU SOUS-TITRE - Mot par mot avec slide-up discret
    // Créer les spans de manière optimisée
    const subtitleWords = subtitle.textContent?.split(' ') || [];
    const subtitleFragment = document.createDocumentFragment();
    subtitleWords.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'inline-block';
      span.style.cssText = 'opacity: 0; transform: translateY(20px);';
      span.textContent = word + ' ';
      subtitleFragment.appendChild(span);
    });
    subtitle.textContent = ''; // Vider le contenu
    subtitle.appendChild(subtitleFragment);

    const subtitleSpans = subtitle.querySelectorAll('span');

    // Animation mot par mot
    const subtitleAnimation = gsap.to(subtitleSpans, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08, // Délai entre chaque mot
      ease: 'power2.out',
      force3D: true,
    });

    // 3. ANIMATION DU TEXTE DESCRIPTIF - Par blocs avec opacité progressive
    const paragraphs = textContent.querySelectorAll('p');
    const list = textContent.querySelector('ul');
    const listItems = list ? list.querySelectorAll('li') : [];

    // Initialiser tous les éléments
    gsap.set([...paragraphs, ...listItems], {
      opacity: 0,
      y: 15,
      force3D: true,
    });

    // Animation par blocs
    const textAnimation = gsap.to([...paragraphs, ...listItems], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15, // Délai entre chaque bloc
      ease: 'power2.out',
      force3D: true,
    });

    // 4. ANIMATION DE LA VIDÉO - Scale au scroll avec effet de rebond
    // Initialiser la vidéo à une taille plus petite
    gsap.set(videoContainer, {
      scale: 0.85,
      force3D: true,
    });

    // Animation principale : agrandissement progressif au scroll avec rebond
    const videoScale = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 2.5, // Animation liée au scroll, plus lente et fluide
        invalidateOnRefresh: true,
      },
    });

    // Phase 1 : Agrandissement progressif jusqu'à légèrement au-delà de la taille finale
    videoScale.to(
      videoContainer,
      {
        scale: 1.12, // S'agrandit légèrement au-delà de la taille finale pour préparer le rebond
        ease: 'power2.out',
        force3D: true,
        duration: 0.8, // 80% de l'animation totale
      }
    );

    // Phase 2 : Rebond subtil qui ramène à la taille d'origine
    videoScale.to(
      videoContainer,
      {
        scale: 1.0, // Retour à la taille normale avec rebond
        ease: 'back.out(1.2)', // Easing back pour un rebond subtil et élégant
        force3D: true,
        duration: 0.2, // 20% de l'animation totale pour le rebond
      }
    );

    // Coordonner toutes les animations dans la timeline principale
    masterTimeline
      .add(titleReveal, 0) // Titre commence immédiatement
      .add(titleBlur, 0.1) // Blur en parallèle avec un léger décalage
      .add(subtitleAnimation, 0.4) // Sous-titre après le titre
      .add(textAnimation, 0.8); // Texte après le sous-titre

    // Cleanup
    return () => {
      if (masterTimeline) masterTimeline.kill();
      if (videoScale) videoScale.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
      // Nettoyer les animations GSAP
      gsap.killTweensOf([title, titleMask, subtitleSpans, paragraphs, listItems, videoContainer]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="saline-project"
      className="relative bg-ocean-deep py-24 md:py-32 overflow-hidden retro-distort section-separator"
    >
      {/* Formes décoratives en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cercle décoratif en haut à gauche */}
        <div className="absolute -top-20 -left-20 w-64 h-64 border border-accent-blue/10 rounded-full blur-3xl" />
        {/* Rectangle décoratif en bas à droite */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-accent-blue/10 rounded-lg rotate-45 blur-3xl" />
        {/* Ligne décorative diagonale */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent" />
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Layout deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonne gauche : Contenu texte avec cadre */}
          <div className="relative">
            {/* Cadre décoratif autour du contenu texte */}
            <div className="absolute -inset-4 border border-accent-blue/20 rounded-xl opacity-50" />
            <div className="absolute -inset-2 border border-accent-blue/10 rounded-lg opacity-30" />
            
            <div className="relative bg-ocean-blue/5 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-accent-blue/20 space-y-6">
            {/* Titre avec animation de révélation */}
            <div className="relative overflow-hidden mb-4">
              {/* Masque de révélation - sera positionné par GSAP */}
              <div
                ref={titleMaskRef}
                className="absolute inset-0 bg-ocean-deep pointer-events-none"
                style={{
                  display: 'none', // Masqué par défaut, GSAP le révélera
                }}
              />
              {/* Titre - visible par défaut */}
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-sand relative"
                style={{ fontFamily: 'var(--font-polya)', fontWeight: 'bold' }}
              >
                Saline Project
              </h2>
            </div>

            {/* Sous-titre avec animation mot par mot */}
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-accent-blue/90 font-light"
            >
              Plateforme complète avec intégration système de caisse
            </p>

            {/* Texte explicatif avec animation par blocs */}
            <div
              ref={textContentRef}
              className="space-y-4 text-sand/80 leading-relaxed text-base md:text-lg"
            >
              <p>
                Développement d&apos;une plateforme web complète pour le restaurant Saline, 
                construite avec <span className="text-accent-blue font-medium">React</span> en frontend, 
                <span className="text-accent-blue font-medium"> Node.js</span> en backend 
                et <span className="text-accent-blue font-medium">MySQL</span> pour la base de données.
              </p>
              
              <p>
                <span className="text-sand font-medium">Fonctionnalités implémentées :</span>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Réservation de table en ligne</li>
                <li>Système de compte de fidélité</li>
                <li>Commande en ligne avec paiement intégré</li>
                <li>Mode click and collect</li>
              </ul>

              <p className="pt-2">
                <span className="text-accent-blue font-medium">Point fort technique :</span> Intégration 
                API entre le système de caisse <span className="text-sand font-medium">Tactéo</span>, 
                le logiciel de conversion <span className="text-sand font-medium">Hubrise</span> et le 
                site internet. Lorsqu&apos;un client passe commande, le cuisinier reçoit directement le bon 
                en cuisine en temps réel, sans intervention manuelle.
              </p>
            </div>
            </div>
          </div>

          {/* Colonne droite : Vidéo encadrée */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Cadres décoratifs multiples autour de la vidéo */}
            <div className="absolute -inset-6 border border-accent-blue/15 rounded-2xl opacity-40" />
            <div className="absolute -inset-3 border border-accent-blue/20 rounded-xl opacity-50" />
            
            {/* Cadre principal autour de la vidéo */}
            <div className="relative border-2 border-accent-blue/30 rounded-xl overflow-hidden bg-ocean-blue/10 backdrop-blur-sm p-3 md:p-4 shadow-2xl">
              {/* Coin décoratif en haut à gauche */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent-blue/30 rounded-tl-xl" />
              {/* Coin décoratif en bas à droite */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent-blue/30 rounded-br-xl" />
              {/* Container vidéo avec animation de scale */}
              <div
                ref={videoContainerRef}
                className="relative w-full aspect-video overflow-hidden rounded-lg bg-ocean-deep border border-accent-blue/20"
                style={{
                  willChange: 'transform',
                  transformOrigin: 'center',
                }}
              >
                {/* Vidéo ou Fallback */}
                {!videoError ? (
                  <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    style={{
                      opacity: isHovered ? 1 : 0.7,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                    onError={() => setVideoError(true)}
                  >
                    <source src="/videos/saline-project.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ocean-blue/30 to-ocean-deep/30 text-sand/70">
                    <svg
                      className="w-16 h-16 mb-4 text-accent-blue/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm font-medium">Vidéo de démonstration</p>
                    <p className="text-xs mt-1 text-sand/50">À venir</p>
                  </div>
                )}

                {/* Overlay subtil quand la vidéo n'est pas en hover */}
                {!isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/20 to-transparent pointer-events-none" />
                )}

                {/* Indicateur de lecture au hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" />
                    <span className="text-xs text-white font-medium">Lecture</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Légende discrète */}
            <p className="text-center text-sand/50 text-sm mt-4 italic">
              Survolez la vidéo pour la visionner
            </p>

            {/* Bouton vers le site */}
            <a
              href="https://saline-frontend-production.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-6 block w-full px-8 py-4 text-center font-semibold text-white overflow-hidden rounded-lg border-2 border-accent-blue/30 bg-ocean-blue/20 backdrop-blur-sm group"
            >
              {/* Effet de remplissage vertical (même animation que les carrés du carrousel) */}
              <div className="absolute bottom-0 left-0 right-0 h-0 bg-accent-blue/30 group-hover:h-full transition-all duration-500 ease-out" />
              
              {/* Texte du bouton */}
              <span className="relative z-10 block transition-colors duration-300 group-hover:text-white">
                Visiter le site
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

