import React from 'react';

const SaleBar = () => {
    return (
        <div className="w-[100%] h-10 bg-black text-white flex justify-center items-center">
            <p className="text-[0.7rem] md:text-base">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </p>
            <span className='ml-2 underline text-[0.7rem] md:text-base'>Shop now</span>
        </div>
    );
};

export default SaleBar;
