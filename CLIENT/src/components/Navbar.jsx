import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { IoMenu } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {

    const { handleNavigation, counts, fetchLength, handleLogout } = useContext(StoreContext);

    useEffect(() => {
        fetchLength();
    }, []);

    const isAdmin = localStorage.getItem('isAdmin')
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

    const handleOpenClose = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    };

    const handleRoutes = (page) => {
        handleNavigation(page);
    }

    return (
        <div className="w-[100%] h-[4rem] md:h-[5rem] flex items-end justify-between px-5 relative">
            {!isMenuOpen && (
                <>
                    <h1 className='font-bold text-2xl md:text-4xl' onClick={() => { handleRoutes('/') }}>TechHaven</h1>
                    <div className="text-[1.7rem] xl:hidden">
                        <IoMenu onClick={handleOpenClose} />
                    </div>

                    <div className='hidden w-[30%] h-[55%] xl:flex justify-between items-center'>
                        <span className='cursor-pointer' onClick={() => { handleRoutes('/products') }}>Shop</span>
                        <span className='cursor-pointer' onClick={() => { handleRoutes('/contact') }}>Contact</span>
                        <span className='cursor-pointer' onClick={() => { handleRoutes('/about') }}>About us</span>
                        <span className='cursor-pointer' onClick={() => { handleRoutes('/signup') }}>Sign Up</span>
                        {isAdmin === "true" && <span className='cursor-pointer' onClick={() => { handleRoutes('/admin') }}>Admin</span>}
                    </div>
                    <div className='hidden w-[20%] h-[55%] xl:flex justify-around items-center relative'>
                        <input
                            type="text"
                            placeholder='What are you looking for?'
                            className='w-[60%] bg-[#e6e6e6] placeholder:text-gray-600 text-[0.7rem] h-[60%] px-3 rounded-md'
                        />
                        <div className="relative cursor-pointer" onClick={() => { handleRoutes('/wishlist') }}>
                            <FaRegHeart className='text-2xl' />
                            {counts.wishlist > 0 &&
                                <div className='h-[1rem] w-[1rem] absolute top-[-3px] right-[-5px] bg-[#DB4444] rounded-full flex items-center justify-center text-white text-[0.5rem]'>{counts.wishlist}</div>}
                        </div>

                        <div className="relative cursor-pointer" onClick={() => handleRoutes('/cart')}>
                            <IoCartOutline className='text-3xl' />
                            {counts.cart > 0 && (
                                <div className='h-[1rem] w-[1rem] absolute top-[-3px] right-[-5px] bg-[#DB4444] rounded-full flex items-center justify-center text-white text-[0.5rem]'>
                                    {counts.cart}
                                </div>
                            )}
                        </div>
                        <CgProfile className='text-3xl cursor-pointer' onClick={toggleProfilePopup} />

                        {/* Profile Popup */}
                        {isProfilePopupOpen && (
                            <div className="absolute top-[100%] right-0 mt-2 w-[200px] bg-gray-800 bg-opacity-70 shadow-lg rounded-lg p-4 z-50 text-white">
                                <div className="flex flex-col space-y-2">
                                    <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/') }}>Manage My Account</span>
                                    <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/') }}>My Orders</span>
                                    <span className="cursor-pointer hover:text-[#DB4444]" onClick={handleLogout}>Logout</span>
                                </div>
                            </div>
                        )}
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
                        <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/') }}>Home</span>
                        <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/contact') }}>Contact</span>
                        <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/about') }}>About us</span>
                        <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/signup') }}>Sign Up</span>
                        <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/') }}>Manage My Account</span>
                        <span className="cursor-pointer hover:text-[#DB4444]" onClick={() => { handleRoutes('/') }}>My Orders</span>
                        <span className="cursor-pointer hover:text-[#DB4444]">Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
