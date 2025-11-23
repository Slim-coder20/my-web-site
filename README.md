# Site Web Officiel - Slim Abida

Site web officiel de Slim Abida avec système de e-commerce intégré pour la vente d'albums, système de traduction FR/EN, et gestion dynamique du contenu.

🌐 **Site en production** : [slimabida.fr](https://slimabida.fr)

## 📋 Table des matières

- [Technologies utilisées](#-technologies-utilisées)
- [Fonctionnalités](#-fonctionnalités)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du projet](#-structure-du-projet)
- [Déploiement](#-déploiement)
- [Système de traduction](#-système-de-traduction)

## 🛠 Technologies utilisées

### Frontend

- **Next.js 16.0.3** - Framework React avec App Router
- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5** - Typage statique
- **CSS Modules** - Styles modulaires et scoped
- **Next/Image** - Optimisation d'images
- **React Context API** - Gestion d'état globale (langue)

### Backend

- **Next.js API Routes** - Routes API intégrées
- **Prisma 6.19.0** - ORM pour la gestion de base de données
- **PostgreSQL** - Base de données relationnelle (Supabase)
- **Supabase** - Backend as a Service (BaaS) pour PostgreSQL

### Paiement

- **Stripe 19.3.1** - Système de paiement en ligne
- **@stripe/stripe-js 8.4.0** - SDK client Stripe

### Email

- **Resend 6.4.2** - Service d'envoi d'emails transactionnels

### Internationalisation (i18n)

- **React Context** - Gestion de la langue active
- **localStorage** - Persistance de la langue sélectionnée
- **Système de traduction centralisé** - Fichier `lib/translations.ts`

### Déploiement

- **Vercel** - Plateforme de déploiement
- **Domaine personnalisé** - slimabida.fr

### Outils de développement

- **ESLint** - Linter JavaScript/TypeScript
- **Tailwind CSS 4** - Framework CSS utilitaire (optionnel)

## ✨ Fonctionnalités

### 🌍 Système de traduction FR/EN

- **Bouton de langue** dans la navbar (desktop et mobile)
- **Persistance** de la langue dans localStorage
- **Traduction complète** de toutes les pages :
  - Page d'accueil (Home)
  - Bio (About)
  - News
  - Discographie
  - Vidéos
  - Concerts
  - Pédagogie (Pedago)
  - Contact
  - Checkout

### 🎵 Pages publiques

1. **Page d'accueil (`/`)**
   - Section hero avec vidéo de fond dynamique
   - Flèche de scroll animée avec effet lumineux
   - Section news avec liens vers actualités
   - Aperçu des sections principales (News, Bio, Musique, Vidéos, Concerts, Formation)
   - Toutes les sections traduites en FR/EN

2. **Page Bio (`/about`)**
   - Présentation complète de l'artiste
   - Biographie détaillée avec historique musical
   - Liens vers discographie et vidéos
   - Réseaux sociaux
   - Traduction FR/EN

3. **Page Discographie (`/discographie`)**
   - Affichage de tous les albums disponibles
   - Récupération des albums depuis Supabase
   - Cartes d'albums avec pochette, titre, description, prix
   - Bouton "Acheter" pour chaque album
   - Message si aucun album disponible
   - Traduction FR/EN

4. **Page Vidéos (`/videos`)**
   - Galerie de vidéos live
   - Lecteurs vidéo intégrés
   - Descriptions des performances
   - Réseaux sociaux
   - Traduction FR/EN

5. **Page Concerts (`/concerts`)**
   - Liste des concerts avec dates et lieux
   - Cartes de concerts avec images
   - Informations sur les événements
   - Message si aucun concert disponible
   - Traduction FR/EN

6. **Page Contact (`/contact`)**
   - Formulaire de contact complet
   - Champs : Nom, Email, Sujet (select), Message
   - Envoi d'email via Resend
   - Messages de succès/erreur
   - Traduction FR/EN complète

7. **Page News (`/news`)**
   - Actualités et nouvelles de l'artiste
   - Description détaillée des projets
   - Liens vers discographie et soutien
   - Réseaux sociaux
   - Traduction FR/EN

8. **Page Pédagogie (`/pedago`)**
   - Présentation des cours de formation
   - Cartes pour chaque type de cours (Basse, Arrangement, Composition)
   - Boutons de contact
   - Traduction FR/EN

### 🛒 Système e-commerce

1. **Page de checkout (`/checkout/[productId]`)**
   - Récapitulatif de l'album sélectionné
   - Affichage de la pochette ou placeholder
   - Formulaire de saisie d'email
   - Validation et redirection vers Stripe Checkout
   - Traduction FR/EN

2. **Paiement Stripe**
   - Intégration complète Stripe Checkout
   - Paiement sécurisé par carte bancaire
   - Gestion des commandes en base de données
   - Webhook pour mise à jour automatique du statut

3. **Gestion des commandes**
   - Création automatique d'Order en statut "pending"
   - Création d'OrderItem associé
   - Mise à jour automatique à "paid" via webhook Stripe
   - Vérification automatique du paiement après redirection

### 📱 Responsive Design

- **Menu burger** pour mobile (< 768px)
- **Navigation adaptative** selon la taille d'écran
- **Bouton de langue** dans le menu mobile
- **Grilles responsive** pour les albums, vidéos et concerts
- **Design mobile-first**
- **Menu mobile scrollable** avec bouton de langue fixé en bas

### 🎨 UI/UX

- **Flèche de scroll animée** sur la page d'accueil
- **Effet lumineux** (box-shadow) sur la flèche
- **Animations CSS** pour les transitions
- **Design moderne et épuré**

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- Compte Supabase (pour PostgreSQL)
- Compte Stripe (pour les paiements)
- Compte Resend (pour les emails)
- Compte Vercel (pour le déploiement)

### Étapes d'installation

1. **Cloner le projet**

   ```bash
   git clone https://github.com/Slim-coder20/my-web-site.git
   cd my-web-site
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créer un fichier `.env.local` à la racine :

   ```env
   # Base de données Supabase (PostgreSQL)
   DATABASE_URL="postgresql://user:password@host:5432/dbname?pgbouncer=true"

   # Stripe (clés de test ou live)
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

   # Resend (envoi d'emails)
   RESEND_API_KEY="re_..."

   # URL du site
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

   **Note importante** : Pour Supabase avec connection pooler, la `DATABASE_URL` doit contenir `?pgbouncer=true` à la fin.

4. **Initialiser Prisma**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

6. **Ouvrir le navigateur**
   ```
   http://localhost:3000
   ```

## ⚙️ Configuration

### Variables d'environnement

| Variable                             | Description                    | Exemple                                                      |
| ------------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| `DATABASE_URL`                       | URL de connexion Supabase      | `postgresql://...@pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `STRIPE_SECRET_KEY`                  | Clé secrète Stripe             | `sk_test_...` ou `sk_live_...`                               |
| `STRIPE_WEBHOOK_SECRET`              | Secret du webhook Stripe       | `whsec_...`                                                   |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe             | `pk_test_...` ou `pk_live_...`                                |
| `RESEND_API_KEY`                     | Clé API Resend                 | `re_...`                                                      |
| `NEXT_PUBLIC_SITE_URL`               | URL du site                    | `http://localhost:3000` ou `https://slimabida.fr`           |

### Configuration Stripe

1. **Récupérer les clés API**
   - Dashboard Stripe → Developers → API keys
   - Copier la clé publique (`pk_test_...`) et la clé secrète (`sk_test_...`)

2. **Configurer le webhook**
   - Dashboard Stripe → Developers → Webhooks
   - Ajouter un endpoint : `https://slimabida.fr/api/stripe/webhook`
   - Sélectionner l'événement : `checkout.session.completed`
   - Copier le "Signing secret" (`whsec_...`)

### Configuration Supabase

1. **Créer un projet Supabase**
   - Aller sur [supabase.com](https://supabase.com)
   - Créer un nouveau projet

2. **Récupérer la connection string**
   - Settings → Database → Connection string
   - Utiliser le "Connection pooling" (port 6543)
   - Ajouter `?pgbouncer=true` à la fin de l'URL

3. **Créer les tables**
   ```bash
   npx prisma db push
   ```

### Configuration Resend

1. **Créer un compte Resend**
   - Aller sur [resend.com](https://resend.com)
   - Créer un compte et vérifier votre domaine

2. **Récupérer la clé API**
   - Dashboard → API Keys
   - Créer une nouvelle clé
   - Copier la clé dans `RESEND_API_KEY`

## 📖 Guide d'utilisation

### Commandes disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement (port 3000)

# Production
npm run build        # Compile l'application pour la production
npm start            # Lance le serveur de production

# Base de données
npx prisma studio    # Ouvre Prisma Studio (interface graphique pour la DB)
npx prisma db push   # Synchronise le schéma avec la base de données
npx prisma generate  # Génère le client Prisma

# Linting
npm run lint         # Vérifie le code avec ESLint
```

### Ajouter un nouvel album

1. **Via Prisma Studio** (recommandé)

   ```bash
   npx prisma studio
   ```

   - Ouvrir la table `Product`
   - Cliquer sur "Add record"
   - Remplir les champs :
     - `slug` : identifiant unique (ex: "asymetrie-2022")
     - `title` : titre de l'album
     - `description` : description (peut contenir des retours à la ligne `\n`)
     - `priceCents` : prix en centimes (ex: 1500 pour 15,00€)
     - `coverUrl` : URL de la pochette

2. **Via Supabase Dashboard**
   - Se connecter au dashboard Supabase
   - Aller dans Table Editor
   - Sélectionner la table `Product`
   - Cliquer sur "Insert row"
   - Remplir les champs requis

### Ajouter une nouvelle traduction

1. **Ouvrir `lib/translations.ts`**
2. **Ajouter la clé dans l'interface `Translations`**
3. **Ajouter la traduction française dans `translations.fr`**
4. **Ajouter la traduction anglaise dans `translations.en`**
5. **Utiliser dans les composants** : `const { t } = useLanguage(); t.section.key`

### Tester un paiement

1. **Utiliser les cartes de test Stripe**
   - Carte valide : `4242 4242 4242 4242`
   - Date d'expiration : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
   - Code postal : n'importe quel code postal

2. **Vérifier la commande**
   - Après paiement, vérifier dans Prisma Studio que l'Order est passée à "paid"
   - Vérifier que l'OrderItem a été créé

## 📁 Structure du projet

```
my-web-site/
├── app/                          # Pages et routes Next.js (App Router)
│   ├── about/                    # Page Bio
│   │   └── page.tsx
│   ├── api/                      # Routes API
│   │   ├── checkout/             # Route création session Stripe
│   │   ├── contact/               # Route envoi email
│   │   ├── stripe/
│   │   │   └── webhook/           # Route webhook Stripe
│   │   └── ...
│   ├── checkout/                  # Page de checkout
│   │   └── [productId]/
│   │       ├── CheckoutHeader.tsx
│   │       ├── CheckoutSectionTitle.tsx
│   │       └── page.tsx
│   ├── concerts/                  # Page Concerts
│   │   ├── ConcertsHeader.tsx
│   │   ├── ConcertsEmptyState.tsx
│   │   └── page.tsx
│   ├── contact/                   # Page Contact
│   ├── discographie/              # Page Discographie
│   │   ├── DiscographieHeader.tsx
│   │   ├── DiscographieEmptyState.tsx
│   │   └── page.tsx
│   ├── news/                      # Page News
│   ├── pedago/                    # Page Pédagogie
│   ├── videos/                    # Page Vidéos
│   │   ├── VideosHeader.tsx
│   │   └── page.tsx
│   ├── HomeClient.tsx             # Client component page d'accueil
│   ├── layout.tsx                 # Layout principal avec LanguageProvider
│   └── page.tsx                   # Page d'accueil
├── components/                    # Composants React réutilisables
│   ├── BuyButton/                 # Bouton "Acheter"
│   ├── CheckoutForm/               # Formulaire de checkout
│   ├── ContactForm/                # Formulaire de contact
│   ├── Footer/                     # Footer du site
│   ├── Header/                     # Header avec navigation
│   ├── LanguageButtonMobile/       # Bouton langue mobile
│   ├── NoCover/                    # Composant "Pas de pochette"
│   └── ...
├── contexts/                       # Contextes React
│   └── LanguageContext.tsx         # Contexte de langue FR/EN
├── lib/                            # Utilitaires
│   ├── prisma.ts                   # Client Prisma singleton
│   └── translations.ts             # Fichier centralisé des traductions
├── prisma/                         # Configuration Prisma
│   └── schema.prisma               # Schéma de base de données
├── public/                         # Fichiers statiques
│   ├── images/                     # Images (pochettes, photos)
│   └── videos/                     # Vidéos
├── docs/                           # Documentation
├── .env.local                      # Variables d'environnement (non commité)
├── next.config.ts                  # Configuration Next.js
├── package.json                    # Dépendances npm
├── tsconfig.json                   # Configuration TypeScript
└── README.md                       # Ce fichier
```

## 🌍 Système de traduction

Le site utilise un système de traduction complet FR/EN basé sur React Context.

### Architecture

1. **`contexts/LanguageContext.tsx`** : Contexte React pour gérer la langue active
2. **`lib/translations.ts`** : Fichier centralisé contenant toutes les traductions
3. **Bouton de langue** : Dans le Header (desktop et mobile)

### Utilisation dans les composants

```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t.home.title}</h1>
      <p>{t.home.description}</p>
    </div>
  );
}
```

### Structure des traductions

Les traductions sont organisées par section dans `lib/translations.ts` :

- `nav.*` - Navigation
- `home.*` - Page d'accueil
- `about.*` - Page Bio
- `news.*` - Page News
- `discographie.*` - Page Discographie
- `videos.*` - Page Vidéos
- `concerts.*` - Page Concerts
- `pedago.*` - Page Pédagogie
- `contact.*` - Formulaire de contact
- `checkout.*` - Page de checkout

### Persistance

La langue sélectionnée est sauvegardée dans `localStorage` et persiste entre les sessions.

## 🔄 Flux de commande complet

1. **Utilisateur clique sur "Acheter"**
   - Redirection vers `/checkout/[productId]`

2. **Page de récapitulatif**
   - Affichage de l'album sélectionné
   - Formulaire de saisie d'email

3. **Soumission du formulaire**
   - Appel API `/api/checkout` avec `productId` et `email`
   - Création de l'Order en statut "pending"
   - Création de l'OrderItem
   - Création de la session Stripe Checkout
   - Redirection vers Stripe

4. **Paiement Stripe**
   - L'utilisateur paie sur la page Stripe
   - Stripe redirige vers `success_url` ou `cancel_url`

5. **Webhook Stripe**
   - Stripe envoie un événement `checkout.session.completed`
   - Route `/api/stripe/webhook` reçoit l'événement
   - Mise à jour de l'Order à "paid"

## 🚢 Déploiement

### Déploiement sur Vercel

Le site est déployé sur **Vercel** avec le domaine personnalisé **slimabida.fr**.

1. **Connecter le repository GitHub à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Importer le projet depuis GitHub

2. **Configurer les variables d'environnement**
   - Settings → Environment Variables
   - Ajouter toutes les variables nécessaires (voir section Configuration)

3. **Configurer le domaine**
   - Settings → Domains
   - Ajouter le domaine `slimabida.fr`
   - Configurer les DNS selon les instructions Vercel

4. **Déploiement automatique**
   - Chaque push sur `main` déclenche un déploiement automatique
   - Vercel build et déploie automatiquement

### Checklist de déploiement

- [x] Variables d'environnement configurées sur Vercel
- [x] Base de données Supabase accessible
- [x] Tables créées (`npx prisma db push`)
- [x] Webhook Stripe configuré avec l'URL de production
- [x] Clés Stripe en mode "Live" (pas "Test")
- [x] Domaine personnalisé configuré (slimabida.fr)
- [x] DNS configurés correctement
- [x] Resend configuré avec domaine vérifié
- [x] Build de production testé

## 📝 Notes importantes

- **Mode développement** : Utilise les clés Stripe "Test"
- **Mode production** : Utilise les clés Stripe "Live"
- **Webhook** : Doit être configuré dans le Dashboard Stripe avec l'URL de production
- **Base de données** : Supabase avec connection pooler (`?pgbouncer=true`)
- **Traduction** : Toutes les pages sont traduites en FR/EN
- **Emails** : Envoi via Resend pour le formulaire de contact

## 🐛 Dépannage

### Erreur de connexion Supabase

- Vérifier que `DATABASE_URL` contient `?pgbouncer=true`
- Vérifier que la connection string utilise le port 6543 (pooler)
- Vérifier que les credentials sont corrects

### Erreur Stripe

- Vérifier que les clés sont correctes (Test vs Live)
- Vérifier que le webhook est configuré avec la bonne URL
- Vérifier les logs dans le Dashboard Stripe

### Erreur de traduction

- Vérifier que `LanguageProvider` entoure l'application dans `layout.tsx`
- Vérifier que la clé existe dans `lib/translations.ts`
- Vérifier que les deux langues (FR et EN) sont définies

### Erreur Resend

- Vérifier que `RESEND_API_KEY` est correcte
- Vérifier que le domaine est vérifié dans Resend
- Vérifier les logs dans le Dashboard Resend

## 📞 Support

Pour toute question ou problème, consulter :

- Documentation Next.js : https://nextjs.org/docs
- Documentation Prisma : https://www.prisma.io/docs
- Documentation Stripe : https://stripe.com/docs
- Documentation Supabase : https://supabase.com/docs
- Documentation Vercel : https://vercel.com/docs
- Documentation Resend : https://resend.com/docs

---

**Développé avec ❤️ pour Slim Abida Project**
