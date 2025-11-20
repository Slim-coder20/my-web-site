# Guide de nettoyage avant nouveau déploiement o2switch

Ce guide vous aide à nettoyer l'ancienne configuration (mode standalone) avant de déployer avec la nouvelle procédure officielle o2switch.

## ⚠️ Important

**Faites une sauvegarde complète avant de commencer !**

```bash
# Sur le serveur, créez une sauvegarde
cd /home/absl3386
tar -czf backup-slimabida-$(date +%Y%m%d).tar.gz slimabida.fr/
```

## 📋 Ce qu'il faut supprimer (ancienne config standalone)

### 1. Dossiers de build standalone

```bash
cd /home/absl3386/slimabida.fr

# Supprimer l'ancien build standalone
rm -rf .next/standalone/
rm -rf .next/static/  # Sera régénéré avec le nouveau build
rm -rf .next/  # Supprimer tout le dossier .next (sera recréé)
```

### 2. Dossiers de déploiement temporaires

```bash
# Supprimer les packages de déploiement
rm -rf deployment-package/
rm -f deployment-package-final.zip
rm -f prisma-client-v*.zip
rm -f next-folder.zip
rm -f videos.zip
```

### 3. Node modules (sera réinstallé)

```bash
# IMPORTANT : Supprimer node_modules (sera réinstallé avec npm i)
rm -rf node_modules/
```

### 4. Fichiers de build (seront régénérés)

```bash
# Supprimer l'ancien build (sera recréé avec distDir: 'build')
rm -rf build/
```

### 5. Fichiers temporaires et logs

```bash
# Nettoyer les logs et fichiers temporaires
rm -f passenger.log
rm -rf tmp/
rm -f *.log
```

## ✅ Ce qu'il faut CONSERVER

### 1. Fichiers de configuration essentiels

```bash
# CONSERVER .htaccess (sera peut-être modifié par o2switch, mais gardez une copie)
cp .htaccess .htaccess.backup
```

### 2. Dossier public/ (images, vidéos, etc.)

```bash
# CONSERVER public/ et son contenu (surtout public/videos/)
# Ne PAS supprimer public/videos/ (1.2 GB de vidéos)
```

### 3. Fichiers source

```bash
# CONSERVER tous les fichiers source :
# - app/
# - components/
# - lib/
# - prisma/
# - package.json
# - etc.
```

### 4. Variables d'environnement

Si vous avez un fichier `.env.production`, conservez-le ou notez les valeurs pour les reconfigurer.

## 🧹 Script de nettoyage complet

Voici un script à exécuter sur le serveur pour tout nettoyer :

```bash
#!/bin/bash
# Script de nettoyage avant nouveau déploiement

cd /home/absl3386/slimabida.fr

echo "🧹 Nettoyage de l'ancienne configuration..."

# 1. Sauvegarde de .htaccess
if [ -f .htaccess ]; then
  cp .htaccess .htaccess.backup
  echo "✅ .htaccess sauvegardé"
fi

# 2. Supprimer les dossiers de build standalone
echo "🗑️  Suppression de .next/..."
rm -rf .next/

# 3. Supprimer les packages de déploiement
echo "🗑️  Suppression des packages de déploiement..."
rm -rf deployment-package/
rm -f deployment-package-*.zip
rm -f prisma-client-v*.zip
rm -f next-folder.zip
rm -f videos.zip

# 4. Supprimer node_modules
echo "🗑️  Suppression de node_modules/..."
rm -rf node_modules/

# 5. Supprimer l'ancien build
echo "🗑️  Suppression de build/..."
rm -rf build/

# 6. Nettoyer les logs
echo "🗑️  Nettoyage des logs..."
rm -f passenger.log
rm -rf tmp/
rm -f *.log

# 7. Vérifier ce qui reste
echo ""
echo "✅ Nettoyage terminé !"
echo ""
echo "📁 Structure actuelle :"
ls -la | head -20

echo ""
echo "⚠️  IMPORTANT :"
echo "   - Le dossier public/ est conservé (vidéos, images, etc.)"
echo "   - Les fichiers source (app/, components/, etc.) sont conservés"
echo "   - .htaccess est sauvegardé dans .htaccess.backup"
echo ""
echo "📦 Prochaine étape :"
echo "   1. Supprimer l'application Node.js dans cPanel 'Setup Node.js App'"
echo "   2. Suivre le guide DEPLOIEMENT_O2SWITCH.md pour redéployer"
```

