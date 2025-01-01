import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const ProductsPage = () => {
    const { allProducts, getAllProducts, totalPages, addToCart, addToWishlist, handleNavigation, handleFilter, currentPage, setCurrentPage } = useContext(StoreContext);
    const [filters, setFilters] = useState({
        maxPrice: '',
        category: '',
        inStock: ''
    });
    const [filtersApplied, setFiltersApplied] = useState(false);


    useEffect(() => {
        getAllProducts(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            filtersApplied
                ? handleFilter(filters, newPage)
                : getAllProducts(newPage);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            filtersApplied
                ? handleFilter(filters, newPage)
                : getAllProducts(newPage);
        }
    };


    const handleAddToCart = (prodID) => {
        addToCart(prodID);
    };

    const handleAddToWishlist = (prodID) => {
        addToWishlist(prodID);
    };

    const handleProductClick = (id) => {
        if (!localStorage.getItem('token')) {
            console.log("error");
            alert("Please login to view full details");
            return;
        }
        handleNavigation(`/product/${id}`); // Redirect to the details page based on the ID
    };

    const handleSubmit = () => {
        setFiltersApplied(true);
        handleFilter(filters, 1); // Reset to page 1 when filters are applied
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        console.log(filters);
    };

    return (
        <div className='h-[75rem] w-[90%] mt-16 pl-10 flex'>
            {/* Sidebar Section */}
            <div className='h-[70%] w-[30%] border-2 border-green-500 flex flex-col pt-20 items-start'>
                {/* Max Price */}
                <div className='ml-7 w-[80%] h-[5rem] flex flex-col'>
                    <span className='text-lg font-semibold'>Max Price</span>
                    <div className='flex items-center w-[100%] h-[80%] gap-5'>
                        <input
                            type="range"
                            className='w-[80%]'
                            max="20000"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        />
                        <span>{filters.maxPrice || '0'}</span>
                    </div>
                </div>

                {/* Category Selection */}
                <div className="p-6 rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Choose a Category:</h2>
                    <form>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Televisions">Televisions</option>
                            <option value="gaming">Gaming</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <h2 className="text-lg font-semibold mt-4">In Stock:</h2>
                        <select
                            name="inStock"
                            value={filters.inStock}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md mt-4"
                        >
                            <option value="" disabled>
                                In Stock
                            </option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </form>
                </div>

                {/* Apply Filter Button */}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ml-7"
                    onClick={handleSubmit}
                >
                    Apply Filters
                </button>
            </div>

            {/* Product List Section */}
            <div className='w-[70%] h-[100%] flex flex-col gap-10'>
                {/* Render Products */}
                {allProducts.map((product) => (
                    <div key={product._id} className='h-[22%] w-[100%] border-t-2 border-b-2 border-t-gray-200 border-b-gray-200 flex justify-between'>
                        {/* Product Image */}
                        <div className='h-[100%] w-[30%] bg-[#E6E6E6] flex justify-center'>
                            <img
                                src={product.images[0]}
                                alt=""
                                className='h-[100%] cursor-pointer'
                                onClick={() => handleProductClick(product._id)}
                            />
                        </div>
                        {/* Product Details */}
                        <div className='h-[100%] w-[50%] flex flex-col gap-4'>
                            <span
                                className='text-[2.5rem] font-medium cursor-pointer'
                                onClick={() => handleProductClick(product._id)}
                            >
                                {product.name}
                            </span>
                            <span className='text-[0.9rem] text-gray-500'>{product.rating}/5 (average user rating)</span>
                            <span className='text-[1.2rem] text-red-500'>${product.price}</span>
                            <p className='w-[75%] text-[0.9rem]'>{product.description}</p>
                        </div>
                        {/* Product Actions */}
                        <div className='h-[100%] w-[15%] flex flex-col justify-center items-center gap-5'>
                            <button
                                className='h-[3rem] w-[100%] text-white bg-[#DB4444] rounded-sm'
                                onClick={() => handleAddToCart(product._id)}
                            >
                                Add To Cart
                            </button>
                            <button
                                className='h-[3rem] w-[100%] bg-white text-[#DB4444] rounded-sm border-2 border-[#DB4444]'
                                onClick={() => handleAddToWishlist(product._id)}
                            >
                                Add To WishList
                            </button>
                        </div>
                    </div>
                ))}

                {/* Pagination */}
                <div className='w-[40%] h-[3rem] flex justify-between items-center mt-4 mx-auto'>
                    <button
                        disabled={currentPage === 1}
                        onClick={handlePreviousPage}
                        className='px-4 py-2 text-white bg-[#DB4444] rounded-sm disabled:opacity-50'
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages > 0 ? totalPages : 1}</span>
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
