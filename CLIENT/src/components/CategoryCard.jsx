import React from 'react';

const CategoryCard = ({ name, url }) => {
    return (
        <div className='border-2 border-gray-300 h-[30%] w-[21%] flex flex-col justify-center items-center md:h-[45%] 1.5xl:h-[50%] 1.5xl:w-[25%] gap-1 hover:bg-[#DB4444] hover:text-white transition-all duration-300 ease-in-out'>
            <img src={url} alt="" className='h-[1.5rem] w-[1.5rem] md:h-[2.5rem] md:w-[2.5rem]' />
            <span className='text-xs md:text-[0.9rem]'>{name}</span>
        </div>
    );
};

export default CategoryCard;
