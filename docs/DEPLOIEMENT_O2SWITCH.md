# Guide de déploiement Next.js sur o2switch

Ce guide suit la procédure officielle fournie par le support o2switch.

## Prérequis

- Projet Next.js fonctionnel en local
- Accès SSH à votre hébergement o2switch
- Accès au cPanel avec l'outil "Setup Node.js App"

## Procédure de déploiement

### 1. Préparation locale

Le projet est déjà configuré avec :
- `server.js` à la racine
- `next.config.ts` avec les configurations anti-erreurs
- Toutes les dépendances dans `package.json`

**Important :** Ne pas inclure `node_modules` dans l'archive de déploiement.

### 2. Création de l'archive

Depuis votre environnement local, créez une archive du projet (sans `node_modules` et `.next`) :

```bash
# Exclure node_modules, .next, et autres fichiers de build
zip -r deployment.zip . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x ".git/*" \
  -x "*.log" \
  -x ".env.local" \
  -x ".env*.local"
```

Ou avec tar :

```bash
tar -czf deployment.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='*.log' \
  --exclude='.env.local' \
  --exclude='.env*.local' \
  .
```

### 3. Création de l'application Node.js sur o2switch

Dans cPanel → "Setup Node.js App", configurez :

- **Node.js version** : `22` (ou la version disponible)
- **Application mode** : `development` (on passera en production après)
- **Application root** : Dossier où seront placés les fichiers (ex: `/home/absl3386/slimabida.fr`)
- **Application URL** : URL d'accès à l'application (ex: `slimabida.fr`)
- **Application startup file** : `server.js`

Une fois créée, copiez la commande `source` fournie pour activer l'environnement Node.js.

### 4. Préparation du dossier de l'application

Dans le terminal SSH, activez l'environnement Node.js :

```bash
source /home/absl3386/nodevenv/slimabida.fr/22/bin/activate
```

Puis, dans le dossier de l'application :

```bash
cd /home/absl3386/slimabida.fr

# Supprimer les fichiers générés par défaut
rm -rf public/ tmp/

# Supprimer node_modules s'il existe (IMPORTANT)
rm -rf node_modules
```

### 5. Upload et extraction de l'archive

Uploadez votre archive (`deployment.zip` ou `deployment.tar.gz`) dans le dossier de l'application via :
- File Manager (cPanel)
- FTP
- SCP

Puis extrayez-la :

```bash
# Pour ZIP
unzip deployment.zip

# Pour tar.gz
tar -xzf deployment.tar.gz

# Supprimer l'archive après extraction
rm deployment.zip  # ou deployment.tar.gz
```

### 6. Installation des dépendances

Toujours dans l'environnement Node.js :

```bash
npm i -y
```

Cette étape peut prendre quelques minutes.

### 7. Configuration des variables d'environnement

Créez un fichier `.env.production` ou configurez-les dans cPanel "Setup Node.js App" :

```bash
# Exemple de .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://slimabida.fr
DATABASE_URL=mysql://...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@slimabida.fr
CONTACT_EMAIL=slimabidaproject@gmail.com
```

### 8. Build en mode development

Dans l'environnement Node.js :

```bash
npm run build
```

Si vous rencontrez des erreurs de type "spawn EAGAIN" ou "ERRNO -11", vérifiez que `next.config.ts` contient bien :

```typescript
distDir: 'build',
experimental: {
  workerThreads: false,
  cpus: 1
}
```

### 9. Passage en production

1. Dans "Setup Node.js App", basculez l'application en mode **production**
2. Redémarrez l'application
3. Dans l'environnement Node.js, exécutez à nouveau :

```bash
npm run build
```

4. Une fois le build terminé, redémarrez à nouveau l'application

### 10. Vérification

Votre application devrait être accessible via l'URL configurée (ex: `https://slimabida.fr`).

## Fichiers importants

- `server.js` : Point d'entrée de l'application (déjà créé)
- `next.config.ts` : Configuration Next.js avec optimisations pour o2switch
- `.htaccess` : Configuration Apache/Passenger (généré automatiquement par o2switch)

## Dépannage

### Erreur "spawn EAGAIN" ou "ERRNO -11"

Vérifiez que `next.config.ts` contient :

```typescript
distDir: 'build',
experimental: {
  workerThreads: false,
  cpus: 1
}
```

### Erreur "Cannot find module"

Vérifiez que `node_modules` a bien été supprimé et réinstallé sur le serveur :

```bash
rm -rf node_modules
npm i -y
```

### Erreur de build

Vérifiez les logs :

```bash
tail -100 passenger.log
```

### Variables d'environnement non chargées

Configurez-les dans cPanel "Setup Node.js App" → "Environment variables" ou dans un fichier `.env.production`.

## Notes importantes

- **Ne jamais** inclure `node_modules` dans l'archive de déploiement
- **Toujours** supprimer `node_modules` avant d'installer les dépendances sur le serveur
- Le build doit être fait **sur le serveur**, pas en local
- Utiliser Node.js 22 (ou la version recommandée par o2switch)
- Passer en mode production uniquement après un build réussi en mode development

