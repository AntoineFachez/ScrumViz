import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';

import { auth } from '@/firebase/firebase';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     redirect_uri: `${process.env.NEXTAUTH_URI}/api/auth/callback/google`,
      //   },
      // },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // authorization: {
      //   params: {
      //     redirect_uri: `${process.env.NEXTAUTH_URI}/api/auth/callback/github`,
      //   },
      // },
    }),
  ],
  // // adapter: FirestoreAdapter(auth),
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === new URL(baseUrl).origin) return url;
      return baseUrl;
    },
  },
  // adapter: FirestoreAdapter(auth),

  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async session({ session, user }) {
  //     session.user.userId = user.id;
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
