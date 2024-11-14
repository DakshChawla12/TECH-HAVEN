import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";


const WishlistCard = ({ product }) => {

    const { deleteFromWishlist } = useContext(StoreContext);
    const { _id, name, price, images } = product;

    const handleDeleteFromWishList = () => {
        deleteFromWishlist(_id);
    }

    return (
        <div className='h-[20rem] w-[95%] md:w-[100%] border-2 border-red-500 flex flex-col'>
            <div className='h-[57%] w-[100%] bg-[#F5F5F5] flex items-center justify-center relative'>
                <RiDeleteBin6Line className='absolute top-2 right-2 h-[2rem] w-[2rem] p-1 bg-white rounded-full' onClick={handleDeleteFromWishList} />
                <img src={images[0]} alt="" className='h-[65%]' />
            </div>
            <button className='h-[17%] w-[100%] bg-black text-white flex items-center justify-center gap-2 font-light'>
                <IoCartOutline className='h-[1.5rem] w-[1.5rem]' />
                <span>Add to cart</span>
            </button>
            <div className='h-[26%] border-2 border-red-500 flex flex-col w-[100%] justify-between py-1'>
                <span className='font-bold'>{name}</span>
                <span className='text-[#DB4444]'>{price}$</span>
            </div>
        </div>
    )
}

export default WishlistCard
