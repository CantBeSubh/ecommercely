import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const [productDetails, setProductDetails] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) return;

        // fetch product details from the server
        fetch(`/api/products?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProductDetails(data)
            })
    }, [id])

    return (
        <Layout>
            <h1>Edit Product</h1>
            <hr /><br />
            {productDetails && (<ProductForm {...productDetails} />)}

        </Layout>
    )
}