# Résolution : Erreur "Exceeds global limit of 50 MB"

## Problème

Même après avoir passé au plan Pro, vous voyez toujours l'erreur :
> "Exceeds global limit of 50 MB. Increase limit in Storage Settings first."

## Solution : Augmenter la limite globale AVANT de créer le bucket

### Étape 1 : Aller dans les paramètres Storage globaux

1. Dans Supabase Dashboard, cliquez sur **Settings** (⚙️) dans le menu de gauche
2. Cliquez sur **Storage** dans le menu des paramètres
3. **Ne créez PAS encore le bucket !**

### Étape 2 : Trouver et augmenter la limite globale

1. Dans la page **Settings → Storage**, cherchez la section :
   - **"File size limit"** ou
   - **"Max file size"** ou
   - **"Global file size limit"**

2. Vous devriez voir une valeur actuelle de **50 MB**

3. **Augmentez cette valeur à 500 MB** (ou plus)

4. Cliquez sur **"Save"** ou **"Update"**

### Étape 3 : Vérifier que la limite a été mise à jour

1. Rechargez la page si nécessaire
2. Vérifiez que la limite globale affiche maintenant **500 MB** (ou la valeur que vous avez mise)

### Étape 4 : Maintenant créer le bucket

1. Allez dans **Storage** → **Buckets**
2. Cliquez sur **"New bucket"**
3. Configurez :
   - **Name** : `videos`
   - **Public bucket** : ✅ **Activé**
   - **File size limit** : `500` MB
   - Cette fois, l'erreur ne devrait plus apparaître !

## Si vous ne trouvez pas la limite globale

### Option A : Chercher dans différents endroits

La limite globale peut être dans :
- **Settings** → **Storage** → **File size limit**
- **Settings** → **General** → **Storage settings**
- **Project Settings** → **Storage**

### Option B : Vérifier que le plan Pro est bien activé

1. Allez dans **Settings** → **Billing**
2. Vérifiez que vous voyez **"Pro Plan"** ou **"Pro"**
3. Si vous voyez encore "Free" ou "Hobby", l'upgrade n'est peut-être pas encore effectif
4. Attendez quelques minutes et réessayez

### Option C : Contacter le support Supabase

Si vous ne trouvez toujours pas l'option pour augmenter la limite :
1. Vérifiez que vous êtes bien sur le plan Pro
2. Contactez le support Supabase via le chat en bas à droite
3. Ils pourront vous aider à activer la limite

## Note importante

L'ordre est crucial :
1. ✅ **D'abord** : Augmenter la limite globale dans Settings → Storage
2. ✅ **Ensuite** : Créer le bucket avec la limite de 500 MB

Si vous créez le bucket avant d'augmenter la limite globale, vous aurez toujours l'erreur.

