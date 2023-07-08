import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handeler(req, res) {

    await mongooseConnect();
    await isAdminRequest(req, res);
    const { method } = req;

    if (method === 'POST') {
        const { name, price, description, category, images, properties } = req.body;
        const ProductDoc = await Product.create({ name, price, description, category, images, properties })
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
        const { name, price, description, _id, category, images, properties } = req.body;
        const ProductDoc = await Product.updateOne({ _id }, { name, price, description, category, images, properties })
        res.status(200).json(ProductDoc)
    }
    else if (method === 'DELETE') {
        const ProductDoc = await Product.deleteOne({ _id: req.query.id })
        res.status(200).json(ProductDoc)
    }
}