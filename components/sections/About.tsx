'use client';

import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const cards = [
    {
      id: 1,
      title: 'Surf & Océan',
      content: 'Passionné de surf depuis des années, je puise mon énergie dans l\'océan. Installé entre Biarritz et les vagues de la Côte Basque, c\'est là que je trouve mon équilibre et mon inspiration.',
    },
    {
      id: 2,
      title: 'Développement Web',
      content: 'Développeur web créatif, j\'adore transformer des idées en projets concrets. Entre front-end fluide et automatisations intelligentes, j\'aime créer des expériences utiles, propres et bien pensées.',
    },
    {
      id: 3,
      title: 'Voyages & Découvertes',
      content: 'Toujours en mouvement, j\'aime voyager pour découvrir de nouvelles cultures, paysages et façons de vivre. Chaque voyage alimente ma curiosité et influence ma vision du design et du code.',
    },
    {
      id: 4,
      title: 'Musique & Lifestyle',
      content: 'La musique fait partie de mon quotidien — que ce soit pour coder, voyager ou surfer. Elle rythme mes journées et nourrit mon imagination.',
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative bg-ocean-deep section-fullscreen pt-0 pb-0 md:pt-32 md:pb-0 px-4 md:px-6 retro-distort overflow-x-hidden"
      style={{ 
        zIndex: 10,
      }}
    >
      {/* Masquer la ligne de séparation de la section suivante sur desktop */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-px bg-ocean-deep z-40" />
      {/* Ligne de séparation mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent md:hidden" />
      
      {/* Slogan statique - simplifié */}
      <div className="absolute left-0 right-0 top-20 md:-top-4 lg:-top-6 overflow-hidden z-20 pointer-events-none" style={{ width: '100%', maxWidth: '100vw' }}>
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-anton text-accent-blue/20 whitespace-nowrap">
            Le bon timing. La bonne vague. Le bon code.
          </h2>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative overflow-x-hidden md:mt-0" style={{ marginTop: '0' }}>
        
        {/* Grille 2x2 avec photo centrée - Masquée sur mobile */}
        <div className="hidden md:grid relative grid-cols-2 gap-4 md:gap-8 z-10 mt-4 md:mt-8 w-full">
          {cards.map((card, index) => {
            return (
              <div
                key={card.id}
                className="relative w-full"
              >
                {/* Carte */}
                <div className="bg-ocean-blue/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-accent-blue/30 relative overflow-hidden min-h-[180px] h-auto md:h-[320px] shadow-[0_0_20px_rgba(90,143,163,0.2)] w-full max-w-full box-border">
                  
                  {/* Contenu */}
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-3xl font-medium mb-2 md:mb-4 text-sand">
                      {card.title}
                    </h3>
                    <p className="text-sand/90 leading-relaxed text-sm md:text-lg">
                      {card.content}
                    </p>
                  </div>
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
              
              {/* Photo - simplifiée */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-accent-blue/30 shadow-[0_0_20px_rgba(90,143,163,0.2)]">
                <img
                  src="/images/portrait.jpg"
                  alt="Maxime Farineau"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ff6b35" width="200" height="200"/%3E%3Ctext fill="%23f4e4bc" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EMF%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        

        {/* Classeur photo rétro avec scroll horizontal */}
        <PhotoAlbum />
      </div>
    </section>
  );
}

// Composant classeur photo simplifié
function PhotoAlbum() {
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

  return (
    <div className="mt-8 md:mt-32 relative w-full overflow-x-auto mb-0 md:mb-0 pb-0">
      <h3 className="text-2xl md:text-4xl font-medium mb-6 md:mb-8 text-sand text-center">
        Mes Moments
      </h3>
      
      {/* Container de scroll simplifié */}
      <div 
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-8"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative"
            style={{
              width: '200px',
              height: '250px',
            }}
          >
            <div className="relative bg-white p-2 shadow-lg w-full h-full">
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="250"%3E%3Crect fill="%235a8fa3" width="200" height="250"/%3E%3Ctext fill="%23e8dcc6" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EPhoto%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Style pour masquer la scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

