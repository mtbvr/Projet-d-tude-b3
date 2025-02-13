// src/types/next-auth.d.ts
import { User as NextAuthUser, Session as NextAuthSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
  }

  interface Session extends NextAuthSession {
    user: User;
  }
}
