import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';

const Checkout = () => {

    const { cart, checkOutHandler } = useContext(StoreContext);
    const userToken = localStorage.getItem('token');

    const [shippingAddress, setShippingAddress] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    }

    const name = localStorage.getItem('name');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');

    if (!userToken) {
        return (
            <div className="w-[80%] h-[50rem] mx-auto mt-16 flex items-center justify-center">
                <h1 className="text-[2rem] font-medium text-red-500">Please login to checkout</h1>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="w-[80%] h-[50rem] mx-auto mt-16 flex items-center justify-center">
                <h1 className="text-[2rem] font-medium text-red-500">Please add something to the cart to checkout</h1>
            </div>
        );
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
    }, 0);

    return (
        <div className='w-[80%] h-[50rem] mx-auto mt-16 border-2 border-red-500 flex items-center justify-center gap-5'>

            <form className='h-[100%] w-[45%] border-2 border-red-500 flex flex-col justify-between'>

                <h1 className='text-[2.7rem] font-medium'>Billings Details</h1>
                <div className='w-[70%] h-[90%] border-2 border-red-500 flex flex-col gap-5'>

                    <div className='h-[12%] w-[100%]  flex flex-col gap-4'>
                        <label className='text-[0.9rem] text-gray-500' htmlFor="">Full Name <span className='text-red-500'>*</span></label>
                        <input type="text" className='h-[2.2rem] w-[100%] bg-[#F5F5F5] rounded-sm' placeholder={name} disabled />
                    </div>
                    <div className='h-[12%] w-[100%]  flex flex-col gap-4'>
                        <label className='text-[0.9rem] text-gray-500' htmlFor="">Phone No. <span className='text-red-500'>*</span></label>
                        <input type="text" className='h-[2.2rem] w-[100%] bg-[#F5F5F5] rounded-sm' placeholder={phone} disabled />
                    </div>
                    <div className='h-[12%] w-[100%]  flex flex-col gap-4'>
                        <label className='text-[0.9rem] text-gray-500' htmlFor="">Email <span className='text-red-500'>*</span></label>
                        <input type="text" className='h-[2.2rem] w-[100%] bg-[#F5F5F5] rounded-sm' placeholder={email} disabled />
                    </div>
                    <div className='h-[12%] w-[100%]  flex flex-col gap-4'>
                        <label className='text-[0.9rem] text-gray-500' htmlFor="">Shipping Address <span className='text-red-500'>*</span></label>
                        <input type="text" className='h-[2.2rem] w-[100%] bg-[#F5F5F5] rounded-sm' onChange={handleChange} />
                    </div>

                </div>

            </form>

            <div className='h-[75%] w-[35%] border-2 border-red-500 flex flex-col gap-3'>
                <div className='w-[90%] border-2 border-red-500'>
                    {
                        cart.map((item) => {
                            return <div key={item._id} className='h-[3rem] w-[100%] flex items-center justify-between'>
                                <div className='flex items-center gap-4 w-[60%]'>
                                    <img src={item.productId.images[0]} className='h-[2.5rem] w-[2.5rem]' alt="" />
                                    <span className='text-[0.9rem] font-medium'>{item.productId.name}</span>
                                </div>
                                <span className='text-[0.9rem] font-medium'>${item.productId.price * item.quantity}</span>
                            </div>;
                        })

                    }
                </div>

                <div className='h-[25%] w-[90%] border-2 border-red-500 flex flex-col gap-4'>
                    <div className='w-[100%] h-[2.5rem] pb-2 border-b-2 border-b-gray-300 flex justify-between'>
                        <span className='text-[0.9rem]'>Subtotal:</span>
                        <span className='text-[0.9rem]'>{totalPrice}$</span>
                    </div>
                    <div className='w-[100%] h-[2.5rem] pb-2 border-b-2 border-b-gray-300 flex justify-between'>
                        <span className='text-[0.9rem]'>Shipping:</span>
                        <span className='text-[0.9rem]'>40$</span>
                    </div>
                    <div className='w-[100%] h-[2.5rem] pb-2 flex justify-between'>
                        <span className='text-[0.9rem]'>Total:</span>
                        <span className='text-[0.9rem]'>{totalPrice + 40}$</span>
                    </div>
                </div>
                <button className='h-[3rem] w-[10rem] text-white rounded-sm text-[0.9rem] bg-[#DB4444] mt-10' onClick={() => checkOutHandler(totalPrice + 40, shippingAddress)}>Place Order</button>
            </div>

        </div>
    )
}

export default Checkout
