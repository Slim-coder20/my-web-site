# Suite après avoir créé le bucket "videos"

## ✅ Étape 1 : Vérifier que le bucket est créé

1. Allez dans **Storage** → **Buckets**
2. Vous devriez voir le bucket **"videos"** dans la liste
3. Vérifiez qu'il est marqué comme **"Public"**

## ✅ Étape 2 : Obtenir les clés API Supabase

1. Allez dans **Settings** → **API**
2. Copiez les valeurs suivantes :
   - **Project URL** : `https://[VOTRE_PROJECT_ID].supabase.co`
     - Exemple : `https://tjpfeljjzwunypngtmfj.supabase.co`
   - **service_role key** : (⚠️ Ne la partagez jamais publiquement !)
     - C'est la clé secrète, gardez-la privée

## ✅ Étape 3 : Configurer les variables d'environnement locales

1. Ouvrez votre fichier `.env.local` à la racine du projet
2. Ajoutez ces lignes (remplacez les valeurs entre crochets) :

```env
# Supabase Storage (pour l'upload des vidéos)
NEXT_PUBLIC_SUPABASE_URL=https://[VOTRE_PROJECT_ID].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[VOTRE_SERVICE_ROLE_KEY]
```

**Exemple concret** :
```env
NEXT_PUBLIC_SUPABASE_URL=https://tjpfeljjzwunypngtmfj.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important** : 
- Ne commitez JAMAIS ce fichier (il est déjà dans `.gitignore`)
- Ne partagez JAMAIS la `SUPABASE_SERVICE_ROLE_KEY` publiquement

## ✅ Étape 4 : Uploader les vidéos (Script automatique)

Une fois les variables configurées, exécutez :

```bash
npx tsx scripts/upload-videos-to-supabase.ts
```

Le script va :
- ✅ Vérifier que le bucket `videos` existe
- ✅ Uploader toutes les vidéos dans `public/videos/`
- ✅ Afficher les URLs publiques de chaque vidéo

**Note** : 
- L'upload peut prendre du temps (certaines vidéos font 380 MB)
- Comptez plusieurs minutes par vidéo
- Le script affiche la progression

## ✅ Étape 5 : Mettre à jour les URLs dans la base de données

Après l'upload réussi, mettez à jour les URLs :

```bash
npx tsx scripts/update-video-urls-in-db.ts
```

Le script va :
- ✅ Récupérer toutes les vidéos de la base de données
- ✅ Mettre à jour les URLs pour pointer vers Supabase Storage
- ✅ Afficher un résumé des mises à jour

## ✅ Étape 6 : Ajouter les variables dans Vercel (Production)

Pour que ça fonctionne en production sur Vercel :

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `my-web-site`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les deux variables :
   - **Name** : `NEXT_PUBLIC_SUPABASE_URL`
     - **Value** : `https://[VOTRE_PROJECT_ID].supabase.co`
   - **Name** : `SUPABASE_SERVICE_ROLE_KEY`
     - **Value** : `[VOTRE_SERVICE_ROLE_KEY]`
5. Sélectionnez **"Production"**, **"Preview"**, et **"Development"** pour chaque variable
6. Cliquez sur **"Save"** pour chaque variable
7. **Redéployez** votre application (Vercel le fera automatiquement ou cliquez sur "Redeploy")

## ✅ Étape 7 : Tester

1. Attendez que Vercel redéploie (2-5 minutes)
2. Allez sur votre site : `https://slimabida.fr/videos` (ou votre URL Vercel)
3. Cliquez sur play sur une vidéo
4. La vidéo devrait se charger depuis Supabase Storage ! 🎉

## Dépannage

### Erreur : "Bucket not found"
→ Vérifiez que le bucket `videos` existe et est public dans Supabase

### Erreur : "Invalid API key"
→ Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est correct dans `.env.local`

### Erreur : "File size limit exceeded"
→ Vérifiez que la limite globale est bien à 500 MB dans Settings → Storage

### Les vidéos ne se chargent pas en production
→ Vérifiez que les variables d'environnement sont bien configurées dans Vercel

### Upload très lent
→ C'est normal pour des fichiers volumineux. L'upload peut prendre plusieurs minutes par vidéo.

