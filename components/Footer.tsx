'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ocean-deep border-t border-ocean-blue/30 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sand/70 text-sm"
          >
            © {new Date().getFullYear()} Maxime Farineau. Tous droits réservés.
          </motion.p>
          
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <motion.a
              href="mailto:contact@maximefarineau.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="text-accent-blue hover:text-white transition-colors text-sm"
            >
              Email
            </motion.a>
            <motion.a
              href="tel:+33669347443"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-accent-blue hover:text-white transition-colors text-sm"
            >
              Téléphone
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/mentions-legales"
                className="text-accent-blue hover:text-white transition-colors text-sm"
              >
                Mentions légales
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

