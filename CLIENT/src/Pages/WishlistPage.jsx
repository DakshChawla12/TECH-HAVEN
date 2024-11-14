import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import WishlistCard from '../components/WishlistCard';

const WishlistPage = () => {

    const { getWishList, wishlist } = useContext(StoreContext);
    useEffect(() => {
        getWishList();
    }, []);

    useEffect(() => {
        console.log(wishlist);
    }, [wishlist]);


    return (
        <div className='w-[95%] border-2 border-red-500 mt-16 mx-auto flex flex-col items-center gap-3'>
            <div className='w-[95%] flex border-2 border-red-500 justify-between h-[5rem] items-center pr-4'>
                <span>Wishlist(4)</span>
                <button className='h-[4rem] border-2 border-red-500 w-[8rem] sm:w-[10rem] lg:w-[12rem]'>Move all to bag</button>
            </div>

            <div className='w-[95%] grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4'>
                {
                    wishlist.map((item) => {
                        return <WishlistCard key={item._id} product={item} />
                    })
                }
            </div>
        </div>
    )
}

export default WishlistPage
