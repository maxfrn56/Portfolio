'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MentionsLegales() {
  useEffect(() => {
    // Attendre que le DOM soit prêt
    const cleanup = () => {
      try {
        // Nettoyer tous les ScrollTriggers existants pour éviter les conflits
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
          try {
            trigger.kill();
          } catch (error) {
            // Ignorer les erreurs de nettoyage
          }
        });
        
        // Nettoyer les spacers créés par ScrollTrigger
        const spacers = document.querySelectorAll('[data-spacer="true"]');
        spacers.forEach(spacer => {
          try {
            if (spacer && spacer.parentNode) {
              spacer.parentNode.removeChild(spacer);
            }
          } catch (error) {
            // Ignorer les erreurs si l'élément n'existe plus
          }
        });
        
        // Rafraîchir ScrollTrigger après nettoyage
        ScrollTrigger.refresh();
      } catch (error) {
        // Ignorer toutes les erreurs pour ne pas bloquer l'affichage
        if (process.env.NODE_ENV === 'development') {
          console.warn('Erreur lors du nettoyage:', error);
        }
      }
    };
    
    // Nettoyer immédiatement
    cleanup();
    
    // Nettoyer aussi après un court délai pour s'assurer que tout est prêt
    const timeout = setTimeout(cleanup, 100);
    
    return () => {
      clearTimeout(timeout);
      cleanup();
    };
  }, []);

  return (
    <section className="relative bg-ocean-deep py-20 px-6 retro-distort min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-sand">
            Mentions légales et politique de confidentialité
          </h1>
          <p className="text-lg text-sand/70">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-ocean-blue/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-accent-blue/20 prose prose-invert max-w-none"
        >
          <div className="text-sand/90 space-y-8">
            <p className="text-lg leading-relaxed">
              L&apos;entreprise individuelle <strong>Maxime Farineau</strong>, soucieuse des droits des individus, notamment au regard des traitements automatisés et dans une volonté de transparence avec ses clients, a mis en place une politique reprenant l&apos;ensemble de ces traitements, des finalités poursuivies par ces derniers ainsi que des moyens d&apos;actions à la disposition des individus afin qu&apos;ils puissent au mieux exercer leurs droits.
            </p>

            <p className="text-lg leading-relaxed">
              Pour toute information complémentaire sur la protection des données personnelles, nous vous invitons à consulter le site de la CNIL :{' '}
              <a 
                href="https://www.cnil.fr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-blue hover:text-white transition-colors underline"
              >
                https://www.cnil.fr/
              </a>
            </p>

            <p className="text-lg leading-relaxed">
              La poursuite de la navigation sur ce site vaut acceptation sans réserve des dispositions et conditions d&apos;utilisation qui suivent.
            </p>

            <p className="text-lg leading-relaxed">
              La version actuellement en ligne de ces conditions d&apos;utilisation est la seule opposable pendant toute la durée d&apos;utilisation du site et jusqu&apos;à ce qu&apos;une nouvelle version la remplace.
            </p>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 1 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 1 – Mentions légales</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-accent-blue mb-2">1.1 Site (ci-après « le site »)</h3>
                  <p className="text-sand/80">maximefarineau.com</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-accent-blue mb-2">1.2 Éditeur (ci-après « l&apos;éditeur »)</h3>
                  <p className="text-sand/80 space-y-1">
                    <span className="block">Entreprise individuelle <strong>Maxime Farineau</strong></span>
                    <span className="block">Siège social : <strong>6 rue du Puits, 56550 Locoal-Mendon</strong></span>
                    <span className="block">Numéro SIRET : <strong>953 018 538 00025</strong></span>
                    <span className="block">Téléphone : <a href="tel:+33669347443" className="text-accent-blue hover:text-white transition-colors">06 69 34 74 43</a></span>
                    <span className="block">Adresse e-mail : <a href="mailto:contact@maximefarineau.com" className="text-accent-blue hover:text-white transition-colors">contact@maximefarineau.com</a></span>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-accent-blue mb-2">1.3 Hébergeur (ci-après « l&apos;hébergeur »)</h3>
                  <p className="text-sand/80 space-y-1">
                    <span className="block">Le site est hébergé par <strong>OVHcloud</strong></span>
                    <span className="block">OVH SAS</span>
                    <span className="block">2 rue Kellermann</span>
                    <span className="block">59100 Roubaix, France</span>
                    <span className="block">
                      <a 
                        href="https://www.ovhcloud.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent-blue hover:text-white transition-colors"
                      >
                        https://www.ovhcloud.com
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 2 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 2 – Accès au site</h2>
              <p className="text-sand/80 leading-relaxed">
                L&apos;accès au site et son utilisation sont réservés à un usage strictement personnel.
              </p>
              <p className="text-sand/80 leading-relaxed">
                Vous vous engagez à ne pas utiliser ce site et les informations ou données qui y figurent à des fins commerciales, politiques, publicitaires ou pour toute forme de sollicitation commerciale, notamment l&apos;envoi de courriers électroniques non sollicités.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 3 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 3 – Contenu du site</h2>
              <p className="text-sand/80 leading-relaxed">
                Toutes les marques, photographies, textes, commentaires, illustrations, images animées ou non, séquences vidéo, sons, ainsi que toutes les applications informatiques pouvant être utilisées pour faire fonctionner ce site sont protégés par les lois en vigueur au titre de la propriété intellectuelle.
              </p>
              <p className="text-sand/80 leading-relaxed">
                Ils sont la propriété pleine et entière de l&apos;éditeur ou de ses partenaires.
              </p>
              <p className="text-sand/80 leading-relaxed">
                Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments, sans l&apos;accord préalable et écrit de l&apos;éditeur, est strictement interdite.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 4 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 4 – Gestion du site</h2>
              <p className="text-sand/80 leading-relaxed mb-4">
                Pour la bonne gestion du site, l&apos;éditeur pourra à tout moment :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sand/80 ml-4">
                <li>suspendre, interrompre ou limiter l&apos;accès à tout ou partie du site ;</li>
                <li>réserver l&apos;accès à certaines parties du site à une catégorie déterminée d&apos;internautes ;</li>
                <li>supprimer toute information pouvant en perturber le fonctionnement ou entrant en contravention avec les lois en vigueur ;</li>
                <li>suspendre le site afin de procéder à des mises à jour.</li>
              </ul>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 5 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 5 – Responsabilités</h2>
              <p className="text-sand/80 leading-relaxed">
                La responsabilité de l&apos;éditeur ne peut être engagée en cas de défaillance, panne, difficulté ou interruption de fonctionnement empêchant l&apos;accès au site.
              </p>
              <p className="text-sand/80 leading-relaxed">
                L&apos;utilisateur est seul responsable de son matériel de connexion et de l&apos;usage qu&apos;il fait du site.
              </p>
              <p className="text-sand/80 leading-relaxed">
                L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du site.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 6 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 6 – Liens hypertextes</h2>
              <p className="text-sand/80 leading-relaxed">
                La mise en place de liens hypertextes vers tout ou partie du site est autorisée par l&apos;éditeur.
              </p>
              <p className="text-sand/80 leading-relaxed">
                Tout lien devra être retiré sur simple demande de l&apos;éditeur.
              </p>
              <p className="text-sand/80 leading-relaxed">
                L&apos;éditeur ne dispose d&apos;aucun droit sur le contenu des sites tiers accessibles via des liens hypertextes.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 7 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 7 – Collecte et protection des données</h2>
              <p className="text-sand/80 leading-relaxed">
                Les données personnelles sont collectées par l&apos;entreprise individuelle <strong>Maxime Farineau</strong>.
              </p>
              <p className="text-sand/80 leading-relaxed mb-4">
                Les données collectées peuvent inclure :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sand/80 ml-4">
                <li>nom et prénom</li>
                <li>adresse e-mail</li>
                <li>numéro de téléphone</li>
              </ul>
              <p className="text-sand/80 leading-relaxed mt-4">
                Ces données sont utilisées exclusivement pour la gestion de la relation client et le traitement des demandes.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 8 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 8 – Droits des utilisateurs</h2>
              <p className="text-sand/80 leading-relaxed mb-4">
                Conformément à la réglementation en vigueur, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sand/80 ml-4">
                <li>droit d&apos;accès</li>
                <li>droit de rectification</li>
                <li>droit de suppression</li>
                <li>droit d&apos;opposition</li>
                <li>droit à la limitation du traitement</li>
                <li>droit à la portabilité des données</li>
              </ul>
              <p className="text-sand/80 leading-relaxed mt-4">
                Pour exercer ces droits, vous pouvez contacter :
              </p>
              <div className="bg-ocean-blue/20 rounded-lg p-4 mt-4 space-y-2 text-sand/80">
                <p><strong>Par courrier :</strong></p>
                <p>6 rue du Puits, 56550 Locoal-Mendon</p>
                <p className="mt-4"><strong>Par e-mail :</strong></p>
                <p>
                  <a href="mailto:contact@maximefarineau.com" className="text-accent-blue hover:text-white transition-colors">
                    contact@maximefarineau.com
                  </a>
                </p>
              </div>
              <p className="text-sand/80 leading-relaxed mt-4">
                Une réponse vous sera apportée dans un délai maximal d&apos;un mois.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 9 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 9 – Utilisation des données</h2>
              <p className="text-sand/80 leading-relaxed mb-4">
                Les données personnelles collectées ont pour objectif :
              </p>
              <ul className="list-disc list-inside space-y-2 text-sand/80 ml-4">
                <li>la fourniture et l&apos;amélioration des services ;</li>
                <li>la communication avec les utilisateurs ;</li>
                <li>la sécurité et la prévention des fraudes.</li>
              </ul>
              <p className="text-sand/80 leading-relaxed mt-4">
                Aucune donnée personnelle n&apos;est vendue à des tiers.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 10 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 10 – Conservation des données</h2>
              <p className="text-sand/80 leading-relaxed">
                Les données sont conservées uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations légales.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 11 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 11 – Partage des données avec des tiers</h2>
              <p className="text-sand/80 leading-relaxed">
                Les données peuvent être partagées avec des prestataires techniques situés dans l&apos;Union européenne, uniquement dans le cadre de l&apos;exécution des services.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 12 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 12 – Offres commerciales</h2>
              <p className="text-sand/80 leading-relaxed">
                L&apos;éditeur peut être amené à envoyer des communications commerciales.
              </p>
              <p className="text-sand/80 leading-relaxed">
                Vous pouvez vous opposer à ces envois à tout moment en écrivant à :{' '}
                <a href="mailto:contact@maximefarineau.com" className="text-accent-blue hover:text-white transition-colors">
                  contact@maximefarineau.com
                </a>
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 13 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 13 – Cookies</h2>
              <p className="text-sand/80 leading-relaxed">
                Le site peut utiliser des cookies à des fins de mesure d&apos;audience et d&apos;amélioration de l&apos;expérience utilisateur.
              </p>
              <p className="text-sand/80 leading-relaxed">
                Lors de votre première visite, un bandeau vous informe de l&apos;utilisation des cookies et vous permet d&apos;accepter ou de refuser leur dépôt.
              </p>
              <p className="text-sand/80 leading-relaxed">
                La durée de conservation des cookies est de <strong>13 mois maximum</strong>.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 14 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 14 – Photographies</h2>
              <p className="text-sand/80 leading-relaxed">
                Les photographies présentes sur le site ne sont pas contractuelles.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 15 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 15 – Loi applicable</h2>
              <p className="text-sand/80 leading-relaxed">
                Les présentes conditions sont régies par le droit français.
              </p>
              <p className="text-sand/80 leading-relaxed">
                Tout litige sera soumis aux tribunaux compétents du ressort du siège de l&apos;éditeur.
              </p>
            </article>

            <hr className="border-accent-blue/20 my-12" />

            {/* Article 16 */}
            <article className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-sand mb-6">Article 16 – Contact</h2>
              <p className="text-sand/80 leading-relaxed">
                Pour toute question concernant le site ou les services proposés, vous pouvez contacter :{' '}
                <a href="mailto:contact@maximefarineau.com" className="text-accent-blue hover:text-white transition-colors">
                  contact@maximefarineau.com
                </a>
              </p>
            </article>
          </div>

          {/* Bouton retour */}
          <div className="mt-12 pt-8 border-t border-accent-blue/20 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded-full transition-all duration-300"
            >
              <span>←</span>
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

