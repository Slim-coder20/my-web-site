# Explication : Pourquoi `?pgbouncer=true` dans la connection string

## 🔍 Qu'est-ce que pgbouncer ?

**pgbouncer** est un **pooler de connexions** PostgreSQL. C'est un intermédiaire entre votre application et la base de données PostgreSQL qui :
- Gère un pool de connexions réutilisables
- Optimise les performances
- Réduit le nombre de connexions simultanées à la base de données

## 🎯 Pourquoi `?pgbouncer=true` ?

Le paramètre `?pgbouncer=true` dans la connection string indique à Prisma (et au driver PostgreSQL) que vous utilisez pgbouncer comme pooler.

### Problème sans `?pgbouncer=true`

Sans ce paramètre, Prisma essaie d'utiliser des **prepared statements** (requêtes préparées) qui sont optimisées pour des connexions directes. Mais avec pgbouncer :
- Les prepared statements ne sont **pas bien supportés**
- Cela cause l'erreur : `prepared statement "s0" already exists`
- Les connexions peuvent se bloquer

### Solution avec `?pgbouncer=true`

Avec ce paramètre :
- Prisma **désactive** les prepared statements
- Utilise des requêtes **directes** compatibles avec pgbouncer
- Évite les erreurs de prepared statements
- Fonctionne correctement avec le pooler Supabase

## 📝 Format de la connection string

### Avec pooler de transactions (port 6543) - RECOMMANDÉ

```
postgresql://postgres.tjpfeljjzwunypngtmfj:password@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Points importants :**
- Port **6543** = Pooler de transactions
- `?pgbouncer=true` = Indique à Prisma d'utiliser le mode compatible pgbouncer

### Sans `?pgbouncer=true` (PROBLÈME)

```
postgresql://postgres.tjpfeljjzwunypngtmfj:password@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
```

**Résultat :** Erreur `prepared statement already exists` ❌

## ✅ Comment corriger dans Vercel

1. **Vercel Dashboard** → Settings → Environment Variables
2. Trouvez `DATABASE_URL`
3. **Ajoutez `?pgbouncer=true` à la fin** de la connection string

**Exemple :**
- **Avant** : `postgresql://...@pooler.supabase.com:6543/postgres`
- **Après** : `postgresql://...@pooler.supabase.com:6543/postgres?pgbouncer=true`

4. **Sauvegardez**
5. **Redéployez** (sans cache de préférence)

## 🔍 Vérification

Après avoir ajouté `?pgbouncer=true`, l'erreur `prepared statement already exists` devrait disparaître.

## 📚 Référence technique

- **pgbouncer** : Pooler de connexions PostgreSQL
- **Prepared statements** : Requêtes SQL précompilées pour performance
- **Transaction mode** : Mode du pooler qui réutilise les connexions entre transactions
- **Prisma** : ORM qui doit être configuré pour fonctionner avec pgbouncer

## ⚠️ Note importante

- `?pgbouncer=true` est **nécessaire** pour le pooler de transactions (port 6543)
- **Optionnel** pour le pooler de sessions (port 5432), mais recommandé
- **Pas nécessaire** pour la connection directe (port 5432 sans pooler)

