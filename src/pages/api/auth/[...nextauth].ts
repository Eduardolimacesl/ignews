import { query as q } from 'faunadb';
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { fauna } from '../../../services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  // ...add more providers here. exemple: google.
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await fauna.query(
        q.Create(
          q.Collection('users'),
          { data: {email}}
        )
      )      
      return true
    },
  }
})