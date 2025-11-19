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
