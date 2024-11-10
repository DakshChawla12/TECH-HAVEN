import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const CartPage = () => {

    const { getCart } = useContext(StoreContext);
    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className='w-[75%] border-2 border-red-500 mx-auto mt-[5rem] flex flex-col gap-8'>

            <div className='w-[90%] h-[15%] border-2 border-red-500 mx-auto flex items-center justify-between'>
                <span className='text-[0.7rem] lg:text-[0.9rem]'>Product</span>
                <span className='text-[0.7rem] lg:text-[0.9rem]'>Price</span>
                <span className='text-[0.7rem] lg:text-[0.9rem]'>Quantity</span>
                <span className='text-[0.7rem] lg:text-[0.9rem]'>Subtotal</span>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='w-[90%] h-[4rem] border-2 border-red-500 mx-auto flex items-center justify-between'>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Product</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Price</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Quantity</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Subtotal</span>
                </div>
                <div className='w-[90%] h-[4rem] border-2 border-red-500 mx-auto flex items-center justify-between'>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Product</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Price</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Quantity</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Subtotal</span>
                </div>
                <div className='w-[90%] h-[4rem] border-2 border-red-500 mx-auto flex items-center justify-between'>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Product</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Price</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Quantity</span>
                    <span className='text-[0.7rem] lg:text-[0.9rem]'>Subtotal</span>
                </div>
            </div>

        </div>
    )
}

export default CartPage
