import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ["subhranshupati0412@gmail.com"]

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({ session }) => {
            if (adminEmails.includes(session?.user?.email)) return session;
            else {
                // alert("You are not authorized to access this page");
                return null;
            }
        }
    }
})