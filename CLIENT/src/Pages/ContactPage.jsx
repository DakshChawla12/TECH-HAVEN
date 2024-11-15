import React from 'react'

const ContactPage = () => {
    return (
        <div className='w-[80%] h-[35rem] mx-auto   mt-16 flex flex-col lg:flex-row'>

            <div className='w-[100%] h-[35%] lg:w-[40%] lg:h-[100%]   flex gap-4 lg:flex-col lg:justify-center lg:pl-16'>

                <div className='h-[100%] w-[45%] lg:w-[70%] lg:h-[25%] flex flex-col gap-3 justify-center lg:border-b-2 lg:border-black'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-[#DB4444] rounded-full h-[2rem] w-[2rem] flex items-center justify-center'>
                            <img src="/Vector.png" alt="" className='h-[1.2rem] w-[1.2rem]' />
                        </div>
                        <span className='font-bold'>Call To Us</span>
                    </div>
                    <p className='text-[0.8rem]'>We are available 24/7, 7 days a week.</p>
                    <p className='text-[0.8rem]'>Phone: +8801611112222</p>
                </div>

                <div className='h-[100%] w-[45%] lg:w-[70%] lg:h-[30%]  flex flex-col   gap-3 justify-center'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-[#DB4444] rounded-full h-[2.2rem] w-[2.2rem] flex items-center justify-center'>
                            <img src="/inbox.png" alt="" className='h-[1.2rem] w-[1.4rem]' />
                        </div>
                        <span className='font-bold'>Write To Us</span>
                    </div>
                    <p className='text-[0.8rem]'>Fill out our form and we will contact you within 24 hours.</p>
                    <p className='text-[0.8rem] break-words lg:w-[80%] w-full'>Emails: customer@techhaven.com</p>
                </div>

            </div>

            <form action="" className='w-[100%] h-[65%] lg:h-[100%] flex flex-col justify-center gap-6'>
                <div className='w-[100%] flex gap-4   lg:w-[90%]'>
                    <input type="text" className='bg-[#F5F5F5] h-[2rem] lg:h-[3rem] w-[33%] placeholder:text-[0.7rem] pl-2 rounded-sm' placeholder='Your Name' />
                    <input type="text" className='bg-[#F5F5F5] h-[2rem] lg:h-[3rem] w-[33%] placeholder:text-[0.7rem] pl-2 rounded-sm' placeholder='Your Email' />
                    <input type="text" className='bg-[#F5F5F5] h-[2rem] lg:h-[3rem] w-[33%] placeholder:text-[0.7rem] pl-2 rounded-sm' placeholder='Your Phone' />
                </div>
                <textarea name="" id="" className='rounded-sm bg-[#F5F5F5] resize-none h-[12rem] w-[100%] lg:w-[90%]   placeholder:text-[0.7rem] pl-2 pt-4' placeholder='Your Message'></textarea>
                <button className='  h-[3rem] w-[10rem] lg:w-[12rem] text-white bg-[#DB4444] rounded-sm'>Send Message</button>
            </form>

        </div>
    )
}

export default ContactPage
