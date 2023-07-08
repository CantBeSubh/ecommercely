import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ["subhranshupati0412@gmail.com"]

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            if (adminEmails.includes(user?.email)) return true
            else return false
        }
    }
}
export const isAdminRequest = async (req, res) => {
    const session = await getServerSession(req, res, options);
    if (!adminEmails.includes(session?.user?.email)) res.status(401).json({ error: "Unauthorized" })
}
export default NextAuth(options)