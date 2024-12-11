import React, { useEffect, useContext } from 'react';
import OrderCard from '../components/OrderCard';
import { StoreContext } from '../Context/StoreContext';

const AllOrders = () => {

    const { fetchAllOrders, allOrders } = useContext(StoreContext);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    if (!allOrders || allOrders.length < 1) {
        return (
            <div className='w-[90%] h-[40rem] mx-auto mt-16 flex flex-col gap-3 overflow-y-auto border-2 border-red-500 items-center justify-center'>
                <span className='text-[3rem] text-red-500 font-bold'>No Orders</span>
            </div>
        )
    }

    return (
        <div className='w-[90%] h-[40rem] mx-auto mt-16 flex flex-col gap-3 overflow-y-auto border-2 border-red-500'>
            {allOrders.map((order) => {
                return <OrderCard key={order._id} order={order} />
            })}
        </div>
    )
}

export default AllOrders
