import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const CartPage = () => {
    const { getCart, cart } = useContext(StoreContext);

    // Fetch cart on component mount
    useEffect(() => {
        getCart();
    }, []);

    return (
        <div className='w-[75%] h-[30vw] mx-auto mt-[5rem] flex flex-col gap-8 border-2 border-red-500'>
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
                            <div className='w-[40%] flex items-center gap-2'>
                                <img
                                    src={images[0]}
                                    alt={name}
                                    className='h-[3rem] w-[3rem] object-cover rounded-lg'
                                />
                                <p className='text-[0.7rem] lg:text-[0.9rem] truncate'>{name}</p>
                            </div>

                            {/* Price */}
                            <span className='w-[15%] text-[0.7rem] lg:text-[0.9rem]'>${price}</span>

                            {/* Quantity */}
                            <span className='w-[15%] text-[0.7rem] lg:text-[0.9rem]'>{quantity}</span>

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
        </div>
    );
};

export default CartPage;
