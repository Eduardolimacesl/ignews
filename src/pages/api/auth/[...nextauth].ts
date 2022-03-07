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
    async signIn({ user, account, profile }) {
      
      try { 
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { 
                user:user.id,
                email:user.email 
              }}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )     
          )
          
        )      
        
        return true

      } catch {

        return false
      }
    },
  }
})