import React from 'react'

const Hero = () => {
    return (
        <div className='w-[95%] h-[17rem] mx-auto  mt-10 flex items-center justify-between lg:px-20'>

            <div className='h-[100%] w-[25%]  flex flex-col justify-around border-r-2 border-gray-500'>
                <span className='text-[0.8rem] md:text-[1rem]'>Phones</span>
                <span className='text-[0.8rem] md:text-[1rem]'>Computers</span>
                <span className='text-[0.8rem] md:text-[1rem]'>SmartWatch</span>
                <span className='text-[0.8rem] md:text-[1rem]'>Camera</span>
                <span className='text-[0.8rem] md:text-[1rem]'>Headphones</span>
                <span className='text-[0.8rem] md:text-[1rem]'>Gaming</span>
            </div >

            <div className='h-[100%] w-[70%]  bg-black text-white flex items-center justify-evenly'>

                <div className='h-[80%] w-[45%] flex flex-col justify-center items-center gap-3'>
                    <div className='flex items-center gap-2 w-[80%]'>
                        <img src="/amazon.png" alt="" className='h-[1.5rem] w-[1.5rem] md:h-[2rem] md:w-[2rem]' />
                        <span className='text-[0.8rem] md:text-[1rem]'>Amazon alexa</span>
                    </div>
                    <span className='font-bold text-2xl w-[80%] md:text-3xl'>Upto 10% off voucher</span>
                    <span className='text-[0.9rem] underline font-semibold w-[80%] md:text-[1.2rem]'>Shop Now</span>
                </div>

                <div className='h-[80%] w-[50%] flex md:justify-center md:items-center'>
                    <img src="/speaker.png" alt="" className='h-[100%] w-[95%] md:w-[80%] lg:w-[70%]' />
                </div>

            </div>

        </div >
    )
}

export default Hero
