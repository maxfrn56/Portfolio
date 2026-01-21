'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { useSectionTransition } from '@/hooks/useSectionTransition';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation subtile de transition entre sections
  useSectionTransition(sectionRef, contentRef, {
    direction: 'up',
    shiftAmount: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        gsap.to('.contact-form', {
          scale: 0.95,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
      } else {
        setSubmitStatus('error');
        // Afficher l'erreur dans la console pour le débogage
        if (process.env.NODE_ENV === 'development') {
          console.error('Erreur API:', result);
        }
      }
    } catch (error) {
      setSubmitStatus('error');
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur réseau:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section-fullscreen bg-ocean-deep py-20 px-6 retro-distort section-separator" style={{ zIndex: 10 }}>
      <div ref={contentRef} className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-sand" style={{ fontFamily: 'var(--font-polya)', fontWeight: 'bold' }}>
            Contact
          </h2>
          <p className="text-xl text-sand/80 max-w-2xl mx-auto mb-8">
            Développeur web à Biarritz, je vous accompagne dans la création de votre site web sur mesure. Discutons de votre projet de création de site web et créons quelque chose d&apos;exceptionnel ensemble.
          </p>
          
          {/* Informations de contact */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
            <motion.a
              href="mailto:contact@maximefarineau.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-lg text-accent-blue hover:text-white transition-colors"
            >
              contact@maximefarineau.com
            </motion.a>
            <motion.a
              href="tel:+33669347443"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-lg text-accent-blue hover:text-white transition-colors"
            >
              06 69 34 74 43
            </motion.a>
          </div>
        </motion.div>

        {/* Formulaire */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="contact-form bg-ocean-blue/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-accent-blue/15"
        >
          <div className="space-y-6">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-sand mb-2">
                Nom
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-ocean-deep/50 border border-accent-blue/20 rounded-lg text-white placeholder-sand/50 focus:outline-none focus:border-accent-blue transition-colors"
                placeholder="Votre nom"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sand mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-ocean-deep/50 border border-accent-blue/20 rounded-lg text-white placeholder-sand/50 focus:outline-none focus:border-accent-blue transition-colors"
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-sand mb-2">
                Téléphone <span className="text-sand/50 text-xs">(optionnel)</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className="w-full px-4 py-3 bg-ocean-deep/50 border border-accent-blue/20 rounded-lg text-white placeholder-sand/50 focus:outline-none focus:border-accent-blue transition-colors"
                placeholder="06 12 34 56 78"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-sand mb-2">
                Message
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={6}
                className="w-full px-4 py-3 bg-ocean-deep/50 border border-accent-blue/30 rounded-lg text-white placeholder-sand/50 focus:outline-none focus:border-accent-blue transition-colors resize-none"
                placeholder="Parlez-moi de votre projet..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            {/* Bouton submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-accent-blue text-white font-semibold rounded-full hover:bg-accent-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </motion.button>

            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
              >
                Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
              >
                Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

