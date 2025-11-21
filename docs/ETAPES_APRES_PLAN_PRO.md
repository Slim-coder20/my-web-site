# Étapes après avoir passé au plan Pro Supabase

## ✅ Étape 1 : Augmenter la limite globale de fichier

1. Dans Supabase Dashboard, allez dans **Settings** (⚙️) → **Storage**
2. Trouvez la section **"File size limit"** ou **"Max file size"**
3. Augmentez la limite à **500 MB** (ou plus si vous voulez)
4. Cliquez sur **"Save"**

## ✅ Étape 2 : Créer le bucket "videos"

1. Allez dans **Storage** → **Buckets**
2. Cliquez sur **"New bucket"**
3. Configurez :
   - **Name** : `videos`
   - **Public bucket** : ✅ **Activé** (très important !)
   - **File size limit** : `500` MB (maintenant possible)
   - **Allowed MIME types** : `video/mp4` (optionnel, mais recommandé)
4. Cliquez sur **"Create bucket"**

## ✅ Étape 3 : Obtenir les clés API

1. Allez dans **Settings** → **API**
2. Copiez les valeurs suivantes :
   - **Project URL** : `https://[VOTRE_PROJECT_ID].supabase.co`
   - **service_role key** : (⚠️ Ne la partagez jamais publiquement !)

## ✅ Étape 4 : Configurer les variables d'environnement

Ajoutez dans votre `.env.local` :

```env
# Supabase Storage (pour l'upload des vidéos)
NEXT_PUBLIC_SUPABASE_URL=https://[VOTRE_PROJECT_ID].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[VOTRE_SERVICE_ROLE_KEY]
```

⚠️ **Important** : 
- Remplacez `[VOTRE_PROJECT_ID]` par votre vrai Project ID
- Remplacez `[VOTRE_SERVICE_ROLE_KEY]` par votre vraie service_role key
- Ne commitez jamais `.env.local` ! Il est déjà dans `.gitignore`

## ✅ Étape 5 : Uploader les vidéos

Une fois les variables configurées, exécutez :

```bash
npx tsx scripts/upload-videos-to-supabase.ts
```

Le script va :
- ✅ Vérifier que le bucket existe
- ✅ Uploader toutes les vidéos dans `public/videos/`
- ✅ Afficher les URLs publiques de chaque vidéo

**Note** : L'upload peut prendre du temps (certaines vidéos font 380 MB). Comptez plusieurs minutes par vidéo.

## ✅ Étape 6 : Mettre à jour les URLs dans la base de données

Après l'upload, mettez à jour les URLs :

```bash
npx tsx scripts/update-video-urls-in-db.ts
```

Le script va :
- ✅ Récupérer toutes les vidéos de la base de données
- ✅ Mettre à jour les URLs pour pointer vers Supabase Storage
- ✅ Afficher un résumé des mises à jour

## ✅ Étape 7 : Ajouter les variables dans Vercel

Pour que ça fonctionne en production :

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez :
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://[VOTRE_PROJECT_ID].supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `[VOTRE_SERVICE_ROLE_KEY]`
5. Cliquez sur **"Save"**
6. Redéployez votre application

## ✅ Étape 8 : Tester

1. Redéployez sur Vercel (ou testez en local avec `npm run dev`)
2. Allez sur la page `/videos`
3. Cliquez sur play sur une vidéo
4. La vidéo devrait se charger depuis Supabase Storage ! 🎉

## Dépannage

### Erreur : "Bucket not found"
→ Vérifiez que le bucket `videos` existe et est public

### Erreur : "Invalid API key"
→ Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est correct dans `.env.local`

### Erreur : "File size limit exceeded"
→ Vérifiez que vous avez bien augmenté la limite globale à 500 MB

### Les vidéos ne se chargent pas
→ Vérifiez que le bucket est **public** dans les paramètres Supabase

