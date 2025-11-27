// Imports necessaires //
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";

// Configuration de NextAuth //
const authOptions = {
  // 1. Les providers ( méthodes d'authetification )
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      // Cette fonction est appelé quand quelqu'un essaie de se connecter //
      async authorize(credentials) {
        // On vérifie que l'email et password sont fournis //
        if (!credentials?.email || !credentials?.password) {
          // Retourner null au lieu de throw (bonne pratique NextAuth)
          return null;
        }
        try {
          // Se connecter à MongoDB //
          const client = await clientPromise;
          const db = client.db("slimabida-auth");
          const usersCollection = db.collection("users");

          // Cherche l'utillisateur par email //
          const email = credentials.email as string;
          const user = await usersCollection.findOne({
            email: email.toLowerCase(),
          });

          // Si user n'existe pas //
          if (!user) {
            return null; // Retourner null au lieu de throw
          }

          // Vérifie mot de passe avec bcrypt //
          const password = credentials.password as string;
          const isPasswordValid = await compare(password, user.password);

          // Si le mot de passe est incorrect //
          if (!isPasswordValid) {
            return null; 
          }

          // Si tout est Ok , on retourne les infos de l'utilisateur //
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name, // name est obligatoire dans MongoDB
            image: user.image || null,
            role: user.role || "user",
          };
        } catch (error) {
          // En cas d'erreur serveur (MongoDB, etc.), logger et retourner null
          console.error("Erreur lors de l'authentification:", error);
          return null;
        }
      },
    }),
  ],
  // ============================================
  // 2. CALLBACKS - Personnaliser la session
  // ============================================
  callbacks: {
    // Callback jwt - Modifie le token JWT
    // Appelé quand un JWT est créé ou mis à jour
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user: any }) {
      // Lors de la première connexion, "user" contient les infos
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    // Callback session - Modifie la session retournée
    // Appelé chaque fois qu'on récupère la session
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      // Ajouter les infos du token à la session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },

  // ============================================
  // 3. PAGES - Pages personnalisées
  // ============================================
  pages: {
    signIn: "/login", // Redirige vers /login au lieu de la page par défaut
  },

  // ============================================
  // 4. SESSION - Configuration de la session
  // ============================================
  session: {
    strategy: "jwt" as const, // Utiliser JWT (token) au lieu de stocker en DB
    maxAge: 30 * 24 * 60 * 60, // Session valide 30 jours (en secondes)
  },

  // ============================================
  // 5. SECRET - Secret pour signer les JWT
  // ============================================
  secret: process.env.NEXTAUTH_SECRET,
};

// Créer NextAuth avec notre configuration
// NextAuth v5 retourne un objet avec handlers, auth, signIn, signOut
const { handlers, auth } = NextAuth(authOptions);

// Exporter les handlers GET et POST
// Next.js utilisera ces handlers pour toutes les routes /api/auth/*
export const { GET, POST } = handlers;

// Exporter auth pour l'utiliser dans les API routes
export { auth };
