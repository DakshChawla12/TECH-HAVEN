import React from 'react'

const Login = () => {
    return (
        <div className='mx-auto w-[90%] h-[40rem] mt-10 flex justify-center items-center'>

            <div className='h-[100%] w-[60%] hidden lg:block'>
                <img src="/signup.png" alt="" className='h-[100%] w-[100%]' />
            </div>

            <div className='h-[100%] w-[85%] sm:w-[65%] xl:w-[40%] flex flex-col items-center justify-center gap-3'>
                <div className='flex flex-col gap-2 w-[100%] sm:w-[70%]'>
                    <h1 className='font-medium text-[1.5rem] lg:text-[2rem]'>Log in to TechHaven </h1>
                    <span className='font-normal text-[0.8rem] lg:text-[1rem]'>Enter your details below</span>
                </div>
                <form action="" className='h-[60%] w-[100%] sm:w-[70%] flex flex-col gap-6 justify-center items-start'>
                    <input type="text" className='h-[2.5rem] w-[80%] border-b-2 border-b-gray-300 outline-none' placeholder='email' />
                    <input type="text" className='h-[2.5rem] w-[80%] border-b-2 border-b-gray-300 outline-none' placeholder='password' />
                    <button className='w-[80%] h-[3rem] bg-[#DB4444] text-white mt-1 rounded-sm'>Sign up</button>
                    <p className='text-[0.7rem] lg:text-[0.9rem] text-gray-500'>new to TechHaven? <span className='text-gray-700 border-b-2 border-b-gray-500 py-1'>Create account</span></p>
                </form>
            </div>

        </div>
    )
}

export default Login
