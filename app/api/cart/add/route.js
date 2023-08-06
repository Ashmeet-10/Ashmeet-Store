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
    
    const {productId, selectedColor, selectedSize} = reqBody
    let isPresent = false
    const userInfo = await User.findOne({ email: session.user.email })
    userInfo.cart.forEach((item) => {
      if (
        item.productId === productId &&
        item.selectedColor === selectedColor &&
        (!selectedSize || item.selectedSize === selectedSize)
      ) {
        console.log('Increasing product quantity in cart')
        item.quantity += 1
        isPresent = true
      }
    })
    if (!isPresent) {
      console.log('Adding to cart')
      userInfo.cart = [
        {
          productId: productId,
          quantity: 1,
          selectedColor: selectedColor,
          selectedSize: selectedSize,
        },
        ...userInfo.cart,
      ]
    }
    console.log(userInfo.cart)
    await userInfo.save()
    return NextResponse.json({ message: 'success' })
  } catch (error) {
    console.log('Not able to Add product to cart', error)
    return NextResponse.json({ message: 'failure' })
  }
}
