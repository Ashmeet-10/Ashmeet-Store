import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
  name: { type: String, required: [true, 'Product name is required!'] },
  description: { type: String, required: [true, 'Product description is required!']},
  discountedPrice: { type: Number, required: [true, 'Product price is required!'] },
  actualPrice: { type: Number, required: [true, 'Product price is required!'] },
  images: { type: [String], required: [true, 'Product images are required!'] },
  category: { type: String, required: [true, 'Product category is required!'] },
  rating: { type: Number, default: 0 },
  size: { type: [String], default: [] },
  color: { type: [String], required: [true, 'Product colors are required!'] },
  brand: { type: String, required: [true, 'Product brand is required!'] },
  details: { type: [Object], default: [] },
  highlights: { type: [String], default: [] },
  specifications: { type: [Object], default: [] },
})

const Product = models.Product || model('Product', ProductSchema)

export default Product
