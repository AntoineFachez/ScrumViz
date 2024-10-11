import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { auth } from '../../../firebase/firebase';

console.log(FirebaseAdapter, auth);

export const authOptions = {
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
};

export default NextAuth(authOptions);
