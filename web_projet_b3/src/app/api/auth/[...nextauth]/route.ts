import NextAuth from "next-auth";
import { authOptions } from "../authOptions"; // Importer la configuration de NextAuth

// Créer un handler pour NextAuth avec les options
const handler = NextAuth(authOptions);

// Exporter les méthodes HTTP GET et POST
export { handler as GET, handler as POST };
