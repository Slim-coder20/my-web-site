# Site Web Officiel - Slim Abida

Site web officiel de Slim Abida avec système de e-commerce intégré pour la vente d'albums.

## 📋 Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Dépendances](#dépendances)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration](#configuration)
- [Guide d'utilisation](#guide-dutilisation)
- [Structure du projet](#structure-du-projet)
- [Déploiement](#déploiement)

## 🛠 Technologies utilisées

### Frontend

- **Next.js 16.0.3** - Framework React avec App Router
- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5** - Typage statique
- **CSS Modules** - Styles modulaires et scoped
- **Next/Image** - Optimisation d'images

### Backend

- **Next.js API Routes** - Routes API intégrées
- **Prisma 6.19.0** - ORM pour la gestion de base de données
- **MySQL** - Base de données relationnelle (hébergée sur o2switch)

### Paiement

- **Stripe 19.3.1** - Système de paiement en ligne
- **@stripe/stripe-js 8.4.0** - SDK client Stripe

### Outils de développement

- **ESLint** - Linter JavaScript/TypeScript
- **Tailwind CSS 4** - Framework CSS utilitaire (optionnel)

## 📦 Dépendances

### Dépendances principales (`dependencies`)

```json
{
  "@prisma/client": "^6.19.0", // Client Prisma pour requêtes DB
  "@stripe/stripe-js": "^8.4.0", // SDK client Stripe
  "next": "16.0.3", // Framework Next.js
  "react": "19.2.0", // Bibliothèque React
  "react-dom": "19.2.0", // Rendu React DOM
  "stripe": "^19.3.1" // SDK serveur Stripe
}
```

### Dépendances de développement (`devDependencies`)

```json
{
  "@tailwindcss/postcss": "^4", // PostCSS pour Tailwind
  "@types/node": "^20", // Types TypeScript pour Node.js
  "@types/react": "^19", // Types TypeScript pour React
  "@types/react-dom": "^19", // Types TypeScript pour React DOM
  "eslint": "^9", // Linter ESLint
  "eslint-config-next": "16.0.3", // Configuration ESLint pour Next.js
  "prisma": "^6.19.0", // CLI Prisma pour migrations
  "tailwindcss": "^4", // Framework CSS Tailwind
  "typescript": "^5" // Compilateur TypeScript
}
```

## ✨ Fonctionnalités

### 🎵 Pages publiques

1. **Page d'accueil (`/`)**

   - Section hero avec vidéo de fond
   - Section news avec liens vers actualités
   - Aperçu des sections principales

2. **Page Bio (`/about`)**

   - Présentation de l'artiste
   - Informations biographiques

3. **Page Discographie (`/discographie`)**

   - Affichage de tous les albums disponibles
   - Récupération des albums depuis la base de données MySQL
   - Cartes d'albums avec pochette, titre, description, prix
   - Bouton "Acheter" pour chaque album

4. **Page Vidéos (`/videos`)**

   - Galerie de vidéos live
   - Lecteurs vidéo intégrés
   - Descriptions des performances

5. **Page Concerts (`/concerts`)**

   - Liste des prochains concerts
   - Informations sur les événements

6. **Page Contact (`/contact`)**

   - Formulaire de contact
   - Champs : Nom, Email, Sujet, Message

7. **Page News (`/news`)**
   - Actualités et nouvelles de l'artiste

### 🛒 Système e-commerce

1. **Page de checkout (`/checkout/[productId]`)**

   - Récapitulatif de l'album sélectionné
   - Formulaire de saisie d'email
   - Validation et redirection vers Stripe Checkout

2. **Paiement Stripe**

   - Intégration complète Stripe Checkout
   - Paiement sécurisé par carte bancaire
   - Gestion des commandes en base de données

3. **Gestion des commandes**
   - Création automatique d'Order en statut "pending"
   - Création d'OrderItem associé
   - Mise à jour automatique à "paid" via webhook Stripe

### 📱 Responsive Design

- **Menu burger** pour mobile (< 768px)
- **Navigation adaptative** selon la taille d'écran
- **Grilles responsive** pour les albums et vidéos
- **Design mobile-first**

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- Compte MySQL (hébergé sur o2switch)
- Compte Stripe (pour les paiements)

### Étapes d'installation

1. **Cloner le projet** (si applicable)

   ```bash
   git clone <url-du-repo>
   cd my-web-site
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créer un fichier `.env` à la racine :

   ```env
   # Base de données MySQL
   DATABASE_URL="mysql://utilisateur:motdepasse@host:3306/nom_base"

   # Stripe (clés de test)
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

   # URL du site
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

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

| Variable                             | Description              | Exemple                                          |
| ------------------------------------ | ------------------------ | ------------------------------------------------ |
| `DATABASE_URL`                       | URL de connexion MySQL   | `mysql://user:pass@host:3306/db`                 |
| `STRIPE_SECRET_KEY`                  | Clé secrète Stripe       | `sk_test_...` ou `sk_live_...`                   |
| `STRIPE_WEBHOOK_SECRET`              | Secret du webhook Stripe | `whsec_...`                                      |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe      | `pk_test_...` ou `pk_live_...`                   |
| `NEXT_PUBLIC_SITE_URL`               | URL du site              | `http://localhost:3000` ou `https://domaine.com` |

### Configuration Stripe

1. **Récupérer les clés API**

   - Dashboard Stripe → Developers → API keys
   - Copier la clé publique (`pk_test_...`) et la clé secrète (`sk_test_...`)

2. **Configurer le webhook**
   - Dashboard Stripe → Developers → Webhooks
   - Ajouter un endpoint : `https://ton-domaine.com/api/stripe/webhook`
   - Sélectionner l'événement : `checkout.session.completed`
   - Copier le "Signing secret" (`whsec_...`)

### Configuration MySQL (o2switch)

1. **Créer la base de données**

   - cPanel → Bases de données MySQL
   - Créer une nouvelle base de données

2. **Créer un utilisateur**

   - Assigner tous les privilèges à l'utilisateur

3. **Autoriser l'accès distant** (pour développement local)

   - cPanel → MySQL distant
   - Ajouter votre adresse IP

4. **Créer les tables**
   ```bash
   npx prisma db push
   ```

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

2. **Via phpMyAdmin** (o2switch)
   - Se connecter à phpMyAdmin
   - Sélectionner la base de données
   - Table `Product` → Insert
   - Remplir les champs requis

### Tester un paiement

1. **Utiliser les cartes de test Stripe**

   - Carte valide : `4242 4242 4242 4242`
   - Date d'expiration : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
   - Code postal : n'importe quel code postal

2. **Vérifier la commande**
   - Après paiement, vérifier dans Prisma Studio que l'Order est passée à "paid"
   - Vérifier que l'OrderItem a été créé

### Structure des commandes

- **Order** : Commande principale

  - `email` : Email du client
  - `stripeSessionId` : ID de la session Stripe
  - `amountTotal` : Montant total en centimes
  - `status` : "pending" ou "paid"

- **OrderItem** : Article de la commande
  - `productId` : Référence au produit
  - `quantity` : Quantité (actuellement toujours 1)
  - `unitPrice` : Prix unitaire en centimes

## 📁 Structure du projet

```
my-web-site/
├── app/                          # Pages et routes Next.js (App Router)
│   ├── about/                    # Page Bio
│   ├── api/                      # Routes API
│   │   ├── checkout/             # Route création session Stripe
│   │   ├── products/             # Route récupération albums
│   │   └── stripe/
│   │       └── webhook/          # Route webhook Stripe
│   ├── checkout/                 # Page de checkout
│   │   └── [productId]/          # Page récapitulatif commande
│   ├── concerts/                 # Page Concerts
│   ├── contact/                  # Page Contact
│   ├── discographie/             # Page Discographie
│   ├── news/                     # Page News
│   ├── videos/                   # Page Vidéos
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Page d'accueil
├── components/                   # Composants React réutilisables
│   ├── BuyButton/                # Bouton "Acheter"
│   ├── CheckoutForm/             # Formulaire de checkout
│   ├── ContactForm/              # Formulaire de contact
│   ├── Footer/                   # Footer du site
│   └── Header/                   # Header avec navigation
├── docs/                         # Documentation
│   ├── commerce_guide.md         # Guide e-commerce
│   ├── GUIDE_DEPLOIEMENT_O2SWITCH.md
│   └── METHODE_DE_TRAVAIL.md
├── lib/                          # Utilitaires
│   └── prisma.ts                 # Client Prisma singleton
├── prisma/                       # Configuration Prisma
│   └── schema.prisma             # Schéma de base de données
├── public/                       # Fichiers statiques
│   ├── images/                   # Images (pochettes, photos)
│   └── videos/                   # Vidéos
├── .env                          # Variables d'environnement (non commité)
├── .env.local                    # Variables d'environnement locales
├── next.config.ts                # Configuration Next.js
├── package.json                  # Dépendances npm
├── tsconfig.json                 # Configuration TypeScript
└── README.md                     # Ce fichier
```

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

### Déploiement sur o2switch

Voir le guide détaillé : `docs/GUIDE_DEPLOIEMENT_O2SWITCH.md`

### Checklist de déploiement

- [ ] Variables d'environnement configurées sur le serveur
- [ ] Base de données MySQL accessible
- [ ] Tables créées (`npx prisma db push`)
- [ ] Webhook Stripe configuré avec l'URL de production
- [ ] Clés Stripe en mode "Live" (pas "Test")
- [ ] Images externes autorisées dans `next.config.ts`
- [ ] Build de production testé localement

## 📝 Notes importantes

- **Mode développement** : Utilise les clés Stripe "Test"
- **Mode production** : Utilise les clés Stripe "Live"
- **Webhook** : Doit être configuré dans le Dashboard Stripe
- **Base de données** : Les dates doivent être valides (pas `0000-00-00`)
- **Images externes** : Domaines autorisés dans `next.config.ts`

## 🐛 Dépannage

### Erreur de connexion MySQL

- Vérifier que `DATABASE_URL` est correcte
- Vérifier que l'IP est autorisée (MySQL distant)
- Vérifier que l'utilisateur a les bons privilèges

### Erreur Stripe

- Vérifier que les clés sont correctes (Test vs Live)
- Vérifier que le webhook est configuré
- Vérifier les logs dans le Dashboard Stripe

### Images non affichées

- Vérifier que le domaine est dans `next.config.ts`
- Vérifier que l'URL de l'image est accessible

## 📞 Support

Pour toute question ou problème, consulter :

- Documentation Next.js : https://nextjs.org/docs
- Documentation Prisma : https://www.prisma.io/docs
- Documentation Stripe : https://stripe.com/docs

---

**Développé avec ❤️ pour Slim Abida**
