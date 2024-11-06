import React from 'react';
import Navbar from './components/Navbar';
import SaleBar from './components/SaleBar';
import Hero from './components/Hero';
import FlashSales from './components/FlashSales';
import Categories from './components/Categories';
import BestSelling from './components/BestSelling';
import Hero_2 from './components/Hero2';
import Featured from './components/Featured';

const App = () => {
  return (
    <>
      <SaleBar />
      <Navbar />
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <Hero_2 />
      <Featured />
    </>
  )
}

export default App
