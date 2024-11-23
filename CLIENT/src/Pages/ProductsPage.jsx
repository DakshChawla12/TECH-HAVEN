import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const ProductsPage = () => {

    const { allProducts, getAllProducts } = useContext(StoreContext);

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className='h-[70rem] w-[90%] mt-16 border-2 pl-10 border-red-500 flex'>

            <div className='h-[100%] w-[30%] border-2 border-green-500'></div>

            <div className='w-[70%] h-[100%] flex flex-col gap-10 border-2 border-purple-400'>

                {allProducts.map((product) => {
                    return <div key={product._id} className='h-[22%] w-[100%] border-2 border-yellow-400 flex justify-between'>
                        <div className='h-[100%] w-[30%] bg-[#E6E6E6] flex justify-center'>
                            <img src="/ps5.png" alt="" className='h-[100%]' />
                        </div>
                        <div className='h-[100%] w-[50%] flex flex-col gap-4'>
                            <span className='text-[2.5rem] font-medium'>{product.name}</span>
                            <span className='text-[0.9rem] text-gray-500'>{product.rating}/5 (average user rating)</span>
                            <span className='text-[1.2rem] text-red-500'>${product.price}</span>
                            <p className='w-[75%] text-[0.9rem]'>{product.description}</p>
                        </div>
                        <div className='h-[100%] w-[15%] border-2 flex flex-col justify-center items-center gap-5 border-pink-400'>
                            <button className='h-[3rem] w-[100%] text-white bg-[#DB4444] rounded-sm'>Add To Cart</button>
                            <button className='h-[3rem] w-[100%] bg-white text-[#DB4444] rounded-sm border-2 border-[#DB4444]'>Add To WishList</button>
                        </div>
                    </div>
                })}

            </div>

        </div>
    )
}

export default ProductsPage
