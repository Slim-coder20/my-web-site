import "next-auth";
import "next-auth/jwt";

// Ce fichier dit à Type script : "La seession a aussi un 'role ' et un 'id'"
// on étend le module next-auth pour ajouter nos propres propriétés//

declare module "next-auth" {
  // on redéfinit ce qu'est une session
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string | null;
      role: "user" | "admin";
    };
  }

  // On redéfinit ce qu'est un user //
  interface User {
    id: string;
    email: string;
    name: string;
    image: string | null;
    role: "user" | "admin";
  }
}
// On étend aussi le JWT (le token)
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role:"user"|"admin";
    email:string; 
  }
}
