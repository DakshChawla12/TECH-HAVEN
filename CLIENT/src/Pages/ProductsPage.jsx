import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const ProductsPage = () => {
    const { allProducts, getAllProducts, totalPages, addToCart, addToWishlist, handleNavigation } = useContext(StoreContext);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getAllProducts(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleAddToCart = (prodID) => {
        addToCart(prodID);
    }

    const handleAddToWishlist = (prodID) => {
        addToWishlist(prodID);
    }

    const handleProductClick = (id) => {
        if (!localStorage.getItem('token')) {
            console.log("error");
            handleFailure("please login to view full details");
            return;
        }
        handleNavigation(`/product/${id}`); // Redirect to the details page based on the ID
    };

    return (
        <div className='h-[75rem] w-[90%] mt-16 pl-10 flex'>
            <div className='h-[100%] w-[30%] border-2 border-green-500'></div>
            <div className='w-[70%] h-[100%] flex flex-col gap-10'>
                {allProducts.map((product) => (
                    <div key={product._id} className='h-[22%] w-[100%] border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 flex justify-between'>
                        <div className='h-[100%] w-[30%] bg-[#E6E6E6] flex justify-center'>
                            <img src={product.images[0]} alt="" className='h-[100%] cursor-pointer' onClick={() => handleProductClick(product._id)} />
                        </div>
                        <div className='h-[100%] w-[50%] flex flex-col gap-4'>
                            <span className='text-[2.5rem] font-medium cursor-pointer' onClick={() => handleProductClick(product._id)}>{product.name}</span>
                            <span className='text-[0.9rem] text-gray-500'>{product.rating}/5 (average user rating)</span>
                            <span className='text-[1.2rem] text-red-500'>${product.price}</span>
                            <p className='w-[75%] text-[0.9rem]'>{product.description}</p>
                        </div>
                        <div className='h-[100%] w-[15%] flex flex-col justify-center items-center gap-5'>
                            <button className='h-[3rem] w-[100%] text-white bg-[#DB4444] rounded-sm' onClick={() => handleAddToCart(product._id)}>Add To Cart</button>
                            <button className='h-[3rem] w-[100%] bg-white text-[#DB4444] rounded-sm border-2 border-[#DB4444]' onClick={() => handleAddToWishlist(product._id)}>Add To WishList</button>
                        </div>
                    </div>
                ))}
                <div className='w-[40%] h-[3rem] flex justify-between items-center mt-4 mx-auto'>
                    <button
                        disabled={currentPage === 1}
                        onClick={handlePreviousPage}
                        className='px-4 py-2 text-white bg-[#DB4444] rounded-sm disabled:opacity-50'
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={handleNextPage}
                        className='px-4 py-2 text-white bg-[#DB4444] rounded-sm disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
