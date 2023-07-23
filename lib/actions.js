'use server'

import User from '@models/user'
import { connectToDB } from '@utils/database'
import { revalidatePath } from 'next/cache'

export async function addToCart(
  userId,
  productId,
  selectedColor,
  selectedSize
) {
  try {
    await connectToDB()
    const userInfo = await User.findById(userId)
    let isPresent = false
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
    revalidatePath('/cart')
    console.log(userInfo.cart)
    await userInfo.save()
  } catch (error) {
    console.log('Not able to Add product to cart', error)
  }
}

export async function removeFromCart(
  userId,
  productId,
  selectedColor,
  selectedSize
) {
  try {
    await connectToDB()
    const userInfo = await User.findById(userId)
    userInfo.cart.forEach((item, idx) => {
      if (
        item.productId === productId &&
        item.selectedColor === selectedColor &&
        (!selectedSize || item.selectedSize === selectedSize)
      ) {
        item.quantity -= 1
        if (item.quantity === 0) {
          userInfo.cart = userInfo.cart.filter(
            (product, index) => index !== idx
          )
          console.log('Removing product from cart')
        } else console.log('Decreasing product quantity in cart')
      }
    })
    await userInfo.save()
  } catch (error) {
    console.log('Error in removing product from cart', error)
  }
}

export async function addOrRemoveFromWishList(userId, productId) {
  try {
    await connectToDB()
    const userInfo = await User.findById(userId)
    if (userInfo.wishlist.includes(productId)) {
      console.log('Removing from wishlist')
      userInfo.wishlist = userInfo.wishlist.filter((item) => {
        return item !== productId
      })
    } else {
      console.log('Adding to wishlist')
      userInfo.wishlist = [productId, ...userInfo.wishlist]
    }
    console.log(userInfo)
    await userInfo.save()
  } catch (error) {
    console.log('Not able to Add/remove product from wishlist', error)
  }
}
