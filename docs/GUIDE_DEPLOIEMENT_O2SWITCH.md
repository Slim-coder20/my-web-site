# 🚀 Guide de Déploiement sur o2switch - Étape par Étape

Ce guide vous accompagne pour déployer votre site Next.js sur o2switch avec le domaine `slimabida.fr`.

---

## 📋 PRÉREQUIS

Avant de commencer, assurez-vous d'avoir :
- ✅ Le domaine `slimabida.fr` configuré dans cPanel (fait ✅)
- ✅ Les clés Stripe de production (fait ✅)
- ✅ Le webhook Stripe configuré (fait ✅)
- ✅ Les identifiants de votre base de données MySQL o2switch
- ✅ Les identifiants FTP/cPanel o2switch

---

## 🔒 ÉTAPE 1 : Configuration SSL (Certificat HTTPS)

**⚠️ IMPORTANT** : Stripe nécessite HTTPS en production. Il faut configurer le certificat SSL.

1. Dans cPanel, allez dans **"Sécurité"** → **"SSL/TLS"**
2. Cliquez sur **"Gérer les certificats SSL"**
3. Pour `slimabida.fr`, sélectionnez **"Installer un certificat Let's Encrypt"** (gratuit)
4. Cliquez sur **"Installer"** ou **"Générer"**
5. Attendez quelques minutes que le certificat soit installé
6. Vérifiez que le site est accessible en HTTPS : `https://slimabida.fr`

**Alternative** : Si Let's Encrypt n'est pas disponible, contactez le support o2switch pour installer un certificat SSL.

---

## 🏗️ ÉTAPE 2 : Préparation des Fichiers Locaux

### 2.1. Construire l'application en mode production

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# Installer les dépendances si ce n'est pas déjà fait
npm install

# Construire l'application pour la production
npm run build
```

Cette commande va :
- Compiler votre application Next.js
- Créer le dossier `.next/` avec les fichiers optimisés
- Générer les fichiers en mode `standalone` (nécessaire pour o2switch)

### 2.2. Préparer le package de déploiement

Exécutez le script de préparation :

```bash
# Rendre le script exécutable (si nécessaire)
chmod +x prepare-deployment.sh

# Exécuter le script
./prepare-deployment.sh
```

Ce script va créer un dossier `deployment-package/` avec tous les fichiers nécessaires.

**Vérification** : Vérifiez que le dossier `deployment-package/` contient :
- ✅ `package.json` et `package-lock.json`
- ✅ `app/` (code source)
- ✅ `components/`
- ✅ `lib/`
- ✅ `prisma/`
- ✅ `public/` (sans les vidéos)
- ✅ `.next/` (build de production)
- ✅ Tous les fichiers de configuration

---

## 📤 ÉTAPE 3 : Upload des Fichiers sur o2switch

### 3.1. Via File Manager (cPanel)

1. Connectez-vous à cPanel o2switch
2. Allez dans **"Fichiers"** → **"Gestionnaire de fichiers"**
3. Naviguez vers le dossier de votre domaine : `/slimabida.fr/` (ou `/public_html/slimabida.fr/`)
4. **Supprimez** tous les fichiers existants dans ce dossier (sauf `.htaccess` si vous en avez un)
5. **Uploadez** tous les fichiers du dossier `deployment-package/` :
   - Sélectionnez tous les fichiers et dossiers
   - Cliquez sur **"Upload"**
   - Attendez que tous les fichiers soient uploadés

### 3.2. Via FTP (Alternative)

Si vous préférez utiliser un client FTP (FileZilla, Cyberduck, etc.) :

1. Connectez-vous avec vos identifiants FTP o2switch
2. Naviguez vers `/slimabida.fr/` (ou `/public_html/slimabida.fr/`)
3. Uploadez tous les fichiers du dossier `deployment-package/`

**⚠️ Important** : Assurez-vous que tous les dossiers et fichiers sont bien uploadés, y compris les fichiers cachés (`.next/`, etc.).

---

## 🔧 ÉTAPE 4 : Configuration Node.js sur o2switch

1. Dans cPanel, allez dans **"Logiciel"** → **"Setup Node.js App"**
2. Cliquez sur **"Create Application"** ou **"Créer une application"**
3. Configurez l'application :
   - **Node.js Version** : Sélectionnez **Node.js 18** ou **20** (recommandé : 20)
   - **Application Mode** : **Production**
   - **Application Root** : `/slimabida.fr` (ou le chemin exact vers votre dossier)
   - **Application URL** : `slimabida.fr` (sans https://)
   - **Application Startup File** : `.next/standalone/server.js`
   - **Port** : Laissé par défaut (géré automatiquement)
4. Cliquez sur **"Create"** ou **"Créer"**

**Note** : Si l'application existe déjà, vous pouvez la modifier au lieu de la créer.

---

## 📦 ÉTAPE 5 : Installation des Dépendances

### 5.1. Via Terminal o2switch

1. Dans l'interface "Setup Node.js App", trouvez votre application
2. Cliquez sur l'icône **Terminal** ou **"Open Terminal"**
3. Dans le terminal, exécutez :

```bash
# Aller dans le dossier de l'application
cd /chemin/vers/slimabida.fr

