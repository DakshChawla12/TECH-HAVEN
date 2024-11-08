import React from 'react'
import Hero from '../components/Hero';
import FlashSales from '../components/FlashSales';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Hero_2 from '../components/Hero2';
import Featured from '../components/Featured';

const HomePage = () => {
    return (
        <>
            <Hero />
            <FlashSales />
            <Categories />
            <BestSelling />
            <Hero_2 />
            <Featured />
        </>
    )
}

export default HomePage
