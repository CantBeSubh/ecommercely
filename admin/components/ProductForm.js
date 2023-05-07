import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({ name: productName, description: productDescription, price: productPrice, _id }) {
    const [name, setName] = useState(productName || '')
    const [description, setDescription] = useState(productDescription || '')
    const [price, setPrice] = useState(productPrice || 0)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name, description, price }
        if (_id) {
            //update the product
            console.log("Updating the product")
            await fetch('/api/products', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, _id }),
            })

        }
        else {
            //create a new product
            await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        }
        setName('')
        setDescription('')
        setPrice(0)
        router.push("/products")
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price(in INR)</label>
            <input
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                {_id ? "Update" : "Create"}
            </button>
        </form>
    )
}
