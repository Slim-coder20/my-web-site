-- Script SQL pour corriger la séquence d'auto-incrémentation de la table Concert
-- 
-- Problème : La séquence PostgreSQL est désynchronisée, causant une erreur
-- "Unique constraint failed on the fields: (`id`)" lors de la création
--
-- Solution : Réinitialiser la séquence pour qu'elle commence après le plus grand ID existant
--
-- À exécuter dans Supabase SQL Editor ou via psql

-- Réinitialise la séquence pour la table Concert
-- Cela garantit que le prochain ID sera supérieur au plus grand ID existant
SELECT setval(
  pg_get_serial_sequence('"Concert"', 'id'),
  COALESCE((SELECT MAX(id) FROM "Concert"), 0) + 1,
  false
);

-- Vérification : Affiche la valeur actuelle de la séquence
SELECT currval(pg_get_serial_sequence('"Concert"', 'id')) AS current_sequence_value;

