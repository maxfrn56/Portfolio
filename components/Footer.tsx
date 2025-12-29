'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ocean-deep border-t border-ocean-blue/30 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenu principal en 3 colonnes avec barre verticale */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 mb-8">
          {/* Carte à gauche */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center md:justify-start"
          >
            <div className="w-64 h-72 md:w-80 md:h-96 flex-shrink-0 relative">
              <svg 
                viewBox="0 0 4431 4613" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                aria-label="Carte de la France - Localisation Biarritz"
              >
                <g filter="url(#filter0_d_footer_map)">
                  <path 
                    d="M997.75 4008.59L919.25 4041.59V4087.59L1064.25 4115.59L1039.25 4213.59L1064.25 4245.09L1109.75 4213.59L1176.75 4283.59L1309.25 4297.59L1365.75 4385.09L1474.25 4346.59L1547.75 4385.09L1565.25 4413.09H1831.25V4346.59L1985.25 4385.09L2037.75 4413.09H2093.75L2153.25 4483.09V4437.59L2265.25 4483.09V4504.09L2327.75 4563.59L2348.75 4602.09H2415.25V4563.59H2474.75L2509.75 4602.09H2604.25L2691.75 4525.09L2768.75 4504.09L2737.25 4385.09V4297.59L2768.75 4213.59L2849.25 4087.59H2905.25L3097.75 3933.59L3171.25 4000.09L3283.25 3961.59L3328.75 4021.09L3524.75 4000.09L3598.25 4021.09V4049.09L3829.25 4119.09L3941.25 4087.59L3983.25 4049.09L4112.75 4021.09L4091.75 3916.09L4189.75 3895.09L4252.75 3800.59V3734.09L4368.25 3674.59V3629.09L4424.25 3496.09L4403.25 3433.09L4368.25 3496.09L4189.75 3457.59L4091.75 3377.09L4112.75 3338.59L4060.25 3293.09L4112.75 3268.59L4091.75 3135.59L3983.25 3048.09V2979.59H4060.25L4137.25 2918.59L4112.75 2827.59L4060.25 2778.59V2708.59L4011.25 2687.59L3983.25 2635.09L4060.25 2554.59L3951.75 2443.09L3983.25 2376.59L3913.25 2310.09L3874.75 2334.59L3773.25 2376.59V2484.59H3675.25V2443.09L3727.75 2376.59L3706.75 2334.59V2236.59L3815.25 2149.09V2026.59L3874.75 1998.59L3951.75 1869.09L3983.25 1816.59H3934.25V1778.09L4011.25 1729.09V1750.09H4112.75L4137.25 1704.59L4112.75 1578.59L4137.25 1487.59L4112.75 1365.09L4158.25 1207.59V1106.09L4200.25 1078.09L4245.75 1008.09V945.089L4200.25 920.589H4112.75L4011.25 882.089L3913.25 899.589L3853.75 850.589H3815.25V899.589L3748.75 882.089L3675.25 787.589L3615.75 738.589L3587.75 749.089L3475.75 787.589L3416.25 717.589L3363.75 749.089L3314.75 738.589L3258.75 668.589L3206.25 640.589L3122.25 619.589V434.089L3048.75 570.589H2978.75L2915.75 549.589V511.089L2880.75 479.589L2915.75 416.589L2880.75 378.089H2754.75L2691.75 297.589L2649.75 318.589L2611.25 273.089L2586.75 199.589L2555.25 164.589L2499.25 238.089L2460.75 199.589L2394.25 136.589V77.0892L2362.75 3.58923L2237.25 77.0892L2107.75 136.589L2079.75 238.089V378.089V511.089L1936.25 619.589L1775.25 668.589L1652.75 749.089L1666.75 787.589L1603.75 850.589L1666.75 899.589L1551.25 969.589L1442.75 945.089L1309.25 899.589H1209.75L1188.75 850.589V738.589H1089.25L1039.25 717.589L973.75 738.589L997.75 850.589L1039.25 945.089L1071.75 1078.09L1089.25 1155.09V1246.09V1288.09H997.75H919.25H816.25L725.25 1333.59L686.75 1288.09L627.25 1246.09L588.75 1155.09H476.75L427.75 1200.59L319.25 1246.09L252.75 1221.59L130.25 1246.09L25.25 1288.09L7.75 1333.59L25.25 1379.09H74.25H130.25L165.25 1403.59L130.25 1431.59H74.25V1456.09L130.25 1473.59H165.25L186.25 1515.59H130.25L95.25 1494.59L25.25 1515.59L7.75 1557.59H46.25L95.25 1589.09V1634.59L130.25 1697.59H186.25L210.75 1662.59H252.75L319.25 1697.59L399.75 1746.59L368.25 1764.09V1788.59H399.75L476.75 1764.09L504.75 1788.59L532.75 1848.09H567.75H627.25H686.75L725.25 1883.09L746.25 1946.09V2012.59H816.25L837.25 2051.09L877.75 2075.59L919.25 2128.09L877.75 2145.59V2208.59V2236.59L919.25 2307.09L948.25 2377.59L997.75 2419.09L1089.25 2473.09L1163.75 2531.09H1039.25V2577.09L1089.25 2581.09L1163.75 2577.09L1188.75 2606.09L1209.75 2684.59H1163.75L1130.75 2639.09L1109.75 2684.59L1163.75 2738.59V2796.59L1188.75 2842.59L1275.75 2908.59L1342.25 2979.59V3112.09L1309.25 3045.59L1275.75 2979.59L1188.75 2908.59L1163.75 2938.09C1163.75 2954.59 1168.75 2994.29 1188.75 3021.09C1208.75 3047.89 1180.42 3114.92 1163.75 3145.09L1130.75 3307.09L1188.75 3369.59H1130.75V3469.09L1109.75 3622.59L1064.25 3846.59L1039.25 3954.59L997.75 4008.59Z" 
                    stroke="currentColor" 
                    strokeWidth="60" 
                    shapeRendering="crispEdges"
                    className="text-accent-blue/40"
                  />
                </g>
                <circle 
                  cx="1150" 
                  cy="4002.09" 
                  r="120"
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="6"
                  className="text-accent-blue"
                />
                <defs>
                  <filter id="filter0_d_footer_map" x="0" y="0" width="4430.92" height="4612.59" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2714"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2714" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Adresse au centre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center items-center md:items-start text-center md:text-left relative"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton text-accent-blue mb-4 md:mb-6">
              Ou me trouver
            </h2>
            <h3 className="text-accent-blue font-semibold mb-3 text-sm md:text-base uppercase tracking-wider">
              Adresse
            </h3>
            <address className="text-sand/80 text-sm md:text-base not-italic leading-relaxed">
              <p className="mb-1">44 avenue Reine Victoria</p>
              <p>64200 Biarritz</p>
            </address>
            {/* Barre verticale de séparation à droite */}
            <div className="hidden md:block absolute right-[-24px] top-1/2 -translate-y-1/2 w-px h-20 bg-ocean-blue/30" />
          </motion.div>

          {/* Contact à droite - aligné verticalement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center items-center md:items-end gap-3"
          >
            <motion.a
              href="mailto:contact@maximefarineau.com"
              whileHover={{ scale: 1.05, x: -5 }}
              className="text-accent-blue hover:text-white transition-colors text-sm md:text-base flex items-center gap-2 group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email</span>
            </motion.a>
            <motion.a
              href="tel:+33669347443"
              whileHover={{ scale: 1.05, x: -5 }}
              className="text-accent-blue hover:text-white transition-colors text-sm md:text-base flex items-center gap-2 group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Téléphone</span>
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05, x: -5 }}
              className="flex items-center gap-2"
            >
              <Link
                href="/mentions-legales"
                className="text-accent-blue hover:text-white transition-colors text-sm md:text-base flex items-center gap-2 group"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Mentions légales</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright en bas au centre */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center pt-6 border-t border-ocean-blue/20"
        >
          <p className="text-sand/60 text-xs md:text-sm">
            © {new Date().getFullYear()} Maxime Farineau. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

