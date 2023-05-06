import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";

export default async function handeler(req, res) {

    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {
        const { name, price, description } = req.body;
        const ProductDoc = await Product.create({ name, price, description })
        res.status(200).json(ProductDoc)
    }
}