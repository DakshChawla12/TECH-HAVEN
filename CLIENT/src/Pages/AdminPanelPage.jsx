import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { MdOutlineModeEdit, MdDeleteForever } from "react-icons/md";

const AdminPanelPage = () => {

    const { getAllProducts, allProducts } = useContext(StoreContext);

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className='w-[80%] h-auto mx-auto mt-16 border-2 border-red-500 flex flex-col gap-3'>

            <h1 className='text-[2.5rem] font-medium'>Edit Product</h1>

            <form action="" className='w-[80%] h-[34rem] border-2 border-green-500 flex flex-col gap-2'>

                <h1 className='text-[1.3rem] font-medium'>Selected Product: no product selected</h1>

                <div className='h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500'>
                    <label htmlFor="" className='text-[0.95rem] text-gray-700'> name:</label>
                    <input type="text" className='h-[2rem] w-[80%] bg-[#E6E6E6] rounded-sm' />
                </div>

                <div className='h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500'>
                    <label htmlFor="" className='text-[0.95rem] text-gray-700'> price:</label>
                    <input type="text" className='h-[2rem] w-[80%] bg-[#E6E6E6] rounded-sm' />
                </div>

                <div className='h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500'>
                    <label htmlFor="" className='text-[0.95rem] text-gray-700'> In Stock:</label>
                    <input type="text" className='h-[2rem] w-[80%] bg-[#E6E6E6] rounded-sm' />
                </div>

                <div className='h-[10rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500'>
                    <label htmlFor="" className='text-[0.95rem] text-gray-700'> description:</label>
                    <textarea type="text" className='h-[7rem] w-[80%] bg-[#E6E6E6] rounded-sm resize-none' />
                </div>

                <div className='h-[5rem] w-[60%] flex flex-col gap-2 border-2 border-purple-500'>
                    <label htmlFor="" className='text-[0.95rem] text-gray-700'> rating:</label>
                    <input type="text" className='h-[2rem] w-[80%] bg-[#E6E6E6] rounded-sm' />
                </div>

            </form>

            <h1 className='text-[2.5rem] font-medium'>Select a product to edit</h1>

            <div className='w-[100%] flex flex-col gap-3'>
                {allProducts.map((product) => {
                    return <div className='h-[4rem] w-[100%] flex items-center justify-between px-4 bg-gray-100'>
                        <div className='w-[40%] h-[90%] flex items-center gap-2'>
                            <img src={product.images[0]} alt="" className='h-[3rem] w-[3rem]' />
                            <span>{product.name}</span>
                            <span>${product.price}</span>
                        </div>
                        <div className='w-[20%] h-[90%] flex items-center justify-around'>
                            <button><MdDeleteForever className='h-[2.5rem] w-[2.5rem] text-red-500 cursor-pointer' /></button>
                            <button className='h-[90%] w-[8rem] rounded-sm flex items-center gap-3 justify-center bg-[#DB4444] text-white cursor-pointer'>
                                <MdOutlineModeEdit className='h-[1.8rem] w-[2rem]' />
                                <span className='text-[1.4rem]'>edit</span>
                            </button>
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}

export default AdminPanelPage
