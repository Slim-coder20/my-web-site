# Méthode de Travail - Site Artistique Slim Abida Project

## 🎯 Vue d'ensemble du Projet

Site vitrine pour un artiste musicien (Jazz Fusion) avec système de commande d'albums intégré.

- **Framework**: Next.js
- **Hébergement**: o2switch
- **Email contact**: slimabidaproject@gmail.com

---

## 📋 Structure des Pages

### 1. Page d'Accueil (/)

- **Contenu**: Nouveautés concernant l'artiste
- **Éléments**:
  - Hero section avec photo/vidéo musicale
  - Section "Dernières actualités"
  - Liens rapides vers les autres sections
  - Extrait audio/vidéo (optionnel)

### 2. Page About (/about)

- **Contenu**: Biographie, parcours artistique, influences
- **Éléments**:
  - Photo de profil
  - Histoire musicale
  - Philosophie artistique
  - Influences Jazz Fusion

### 3. Page Discographie (/discographie)

- **Contenu**: Liste des albums avec possibilité de commande
- **Fonctionnalités**:
  - Grille de cartes d'albums (couverture, titre, année)
  - Modal ou page détaillée par album
  - Formulaire de commande intégré
  - Informations: titre, année, liste des morceaux, prix
  - Système de notification email pour les commandes

### 4. Page Concerts (/concerts)

