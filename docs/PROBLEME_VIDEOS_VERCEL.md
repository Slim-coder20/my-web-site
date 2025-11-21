# Problème : Vidéos trop volumineuses pour Vercel

## Problème identifié

Vercel limite les fichiers statiques à **50 MB par fichier** dans le plan gratuit. Plusieurs vidéos dépassent cette limite :

- `contrast-live-session.mp4` : **380 MB** ❌
- `vers-ou-jazzoil.mp4` : **164 MB** ❌
- `medina-live-session-jazzoil.mp4` : **141 MB** ❌
- `InMediaRes-live-hammamet.mp4` : **134 MB** ❌
- `yadayki-live-sesion.mp4` : **120 MB** ❌
- `road-live-session.mp4` : **114 MB** ❌
- `enheb-entir-arrangement.mp4` : **83 MB** ❌
- `father-solo-bass.mp4` : **72 MB** ❌
- `butterfly-video.mp4` : **63 MB** ❌
- `video-album.mp4` : **3.9 MB** ✅ (seule vidéo qui fonctionne)

## Solutions possibles

### Solution 1 : Utiliser Supabase Storage (Recommandé) ⭐

**Avantages :**
- Vous utilisez déjà Supabase pour la base de données
- 1 GB de stockage gratuit
- CDN intégré
- Facile à intégrer

**Étapes :**
1. Créer un bucket "videos" dans Supabase Storage
2. Uploader les vidéos dans Supabase Storage
3. Obtenir les URLs publiques des vidéos
4. Mettre à jour les URLs dans la base de données

### Solution 2 : Compresser les vidéos

**Avantages :**
- Reste sur Vercel
- Pas de changement de code

**Inconvénients :**
- Perte de qualité possible
- Processus long
- Nécessite des outils de compression

**Outils recommandés :**
- HandBrake (gratuit)
- FFmpeg (ligne de commande)

### Solution 3 : Utiliser un CDN externe

**Options :**
- Cloudinary (gratuit jusqu'à 25 GB)
- AWS S3 + CloudFront
- Bunny CDN

## Recommandation

**Utiliser Supabase Storage** car :
1. Vous utilisez déjà Supabase
2. Intégration simple
3. CDN inclus
4. 1 GB gratuit (suffisant pour commencer)

## Prochaines étapes

1. Créer un bucket "videos" dans Supabase
2. Uploader les vidéos
3. Mettre à jour les URLs dans la base de données
4. Tester le chargement des vidéos

