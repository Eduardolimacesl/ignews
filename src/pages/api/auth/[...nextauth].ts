import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

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
    async signIn(user, account, profile) {
      console.log(user);
      return true;
    }
  }
})