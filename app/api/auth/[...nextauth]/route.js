import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectToDB from '@utils/database'
import User from '@models/user'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB()
        const sessionUser = await User.findOne({ email: session.user.email }).select('_id')
        session.user.id = sessionUser._id.toString()
        return session
      } catch (error) {
        console.log(error)
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB()
        // check if a user already exists
        const userExists = await User.findOne({ email: profile.email }).select('_id')

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
            wishlist: [],
            cart: [],
            checkoutIds: [],
            orders: [],
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
