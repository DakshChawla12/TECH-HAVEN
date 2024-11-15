import React from 'react'

const AboutUsPage = () => {
    return (
        <div className='w-[100%] h-[60rem] xl:h-[45rem] mt-16 flex flex-col justify-between items-stretch'>

            <div className='w-[100%] h-[70%] flex items-center justify-between'>
                <div className='w-[100%] md:w-[45%] h-[100%] flex flex-col gap-3 justify-center md:pl-9'>
                    <span className='text-[3rem] font-bold'>About Us</span>
                    <p className='text-[1.3rem] md:text-[1.1rem] md:w-[90%]'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                    <p className='text-[1.3rem] md:text-[1.1rem] md:w-[90%]'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                </div>
                <img src="/about.png" alt="" className='w-[55%] h-[100%] hidden md:block' />
            </div>

            <div className='w-[100%] h-[30%]  flex sm:grid grid-cols-1 sm:grid-cols-3 sm:justify-items-center'>
                <div className='h-[60%] sm:h-[85%] w-[50%] my-auto flex flex-col items-center justify-center gap-2' >
                    <img src="/Services.png" alt="" className='h-[4rem]' />
                    <span className='font-bold text-[1.5rem]'>10.5K</span>
                    <span className='text-[0.7rem] sm:text-[1rem]'> Active Sellers</span>
                </div>
                <div className='h-[60%] sm:h-[85%] w-[50%] my-auto flex flex-col items-center justify-center gap-2'>
                    <img src="/Services_1.png" alt="" className='h-[4rem]' />
                    <span className='font-bold text-[1.5rem]'>45.5K</span>
                    <span className='text-[0.7rem] sm:text-[1rem]'> Active Customers</span>
                </div>
                <div className='h-[60%] sm:h-[85%] w-[50%] my-auto flex flex-col items-center justify-center gap-2'>
                    <img src="/Services.png" alt="" className='h-[4rem]' />
                    <span className='font-bold text-[1.5rem]'>50K</span>
                    <span className='text-[0.7rem] sm:text-[1rem]'> Monthly Products Sale</span>
                </div>
            </div>

        </div >
    )
}

export default AboutUsPage
