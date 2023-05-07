import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
    const [productDetails, setProductDetails] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) return;
        fetch(`/api/products?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProductDetails(data)
            })
    }, [id])

    const handleDelete = async (e) => {
        e.preventDefault()
        if (!id) return
        console.log("Deleting the product")
        await fetch(`/api/products?id=${id}`, { method: 'DELETE', })
        router.push("/products")
    }

    return (
        <Layout>
            <h1>Delete Product</h1>
            <hr /><br />
            <h3>Are you sure you want to delete "{productDetails?.name}"?</h3>
            <br />
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Yes</button>
            <button onClick={() => router.push("/products")} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">No</button>
        </Layout>
    )
}