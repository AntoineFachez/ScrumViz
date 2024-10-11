import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { auth } from '../../../firebase/firebase'; // Import your Firebase auth instance

console.log(FirebaseAdapter, auth);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // adapter: FirebaseAdapter(auth), // Use the Firebase adapter
  // ... other NextAuth.js options (callbacks, etc.)
};

export default NextAuth(authOptions);
