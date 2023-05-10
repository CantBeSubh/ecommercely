import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { ReactSortable } from "react-sortablejs";


export default function ProductForm({ name: productName, description: productDescription, price: productPrice, _id, images: productImages, category: productCategory }) {
    const [name, setName] = useState(productName || '')
    const [description, setDescription] = useState(productDescription || '')
    const [price, setPrice] = useState(productPrice || 0)
    const [images, setImages] = useState(productImages || [])
    const [isUploading, setIsUploading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(productCategory || '')
    const router = useRouter()


    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name, description, price, images, category }
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
        setImages([])
        setCategory('')
        router.push("/products")
    }

    const handleUpload = async (e) => {
        const files = e.target?.files
        if (!files) return;
        setIsUploading(true)
        const data = new FormData()
        for (const file of files) {
            data.append('file', file)
        }
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data,
        })
        const images = await res.json()
        setImages(oldImages => [...oldImages, ...images.links])
        setIsUploading(false)
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
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Uncategorized</option>
                {categories?.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <label>Product Image</label>
            <div className="mb-2">
                <div className="flex gap-2 flex-wrap">
                    <ReactSortable
                        list={images}
                        setList={setImages}
                        animation={200}
                        delayOnTouchStart={true}
                        delay={2}
                        className="flex gap-2 flex-wrap cursor-grab active:cursor-grabbing"
                    >

                        {images?.map((image, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img src={image} className="w-full h-full object-cover rounded-lg" />
                                <button
                                    className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                                    onClick={() => setImages(oldImages => oldImages.filter((_, i) => i !== index))}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading &&
                        <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg animate-pulse">
                            <ScaleLoader color="#1f2937" />
                        </div>
                    }
                    <label className="cursor-pointer w-24 h-24 text-center flex items-center flex-col justify-center gap-1 text-gray-500 rounded-lg bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>Upload</div>
                        <input type="file" className="hidden" onChange={handleUpload} />
                    </label>
                </div>

                {!images?.length && <div >No image uploaded</div>}
            </div>
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
