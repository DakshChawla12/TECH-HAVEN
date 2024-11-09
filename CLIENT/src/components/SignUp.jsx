import React, { useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const SignUp = () => {

    const { handleSignUp } = useContext(StoreContext);

    const [signUpDetails, setSignUpDetails] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpDetails({ ...signUpDetails, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignUp(signUpDetails);
    }

    return (
        <div className='mx-auto w-[90%] h-[40rem] mt-10 flex justify-center items-center'>

            <div className='h-[100%] w-[60%] hidden lg:block'>
                <img src="/signup.png" alt="" className='h-[100%] w-[100%]' />
            </div>

            <div className='h-[100%] w-[85%] sm:w-[65%] xl:w-[40%] flex flex-col items-center justify-center gap-3'>
                <div className='flex flex-col gap-2 w-[100%] sm:w-[70%]'>
                    <h1 className='font-medium text-[1.5rem] lg:text-[2rem]'>Create an account</h1>
                    <span className='font-normal text-[0.8rem] lg:text-[1rem]'>Enter your details below</span>
                </div>
                <form onSubmit={handleSubmit} className='h-[70%] w-[100%] sm:w-[70%] flex flex-col gap-6 justify-center items-start'>
                    <input type="text" className='h-[2.5rem] w-[80%] border-b-2 border-b-gray-300 outline-none' placeholder='name' name='name' onChange={handleChange} />
                    <input type="text" className='h-[2.5rem] w-[80%] border-b-2 border-b-gray-300 outline-none' placeholder='email' name='email' onChange={handleChange} />
                    <input type="text" className='h-[2.5rem] w-[80%] border-b-2 border-b-gray-300 outline-none' placeholder='phone number' name='phone' onChange={handleChange} />
                    <input type="text" className='h-[2.5rem] w-[80%] border-b-2 border-b-gray-300 outline-none' placeholder='password' name='password' onChange={handleChange} />
                    <button className='w-[80%] h-[3rem] bg-[#DB4444] text-white mt-1 rounded-sm' type='submit'>Sign up</button>
                    <button className='border-2 border-gray-300 w-[80%] h-[3rem] flex justify-center items-center gap-3'>
                        <img src="/search.png" alt="" className='h-[50%]' />
                        <span>Sign up with Google</span>
                    </button>
                    <p className='text-[0.7rem] lg:text-[0.9rem] text-gray-500'>Already have an account? <span className='text-gray-700 border-b-2 border-b-gray-500 py-1'>Log in</span></p>
                </form>
            </div>

        </div>
    )
}

export default SignUp