## 📝 Étapes de nettoyage manuel (si vous préférez)

### Étape 1 : Sauvegarder

```bash
cd /home/absl3386
tar -czf backup-slimabida-$(date +%Y%m%d).tar.gz slimabida.fr/
```

### Étape 2 : Supprimer l'application Node.js dans cPanel

1. Allez dans cPanel → "Setup Node.js App"
2. Supprimez l'application `slimabida.fr` existante

### Étape 3 : Nettoyer le dossier

```bash
cd /home/absl3386/slimabida.fr

# Sauvegarder .htaccess
cp .htaccess .htaccess.backup

# Supprimer les dossiers de build
rm -rf .next/
rm -rf build/
rm -rf node_modules/
rm -rf deployment-package/
rm -f *.zip
rm -f passenger.log
rm -rf tmp/
```

### Étape 4 : Vérifier ce qui reste

```bash
ls -la
```

Vous devriez voir :

- ✅ `app/` (fichiers source)
- ✅ `components/` (fichiers source)
- ✅ `lib/` (fichiers source)
- ✅ `prisma/` (fichiers source)
- ✅ `public/` (avec `public/videos/` intact)
- ✅ `package.json`
- ✅ `.htaccess.backup`
- ✅ Autres fichiers de configuration

### Étape 5 : Suivre le nouveau guide de déploiement

Une fois le nettoyage terminé, suivez le guide `docs/DEPLOIEMENT_O2SWITCH.md` pour redéployer avec la nouvelle procédure.

## 🔍 Vérification après nettoyage

Après le nettoyage, votre structure devrait ressembler à :

```
slimabida.fr/
├── app/                    ✅ Conservé
├── components/             ✅ Conservé
├── lib/                    ✅ Conservé
├── prisma/                 ✅ Conservé
├── public/                 ✅ Conservé (avec videos/)
│   ├── videos/            ✅ Conservé (1.2 GB)
│   ├── images/            ✅ Conservé
│   └── audio/             ✅ Conservé
├── .htaccess.backup        ✅ Sauvegarde
├── package.json            ✅ Conservé
├── next.config.ts          ✅ Conservé
├── server.js               ⚠️  À uploader (nouveau)
└── tsconfig.json           ✅ Conservé
```

## ⚠️ Points d'attention

1. **Ne supprimez PAS `public/videos/`** : Il contient 1.2 GB de vidéos qui ont été uploadées manuellement
2. **Conservez les fichiers source** : `app/`, `components/`, `lib/`, `prisma/`, etc.
3. **Sauvegardez `.htaccess`** : Il contient des configurations importantes
4. **Notez les variables d'environnement** : Si elles sont dans `.htaccess`, notez-les pour les reconfigurer

## 📞 En cas de problème

Si vous avez supprimé quelque chose d'important par erreur :

1. Restaurez depuis la sauvegarde :

   ```bash
   cd /home/absl3386
   tar -xzf backup-slimabida-YYYYMMDD.tar.gz
   ```

2. Ou restaurez uniquement `.htaccess` :
   ```bash
   cp .htaccess.backup .htaccess
   ```

## ✅ Checklist avant nouveau déploiement

- [ ] Sauvegarde complète créée
- [ ] `.htaccess` sauvegardé
- [ ] `.next/` supprimé
- [ ] `build/` supprimé
- [ ] `node_modules/` supprimé
- [ ] Packages de déploiement supprimés
- [ ] Logs nettoyés
- [ ] `public/videos/` vérifié (doit être présent)
- [ ] Fichiers source vérifiés (app/, components/, etc.)
- [ ] Application Node.js supprimée dans cPanel
- [ ] Prêt pour le nouveau déploiement

Une fois tout vérifié, suivez le guide `docs/DEPLOIEMENT_O2SWITCH.md`.
