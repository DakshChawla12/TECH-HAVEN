import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';

const AddProductPage = () => {

    const { addProduct } = useContext(StoreContext);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        inStock: 'true',
        description: '',
        category: '',
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFormData((prev) => ({
            ...prev,
            images: files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addProduct(formData);
    };

    return (
        <div className="h-[47rem] w-[80%] mt-16 mx-auto border-2 border-red-500 flex flex-col gap-3">
            <h1 className="text-[2rem] font-semibold">Add a new product</h1>

            <form
                className="w-[80%] h-[43rem] border-2 border-green-500 flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                {/* Name */}
                <div className="h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500">
                    <label className="text-[0.95rem] text-gray-700">Name:</label>
                    <input
                        type="text"
                        className="h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm"
                        placeholder="product name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Price */}
                <div className="h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500">
                    <label className="text-[0.95rem] text-gray-700">Price:</label>
                    <input
                        type="number"
                        className="h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm"
                        placeholder="product price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                {/* In Stock */}
                <div className="h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500">
                    <label className="text-[0.95rem] text-gray-700">In Stock:</label>
                    <select
                        className="h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm"
                        name="inStock"
                        value={formData.inStock}
                        onChange={handleChange}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                {/* Description */}
                <div className="h-[10rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500">
                    <label className="text-[0.95rem] text-gray-700">Description:</label>
                    <textarea
                        className="h-[8rem] w-[100%] bg-[#E6E6E6] rounded-sm resize-none"
                        placeholder="product description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Categories */}
                <div className="h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500">
                    <label className="text-[0.95rem] text-gray-700">Categories:</label>
                    <input
                        type="text"
                        className="h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm"
                        placeholder="product categories"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>

                {/* Images */}
                <div>
                    <label htmlFor="images">Product Images*</label><br />
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Submit Button */}
                <button
                    className="h-[4rem] w-[12rem] text-[1.1rem] rounded-sm flex items-center gap-3 justify-center bg-[#DB4444] text-white cursor-pointer"
                    type="submit"
                >
                    Add product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
