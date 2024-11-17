import Card from './Card';
import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../Context/StoreContext';
import SmallSpinner from './SmallSpinner';

const FlashSales = () => {
    const { featured, fetchFeaturedProducts, loading } = useContext(StoreContext);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    return (
        <div className='w-[95%] h-[42rem] md:h-[24rem] lg:h-[25rem] mx-auto mt-10 flex flex-col border-2 border-red-400'>
            <div className='h-[3.5rem] md:h-[20%] w-[30%] flex items-center gap-1'>
                <p className='w-[1rem] h-[70%] bg-red-500 rounded-sm'></p>
                <span className='font-bold text-[0.9rem] text-[#DB4444]'>Today's</span>
            </div>

            <div>
                <p className='font-medium text-[2rem]'>Flash Sales</p>
            </div>

            {loading ? <SmallSpinner /> :
                <div className='flex flex-wrap md:flex-nowrap gap-4 w-full h-[70%] mt-5 border-2 border-red-400 items-center lg:justify-center lg:gap-10'>
                    {featured.map((product) => (
                        <Card
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            description={product.description}
                            image={product.images[0]}
                        />
                    ))}
                </div>}

            {!loading &&
                <button className='flex justify-center items-center h-[3rem] bg-red-500 w-[12rem] mt-3 self-center rounded-sm text-white md:mt-5 md:h-[4rem]'>
                    View All Products
                </button>}
        </div>
    );
};

export default FlashSales;
