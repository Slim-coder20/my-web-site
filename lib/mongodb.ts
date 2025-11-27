// ============================================
// Configuration MongoDB avec pattern Singleton
// ============================================
// Ce pattern garantit qu'une seule connexion MongoDB est créée et réutilisée
// en développement (évite les connexions multiples lors du hot-reload)
// et en production (optimisé pour les fonctions serverless)

import { MongoClient } from "mongodb";

// 1. Vérification de la variable d'environnement MONGODB_URI
// Cette variable doit être définie dans votre fichier .env.local
if (!process.env.MONGODB_URI) {
  throw new Error(
    "Veuillez ajouter votre MongoDB URI dans le fichier .env.local"
  );
}

// 2. Récupération de l'URI de connexion
const uri: string = process.env.MONGODB_URI;

// Options de connexion MongoDB (vide pour utiliser les options par défaut)
const options = {};

// 3. Déclaration des variables pour le pattern Singleton
// - client : instance du client MongoDB
// - clientPromise : Promise qui résout vers le client connecté
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// 4. Déclaration d'une variable globale TypeScript
// Cette variable permet de stocker la connexion en développement
// et de la réutiliser lors des hot-reloads de Next.js
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// 5. Pattern Singleton adapté pour Next.js
if (process.env.NODE_ENV === "development") {
  // EN DÉVELOPPEMENT :
  // - Next.js fait des hot-reloads qui peuvent créer plusieurs instances
  // - On utilise une variable globale pour réutiliser la même connexion
  if (!global._mongoClientPromise) {
    // Première fois : créer le client et initialiser la connexion
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  // Réutiliser la Promise de connexion existante
  clientPromise = global._mongoClientPromise;
} else {
  // EN PRODUCTION :
  // - Pas de hot-reload, donc pas besoin de variable globale
  // - Créer directement une nouvelle connexion
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// 6. Export de la Promise de connexion
// On exporte la Promise, pas le client directement
// Car la connexion est asynchrone (client.connect() retourne une Promise)
// Quand vous utiliserez ce module, vous devrez faire : await clientPromise
export default clientPromise;
