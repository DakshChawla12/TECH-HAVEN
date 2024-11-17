import { FaStar } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import React, { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { handleFailure } from '../utils';
/** addToCart */

const Card = ({ id, name, price, rating, description, image }) => {

    const { addToCart, addToWishlist, handleNavigation } = useContext(StoreContext);
    const handleAddToCart = () => {
        addToCart(id);
    }
    const handleAddToWishlist = () => {
        addToWishlist(id);
    }

    const handleProductClick = () => {
        if (!localStorage.getItem('token')) {
            console.log("error");
            handleFailure("please login to view full details");
            return;
        }
        handleNavigation(`/product/${id}`); // Redirect to the details page based on the ID
    };

    return (
        <div className='relative w-[47%] sm:w-[31%] md:w-[25%] lg:w-[20%] h-[13.7rem] border-2 border-red-400 group' onClick={handleProductClick}>
            {/* Image and Icons Section */}
            <div className="h-[70%] w-[100%] relative flex items-center justify-center 1.5xl:h-[65%] bg-[#f0efef]">
                <img
                    src={image}
                    alt={name}
                    className="h-[6rem] w-[6rem] 1.5xl:h-[7rem] 1.5xl:w-[7rem] object-cover"
                />
                <div className='flex flex-col gap-2 absolute top-2 right-2'>
                    <CiHeart className='h-[1.5rem] w-[1.5rem] 1.5xl:h-[2rem] 1.5xl:w-[2rem] rounded-full text-[0.8rem] p-1 bg-white cursor-pointer' onClick={handleAddToWishlist} />
                    <IoEyeOutline className='h-[1.5rem] w-[1.5rem] 1.5xl:h-[1.7rem] 1.5xl:w-[1.7rem] rounded-full p-1 bg-white' />
                    <IoIosAdd className='h-[1.5rem] w-[1.5rem] 1.5xl:h-[1.7rem] 1.5xl:w-[1.7rem] rounded-full p-1 bg-white cursor-pointer' onClick={handleAddToCart} />
                </div>

            </div>

            {/* Product Info Section */}
            <div className="h-[30%] w-[100%] 1.5xl:h-[35%] p-2">
                <p className="text-[0.85rem] 1.5xl:text-base font-medium truncate">{name}</p>
                <div className="w-[50%] flex gap-3">
                    <span className="text-[0.85rem] 1.5xl:text-base text-[#DB4444]">${price}</span>
                </div>
                <div className="flex items-center gap-0.5">
                    {/* Display Star Ratings */}
                    {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                            key={index}
                            className={`text-yellow-400 fill-current ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="text-[0.5rem] md:text-[0.7rem] mt-[0.2rem]">({rating})</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
