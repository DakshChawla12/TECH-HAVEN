import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import httpStatus from 'http-status-codes';

const getUserOrders = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email }).populate({
            path: 'orders',
            populate: {
                path: 'products.productId',
                model: 'Product'
            }
        });

        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Invalid Token"
            });
        }

        res.status(httpStatus.OK).json({
            success: true,
            orders: user.orders
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving user orders",
            error: error.message
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Invalid Token"
            });
        }

        if (!user.isAdmin) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "You are not authorized to perform this action"
            });
        }

        const orders = await Order.find()
            .populate({
                path: 'userId',
                select: 'name email phone',
            })
            .populate({
                path: 'products.productId',
                select: 'name description price category images', 
            });

        if (!orders || orders.length === 0) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "No orders found"
            });
        }

        res.status(httpStatus.OK).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving orders",
            error: error.message,
        });
    }
};

const changeOrderStatus = async (req,res) => {
    try {
        const {email} = req.user;
        const {orderID} = req.params;
        const{status} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Invalid Token"
            });
        }
        if(!user.isAdmin){
            return res.status(httpStatus.UNAUTHORIZED).json({success:false,message:"you are not authorized to perform this action"})
        }
        const newStatus = ['pending', 'completed', 'shipped', 'cancelled'];
        if(!newStatus.includes(status)){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Invalid status"
            });
        }
        const order = await Order.findById(orderID);
        if(!order){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Invalid order ID"
            });
        }
        order.status = status;
        await order.save();
        const orders = await Order.find()
            .populate({
                path: 'userId',
                select: 'name email phone',
            })
            .populate({
                path: 'products.productId',
                select: 'name description price category images', 
            });
        res.status(httpStatus.OK).json({success:true,message:`order with orderID ${orderID} updated successfully`,orders});
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving orders",
            error: error.message
        });
    }
}

export {getUserOrders,getAllOrders,changeOrderStatus};
