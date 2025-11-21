# 🚀 Démarrage Rapide : Migration vers Supabase Storage

## Prérequis : Plan Pro Supabase

⚠️ **Important** : Pour uploader des vidéos de plus de 50 MB, vous devez avoir le **plan Pro** de Supabase ($25/mois).

Si vous n'avez pas encore le plan Pro :
1. Consultez `docs/PASSER_PLAN_PRO_SUPABASE.md` pour les instructions
2. Une fois le plan Pro activé, revenez ici

## Étape 1 : Augmenter la limite globale de fichier (IMPORTANT !)

⚠️ **Avant de créer le bucket**, il faut augmenter la limite globale :

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Settings** (⚙️) → **Storage**
4. Trouvez **"File size limit"** ou **"Max file size"**
5. Augmentez à **500 MB** (ou plus)
6. Cliquez sur **"Save"**

**Note** : Si vous êtes sur le plan gratuit et ne pouvez pas augmenter au-delà de 50 MB :
- Option A : Passer au plan Pro Supabase ($25/mois)
- Option B : Compresser les vidéos pour qu'elles soient sous 50 MB
- Option C : Utiliser un autre service (Cloudinary, AWS S3)

## Étape 2 : Créer le bucket dans Supabase (5 minutes)

1. Allez dans **Storage** → **Buckets**
2. Cliquez sur **"New bucket"**
3. Configurez :
   - **Name** : `videos`
   - **Public bucket** : ✅ **Activé** (très important !)
   - **File size limit** : `500` (MB) - maintenant possible après l'étape 1
   - **Allowed MIME types** : `video/mp4` (optionnel)
4. Cliquez sur **"Create bucket"**

## Étape 2 : Obtenir la clé API Supabase

1. Dans Supabase, allez dans **Settings** → **API**
2. Copiez :
   - **Project URL** (ex: `https://tjpfeljjzwunypngtmfj.supabase.co`)
   - **service_role key** (⚠️ Ne la partagez jamais publiquement !)

## Étape 3 : Configurer les variables d'environnement

Ajoutez dans votre `.env.local` :

```env
# Supabase Storage (pour l'upload des vidéos)
NEXT_PUBLIC_SUPABASE_URL=https://[VOTRE_PROJECT_ID].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[VOTRE_SERVICE_ROLE_KEY]
```

⚠️ **Important** : Ne commitez jamais `.env.local` ! Il est déjà dans `.gitignore`.

## Étape 4 : Installer les dépendances

```bash
npm install
```

## Étape 5 : Uploader les vidéos (Option A - Script automatique)

```bash
npx tsx scripts/upload-videos-to-supabase.ts
```

Le script va :
- ✅ Vérifier que le bucket existe
- ✅ Uploader toutes les vidéos dans `public/videos/`
- ✅ Afficher les URLs publiques de chaque vidéo

**Note** : L'upload peut prendre du temps (certaines vidéos font 380 MB).

## Étape 5 : Uploader les vidéos (Option B - Interface Supabase)

Si vous préférez uploader manuellement :

1. Dans Supabase Storage, ouvrez le bucket `videos`
2. Cliquez sur **"Upload file"**
3. Sélectionnez une vidéo à la fois
4. Répétez pour chaque vidéo

## Étape 6 : Mettre à jour les URLs dans la base de données

Après avoir uploadé les vidéos, mettez à jour les URLs :

```bash
npx tsx scripts/update-video-urls-in-db.ts
```

Le script va :
- ✅ Récupérer toutes les vidéos de la base de données
- ✅ Mettre à jour les URLs pour pointer vers Supabase Storage
- ✅ Afficher un résumé des mises à jour

## Étape 7 : Tester

1. Redéployez sur Vercel (ou testez en local avec `npm run dev`)
2. Allez sur la page `/videos`
3. Cliquez sur play sur une vidéo
4. La vidéo devrait se charger depuis Supabase Storage ! 🎉

## Dépannage

### Erreur : "Bucket not found"
→ Vérifiez que le bucket `videos` existe et est public

### Erreur : "Invalid API key"
→ Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est correct dans `.env.local`

### Les vidéos ne se chargent pas
→ Vérifiez que le bucket est **public** dans les paramètres Supabase

### Upload très lent
→ C'est normal pour des fichiers volumineux. L'upload peut prendre plusieurs minutes par vidéo.

## URLs générées

Les URLs seront au format :
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/videos/[NOM_FICHIER]
```

Exemple :
```
https://tjpfeljjzwunypngtmfj.supabase.co/storage/v1/object/public/videos/butterfly-video.mp4
```

## Prochaines étapes

Une fois la migration terminée :
- ✅ Les vidéos seront servies depuis Supabase Storage
- ✅ Pas de limite de taille (contrairement à Vercel)
- ✅ CDN inclus pour un chargement rapide
- ✅ Vous pouvez supprimer les vidéos du dossier `public/videos/` (optionnel)

