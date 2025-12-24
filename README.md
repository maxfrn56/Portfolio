# Portfolio - Maxime Farineau

Site web portfolio professionnel moderne avec animations avancées, inspiré de l'univers océan/surf et du style IWD Agency.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animations)
- **GSAP** (scroll horizontal, parallax, overlays)
- **React Hook Form** + **Zod** (formulaire de contact)
- **Resend** (envoi d'emails)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🎨 Structure du projet

```
Portfolio/
├── app/
│   ├── api/contact/      # API route pour le formulaire
│   ├── mentions-legales/ # Page mentions légales
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── components/
│   ├── sections/         # Sections du site
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── WhyWorkWithMe.tsx
│   │   ├── SalineProject.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Tarifs.tsx
│   │   └── Contact.tsx
│   ├── Navbar.tsx
│   ├── Loader.tsx
│   └── ProjectCard.tsx
└── hooks/
    └── useSectionTransition.ts
```

## 🎬 Fonctionnalités

- ✅ Hero section avec vidéo de fond et animations reveal
- ✅ Section About avec scroll horizontal (style IWD Agency)
- ✅ Section Solution et service avec carousel de compétences
- ✅ Section Saline Project avec vidéo et animations
- ✅ Portfolio avec cards vidéo au hover
- ✅ Section Tarifs avec trois propositions
- ✅ Formulaire de contact avec validation
- ✅ Loader d'entrée avec animation heartbeat
- ✅ Animations au scroll avec GSAP
- ✅ Responsive design
- ✅ SEO optimisé

## 📝 Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
RESEND_API_KEY=votre_cle_api_resend
CONTACT_EMAIL=contact@maximefarineau.com
```

**Pour Vercel** : Ajoutez ces variables dans les paramètres du projet (Settings → Environment Variables).

### Formulaire de contact

Le formulaire de contact utilise Resend pour l'envoi d'emails. Configurez `RESEND_API_KEY` dans `.env.local` ou dans les variables d'environnement de Vercel.

### Vidéos et images

Ajoutez vos vidéos et images dans le dossier `public/` :
- `public/videos/Pecheur.mp4` - Vidéo de fond pour le Hero
- `public/videos/saline-project.mp4` - Vidéo du projet Saline
- `public/videos/Dashboard.mp4` - Vidéo du projet Dashboard
- `public/images/logo-black.png` - Logo noir
- `public/images/logo-white.png` - Logo blanc
- `public/images/logo-blue.png` - Logo bleu

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :
- `ocean-deep`: #0A1A2F
- `ocean-blue`: #0F4C75
- `accent-blue`: #5a8fa3
- `turquoise`: #00A6A6
- `sand`: #F4EFD3

### Typographie

La police Inter est utilisée par défaut. Pour changer, modifiez `app/layout.tsx` et `app/globals.css`.

## 📧 Contact

- **Email**: contact@maximefarineau.com
- **Téléphone**: 06 69 34 74 43
- **GitHub**: https://github.com/maxfrn56

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Ajoutez les variables d'environnement dans les paramètres du projet :
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL` (optionnel, par défaut: contact@maximefarineau.com)
3. Configurez votre domaine personnalisé dans les paramètres
4. Le déploiement se fait automatiquement à chaque push

### Build local

```bash
npm run build
npm start
```

## 📄 Licence

Tous droits réservés - Maxime Farineau
