import React, { useEffect, useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { handleFailure } from '../utils';

const ProfilePage = () => {

    const { profile, getUserDetails, changeUserDetails } = useContext(StoreContext);
    const userToken = localStorage.getItem('token');

    useEffect(() => {
        if (userToken) {
            getUserDetails();
        }
    }, []);



    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        newPassword_1: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (details.newPassword !== details.newPassword_1) {
            handleFailure("New passwords do not match");
            return;
        }

        const updatedDetails = {
            NewName: details.name,
            NewMail: details.email,
            NewPhone: details.phone,
            currPassword: details.currentPassword,
            newPassword: details.newPassword,
        };

        changeUserDetails(updatedDetails);
    }

    return (
        <div className='w-[85%] h-[30rem] mt-16 border-2 border-red-500 mx-auto flex items-center gap-7 relative'>

            <span className='absolute top-1 right-1'>Hi,<span className='text-red-500'>Daksh Chawla</span></span>

            <div className='w-[30%] h-[35%] border-2 border-red-500 flex flex-col gap-2 justify-center text-[0.8rem] font-semibold lg:w-[20%] md:text-[1rem]'>
                <span>Manage My Account</span>
                <span>My Cart</span>
                <span>My Wishlist</span>
                <span>My Orders</span>
            </div>

            <div className='w-[67%] h-[80%] md:h-[70%] border-2 border-red-500'>
                <form action="" className='flex flex-col w-[100%] h-[100%] border-2 border-red-500 gap-7 justify-center' onSubmit={handleSubmit}>

                    <div className='flex flex-col sm:flex-row gap-2 w-[100%]'>
                        <div className='flex flex-col w-[10rem] sm:w-[30%]'>
                            <label htmlFor="" className='text-[0.8rem]'>Full Name</label>
                            <input type="text" className='h-[2rem] w-[100%] bg-[#F5F5F5] lg:w-[80%] placeholder:text-[0.7rem]'
                                placeholder={profile.name || "name"} name='name' onChange={handleChange} />
                        </div>

                        <div className='flex flex-col w-[10rem] sm:w-[30%]'>
                            <label htmlFor="" className='text-[0.8rem]'>Email</label>
                            <input type="text" className='h-[2rem] w-[100%] bg-[#F5F5F5]  lg:w-[80%] placeholder:text-[0.7rem]' placeholder={profile.email || "email"} name='email' onChange={handleChange} />
                        </div>

                        <div className='flex flex-col w-[10rem] sm:w-[30%]'>
                            <label htmlFor="" className='text-[0.8rem]'>Phone No.</label>
                            <input type="text" className='h-[2rem] w-[100%] bg-[#F5F5F5]  lg:w-[80%] placeholder:text-[0.7rem]' placeholder={profile.phone || "phone"} name='phone' onChange={handleChange} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <span htmlFor="" >Password Changes</span>

                        <div className='flex flex-col gap-1'>
                            <input type="text" className='h-[2rem] w-[10rem] bg-[#F5F5F5] placeholder:text-[0.7rem]' placeholder='Current Password' name='currentPassword' onChange={handleChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <input type="text" className='h-[2rem] w-[10rem] bg-[#F5F5F5] placeholder:text-[0.7rem]' placeholder='New Password' name='newPassword' onChange={handleChange} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <input type="text" className='h-[2rem] w-[10rem] bg-[#F5F5F5] placeholder:text-[0.7rem]' placeholder='Confirm New Password' name='newPassword_1' onChange={handleChange} />
                        </div>
                    </div>
                    <button className='h-[2rem] w-[10rem] text-white bg-[#DB4444] text-[0.8rem]' type='submit'>Save Changes</button>
                </form>
            </div>

        </div>
    )
}

export default ProfilePage
