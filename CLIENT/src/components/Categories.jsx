import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const categories = [
        { name: 'phone', url: '/phone.png' },
        { name: 'computer', url: '/computer.png' },
        { name: 'smartwatch', url: '/smartwatch.png' },
        { name: 'camera', url: '/camera.png' },
        { name: 'headphone', url: '/headphone.png' },
        { name: 'gaming', url: '/gamepad.png' }
    ];

    return (
        <div className='w-[95%] h-[30rem] md:h-[24rem] lg:h-[25rem] mx-auto mt-12 flex flex-col border-2 border-red-400'>
            <div className='h-[3.5rem] md:h-[20%] w-[30%] flex items-center gap-1'>
                <p className='w-[1rem] h-[70%] bg-red-500 rounded-sm'></p>
                <span className='font-bold text-[0.9rem] text-[#DB4444]'>Categories</span>
            </div>

            <div>
                <p className='font-medium text-[2rem]'>Browse By Category</p>
            </div>

            <div className='flex flex-wrap md:flex-nowrap gap-4 w-full h-[70%] mt-5 border-2 border-red-400 items-center lg:justify-center lg:gap-10'>
                {categories.map(category => (
                    <CategoryCard name={category.name} url={category.url} key={category.name} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
