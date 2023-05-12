import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Categories() {

    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCat, setParentCat] = useState('')
    const [editCat, setEditCat] = useState(null)
    const [properites, setProperties] = useState([])

    const getCategories = async () => {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editCat) {
            await fetch('/api/categories', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, parentCat, _id: editCat._id })
            })
            setName('')
            setParentCat('')
            setEditCat(null)
        }
        else {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, parentCat })
            })

            const data = await res.json()
            setName('')
            setParentCat('')
        }
        getCategories()
    }

    const addProperty = () => {
        setProperties([...properites, { name: '', values: '' }])
    }

    const editCategory = async (category) => {
        setEditCat(category)
        setName(category.name)
        setParentCat(category.parent?._id || '')
    }

    const deleteCategory = async (category) => {
        const res = await Swal.fire({
            title: `Are you sure you want to delete "${category.name}"?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        })

        if (res.isConfirmed) {

            await fetch(`/api/categories?id=${category._id}`, {
                method: 'DELETE',
            })

            Swal.fire(
                {
                    title: 'Deleted!',
                    test: 'Your file has been deleted.',
                    icon: 'success'
                }
            )
        }

        getCategories()
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Layout>
            <h1>Categories</h1>
            <hr /><br />
            <label>{editCat ? `Edit "${editCat.name}"` : "New Category"}</label>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-1">

                    <input
                        type="text"
                        className="border border-gray-300 rounded-md p-1"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <select
                        className="border border-gray-300 rounded-md p-1 focus:border-gray-300"
                        value={parentCat}
                        onChange={(e) => setParentCat(e.target.value)}
                    >
                        <option value="">No Parent Category</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block">Properties</label>
                    <button
                        type='button'
                        className="text-white bg-gray-500 rounded-md p-1 mb-2 inline-flex text-sm"
                        onClick={addProperty}
                    >
                        Add Property
                    </button>
                    {properites?.map((property, index) => (
                        <div key={index} className="flex gap-1 mb-2">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-1 mb-0"
                                placeholder="Property Name"
                                value={property.name}
                                onChange={(e) => {
                                    const newProperties = [...properites]
                                    newProperties[index].name = e.target.value
                                    setProperties(newProperties)
                                }}
                            />
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-1 mb-0"
                                placeholder="Property Values"
                                value={property.values}
                                onChange={(e) => {
                                    const newProperties = [...properites]
                                    newProperties[index].values = e.target.value
                                    setProperties(newProperties)
                                }}
                            />
                            <button
                                type='button'
                                className="text-white bg-red-500 rounded-md p-4  text-sm"
                                onClick={() => {
                                    const newProperties = [...properites]
                                    newProperties.splice(index, 1)
                                    setProperties(newProperties)
                                }}
                            >
                                -
                            </button>
                        </div>
                    ))}
                </div>
                {editCat &&
                    <button
                        type='button'
                        className="text-white bg-gray-500 rounded-md p-2 mr-2 inline-flex"
                        onClick={() => {
                            setEditCat(null)
                            setName('')
                            setParentCat('')
                        }}
                    >
                        Cancel
                    </button>
                }
                <button type={'submit'} className="text-white bg-gray-500 rounded-md p-2 mr-2 inline-flex">{editCat ? "Edit" : "Add"}</button>
            </form>

            {!editCat &&
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Parent Category</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{category.name}</td>
                                <td className="border px-4 py-2">{category?.parent?.name}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-white bg-gray-500 rounded-md p-2 mr-2 inline-flex"
                                        onClick={() => editCategory(category)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button
                                        className="text-white bg-red-500 rounded-md p-2 inline-flex"
                                        onClick={() => deleteCategory(category)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </Layout>
    )
}