import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

const SingleProductPage = () => {
    const { id } = useParams();
    const { product, fetchDetails } = useContext(StoreContext);
    const [index, setIndex] = useState(0);

    const changeImage = (idx) => {
        setIndex(idx);
    }

    useEffect(() => {
        fetchDetails(id);
    }, [id]);

    // Add a loading state or a conditional check to prevent errors
    if (!product || !product.name) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-[85%] h-[35rem] border-2 border-red-500 mt-16 mx-auto flex flex-col gap-5 justify-between md:flex-row'>
            <div className='w-[100%] md:w-[55%] h-[45%] md:h-[100%] border-2 border-red-500 flex flex-col justify-evenly items-center md:flex-row-reverse'>
                <div className='w-[50%] h-[70%] md:w-[70%] border-2 border-red-500'>
                    <img src={product.images[index]} alt="" className='h-[80%] w-[100%]' />
                </div>
                <div className='w-[100%] h-[25%] md:h-[80%] md:w-[25%] border-2 border-red-500 flex justify-around md:flex-col'>
                    <div className='w-[18%] h-[100%] md:w-[100%] md:h-[18%] border-2 border-green-600 xl:w-[80%] xl:h-[19%] mx-auto' onClick={() => changeImage(0)}>
                        <img src={product.images[0]} alt="" className='h-[100%] w-[100%]' />
                    </div>
                    <div className='w-[18%] h-[100%] md:w-[100%] md:h-[18%] border-2 border-green-600 xl:w-[80%] xl:h-[19%] mx-auto' onClick={() => changeImage(1)}>
                        <img src={product.images[1]} alt="" className='h-[100%] w-[100%]' />
                    </div>
                    <div className='w-[18%] h-[100%] md:w-[100%] md:h-[18%] border-2 border-green-600 xl:w-[80%] xl:h-[19%] mx-auto' onClick={() => changeImage(2)}>
                        <img src={product.images[2]} alt="" className='h-[100%] w-[100%]' />
                    </div>
                    <div className='w-[18%] h-[100%] md:w-[100%] md:h-[18%] border-2 border-green-600 xl:w-[80%] xl:h-[19%] mx-auto' onClick={() => changeImage(3)}>
                        <img src={product.images[3]} alt="" className='h-[100%] w-[100%]' />
                    </div>
                    <div className='w-[18%] h-[100%] md:w-[100%] md:h-[18%] border-2 border-green-600 xl:w-[80%] xl:h-[19%] mx-auto' onClick={() => changeImage(4)}>
                        <img src={product.images[4]} alt="" className='h-[100%] w-[100%]' />
                    </div>
                </div>
            </div>

            <div className='w-[100%] md:w-[45%] h-[50%] md:h-[100%] border-2 border-red-500 flex flex-col gap-3 justify-center items-center xl:items-start xl:pl-[2rem]'>
                <div className='h-[45%] w-[75%] border-2 border-red-500 flex flex-col gap-1 md:justify-center md:gap-3'>
                    <p className='text-[1.2rem] font-bold md:text-[1.4rem] lg:text-[1.7rem]'>{product.name}</p>
                    <span>{product.rating}/5</span>
                    <span className='font-medium md:text-[1rem] lg:text-[1.2rem]'>{product.price}</span>
                    <p className='text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]'>{product.description}</p>
                </div>
                <div className='h-[50%] w-[75%] border-2 border-red-500 flex flex-col gap-2'>
                    <div className='w-[60%] h-[30%] md:w-[90%] md:h-[20%] border-2 border-red-500 flex gap-4 items-center'>
                        <div className='w-[40%] h-[100%] border-2 border-red-500 md:w-[50%]'></div>
                        <button className='w-[50%] h-[100%] text-white bg-green-600 text-[0.7rem] sm:text-base'>Add to wishlist</button>
                    </div>
                    <div className='w-[65%] h-[65%] md:w-[90%] border-2 border-red-500'></div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
