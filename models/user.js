import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: { type: String, required: [true, 'Username is required!'] },
  image: { type: String },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      selectedColor: String,
      selectedSize: String,
    },
  ],
  checkoutIds: { type: [String] },
  orders: { type: [Object] },
})

const User = models.User || model('User', UserSchema)

export default User
