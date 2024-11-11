import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { MdDeleteForever } from "react-icons/md";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const CartPage = () => {
    const { getCart, cart, totalPrice, deleteFromCart } = useContext(StoreContext);

    // Fetch cart on component mount
    useEffect(() => {
        getCart();
    }, []);

    const handleDelete = (prodID) => {
        deleteFromCart(prodID);
    }

    return (
        <div className='w-[75%] mx-auto mt-[5rem] flex flex-col gap-8 border-2 border-red-500'>
            {/* Cart Header */}
            <div className='w-[90%] mx-auto flex items-center justify-between text-center font-semibold'>
                <span className='w-[40%] text-[0.8rem] lg:text-[1rem]'>Product</span>
                <span className='w-[15%] text-[0.8rem] lg:text-[1rem]'>Price</span>
                <span className='w-[15%] text-[0.8rem] lg:text-[1rem]'>Quantity</span>
                <span className='w-[20%] text-[0.8rem] lg:text-[1rem]'>Subtotal</span>
            </div>

            {/* Render cart items if available */}
            {cart.length > 0 ? (
                cart.map((item, index) => {
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
                                <MdDeleteForever className='absolute right-1 text-red-500 text-[1.5rem] lg:text-[2rem] cursor-pointer' onClick={() => handleDelete(productId._id)} />
                            </div>

                            {/* Price */}
                            <span className='w-[15%] text-[0.7rem] lg:text-[0.9rem]'>${price}</span>

                            {/* Quantity */}
                            <div className='flex items-center justify-between gap-1 border-2 border-red-500'>
                                <FaAngleDown />
                                <span className='w-[15%] text-[0.7rem] lg:text-[0.9rem]'>{quantity}</span>
                                <FaAngleUp />
                            </div>

                            {/* Subtotal */}
                            <span className='w-[20%] text-[0.7rem] lg:text-[0.9rem]'>
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                    );
                })
            ) : (
                <div className='text-center text-[0.9rem]'>Your cart is empty</div>
            )}
            <div className='flex w-[100%] justify-between'>
                <button className='border-2 border-gray-400 w-[11rem] h-[3rem] rounded sm'>back to shop</button>
                <div className='h-[15rem] w-[15rem] lg:h-[20rem] lg:w-[20rem] flex flex-col justify-center'>
                    <span className='text-[1.2rem] lg:text-[2rem] font-semibold'>Cart Total</span>
                    <div className='flex flex-col h-[70%] w-[90%] gap-3 mx-auto'>
                        <div className='w-[100%] h-[20%] flex items-center justify-between py-1 border-b-2 border-b-gray-300'>
                            <span className='text-[0.8rem] lg:text-[1rem]'>Subtotal</span>
                            <span className='text-[0.8rem] lg:text-[1rem]'>{totalPrice}$</span>
                        </div>
                        <div className='w-[100%] h-[20%] flex items-center justify-between py-1 border-b-2 border-b-gray-300'>
                            <span className='text-[0.8rem] lg:text-[1rem]'>Shipping</span>
                            <span className='text-[0.8rem] lg:text-[1rem]'>40$</span>
                        </div>
                        <div className='w-[100%] h-[20%] flex items-center justify-between py-1 border-b-2 border-b-gray-300'>
                            <span className='text-[0.8rem] lg:text-[1rem]'>Total</span>
                            <span className='text-[0.8rem] lg:text-[1rem]'>{totalPrice + 40}$</span>
                        </div>
                        <button className='text-[0.7rem] bg-[#DB4444] text-white w-[90%] lg:w-[60%] h-[2rem] mx-auto py-1 rounded-sm'>proceed to checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
