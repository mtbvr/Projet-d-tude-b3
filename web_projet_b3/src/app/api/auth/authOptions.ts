import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { sql } from "@vercel/postgres";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
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
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: User }) {
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

    async session({ session, token }: { session: Session, token: JWT }) {
      session.user.id = token.id as string;
      session.user.firstname = token.firstname as string;
      session.user.lastname = token.lastname as string;
      session.user.email = token.email as string;
      return session;
    },
  },
};
