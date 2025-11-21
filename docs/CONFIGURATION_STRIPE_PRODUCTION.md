# Configuration Stripe en Production

## ✅ Votre situation actuelle

Vous utilisez des **clés Stripe LIVE (production)** dans Vercel :
- `STRIPE_SECRET_KEY` = `sk_live_...` ✅
- Cela signifie que vous êtes en **mode production**

## ⚠️ Points importants en production

### 1. Webhook Stripe en production

**CRITIQUE** : Le webhook doit être configuré avec l'URL de production.

1. **Stripe Dashboard** → Basculez en mode **"Live"** (pas "Test")
2. **Developers** → **Webhooks**
3. Vérifiez que vous avez un webhook avec :
   - **Endpoint URL** : `https://slimabida.fr/api/stripe/webhook` (si le domaine est configuré)
   - OU : `https://votre-site.vercel.app/api/stripe/webhook`
   - **Events** : `checkout.session.completed` doit être sélectionné
4. **Récupérez le Signing secret** (commence par `whsec_`)
5. **Vérifiez dans Vercel** que `STRIPE_WEBHOOK_SECRET` correspond au secret du webhook **LIVE**

### 2. Variable NEXT_PUBLIC_SITE_URL

**IMPORTANT** : Cette variable doit pointer vers votre domaine de production.

Dans Vercel → Settings → Environment Variables :

- ✅ **Production** : `https://slimabida.fr` (si le domaine est configuré)
- ✅ **OU** : `https://votre-site.vercel.app` (URL Vercel)

Cette URL est utilisée pour :
- Les redirections après paiement (`success_url` et `cancel_url`)
- Les liens dans les emails

### 3. Vérification des variables dans Vercel

Vérifiez que toutes ces variables sont définies pour **Production** :

- ✅ `STRIPE_SECRET_KEY` = `sk_live_...` (clé de production)
- ✅ `STRIPE_WEBHOOK_SECRET` = `whsec_...` (secret du webhook LIVE)
- ✅ `NEXT_PUBLIC_SITE_URL` = `https://slimabida.fr` (ou votre URL)
- ✅ `RESEND_API_KEY` = `re_...`
- ✅ `RESEND_FROM_EMAIL` = `noreply@slimabida.fr` (ou votre email vérifié)

### 4. Test en production

⚠️ **ATTENTION** : En production, les paiements sont **réels** !

**Pour tester sans risquer de payer :**
1. Utilisez le **mode Test** de Stripe d'abord
2. Basculez en **mode Live** seulement quand tout fonctionne
3. Ou testez avec un **petit montant** en production

**Cartes de test Stripe (mode Test uniquement) :**
- Ces cartes ne fonctionnent **QUE** avec `sk_test_...`
- En production avec `sk_live_...`, vous devez utiliser de **vraies cartes**

## 🔧 Checklist avant de passer en production

- [ ] `STRIPE_SECRET_KEY` = clé LIVE (`sk_live_...`)
- [ ] `STRIPE_WEBHOOK_SECRET` = secret du webhook LIVE
- [ ] Webhook configuré dans Stripe Dashboard (mode Live)
- [ ] `NEXT_PUBLIC_SITE_URL` = URL de production
- [ ] `RESEND_API_KEY` définie
- [ ] `RESEND_FROM_EMAIL` vérifié dans Resend
- [ ] Domaine `slimabida.fr` vérifié dans Resend (si utilisé)
- [ ] Test effectué avec succès (mode test ou petit montant)

## 🧪 Tester en production (sécurisé)

### Option 1 : Tester avec un petit montant

1. Créez un produit de test avec un prix très bas (ex: 0,50€)
2. Testez le paiement avec une vraie carte
3. Vérifiez que :
   - ✅ Le paiement passe
   - ✅ L'email de confirmation est reçu
   - ✅ La commande est mise à jour dans la base de données

### Option 2 : Utiliser Stripe Test Mode d'abord

1. **Stripe Dashboard** → Basculez en mode **"Test"**
2. **Récupérez les clés de test** :
   - `sk_test_...` pour `STRIPE_SECRET_KEY`
   - Créez un webhook de test
   - Récupérez le `STRIPE_WEBHOOK_SECRET` de test
3. **Mettez à jour dans Vercel** avec les clés de test
4. **Testez** avec les cartes de test Stripe
5. **Une fois que tout fonctionne**, repassez en mode Live

## 📧 Vérification des emails

Après un paiement en production :

1. **Vérifiez votre boîte email** (celle utilisée dans le formulaire)
2. Vous devriez recevoir un email de confirmation avec :
   - Détails de la commande
   - Produits achetés
   - Montant total
3. **Vérifiez les logs Vercel** pour voir si l'email a été envoyé

## 🔍 Diagnostic si problème

### Erreur 500 sur checkout

1. **Vérifiez les logs Vercel** → Deployments → Logs
2. Cherchez les messages d'erreur
3. Vérifiez que :
   - ✅ `STRIPE_SECRET_KEY` est bien `sk_live_...`
   - ✅ La connexion à la base de données fonctionne
   - ✅ Le produit existe dans la DB

### Webhook non reçu

1. **Stripe Dashboard** → Webhooks → Votre webhook
2. Vérifiez les **"Recent events"**
3. Si vous voyez des erreurs, vérifiez :
   - ✅ L'URL du webhook est correcte
   - ✅ `STRIPE_WEBHOOK_SECRET` correspond au secret du webhook LIVE
   - ✅ Le webhook est en mode **Live** (pas Test)

### Email non reçu

1. **Vérifiez les logs Vercel** pour voir si l'email a été envoyé
2. **Vérifiez les spams**
3. **Vérifiez que `RESEND_API_KEY` est définie**
4. **Vérifiez que `RESEND_FROM_EMAIL` est vérifié** dans Resend

## 🎯 Résumé

- ✅ Vous utilisez les clés LIVE → Mode production
- ⚠️ Les paiements sont **réels** → Testez avec précaution
- ✅ Vérifiez que le webhook est configuré en mode Live
- ✅ Vérifiez que `NEXT_PUBLIC_SITE_URL` pointe vers votre domaine de production
