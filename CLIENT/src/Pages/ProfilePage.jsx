import React from 'react'

const ProfilePage = () => {
    return (
        <div className='w-[85%] h-[30rem] mt-16 border-2 border-red-500 mx-auto flex items-center gap-7 relative'>

            <span className='absolute top-1 right-1'>Hi,<span className='text-red-500'>Daksh Chawla</span></span>

            <div className='w-[30%] h-[35%] border-2 border-red-500 flex flex-col gap-2 justify-center text-[0.8rem] font-semibold lg:w-[20%] md:text-[1rem]'>
                <span>Manage My Account</span>
                <span>My Cart</span>
                <span>My Wishlist</span>
                <span>My Orders</span>
            </div>

            <div className='w-[67%] h-[70%] border-2 border-red-500'>
                <form action="" className='flex flex-col w-[100%] h-[100%] border-2 border-red-500 gap-7'>

                    <div className='flex gap-2 w-[100%]'>
                        <div className='flex flex-col w-[30%]'>
                            <label htmlFor="" className='text-[0.7rem]'>name</label>
                            <input type="text" className='h-[2rem] w-[100%rem] bg-[#F5F5F5] lg:w-[80%]' />
                        </div>

                        <div className='flex flex-col w-[30%]'>
                            <label htmlFor="" className='text-[0.7rem]'>email</label>
                            <input type="text" className='h-[2rem] w-[100%] bg-[#F5F5F5]  lg:w-[80%]' />
                        </div>

                        <div className='flex flex-col w-[30%]'>
                            <label htmlFor="" className='text-[0.7rem]'>phone no.</label>
                            <input type="text" className='h-[2rem] w-[100%] bg-[#F5F5F5]  lg:w-[80%]' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <span htmlFor="" >password changes</span>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='text-[0.7rem]'>current password</label>
                            <input type="text" className='h-[2rem] w-[10rem] bg-[#F5F5F5] ' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='text-[0.7rem]'>current password</label>
                            <input type="text" className='h-[2rem] w-[10rem] bg-[#F5F5F5]' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='text-[0.7rem]'>current password</label>
                            <input type="text" className='h-[2rem] w-[10rem] bg-[#F5F5F5]' />
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ProfilePage
