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
    else if (method === 'GET') {
        if (req.query?.id) {
            const ProductDoc = await Product.findById(req.query.id)
            res.status(200).json(ProductDoc)
        }
        else {
            const ProductDoc = await Product.find({})
            res.status(200).json(ProductDoc)
        }
    }
    else if (method === 'PUT') {
        const { name, price, description, _id } = req.body;
        const ProductDoc = await Product.updateOne({ _id }, { name, price, description })
        res.status(200).json(ProductDoc)
    }
}