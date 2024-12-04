import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import WishlistCard from '../components/WishlistCard';
import FlashSales from '../components/FlashSales';

const WishlistPage = () => {

    const { getWishList, wishlist } = useContext(StoreContext);
    const userToken = localStorage.getItem('token');

    if (!userToken) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <p className='text-center text-[1.2rem] lg:text-[1.5rem] font-semibold'>
                    Please log in to view your wishlist.
                </p>
            </div>
        );
    }

    useEffect(() => {
        if (userToken) {
            getWishList();
        }
    }, []);




    return (
        <div className='w-[95%] border-2 border-red-500 mt-16 mx-auto flex flex-col items-center gap-3'>
            <div className='w-[95%] flex border-2 border-red-500 justify-between h-[5rem] items-center pr-4'>
                <span>Wishlist{wishlist.length}</span>
                <button className='h-[4rem] border-2 border-red-500 w-[8rem] sm:w-[10rem] lg:w-[12rem]'>Move all to bag</button>
            </div>

            <div className='w-[95%] grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4'>
                {
                    wishlist.map((item) => {
                        return <WishlistCard key={item._id} product={item} />
                    })
                }
            </div>

            <FlashSales />

        </div>
    )
}

export default WishlistPage
