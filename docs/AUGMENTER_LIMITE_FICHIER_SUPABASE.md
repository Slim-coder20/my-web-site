# Comment augmenter la limite de taille de fichier dans Supabase

## Problème

Par défaut, Supabase limite la taille des fichiers à **50 MB** par fichier. Pour uploader des vidéos plus volumineuses, il faut augmenter cette limite.

## Solution : Augmenter la limite globale

### Étape 1 : Aller dans les paramètres Storage

1. Dans votre projet Supabase, allez dans **Settings** (⚙️) dans le menu de gauche
2. Cliquez sur **Storage** dans le menu des paramètres

### Étape 2 : Augmenter la limite globale

1. Trouvez la section **"File size limit"** ou **"Max file size"**
2. Augmentez la limite à **500 MB** (ou plus si nécessaire)
3. Cliquez sur **"Save"** ou **"Update"**

**Note** : Dans le plan gratuit, la limite maximale peut être de 50 MB. Si vous ne pouvez pas l'augmenter :
- Option A : Passer au plan Pro de Supabase (qui permet des fichiers plus grands)
- Option B : Compresser les vidéos pour qu'elles soient sous 50 MB
- Option C : Utiliser un autre service de stockage (Cloudinary, AWS S3, etc.)

### Étape 3 : Créer le bucket

Une fois la limite globale augmentée :

1. Allez dans **Storage** → **Buckets**
2. Cliquez sur **"New bucket"**
3. Configurez :
   - **Name** : `videos`
   - **Public bucket** : ✅ **Activé**
   - **File size limit** : `500` MB (maintenant possible)
   - **Allowed MIME types** : `video/mp4` (optionnel)
4. Cliquez sur **"Create bucket"**

## Alternative : Plan Supabase Pro

Si vous ne pouvez pas augmenter la limite dans le plan gratuit :

1. Passez au **plan Pro** de Supabase ($25/mois)
2. La limite de fichier est beaucoup plus élevée (plusieurs GB)
3. Parfait pour héberger des vidéos volumineuses

## Alternative : Compresser les vidéos

Si vous voulez rester sur le plan gratuit :

1. Compressez les vidéos pour qu'elles soient sous 50 MB
2. Utilisez des outils comme HandBrake ou FFmpeg
3. Trade-off : légère perte de qualité possible

