import React from 'react';
import Navbar from './components/Navbar';
import SaleBar from './components/SaleBar';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import Signup_page from './Pages/Signup_page';
import { Routes, Route } from 'react-router-dom';
import CartPage from './Pages/CartPage';

const App = () => {
  return (
    <>

      <SaleBar />
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup_page />} />
        <Route path='/login' element={<Signup_page />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
