<<<<<<< HEAD
# Portfolio - Maxime Farineau

Site web portfolio professionnel moderne avec animations avancées, inspiré de l'univers océan/surf et du style IWD Agency.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animations)
- **GSAP** (scroll horizontal, parallax, overlays)
- **React Hook Form** + **Zod** (formulaire de contact)

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
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── components/
│   ├── animations/       # Composants d'animation
│   │   ├── CustomCursor.tsx
│   │   ├── Overlay.tsx
│   │   ├── RevealText.tsx
│   │   └── RevealLetters.tsx
│   ├── sections/         # Sections du site
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
└── lib/
    ├── utils.ts          # Utilitaires
    └── email.ts          # Configuration email
```

## 🎬 Fonctionnalités

- ✅ Hero section avec vidéo de fond et animations reveal
- ✅ Section About avec scroll horizontal (style IWD Agency)
- ✅ Section Skills avec grille interactive et animations wave
- ✅ Portfolio avec cards vidéo au hover
- ✅ Formulaire de contact avec validation
- ✅ Cursor personnalisé
- ✅ Overlays fluides
- ✅ Animations au scroll
- ✅ Responsive design

## 📝 Configuration

### Formulaire de contact

Le formulaire de contact utilise Resend pour l'envoi d'emails. Configurez `RESEND_API_KEY` dans `.env.local` et modifiez `app/api/contact/route.ts` si nécessaire.

### Vidéos et images

Ajoutez vos vidéos et images dans le dossier `public/` :
- `public/videos/ocean-background.mp4` - Vidéo de fond pour le Hero
- `public/videos/project-*.mp4` - Vidéos des projets
- `public/images/project-*.jpg` - Images de fallback pour les projets

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :
- `ocean-deep`: #0A1A2F
- `ocean-blue`: #0F4C75
- `turquoise`: #00A6A6
- `sand`: #F4EFD3

### Typographie

La police Inter est utilisée par défaut. Pour changer, modifiez `app/layout.tsx` et `app/globals.css`.

## 📧 Contact

- **Email**: contact@maximefarineau.com
- **Téléphone**: 06 69 34 74 43

## 🚀 Déploiement

Le site peut être déployé sur Vercel, Netlify ou tout autre hébergeur compatible Next.js.

```bash
npm run build
npm start
```

## 📄 Licence

Tous droits réservés - Maxime Farineau
=======
# Portfolio
>>>>>>> b0efab11cd12da3afcb3624b75269e6bfd3955ac
