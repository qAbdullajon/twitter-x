import { AuthOptions } from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from './mongoose';
import User from '@/database/user.model';
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectToDatabase()
        const user = User.findOne({ email: credentials?.email })
        return user
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user }: any) {
      await connectToDatabase()

      const isExistingUser = await User.findOne({ email: user?.email })

      if (!isExistingUser) {
        const newUser = await User.create({
          email: user?.email,
          name: user?.name,
          profilImage: user?.image
        })
      }
      return true
    },
    async session({ session }: any) {
      await connectToDatabase()
      const user = await User.findOne({ email: session?.user?.email })
      if (user) {
        session.currentUser = user
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}