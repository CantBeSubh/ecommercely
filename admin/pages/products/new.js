import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name, description, price }
        await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        setName('')
        setDescription('')
        setPrice(0)
        router.push("/products")
    }
    return (
        <Layout>
            <h1>New Product</h1>
            <hr />
            <br />
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
                    Add Product
                </button>
            </form>
        </Layout>
    )
}
