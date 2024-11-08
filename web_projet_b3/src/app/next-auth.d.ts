// src/types/next-auth.d.ts
import { User as NextAuthUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    firstname: string;
    lastname: string;
  }

  interface Session {
    user: User;
  }
}
