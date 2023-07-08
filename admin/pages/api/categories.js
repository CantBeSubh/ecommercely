import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categories";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handeler(req, res) {

    await mongooseConnect();
    await isAdminRequest(req, res);
    const { method } = req;

    if (method === 'POST') {
        // const { name, price, description, images } = req.body;
        // const ProductDoc = await Product.create({ name, price, description, images })
        // res.status(200).json(ProductDoc)
        const { name, parentCat, properties } = req.body;
        const CategoryDoc = await Category.create({ name, parent: parentCat?.length > 0 ? parentCat : null, properties })
        res.status(200).json(CategoryDoc)
    }
    else if (method === 'GET') {
        if (req.query?.id) {
            const CategoryDoc = await Category.findById(req.query.id).populate('parent')
            res.status(200).json(CategoryDoc)
        }
        else {
            const CategoryDoc = await Category.find({}).populate('parent')
            res.status(200).json(CategoryDoc)
        }
    }
    else if (method === 'PUT') {
        const { name, parentCat, _id, properties } = req.body;
        const CategoryDoc = await Category.updateOne({ _id }, { name, parent: parentCat?.length > 0 ? parentCat : null, properties })
        res.status(200).json(CategoryDoc)
    }
    else if (method === 'DELETE') {
        const CategoryDoc = await Category.deleteOne({ _id: req.query.id })
        res.status(200).json(CategoryDoc)
    }
}