import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
    return (
        <Layout>
            <Link href="/products/new" className="text-white bg-gray-700 rounded-md py-1 px-2">
                Add New Product
            </Link>
        </Layout>
    )
}
