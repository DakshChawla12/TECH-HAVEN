import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const MyOrdersPage = () => {

    const { fetchUserOrders, userOrders } = useContext(StoreContext);

    useEffect(() => {
        fetchUserOrders();
    }, []);

    if (!userOrders || userOrders.length < 1) {
        return (
            <div className='w-[90%] h-[40rem] mx-auto mt-16 flex flex-col gap-3 overflow-y-auto border-2 border-red-500 items-center justify-center'>
                <span className='text-[3rem] text-red-500 font-bold'>No Orders</span>
            </div>
        )
    }

    return (
        <div className='w-[90%] h-[40rem] mx-auto mt-16 flex flex-col gap-3 overflow-y-auto border-2 border-red-500'>
            <h1 className='font-bold text-[2rem] text-red-500 mb-2'>My Orders</h1>
            {userOrders.map((order) => {
                return <div className="border-2 rounded-lg shadow-md p-4 mb-4 bg-white">
                    <h2 className="text-lg font-bold mb-2">Order Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Name:</p>
                            <p>{order.userId.name || 'abc'}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Email:</p>
                            <p>{order.userId.email || 'abc'}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Phone:</p>
                            <p>{order.userId.phone || 'abc'}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Total Amount:</p>
                            <p>${order.totalAmount || 'abc'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-semibold">Shipping Address:</p>
                            <p>{order.shippingAddress || 'abc'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-semibold">status</p>
                            <p>{order.status || 'abc'}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default MyOrdersPage
