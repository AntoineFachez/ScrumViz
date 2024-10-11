import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { auth } from '@/firebase/firebase'; // Import your Firebase auth instance

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,

      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET,
    }),
  ],

  adapter: FirebaseAdapter(auth), // Use the Firebase adapter

  // ... other NextAuth.js options (callbacks, etc.)
};

export default NextAuth(authOptions);
