import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import supabase from '@/supabaseClient'; 
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

        const { data: users, error } = await supabase
          .from('User')
          .select('id, firstname, lastname, email, password, isAdmin')
          .eq('email', credentials.email);

        if (error) {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          return null;
        }

        if (!users || users.length === 0) {
          return null;
        }

        const user = users[0];

        const passwordsMatch = await compare(credentials.password, user.password);
        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isAdmin: user.isAdmin,
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
    async jwt({ token, user }: { token: JWT & { isAdmin?: boolean }, user?: User }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      }
      return token;
    },  

    async session({ session, token }: { session: Session & { user: { isAdmin?: boolean } }, token: JWT & { isAdmin?: boolean } }) {
      session.user.id = token.id as string;
      session.user.firstname = token.firstname as string;
      session.user.lastname = token.lastname as string;
      session.user.email = token.email as string;
      session.user.isAdmin = token.isAdmin as boolean;

      return session;
    },
  },
};
