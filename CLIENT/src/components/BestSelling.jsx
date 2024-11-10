import Card from './Card';
import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../Context/StoreContext';

const BestSelling = () => {

    const { featured, fetchFeaturedProducts } = useContext(StoreContext);

    return (
        <div className='w-[95%] h-[42rem] md:h-[27rem] lg:h-[29rem] mx-auto mt-10 flex flex-col border-2 border-red-400'>
            <div className='h-[3.5rem] md:h-[20%] w-[30%] flex items-center gap-1'>
                <p className='w-[1rem] h-[70%] bg-red-500 rounded-sm'></p>
                <span className='font-bold text-[0.9rem] text-[#DB4444]'>This Month</span>
            </div>

            <div className='flex justify-between items-center'>
                <p className='font-medium text-[2rem]'>Best Selling Products</p>
                <button className='flex justify-center items-center h-[2.5rem] bg-red-500 w-[8rem] rounded-sm text-white md:mt-5 md:h-[4rem] md:w-[10rem]'>view all</button>

            </div>

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
            </div>

            <button className='flex justify-center items-center h-[3rem] bg-red-500 w-[12rem] mt-3 self-center rounded-sm text-white md:mt-5 md:h-[4rem]'>view all products</button>
        </div>
    )
}

export default BestSelling