- **Contenu**: Dates de concerts passées et à venir
- **Structure**:
  - Section "À venir" (vide pour l'instant)
  - Section "Dernières dates" (archive des concerts passés)
  - Format: Date, lieu, ville, informations pratiques

### 5. Page Contact (/contact)

- **Contenu**: Formulaire de contact
- **Éléments**:
  - Formulaire avec validation
  - Email: slimabidaproject@gmail.com
  - Réseaux sociaux (optionnel)
  - Carte Google Maps (optionnel)

---

## 🎨 Design & Identité Visuelle

### Thème: Jazz Fusion

- **Ambiance**: Moderne, élégant, énergique
- **Palette de couleurs suggérée**:
  - Couleurs principales: Bleus profonds, violets, or/ambre
  - Accents: Teintes chaudes (orange, rouge bordeaux)
  - Neutres: Noir, blanc, gris anthracite
  - Inspiration: Nuits de jazz, scènes de club, lumières tamisées

### Éléments Design

- Typographie: Élégante et lisible (serif pour titres, sans-serif pour contenu)
- Animations subtiles (transitions douces, effets hover)
- Photos/vidéos musicales en background (optionnel)
- Layout: Espacé, aéré, moderne

---

## 🛠️ Méthode de Travail - Étapes de Développement

### PHASE 1: Configuration & Setup (1-2 jours)

#### 1.1 Initialisation Next.js

- [ ] Créer le projet Next.js (App Router recommandé)
- [ ] Configuration TypeScript (optionnel mais recommandé)
- [ ] Structure des dossiers de base
- [ ] Configuration ESLint/Prettier

#### 1.2 Configuration Styling

- [ ] Choisir la solution CSS (Tailwind CSS recommandé pour rapidité)
- [ ] Définir la palette de couleurs dans la config
- [ ] Créer les composants de base (Button, Card, etc.)
- [ ] Configuration des polices

#### 1.3 Structure du Projet

```
slim_site_internet/
├── app/
│   ├── page.tsx              # Accueil
│   ├── about/
│   │   └── page.tsx
│   ├── discographie/
│   │   ├── page.tsx
│   │   └── [albumId]/
│   │       └── page.tsx      # Page détail album
│   ├── concerts/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── AlbumCard/
│   ├── ConcertCard/
│   └── ContactForm/
├── lib/
│   ├── data/                 # Données statiques (albums, concerts)
│   └── utils/
├── public/
│   ├── images/
│   └── audio/                # Extracts (si besoin)
└── styles/
```

---

### PHASE 2: Développement des Pages (3-5 jours)

#### 2.1 Composants Communs

- [ ] Header avec navigation
- [ ] Footer avec liens et contact
- [ ] Layout principal avec design cohérent

#### 2.2 Page d'Accueil

- [ ] Hero section
- [ ] Section nouveautés (composant réutilisable pour articles)
- [ ] Mise en page responsive

#### 2.3 Page About

- [ ] Layout biographie
- [ ] Intégration images
- [ ] Mise en forme du texte

#### 2.4 Page Discographie

- [ ] Composant AlbumCard
- [ ] Grille d'albums responsive
- [ ] Page détail album (ou modal)
- [ ] **Système de commande**:
  - [ ] Formulaire de commande (nom, email, adresse, album)
  - [ ] Validation côté client
  - [ ] Envoi email (API Route Next.js + service email)
  - [ ] Confirmation visuelle

#### 2.5 Page Concerts

- [ ] Composant ConcertCard
- [ ] Section "À venir" (vide mais prête)
- [ ] Section "Archives"
- [ ] Format date/lieu clair

#### 2.6 Page Contact

- [ ] Formulaire de contact
- [ ] Validation
- [ ] Envoi email via API Route
- [ ] Message de confirmation

---

### PHASE 3: Fonctionnalités Avancées (2-3 jours)

#### 3.1 Gestion des Commandes

- [ ] API Route pour réception des commandes
- [ ] Intégration service email (Nodemailer, SendGrid, ou Resend)
- [ ] Email de notification pour vous (avec détails commande)
- [ ] Email de confirmation pour le client
- [ ] Stockage temporaire des commandes (fichier JSON ou base simple)

#### 3.2 Gestion du Contenu

- [ ] Structure données albums (JSON ou CMS simple)
- [ ] Structure données concerts (JSON)
- [ ] Structure données nouveautés (JSON)
- [ ] Système facile à mettre à jour

#### 3.3 Optimisations

- [ ] SEO (meta tags, descriptions)
- [ ] Images optimisées (Next.js Image)
- [ ] Performance (lazy loading, etc.)
- [ ] Responsive design complet

---

### PHASE 4: Préparation Déploiement o2switch (1-2 jours)

#### 4.1 Configuration Production

- [ ] Variables d'environnement (emails, API keys)
- [ ] Build de production
- [ ] Tests en local du build

#### 4.2 Déploiement o2switch

- [ ] ✅ **Serveur Node.js confirmé** - Option "Setup Node.js App" disponible dans l'interface
- [ ] Configuration application Node.js via "Setup Node.js App"
  - [ ] Sélection version Node.js (Node.js 18+ recommandé pour Next.js)
  - [ ] Configuration du répertoire de l'application
  - [ ] Configuration du port et domaine
- [ ] Upload des fichiers (via FTP ou File Manager)
- [ ] Installation des dépendances (`npm install --production`)
- [ ] Build de production (`npm run build`)
- [ ] Configuration variables d'environnement dans o2switch
- [ ] Démarrage de l'application via l'interface Node.js App
- [ ] Tests de fonctionnement en production

#### 4.3 Post-déploiement

- [ ] Vérification toutes les pages
- [ ] Test formulaires (contact + commande)
- [ ] Test responsive sur mobile/tablette
- [ ] Correction bugs éventuels

---

## 📦 Technologies & Outils Recommandés

### Core

- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript** (recommandé)

### Styling

- **Tailwind CSS** (rapide, moderne)
- Alternative: CSS Modules ou styled-components

### Formulaire & Validation

- **React Hook Form** + **Zod** (validation)
- Alternative: Formik

### Email

- **Nodemailer** (simple, fonctionne avec SMTP)
- **Resend** (moderne, API simple)
- **SendGrid** (robuste, gratuit jusqu'à 100 emails/jour)

### Déploiement o2switch

- **Interface "Setup Node.js App"** dans o2switch (déjà disponible ✅)
- Configuration via dashboard o2switch
- Gestion automatique des processus Node.js par o2switch

---

## 🗂️ Gestion des Données

### Albums (discographie.json)

```json
{
  "albums": [
    {
      "id": "album-1",
      "title": "Nom de l'album",
      "year": 2024,
      "cover": "/images/album1.jpg",
      "tracks": ["Morceau 1", "Morceau 2", ...],
      "price": "15€",
      "description": "..."
    }
  ]
}
```

### Concerts (concerts.json)

```json
{
  "upcoming": [],
  "past": [
    {
      "date": "2024-01-15",
      "venue": "Nom du lieu",
      "city": "Ville",
      "country": "Pays",
      "time": "20h00"
    }
  ]
}
```

### Actualités (news.json ou articles)

```json
{
  "articles": [
    {
      "id": "news-1",
      "title": "Titre actualité",
      "date": "2024-01-20",
      "excerpt": "...",
      "content": "..."
    }
  ]
}
```

---

## ✅ Checklist Finale avant Lancement

- [ ] Toutes les pages fonctionnelles
- [ ] Design cohérent et responsive
- [ ] Formulaires testés (contact + commande)
- [ ] Emails de notification fonctionnels
- [ ] Images optimisées
- [ ] SEO de base (meta tags)
- [ ] Tests sur différents navigateurs
- [ ] Tests sur mobile/tablette
- [ ] Déploiement sur o2switch réussi
- [ ] Domaine configuré (si applicable)
- [ ] Certificat SSL actif (HTTPS)

---

## 📝 Notes Importantes

1. **Commandes Albums**: Le système enverra un email à slimabidaproject@gmail.com avec les détails de chaque commande. Vous pourrez ensuite traiter la commande manuellement.

2. **o2switch**: ✅ **Serveur Node.js confirmé** - Votre serveur supporte Node.js via l'interface "Setup Node.js App". La configuration se fera directement depuis le dashboard o2switch.

3. **Contenu**: Préparer à l'avance:

   - Photos de couverture d'albums
   - Photos pour la page About
   - Textes de biographie
   - Liste des morceaux par album
   - Informations de concerts passés

4. **Futures Améliorations Possibles**:
   - Intégration paiement en ligne (Stripe, PayPal)
   - Lecteur audio intégré (bandes-annonces)
   - Blog/Actualités dynamique
   - Newsletter
   - Intégration réseaux sociaux

---

## 🚀 Prochaines Étapes

Une fois cette méthode validée, nous commencerons par:

1. Setup initial du projet Next.js
2. Configuration du design system (couleurs Jazz Fusion)
3. Création des composants de base
4. Développement page par page

**Prêt à commencer quand vous le souhaitez !** 🎷
