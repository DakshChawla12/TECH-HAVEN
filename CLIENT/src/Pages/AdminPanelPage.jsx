import React, { useEffect, useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { Link } from 'react-router-dom';
import { MdOutlineModeEdit, MdDeleteForever } from "react-icons/md";

const AdminPanelPage = () => {
    const { getAdminProducts, adminProducts, editProduct, deleteProduct } = useContext(StoreContext);

    const [selectedProduct, setSelectedProduct] = useState({
        id: "",
        name: '',
        price: '',
        inStock: '',
        description: '',
        rating: ''
    });

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        inStock: "",
        description: "",
        rating: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData((prevData) => ({
            ...prevData,
            [name]: name === 'price' || name === 'rating'
                ? parseFloat(value) || 0 // Convert to number, default to 0 if invalid
                : name === 'inStock'
                    ? value === 'true' // Convert string 'true' to boolean true
                    : value
        }));
    };

    const handleEdit = (product) => {
        setSelectedProduct({
            id: product._id,
            name: product.name,
            price: product.price,
            inStock: product.inStock,
            description: product.description,
            rating: product.rating
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editProduct(selectedProduct.id, productData);
    };

    const handleDelete = (id) => {
        deleteProduct(id);
    }

    useEffect(() => {
        getAdminProducts();
    }, []);

    return (
        <div className='w-[80%] h-auto mx-auto mt-16 flex flex-col gap-3'>
            <h1 className='text-[2.5rem] font-medium'>Edit Product</h1>

            <form
                className='w-[80%] h-[37rem] flex flex-col gap-2'
                onSubmit={handleSubmit}
            >
                <h1 className='text-[1.3rem] font-medium'>
                    Selected Product: <span className='text-[#DB4444]'>{selectedProduct.name || 'no product selected'}</span>
                </h1>

                {/* Name */}
                <div className='h-[5rem] w-[60%] flex flex-col gap-2'>
                    <label className='text-[0.95rem] text-gray-700'>Name:</label>
                    <input
                        type="text"
                        className='h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm pl-2'
                        placeholder={selectedProduct.name || 'product name'}
                        name='name'
                        onChange={handleChange}
                    />
                </div>

                {/* Price */}
                <div className='h-[5rem] w-[60%] flex flex-col gap-2 '>
                    <label className='text-[0.95rem] text-gray-700'>Price:</label>
                    <input
                        type="number"
                        className='h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm  pl-2'
                        placeholder={selectedProduct.price || 'product price'}
                        name='price'
                        onChange={handleChange}
                    />
                </div>

                {/* In Stock */}
                <div className='h-[5rem] w-[60%] flex flex-col gap-2 '>
                    <label className='text-[0.95rem] text-gray-700'>In Stock:</label>
                    <select
                        className='h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm  pl-2'
                        name='inStock'
                        onChange={handleChange}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                {/* Description */}
                <div className='h-[10rem] w-[60%] flex flex-col gap-2'>
                    <label className='text-[0.95rem] text-gray-700'>Description:</label>
                    <textarea
                        className='h-[8rem] w-[100%] bg-[#E6E6E6] rounded-sm resize-none pl-2 pt-2'
                        placeholder={selectedProduct.description || 'product description'}
                        name='description'
                        onChange={handleChange}
                    />
                </div>

                {/* Rating */}
                <div className='h-[5rem] w-[60%] flex flex-col gap-2'>
                    <label className='text-[0.95rem] text-gray-700'>Rating:</label>
                    <input
                        type="number"
                        className='h-[2.2rem] w-[80%] bg-[#E6E6E6] rounded-sm pl-2'
                        placeholder={selectedProduct.rating || 'product rating'}
                        name='rating'
                        onChange={handleChange}
                    />
                </div>

                <button
                    className='h-[4rem] w-[12rem] text-[1.1rem] rounded-sm flex items-center gap-3 justify-center bg-[#DB4444] text-white cursor-pointer'
                    type='submit'
                >
                    Save Changes
                </button>
            </form>

            <h1 className='text-[2.5rem] font-medium'>Select a product to edit</h1>

            <div className='w-[100%] h-[20rem] flex flex-col gap-3 overflow-y-auto'>
                {adminProducts.map((product) => (
                    <div
                        key={product._id}
                        className='h-[4rem] w-[100%] flex items-center justify-between px-4 bg-gray-100'
                    >
                        <div className='w-[40%] h-[90%] flex items-center gap-2'>
                            <img src={product.images[0]} alt="" className='h-[3rem] w-[3rem]' />
                            <span>{product.name}</span>
                            <span>${product.price}</span>
                        </div>
                        <div className='w-[20%] h-[90%] flex items-center justify-around'>
                            <button><MdDeleteForever className='h-[2.5rem] w-[2.5rem] text-red-500 cursor-pointer' onClick={() => handleDelete(product._id)} /></button>
                            <button
                                className='h-[90%] w-[8rem] rounded-sm flex items-center gap-3 justify-center bg-[#DB4444] text-white cursor-pointer'
                                onClick={() => handleEdit(product)}
                            >
                                <MdOutlineModeEdit className='h-[1.8rem] w-[2rem]' />
                                <span className='text-[1.4rem]'>Edit</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex items-center gap-4'>
                <Link to={'/addProduct'} className='text-[1.5rem] w-[15rem] text-[#DB4444] underline hover:text-red-800'>Add a new product</Link>
                <Link to={'/allOrders'} className='text-[1.5rem] w-[15rem] text-[#DB4444] underline hover:text-red-80'>View All Orders</Link>
            </div>

        </div>
    );
};

export default AdminPanelPage;
