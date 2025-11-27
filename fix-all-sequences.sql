-- Script SQL pour corriger les séquences d'auto-incrémentation de toutes les tables
-- 
-- Problème : Les séquences PostgreSQL sont désynchronisées, causant des erreurs
-- "Unique constraint failed on the fields: (`id`)" lors de la création
--
-- Solution : Réinitialiser les séquences pour qu'elles commencent après le plus grand ID existant
--
-- À exécuter dans Supabase SQL Editor ou via psql

-- ===== TABLE CONCERT =====
-- Réinitialise la séquence pour la table Concert
SELECT setval(
  pg_get_serial_sequence('"Concert"', 'id'),
  COALESCE((SELECT MAX(id) FROM "Concert"), 0) + 1,
  false
) AS concert_sequence_fixed;

-- ===== TABLE PRODUCT (Albums) =====
-- Réinitialise la séquence pour la table Product
SELECT setval(
  pg_get_serial_sequence('"Product"', 'id'),
  COALESCE((SELECT MAX(id) FROM "Product"), 0) + 1,
  false
) AS product_sequence_fixed;

-- ===== TABLE VIDEO =====
-- Réinitialise la séquence pour la table Video
SELECT setval(
  pg_get_serial_sequence('"Video"', 'id'),
  COALESCE((SELECT MAX(id) FROM "Video"), 0) + 1,
  false
) AS video_sequence_fixed;

-- ===== TABLE ORDER =====
-- Réinitialise la séquence pour la table Order
SELECT setval(
  pg_get_serial_sequence('"Order"', 'id'),
  COALESCE((SELECT MAX(id) FROM "Order"), 0) + 1,
  false
) AS order_sequence_fixed;

-- ===== TABLE ORDERITEM =====
-- Réinitialise la séquence pour la table OrderItem
SELECT setval(
  pg_get_serial_sequence('"OrderItem"', 'id'),
  COALESCE((SELECT MAX(id) FROM "OrderItem"), 0) + 1,
  false
) AS orderitem_sequence_fixed;

-- ===== VÉRIFICATION =====
-- Affiche les valeurs actuelles des séquences et les IDs max pour vérification
SELECT 
  'Concert' AS table_name,
  currval(pg_get_serial_sequence('"Concert"', 'id')) AS current_sequence_value,
  (SELECT MAX(id) FROM "Concert") AS max_id
UNION ALL
SELECT 
  'Product' AS table_name,
  currval(pg_get_serial_sequence('"Product"', 'id')) AS current_sequence_value,
  (SELECT MAX(id) FROM "Product") AS max_id
UNION ALL
SELECT 
  'Video' AS table_name,
  currval(pg_get_serial_sequence('"Video"', 'id')) AS current_sequence_value,
  (SELECT MAX(id) FROM "Video") AS max_id
UNION ALL
SELECT 
  'Order' AS table_name,
  currval(pg_get_serial_sequence('"Order"', 'id')) AS current_sequence_value,
  (SELECT MAX(id) FROM "Order") AS max_id
UNION ALL
SELECT 
  'OrderItem' AS table_name,
  currval(pg_get_serial_sequence('"OrderItem"', 'id')) AS current_sequence_value,
  (SELECT MAX(id) FROM "OrderItem") AS max_id;