# Installer les dépendances (mode production uniquement)
npm install --production
```

### 5.2. Vérification

Attendez que l'installation se termine. Vous devriez voir :
```
added XXX packages in XXs
```

---

## 🗄️ ÉTAPE 6 : Configuration Prisma

Dans le même terminal, exécutez :

```bash
# Générer le client Prisma
npx prisma generate
```

Cette commande génère le client Prisma nécessaire pour se connecter à la base de données.

**Vérification** : Vous devriez voir :
```
✔ Generated Prisma Client
```

---

## 🔐 ÉTAPE 7 : Configuration des Variables d'Environnement

### 7.1. Créer le fichier .env.production

Dans l'interface "Setup Node.js App" :
1. Trouvez votre application
2. Cliquez sur **"Environment Variables"** ou **"Variables d'environnement"**
3. Ajoutez les variables suivantes une par une :

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://slimabida.fr
```

**Base de données MySQL** :
```env
DATABASE_URL=mysql://username:password@host:3306/database_name
```
*(Remplacez par vos vraies informations MySQL o2switch)*

**Stripe (clés de PRODUCTION)** :
```env
STRIPE_SECRET_KEY=sk_live_... (votre clé secrète)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (votre clé publique)
STRIPE_WEBHOOK_SECRET=whsec_... (le secret du webhook)
```

**Resend (pour les emails)** :
```env
RESEND_API_KEY=re_... (votre clé API Resend)
RESEND_FROM_EMAIL=noreply@slimabida.fr
CONTACT_EMAIL=slimabidaproject@gmail.com
```

### 7.2. Alternative : Créer le fichier .env.production manuellement

Si l'interface ne permet pas d'ajouter les variables :
1. Via File Manager, créez un fichier `.env.production` dans le dossier de l'application
2. Copiez-collez toutes les variables ci-dessus
3. Sauvegardez le fichier

**⚠️ SÉCURITÉ** : Ne partagez jamais ce fichier et ne le commitez pas dans Git !

---

## 🎬 ÉTAPE 8 : Démarrage de l'Application

1. Dans l'interface "Setup Node.js App", trouvez votre application
2. Cliquez sur **"Start"** ou **"Restart"** (si déjà démarrée)
3. Attendez quelques secondes
4. Vérifiez les **logs** pour voir s'il y a des erreurs :
   - Cliquez sur **"View Logs"** ou **"Voir les logs"**
   - Vérifiez qu'il n'y a pas d'erreurs en rouge

**Logs attendus** (sans erreur) :
```
✓ Ready on http://localhost:XXXX
```

---

## 🔗 ÉTAPE 9 : Configuration du Domaine et Redirection

### 9.1. Vérifier la configuration du domaine

1. Dans cPanel, allez dans **"Domaines"** → **"Domaines supplémentaires"**
2. Vérifiez que `slimabida.fr` pointe vers le bon dossier
3. Le **"Racine du document"** doit être : `/slimabida.fr` (ou `/public_html/slimabida.fr`)

### 9.2. Configuration de la redirection (si nécessaire)

Si votre application Node.js écoute sur un port spécifique, vous devrez peut-être configurer une redirection. Contactez le support o2switch si nécessaire.

---

## 🧪 ÉTAPE 10 : Tests de Fonctionnalités

Testez chaque page et fonctionnalité :

