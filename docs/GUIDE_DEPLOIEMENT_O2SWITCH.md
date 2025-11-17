# Guide de Déploiement Next.js sur o2switch

## ✅ Confirmation: Support Node.js

Votre serveur o2switch supporte **Node.js** - L'option "Setup Node.js App" est disponible dans votre dashboard sous **"Logiciel"** → **"Setup Node.js App"**.

---

## 📋 Étapes de Déploiement

### ÉTAPE 1: Préparation Locale (AVANT déploiement)

#### 1.1 Build de Production

```bash
# Dans le répertoire de votre projet
npm run build
```

#### 1.2 Test du Build en Local

```bash
npm start
# Vérifier que le site fonctionne sur http://localhost:3000
```

#### 1.3 Préparer les Fichiers pour Upload

- ✅ `package.json` et `package-lock.json`
- ✅ Dossier `.next` (généré par `npm run build`)
- ✅ Dossier `public` (images, fichiers statiques)
- ✅ Fichiers de configuration Next.js
- ✅ **PAS besoin d'uploader** `node_modules` (sera réinstallé sur le serveur)

---

### ÉTAPE 2: Configuration Node.js sur o2switch

#### 2.1 Accéder à "Setup Node.js App"

1. Connectez-vous à votre dashboard o2switch
2. Allez dans **"Logiciel"** → **"Setup Node.js App"**
3. Cliquez sur **"Create Application"** ou **"Créer une application"**

#### 2.2 Configuration de l'Application

**Paramètres à configurer:**

- **Node.js Version**: Sélectionnez **Node.js 18** ou **Node.js 20** (recommandé pour Next.js 14+)
- **Application Mode**: `Production`
- **Application Root**: `/home/votre-username/slim-site` (ou le chemin de votre choix)
- **Application URL**: Votre domaine ou sous-domaine
- **Application Startup File**: `server.js` ou `.next/standalone/server.js` (selon configuration Next.js)

**Note pour Next.js Standalone Mode:**
Pour simplifier le déploiement, configurez Next.js en mode "standalone" dans `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Cette option génère un serveur optimisé
};
```

---

### ÉTAPE 3: Upload des Fichiers

#### Option A: Via File Manager (o2switch)

1. Accédez à **"Fichiers"** → **"Gestionnaire de fichiers"**
2. Naviguez vers le répertoire configuré dans "Application Root"
3. Upload tous les fichiers nécessaires:
   - `package.json`
   - `package-lock.json`
   - Dossier `.next`
   - Dossier `public`
   - Fichiers de configuration (`.env.production`, `next.config.js`, etc.)

#### Option B: Via FTP/SFTP

1. Utilisez un client FTP (FileZilla, Cyberduck, etc.)
2. Connectez-vous avec vos identifiants o2switch
3. Upload vers le répertoire de l'application

---

### ÉTAPE 4: Installation des Dépendances

#### Via Terminal (o2switch)

1. Accédez à **"Avancé"** → **"Terminal"**
2. Naviguez vers le répertoire de l'application:
   ```bash
   cd /home/votre-username/slim-site
   ```
3. Installez les dépendances:
   ```bash
   npm install --production
   ```
   (Les dépendances de dev ne sont pas nécessaires en production)

---

### ÉTAPE 5: Configuration des Variables d'Environnement

#### 5.1 Créer le fichier .env.production

Dans le répertoire de l'application, créez `.env.production`:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
EMAIL_FROM=slimabidaproject@gmail.com
EMAIL_TO=slimabidaproject@gmail.com
SMTP_HOST=votre-serveur-smtp
SMTP_PORT=587
SMTP_USER=votre-email
SMTP_PASS=votre-mot-de-passe
# ... autres variables selon vos besoins
```

**Note:** o2switch fournit généralement un serveur SMTP que vous pouvez utiliser pour l'envoi d'emails.

#### 5.2 Via Interface Node.js App (si supporté)

Certaines interfaces permettent de configurer les variables d'environnement directement dans le dashboard.

---

### ÉTAPE 6: Build et Démarrage

#### 6.1 Build sur le Serveur

Si vous n'avez pas uploadé le dossier `.next`, vous pouvez build directement sur le serveur:

```bash
cd /home/votre-username/slim-site
npm run build
```

#### 6.2 Démarrage de l'Application

1. Retournez dans **"Setup Node.js App"**
2. Sélectionnez votre application
3. Cliquez sur **"Start"** ou **"Restart"**

L'interface o2switch gérera automatiquement le processus Node.js pour vous.

---

### ÉTAPE 7: Configuration Domaine/DNS

#### Si vous utilisez votre propre domaine:

1. Configurez les enregistrements DNS pour pointer vers votre serveur o2switch
2. Dans o2switch, configurez le domaine pour votre application Node.js
3. Installez un certificat SSL (Let's Encrypt via o2switch)

---

## 🔧 Configuration Next.js Optimisée pour o2switch

### next.config.js Recommandé

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Important pour déploiement serveur

  // Optimisations
  images: {
    domains: ["votre-domaine.com"],
    formats: ["image/avif", "image/webp"],
  },

  // Compression
  compress: true,

  // Headers de sécurité
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 📧 Configuration Email pour les Commandes

### Option 1: Utiliser le SMTP d'o2switch

o2switch fournit généralement un serveur SMTP que vous pouvez utiliser.

### Option 2: Nodemailer avec SMTP

```javascript
// lib/email.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true pour 465, false pour autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail(orderDetails) {
  // Votre logique d'envoi d'email
}
```

---

## ✅ Checklist de Vérification Post-Déploiement

- [ ] Site accessible via votre domaine
- [ ] HTTPS actif (certificat SSL installé)
- [ ] Toutes les pages fonctionnent
- [ ] Images chargent correctement
- [ ] Formulaire de contact fonctionne
- [ ] Formulaire de commande fonctionne
- [ ] Emails de notification reçus
- [ ] Responsive sur mobile/tablette
- [ ] Performance correcte (temps de chargement)

---

## 🐛 Résolution de Problèmes Courants

### Problème: Application ne démarre pas

- Vérifier que Node.js 18+ est sélectionné
- Vérifier les logs dans l'interface Node.js App
- Vérifier que `package.json` contient un script "start"

### Problème: Erreur 502 Bad Gateway

- Vérifier que l'application est bien démarrée
- Vérifier le port configuré
- Vérifier les logs d'erreur

### Problème: Variables d'environnement non reconnues

- Vérifier que le fichier `.env.production` est au bon endroit
- Redémarrer l'application après modification des variables
- Vérifier le format du fichier (pas d'espaces autour du `=`)

### Problème: Emails ne partent pas

- Vérifier les paramètres SMTP
- Tester la connexion SMTP depuis le serveur
- Vérifier les logs d'erreur dans l'API Route

---

## 📞 Support

Si vous rencontrez des problèmes:

1. Consultez les **logs** dans l'interface "Setup Node.js App"
2. Consultez la **documentation o2switch**
3. Contactez le **support o2switch** pour questions spécifiques serveur

---

## 🎯 Prochaines Étapes

Une fois le déploiement réussi:

1. Testez toutes les fonctionnalités
2. Configurez un système de sauvegarde
3. Mettez en place un monitoring (optionnel)
4. Documentez les mises à jour pour futures modifications
