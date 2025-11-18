#!/bin/bash

# Script pour préparer les fichiers de déploiement pour o2switch
# Usage: ./prepare-deployment.sh

set -e

echo "🚀 Préparation des fichiers de déploiement..."

# Nom du dossier de déploiement
DEPLOY_DIR="deployment-package"
CURRENT_DIR=$(pwd)

# Supprimer l'ancien dossier de déploiement s'il existe
if [ -d "$DEPLOY_DIR" ]; then
  echo "📦 Suppression de l'ancien dossier de déploiement..."
  rm -rf "$DEPLOY_DIR"
fi

# Créer le dossier de déploiement
mkdir -p "$DEPLOY_DIR"

echo "📦 Copie des fichiers nécessaires..."

# Fichiers de configuration
cp package.json "$DEPLOY_DIR/"
cp package-lock.json "$DEPLOY_DIR/"
cp next.config.ts "$DEPLOY_DIR/"
cp tsconfig.json "$DEPLOY_DIR/"
cp postcss.config.mjs "$DEPLOY_DIR/"
cp eslint.config.mjs "$DEPLOY_DIR/"
cp next-env.d.ts "$DEPLOY_DIR/"

# Dossier app (code source)
echo "📁 Copie du dossier app..."
cp -r app "$DEPLOY_DIR/"

# Dossier components
echo "📁 Copie du dossier components..."
cp -r components "$DEPLOY_DIR/"

# Dossier lib
echo "📁 Copie du dossier lib..."
cp -r lib "$DEPLOY_DIR/"

# Dossier prisma (schéma de base de données)
echo "📁 Copie du dossier prisma..."
cp -r prisma "$DEPLOY_DIR/"

# Dossier public (images, fichiers statiques - SANS les vidéos)
echo "📁 Copie du dossier public (sans vidéos)..."
cp -r public "$DEPLOY_DIR/"
# Supprimer les vidéos du dossier de déploiement (trop volumineuses)
rm -rf "$DEPLOY_DIR/public/videos"

# Dossier .next (build de production)
if [ -d ".next" ]; then
  echo "📁 Copie du dossier .next (build)..."
  cp -r .next "$DEPLOY_DIR/"
else
  echo "⚠️  Le dossier .next n'existe pas. Exécutez 'npm run build' d'abord."
fi

# README (optionnel mais utile)
if [ -f "README.md" ]; then
  cp README.md "$DEPLOY_DIR/"
fi

# Créer un fichier .env.production.example
echo "📝 Création du fichier .env.production.example..."
cat > "$DEPLOY_DIR/.env.production.example" << 'EOF'
# Variables d'environnement pour la production
# Copiez ce fichier en .env.production et remplissez les valeurs

NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com

# Base de données MySQL (o2switch)
DATABASE_URL="mysql://username:password@host:3306/database_name"

# Stripe (clés de production)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Resend (pour les emails)
RESEND_API_KEY=re_...
CONTACT_EMAIL=slimabidaproject@gmail.com
RESEND_TEST_EMAIL=slimdev20@gmail.com
EOF

# Créer un fichier README pour le déploiement
echo "📝 Création du README de déploiement..."
cat > "$DEPLOY_DIR/DEPLOYMENT_README.md" << 'EOF'
# Instructions de Déploiement

## Fichiers inclus dans ce package

- `package.json` et `package-lock.json` - Dépendances
- `app/` - Code source de l'application
- `components/` - Composants React
- `lib/` - Utilitaires et Prisma
- `prisma/` - Schéma de base de données
- `public/` - Fichiers statiques (images, etc.)
- `.next/` - Build de production Next.js
- `next.config.ts` - Configuration Next.js

## Étapes de déploiement sur o2switch

1. **Uploader tous les fichiers** de ce dossier vers votre serveur o2switch
   (via FTP ou File Manager)

2. **Installer les dépendances** :
   ```bash
   npm install --production
   ```

3. **Générer Prisma Client** :
   ```bash
   npx prisma generate
   ```

4. **Créer le fichier .env.production** :
   - Copiez `.env.production.example` en `.env.production`
   - Remplissez toutes les variables d'environnement

5. **Démarrer l'application** via l'interface Node.js App d'o2switch

## Notes importantes

- Les vidéos ne sont PAS incluses (trop volumineuses)
- Uploader les vidéos séparément dans `public/videos/` si nécessaire
- Vérifier que la base de données MySQL est accessible
- Utiliser les clés Stripe de PRODUCTION (pas de test)
EOF

echo ""
echo "✅ Préparation terminée !"
echo ""
echo "📦 Dossier de déploiement créé : $DEPLOY_DIR"
echo ""
echo "📊 Taille du package :"
du -sh "$DEPLOY_DIR"
echo ""
echo "📋 Fichiers à uploader :"
echo "   - Tous les fichiers du dossier '$DEPLOY_DIR'"
echo ""
echo "⚠️  N'oubliez pas :"
echo "   1. Créer .env.production sur le serveur"
echo "   2. Uploader les vidéos séparément si nécessaire"
echo "   3. Installer les dépendances : npm install --production"
echo "   4. Générer Prisma : npx prisma generate"
echo ""

