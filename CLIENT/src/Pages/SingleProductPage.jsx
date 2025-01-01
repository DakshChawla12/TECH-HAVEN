import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { CiHeart } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

const SingleProductPage = () => {
    const { id } = useParams();
    const { product, fetchDetails, cart, addToCart, addToWishlist, updateCart, handleAddReview } = useContext(StoreContext);
    const [index, setIndex] = useState(0);
    const [showReviewInput, setShowReviewInput] = useState(false);
    const [newReview, setNewReview] = useState("");

    const changeImage = (idx) => {
        setIndex(idx);
    };

    const handleAddToCart = () => {
        addToCart(id);
    };

    const handleAddToWishlist = () => {
        addToWishlist(id);
    };

    const handleUpdate = (change) => {
        updateCart(id, change);
    };

    const handleReviewSubmit = () => {
        if (newReview.trim()) {
            handleAddReview(id, newReview);
            setNewReview("");
            setShowReviewInput(false);
        }
    };

    useEffect(() => {
        fetchDetails(id);
    }, [id]);

    if (!product || !product.name) {
        return <div>Loading...</div>;
    }

    const cartItem = cart.find((item) => item.productId._id === id);

    return (
        <>
            <div className='w-[85%] h-[35rem] mt-16 mx-auto flex flex-col gap-5 justify-between md:flex-row'>
                <div className='w-[100%] md:w-[55%] h-[45%] md:h-[100%] flex flex-col justify-evenly items-center md:flex-row-reverse'>
                    <div className='w-[50%] h-[70%] md:w-[70%]'>
                        <img src={product.images[index]} alt="" className='h-[80%] w-[100%]' />
                    </div>
                    <div className='w-[100%] h-[25%] md:h-[80%] md:w-[25%] flex justify-around md:flex-col'>
                        {[0, 1, 2, 3, 4].map(idx => (
                            <div
                                key={idx}
                                className='w-[18%] h-[100%] md:w-[100%] md:h-[18%] xl:w-[80%] xl:h-[19%] mx-auto'
                                onClick={() => changeImage(idx)}
                            >
                                <img src={product.images[idx]} alt="" className='h-[100%] w-[100%]' />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-[100%] md:w-[45%] h-[50%] md:h-[100%] flex flex-col gap-3 justify-center items-center xl:items-start xl:pl-[2rem]'>
                    <div className='h-[45%] w-[75%] flex flex-col gap-1 md:justify-center md:gap-3'>
                        <p className='text-[1.2rem] font-bold md:text-[1.4rem] lg:text-[1.7rem]'>{product.name}</p>
                        <span className='flex items-center gap-5'>{product.rating}/5 rating <span className='bg-slate-300 rounded-md p-1'>In Stock</span></span>
                        <span className='font-medium md:text-[1rem] lg:text-[1.2rem]'>${product.price}</span>
                        <p className='text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]'>{product.description}</p>
                    </div>
                    <div className='h-[50%] w-[75%] flex flex-col gap'>
                        <div className='w-[60%] h-[30%] md:w-[90%] md:h-[20%] flex gap-4 items-center'>
                            {cartItem ? (
                                <div className='w-[40%] h-[100%] md:w-[50%] flex items-center gap-1 rounded-md'>
                                    <button className='w-[32%] h-[100%] bg-red-500 text-[2.2rem] rounded-sm text-white cursor-pointer' onClick={() => { handleUpdate(-1); }}>-</button>
                                    <span className='w-[32%] h-[100%] flex items-center justify-center'>{cartItem.quantity}</span>
                                    <button className='w-[32%] h-[100%] bg-red-500 text-[1.8rem] text-white rounded-sm cursor-pointer' onClick={() => { handleUpdate(1); }}>+</button>
                                </div>
                            ) : (
                                <button className='w-[50%] h-[100%] text-white bg-[#DB4444] text-[0.7rem] sm:text-base rounded-sm' onClick={handleAddToCart}>Add to cart</button>
                            )}
                            <CiHeart onClick={handleAddToWishlist} className='h-[2rem] w-[2rem]' />
                        </div>
                        <div className='w-[65%] h-[65%] md:w-[90%] flex flex-col justify-center'>
                            <div className='h-[50%] w-[100%] flex border-2 border-gray-400 items-center justify-between'>
                                <img src="/icon-delivery.png" alt="" />
                                <div className='w-[85%] h-[100%] flex flex-col justify-center gap-3'>
                                    <span className='font-bold text-[1rem]'>Free Delivery</span>
                                    <p className='font-medium text-[0.8rem]'>Guaranteed free delivery within 30 days of order.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-auto h-[12rem] w-[85%] border-2 border-gray-700 flex gap-5 items-center justify-center relative'>
                <IoIosAddCircleOutline
                    className='absolute top-0 right-0 cursor-pointer h-[2rem] w-[2rem]'
                    onClick={() => setShowReviewInput(true)}
                />
                {product.reviews.map((review, idx) => (
                    <div key={idx} className='h-[90%] border-2 border-black w-[20%] flex flex-col justify-center gap-3'>
                        <div className='flex items-center gap-3'>
                            <FaRegUserCircle className='h-[2rem] w-[2rem]' />
                            <span className='font-bold text-[1.2rem]'>{review.username}</span>
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>

            {showReviewInput && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-md shadow-md w-[90%] max-w-[500px]'>
                        <h3 className='text-lg font-bold mb-4'>Add Your Review</h3>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            className='w-full h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Write your review here...'
                        ></textarea>
                        <div className='flex justify-end gap-3 mt-4'>
                            <button
                                onClick={() => setShowReviewInput(false)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'>
                                Cancel
                            </button>
                            <button
                                onClick={handleReviewSubmit}
                                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleProductPage;