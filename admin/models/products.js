import { model, Schema, models } from "mongoose"

const productSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0, min: 0, required: true },
    images: { type: [String] },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    properties: { type: Object }
})

export const Product = models.Product || model('Product', productSchema)