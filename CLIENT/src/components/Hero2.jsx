import React from 'react';

const Hero_2 = () => {
    return (
        <div className="w-[100%] md:w-[98%] h-[20rem] md:h-[30rem] mt-[5rem] md:mx-auto">
            <div className="w-[95%] mx-auto h-full flex bg-black bg-[radial-gradient(circle_at_70%,rgba(255,255,255,0.2),rgba(255,255,255,0))]">
                {/* Left Section */}
                <div className="w-2/5 h-full flex flex-col justify-center items-start pl-8 md:pl-16 gap-6">
                    <span className="text-[#00FF66] md:text-[1.3rem]">Categories</span>
                    <h1 className="text-xl md:text-3xl leading-[1.4] text-white">
                        Enhance Your <br />
                        Music Experience
                    </h1>
                    <div className="flex h-[14%] items-center text-white gap-4">
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full flex flex-col items-center justify-center text-xs bg-white text-black">
                            <span className="font-semibold text-sm">3</span>
                            <span className='text-[0.6rem]'>days</span>
                        </div>
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full flex flex-col items-center justify-center text-xs bg-white text-black">
                            <span className="font-semibold text-sm">23</span>
                            <span className='text-[0.6rem]'>hours</span>
                        </div>
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full flex flex-col items-center justify-center text-xs bg-white text-black">
                            <span className="font-semibold text-sm">40</span>
                            <span className='text-[0.6rem]'>minutes</span>
                        </div>
                    </div>
                    <button className="rounded-md w-[7rem] h-[2.5rem] md:w-1/3 md:h-14 md:mt-2 flex items-center justify-center bg-[#00FF66] text-white border-none">
                        Buy Now
                    </button>
                </div>

                {/* Right Section */}
                <div className="w-3/5 h-full flex items-center pl-[5vw]">
                    <img src="/jbl.png" alt="" className="w-[90%] border-none" />
                </div>
            </div>
        </div>
    );
};

export default Hero_2;
