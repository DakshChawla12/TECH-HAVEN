import React from 'react'

const Featured = () => {
    return (
        <div className='h-[20rem] w-[95%] mt-[3rem] border-2 border-red-500 mx-auto flex justify-between xl:h-[28rem] xl:w-[93%]'>

            <div className='w-[48%] h-[100%] border-2 border-green-600 bg-black relative'>
                <img src="/ps5.png" alt="" className='h-[95%] xl:h-[100%] absolute right-1 xl:right-24' />
                <div className='text-white absolute bottom-2 left-4 xl:left-8 w-[80%] flex flex-col gap-1 xl:gap-2 xl:w-[45%]'>
                    <span className='xl:text-[1.3rem]'>PlayStation 5</span>
                    <p className='text-[0.8rem] font-thin xl:text-base'>Black and White version of the PS5 coming out on sale.</p>
                    <span className='text-[0.8rem] underline xl:text-base'>Shop Now</span>
                </div>
            </div>


            <div className='w-[48%] h-[100%] border-2 border-green-600 flex flex-col justify-between'>

                <div className='w-[100%] h-[48%] border-2 border-green-600 bg-black relative bg-[radial-gradient(circle_at_70%,rgba(255,255,255,0.2),rgba(255,255,255,0))]'>
                    <img src="/laptop.png" alt="" className='absolute h-[95%] right-6 bottom-1 xl:right-24' />
                    <div className='text-white absolute bottom-2 left-4 xl:left-8 w-[80%] flex flex-col gap-1 xl:gap-2 xl:w-[45%]'>
                        <span className='xl:text-[1.3rem]'>PlayStation 5</span>
                        <p className='text-[0.8rem] font-thin xl:text-base hidden xl:block'>Black and White version of the PS5 coming out on sale.</p>
                        <span className='text-[0.8rem] underline xl:text-base'>Shop Now</span>
                    </div>
                </div>

                <div className='w-[100%] h-[48%] border-2 border-green-600 flex justify-between'>
                    <div className='w-[48%] h-[100%] border-2 border-green-600 bg-black relative'>
                        <img src="/speaker.png" alt="" className='h-[90%] absolute right-7 bottom-1  xl:right-2' />
                        <div className='text-white absolute bottom-2 left-4 xl:left-8 w-[80%] flex flex-col gap-1 xl:gap-2 xl:w-[45%]'>
                            <span className='xl:text-[1.3rem]'>PlayStation 5</span>
                            <p className='text-[0.8rem] font-thin xl:text-base hidden xl:block'>Black and White version of the PS5 coming out on sale.</p>
                            <span className='text-[0.8rem] underline xl:text-base'>Shop Now</span>
                        </div>
                    </div>
                    <div className='w-[48%] h-[100%] border-2 border-green-600 bg-black relative'>
                        <img src="/speaker.png" alt="" className='h-[90%] absolute right-7 bottom-1 xl:right-2' />
                        <div className='text-white absolute bottom-2 left-4 xl:left-8 w-[80%] flex flex-col gap-1 xl:gap-2 xl:w-[45%]'>
                            <span className='xl:text-[1.3rem]'>PlayStation 5</span>
                            <p className='w-full text-[0.8rem] xl:w-[100%] font-thin xl:text-base hidden xl:block'>
                                Black and White version of the PS5 coming out on sale.
                            </p>
                            <span className='text-[0.8rem] underline xl:text-base'>Shop Now</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Featured
