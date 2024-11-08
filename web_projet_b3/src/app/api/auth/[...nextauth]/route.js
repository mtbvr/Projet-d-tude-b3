import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { sql } from "@vercel/postgres"; 

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const result = await sql`
          SELECT id, firstname, lastname, email, password FROM "User" WHERE email = ${credentials.email};
        `;
        
        if (result.rowCount === 0) {
          return null; 
        }
        const user = result.rows[0];

        const passwordsMatch = await compare(credentials.password, user.password);
        if (!passwordsMatch) {
          return null; 
        }
        return {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', 
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ session, token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.user.email = token.email;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
