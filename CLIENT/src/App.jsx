import React from 'react';
import Navbar from './components/Navbar';
import SaleBar from './components/SaleBar';
import Hero from './components/Hero';
import FlashSales from './components/FlashSales';
import Categories from './components/Categories';

const App = () => {
  return (
    <>
      <SaleBar />
      <Navbar />
      <Hero />
      <FlashSales />
      <Categories />
    </>
  )
}

export default App
