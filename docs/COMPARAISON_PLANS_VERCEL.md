# Comparaison des plans Vercel pour les fichiers statiques

## Limites de taille des fichiers statiques

### Plan Hobby (Gratuit)
- **Limite par fichier statique : 50 MB**
- Taille maximale du déploiement : 100 MB

### Plan Pro (Payant - $20/mois)
- **Limite par fichier statique : 100 MB** ⚠️
- Taille maximale du déploiement : 1 GB

### Plan Enterprise (Sur devis)
- **Limite par fichier statique : 100 MB** ⚠️
- Taille maximale du déploiement : Plus élevée

## Analyse de vos vidéos

Même avec un plan Pro (100 MB par fichier), plusieurs vidéos dépassent encore la limite :

| Vidéo | Taille | Plan Gratuit | Plan Pro |
|-------|--------|--------------|----------|
| `contrast-live-session.mp4` | 380 MB | ❌ | ❌ |
| `vers-ou-jazzoil.mp4` | 164 MB | ❌ | ❌ |
| `medina-live-session-jazzoil.mp4` | 141 MB | ❌ | ❌ |
| `InMediaRes-live-hammamet.mp4` | 134 MB | ❌ | ❌ |
| `yadayki-live-sesion.mp4` | 120 MB | ❌ | ❌ |
| `road-live-session.mp4` | 114 MB | ❌ | ❌ |
| `enheb-entir-arrangement.mp4` | 83 MB | ❌ | ✅ |
| `father-solo-bass.mp4` | 72 MB | ❌ | ✅ |
| `butterfly-video.mp4` | 63 MB | ❌ | ✅ |
| `video-album.mp4` | 3.9 MB | ✅ | ✅ |

## Conclusion

**Même avec un plan Pro Vercel ($20/mois), 6 vidéos sur 10 ne pourront toujours pas être servies.**

## Solutions recommandées

### Option 1 : Supabase Storage (Recommandé) ⭐
- **Coût : Gratuit jusqu'à 1 GB**
- **Avantages :**
  - Pas de limite de taille par fichier
  - CDN intégré
  - Déjà utilisé pour la base de données
  - Facile à intégrer

### Option 2 : Compresser les vidéos
- **Coût : Gratuit**
- **Inconvénients :**
  - Perte de qualité possible
  - Processus long
  - Nécessite des outils de compression

### Option 3 : Service de stockage externe
- **Options :**
  - Cloudinary (gratuit jusqu'à 25 GB)
  - AWS S3 + CloudFront
  - Bunny CDN

## Recommandation finale

**Utiliser Supabase Storage** car :
1. Gratuit pour 1 GB (suffisant pour toutes vos vidéos)
2. Pas de limite de taille par fichier
3. CDN inclus
4. Intégration simple avec votre stack actuelle

