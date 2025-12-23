'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  video?: string;
  image?: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      videoRef.current.currentTime = 0;
    }
  };

  // Charger la première frame de la vidéo pour l'aperçu
  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.1; // Aller à 0.1s pour avoir une frame visible
      setVideoLoaded(true);
    }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10 }}
      className="relative group overflow-hidden rounded-2xl bg-ocean-blue/20 backdrop-blur-sm border border-accent-blue/20 cursor-pointer h-full flex flex-col min-h-[600px]"
    >
      {/* Vidéo, Image ou Placeholder */}
      <div className="relative w-full h-64 overflow-hidden flex items-center justify-center">
        {project.video ? (
          <>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedMetadata={handleVideoLoadedMetadata}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-60 scale-105'
              }`}
            >
              <source src={project.video} type="video/mp4" />
            </video>
            {/* Overlay subtil quand pas en hover pour garder la lisibilité */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-ocean-blue/40 to-ocean-deep/40 transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'blur-0' : 'blur-sm'
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ocean-blue to-ocean-deep text-sand text-6xl font-bold">
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-sand/80 mb-4 leading-relaxed flex-1">{project.description}</p>
        
        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-accent-blue/20 text-accent-blue text-sm rounded-full border border-accent-blue/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Lien */}
        <motion.a
          href={project.link}
          className="inline-flex items-center gap-2 text-accent-blue hover:text-white transition-colors font-semibold mt-auto"
          whileHover={{ x: 5 }}
        >
          Voir le projet
          <span>→</span>
        </motion.a>
      </div>

      {/* Overlay au hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className="absolute inset-0 bg-accent-blue pointer-events-none"
      />
    </motion.div>
  );
}

