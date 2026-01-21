'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from "@/components/sections/Hero";
import WhyWorkWithMe from "@/components/sections/WhyWorkWithMe";
import About from "@/components/sections/About";
import SalineProject from "@/components/sections/SalineProject";
import Portfolio from "@/components/sections/Portfolio";
import Tarifs from "@/components/sections/Tarifs";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Attendre que le loader disparaisse pour révéler le contenu
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800); // Délai pour synchroniser avec la disparition du loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Hero />
      <WhyWorkWithMe />
      <About />
      <SalineProject />
      <Portfolio />
      <Tarifs />
      <FAQ />
      <Contact />
    </motion.div>
  );
}

