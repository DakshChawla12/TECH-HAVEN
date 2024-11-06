import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleOpenClose = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-[100%] h-[4rem] md:h-[5rem] flex items-end justify-between px-5">
            {!isMenuOpen && (
                <>
                    <h1 className='font-bold text-2xl md:text-4xl'>TechHaven</h1>
                    <div className="text-[1.7rem] xl:hidden">
                        <IoMenu onClick={handleOpenClose} />
                    </div>

                    <div className='hidden w-[30%] h-[55%] xl:flex justify-between items-center'>
                        <span>Home</span>
                        <span>Contact</span>
                        <span>About us</span>
                        <span>Sign Up</span>
                    </div>
                    <div className='hidden w-[20%] h-[55%] xl:flex justify-around items-center'>
                        <input
                            type="text"
                            placeholder='What are you looking for?'
                            className='w-[60%] bg-[#e6e6e6] placeholder:text-gray-600 text-[0.7rem] h-[60%] px-3 rounded-md'
                        />
                        <FaRegHeart className='text-2xl' />
                        <IoCartOutline className='text-3xl' />
                    </div>
                </>
            )}
            {isMenuOpen && (
                <div className='fixed inset-0 bg-white z-50 flex flex-col p-5 mt-10'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-bold text-2xl md:text-4xl'>TechHaven</h1>
                        <div className="text-[1.7rem]">
                            <IoClose onClick={handleOpenClose} />
                        </div>
                    </div>
                    <div className='w-[50%] h-[5%] flex gap-6 items-center mt-5'>
                        <input
                            type="text"
                            placeholder='What are you looking for?'
                            className='w-[60%] bg-[#e6e6e6] placeholder:text-gray-600 text-[0.7rem] h-[60%] px-3 rounded-md'
                        />
                        <FaRegHeart className='text-2xl' />
                        <IoCartOutline className='text-3xl' />
                    </div>
                    <div className='mt-5 flex flex-col space-y-4'>
                        <span>Home</span>
                        <span>Contact</span>
                        <span>About us</span>
                        <span>Sign Up</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
