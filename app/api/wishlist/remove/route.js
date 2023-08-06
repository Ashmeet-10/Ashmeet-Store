import User from '@models/user'
import connectToDB from '@utils/database'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const POST = async (req, res) => {
  try {
    const database = connectToDB()
    const sessionData = getServerSession()
    const requestBody = req.json()
    const [db, session, reqBody] = await Promise.all([database, sessionData, requestBody])

    if(!session)
      return NextResponse.json({message: 'not logged in'})

    const { productId } = reqBody
    const userInfo = await User.findOne({ email: session.user.email })
    if (userInfo.wishlist.includes(productId)) {
      console.log('Removing to wishlist')
      userInfo.wishlist = userInfo.wishlist.filter((item) => {
        return item !== productId
      })
      console.log(userInfo)
      await userInfo.save()
    }
    return NextResponse.json({ message: 'success' })
  } catch (error) {
    console.log('Not able to Add product to wishlist', error)
    return NextResponse.json({ message: 'failure' })
  }
}
