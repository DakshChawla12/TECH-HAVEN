import React, { useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const OrderCard = ({ order }) => {

    const { changeOrderStatus } = useContext(StoreContext);

    const [status, setStatus] = useState(order.status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        console.log(`Order ID: ${order.id}, New Status: ${e.target.value}`);
    };

    const handleUpdateClick = () => {
        changeOrderStatus(order._id, status);
    }

    return (
        <div className="border-2 rounded-lg shadow-md p-4 mb-4 bg-white">
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
                <div className="col-span-2 flex items-center gap-4">
                    <p className="font-semibold">Status:</p>
                    <select
                        value={status || 'abc'}
                        onChange={handleStatusChange}
                        className="border rounded-md p-2 text-gray-700"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                        onClick={handleUpdateClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Status
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
