# Comment obtenir la SUPABASE_SERVICE_ROLE_KEY

## Étape 1 : Aller dans les paramètres API

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Dans le menu de gauche, cliquez sur **Settings** (⚙️)
4. Cliquez sur **API** dans le menu des paramètres

## Étape 2 : Trouver la service_role key

Dans la page **Settings → API**, vous verrez plusieurs sections :

### Section "Project API keys"

Vous verrez plusieurs clés :

1. **anon public** (clé publique, peut être exposée côté client)

   - ⚠️ Ne pas utiliser pour les scripts d'upload

2. **service_role secret** (clé secrète, NE JAMAIS exposer publiquement)
   - ✅ **C'est celle-ci qu'il faut utiliser !**
   - Cette clé a tous les droits (bypass RLS)
   - Parfaite pour les scripts d'upload et les opérations admin

### Comment la copier

1. Trouvez la section **"service_role"** (généralement en bas de la page)
2. Cliquez sur l'icône **👁️** (œil) ou **"Reveal"** pour afficher la clé
3. Cliquez sur l'icône **📋** (copier) pour copier la clé
4. Collez-la dans votre `.env.local`

## Format de la clé

La clé ressemble à quelque chose comme :

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqcGZlbGpqend1bnlwbmcdG1maiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2OTk...
```

C'est une très longue chaîne de caractères (JWT token).

## ⚠️ Sécurité IMPORTANTE

- ❌ **NE JAMAIS** commiter cette clé dans Git
- ❌ **NE JAMAIS** la partager publiquement
- ❌ **NE JAMAIS** l'exposer côté client (dans le code frontend)
- ✅ **UNIQUEMENT** dans `.env.local` (qui est dans `.gitignore`)
- ✅ **UNIQUEMENT** dans les variables d'environnement Vercel (protégées)

## Où l'utiliser

- ✅ Scripts d'upload (`upload-videos-to-supabase.ts`)
- ✅ Scripts de migration (`update-video-urls-in-db.ts`)
- ✅ Variables d'environnement Vercel (pour la production)
- ❌ Jamais dans le code frontend/public

## Si vous ne trouvez pas la clé

1. Vérifiez que vous êtes bien dans **Settings → API**
2. Faites défiler vers le bas de la page
3. La section "service_role" peut être en bas
4. Si vous ne la voyez pas, vous devrez peut-être cliquer sur "Reveal" ou "Show"
