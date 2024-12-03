import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { MdDeleteForever } from "react-icons/md";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const CartPage = () => {
    const { cart, totalPrice, deleteFromCart, updateCart, getCart, handleNavigation } = useContext(StoreContext);
    const userToken = localStorage.getItem('token'); // Check if user token exists

    // Handle delete item from cart
    const handleDelete = (prodID) => {
        deleteFromCart(prodID);
    };

    // Handle update quantity
    const handleUpdate = (prodID, change) => {
        updateCart(prodID, change);
    };

    useEffect(() => {
        getCart();
    }, [])

    // If token is not found, show a message
    if (!userToken) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <p className='text-center text-[1.2rem] lg:text-[1.5rem] font-semibold'>
                    Please log in to view your cart.
                </p>
            </div>
        );
    }

    // If cart is empty, show a message
    if (cart.length === 0) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <p className='text-center text-[1.2rem] lg:text-[1.5rem] font-semibold'>
                    Your cart is empty.
                </p>
            </div>
        );
    }

    // Render cart items if available
    return (
        <div className='w-[75%] mx-auto mt-[5rem] flex flex-col gap-8'>
            {/* Cart Header */}
            <div className='w-[90%] mx-auto flex items-center justify-between text-center font-semibold'>
                <span className='w-[40%] text-[0.8rem] lg:text-[1rem]'>Product</span>
                <span className='w-[15%] text-[0.8rem] lg:text-[1rem]'>Price</span>
                <span className='w-[15%] text-[0.8rem] lg:text-[1rem]'>Quantity</span>
                <span className='w-[20%] text-[0.8rem] lg:text-[1rem]'>Subtotal</span>
            </div>

            {cart.map((item, index) => {
                const { productId, quantity } = item;
                const { name, price, images } = productId;
                const subtotal = price * quantity;

                return (
                    <div
                        key={index}
                        className='w-[90%] h-[5rem] mx-auto flex items-center justify-between text-center'>

                        {/* Product Info */}
                        <div className='w-[40%] flex items-center gap-2 relative h-[7rem]'>
                            <div className='flex flex-col justify-center items-start w-[80%]'>
                                <img
                                    src={images[0]}
                                    alt={name}
                                    className='h-[3rem] w-[3rem] object-cover rounded-lg'
                                />
                                <p className='text-[0.7rem] lg:text-[0.9rem] truncate w-[80%] self-start'>{name}</p>
                            </div>
                            <MdDeleteForever
                                className='absolute right-1 text-red-500 text-[1.5rem] lg:text-[2rem] cursor-pointer'
                                onClick={() => handleDelete(productId._id)}
                            />
                        </div>

                        {/* Price */}
                        <span className='w-[15%] text-[0.7rem] lg:text-[0.9rem]'>${price}</span>

                        {/* Quantity */}
                        <div className='flex items-center justify-between gap-1'>
                            <FaAngleDown
                                onClick={() => handleUpdate(productId._id, -1)}
                                className='cursor-pointer'
                            />
                            <span className='w-[15%] text-[0.7rem] lg:text-[0.9rem]'>{quantity}</span>
                            <FaAngleUp
                                onClick={() => handleUpdate(productId._id, 1)}
                                className='cursor-pointer'
                            />
                        </div>

                        {/* Subtotal */}
                        <span className='w-[20%] text-[0.7rem] lg:text-[0.9rem]'>
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>
                );
            })}

            {/* Cart Total Section */}
            <div className='flex w-[100%] justify-between'>
                <button className='border-2 border-gray-400 w-[11rem] h-[3rem] rounded sm'>
                    Back to Shop
                </button>
                <div className='h-[15rem] w-[15rem] lg:h-[20rem] lg:w-[20rem] flex flex-col justify-center'>
                    <span className='text-[1.2rem] lg:text-[2rem] font-semibold'>Cart Total</span>
                    <div className='flex flex-col h-[70%] w-[90%] gap-3 mx-auto'>
                        <div className='w-[100%] flex items-center justify-between py-1 border-b-2'>
                            <span className='text-[0.8rem] lg:text-[1rem]'>Subtotal</span>
                            <span className='text-[0.8rem] lg:text-[1rem]'>{totalPrice}$</span>
                        </div>
                        <div className='w-[100%] flex items-center justify-between py-1 border-b-2'>
                            <span className='text-[0.8rem] lg:text-[1rem]'>Shipping</span>
                            <span className='text-[0.8rem] lg:text-[1rem]'>40$</span>
                        </div>
                        <div className='w-[100%] flex items-center justify-between py-1 border-b-2'>
                            <span className='text-[0.8rem] lg:text-[1rem]'>Total</span>
                            <span className='text-[0.8rem] lg:text-[1rem]'>{totalPrice + 40}$</span>
                        </div>
                        <button className='bg-[#DB4444] text-white w-[90%] h-[2rem] mx-auto py-1 rounded-sm' onClick={() => handleNavigation('/checkout')}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