### 10.1. Pages principales
- [ ] **Page d'accueil** : `https://slimabida.fr` → Doit s'afficher correctement
- [ ] **Page Discographie** : `https://slimabida.fr/discographie` → Albums visibles
- [ ] **Page Concerts** : `https://slimabida.fr/concerts` → Concerts visibles
- [ ] **Page Contact** : `https://slimabida.fr/contact` → Formulaire fonctionne
- [ ] **Page Pédago** : `https://slimabida.fr/pedago` → Cartes de cours visibles

### 10.2. Fonctionnalités e-commerce
- [ ] **Bouton "Acheter"** : Cliquez sur un album → Redirige vers la page de checkout
- [ ] **Page Checkout** : Formulaire s'affiche correctement
- [ ] **Paiement Stripe** : Testez avec une carte de test :
  - Numéro : `4242 4242 4242 4242`
  - Date : N'importe quelle date future
  - CVC : N'importe quel code à 3 chiffres
- [ ] **Redirection après paiement** : Retour vers `/discographie?success=true`
- [ ] **Email de confirmation** : Vérifiez que l'email est envoyé

### 10.3. Vérifications techniques
- [ ] **HTTPS** : Le site fonctionne en HTTPS (pas HTTP)
- [ ] **Images** : Toutes les images se chargent correctement
- [ ] **Responsive** : Le site fonctionne sur mobile/tablette
- [ ] **Base de données** : Les données s'affichent (albums, concerts, etc.)

---

## 🔍 ÉTAPE 11 : Vérification du Webhook Stripe

1. Dans le Dashboard Stripe, allez dans **Développeurs** → **Webhooks**
2. Cliquez sur votre webhook
3. Vérifiez que l'URL est : `https://slimabida.fr/api/stripe/webhook`
4. Faites un test de paiement
5. Allez dans l'onglet **"Événements"** du webhook
6. Vous devriez voir :
   - ✅ `checkout.session.completed` avec un statut `200` (succès)
   - ❌ Si vous voyez `500` ou `400`, il y a un problème

---

## 📹 ÉTAPE 12 : Upload des Vidéos (Optionnel)

Si vous avez des vidéos à afficher :

1. Via File Manager, créez le dossier `public/videos/` (s'il n'existe pas)
2. Uploadez vos fichiers vidéo (.mp4) dans ce dossier
3. Vérifiez que les chemins dans la base de données correspondent aux noms de fichiers

---

## 🆘 EN CAS DE PROBLÈME

### Erreur : "Cannot find module"
- Vérifiez que `npm install --production` a bien été exécuté
- Vérifiez que `npx prisma generate` a bien été exécuté

### Erreur : "Database connection failed"
- Vérifiez la variable `DATABASE_URL` dans `.env.production`
- Vérifiez que la base de données MySQL est accessible depuis le serveur

### Erreur : "Stripe webhook signature verification failed"
- Vérifiez que `STRIPE_WEBHOOK_SECRET` est correct dans `.env.production`
- Vérifiez que le webhook dans Stripe utilise la bonne URL

### Le site ne démarre pas
- Consultez les **logs** dans "Setup Node.js App"
- Vérifiez que le **port** est correctement configuré
- Vérifiez que le fichier `.next/standalone/server.js` existe

### Le site affiche une erreur 500
- Consultez les **logs** du serveur
- Vérifiez les **variables d'environnement**
- Vérifiez la **connexion à la base de données**

---

## ✅ CHECKLIST FINALE

Avant de considérer le déploiement terminé :

- [ ] Certificat SSL installé et HTTPS fonctionnel
- [ ] Application Node.js démarrée sans erreur
- [ ] Toutes les variables d'environnement configurées
- [ ] Base de données accessible et fonctionnelle
- [ ] Webhook Stripe configuré et testé
- [ ] Toutes les pages principales fonctionnent
- [ ] Le paiement Stripe fonctionne en production
- [ ] Les emails de confirmation sont envoyés
- [ ] Le site est responsive (mobile/tablette)
- [ ] Les images se chargent correctement

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez les **logs** dans l'interface Node.js App
2. Vérifiez la **documentation o2switch**
3. Contactez le **support o2switch** si nécessaire
4. Vérifiez la **documentation Stripe** pour les problèmes de paiement

---

**Date de déploiement :** _______________

**Personne responsable :** _______________
