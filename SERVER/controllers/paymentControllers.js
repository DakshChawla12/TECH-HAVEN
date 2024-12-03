    import instance from '../razorpay.js';
    import crypto from 'crypto';
    import dotenv from 'dotenv';
    import User from '../models/userModel.js';
    import Order from '../models/orderModel.js';
    dotenv.config();

    export const checkout = async (req, res) => {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };

        try {
            const order = await instance.orders.create(options);
            console.log(order);

            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create order",
            });
        }
    };

export const paymentVerification = async (req, res) => {
    const { order_id, razorpay_payment_id, razorpay_signature, cart, shippingAddress,totalAmount } = req.body;
    const {email} = req.user;
    try {
        const secret = process.env.RAZORPAY_SECRET;

        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature === razorpay_signature) {
            console.log("Payment verification successful");


            const user = await User.findOne({email});

            const newOrder = new Order({
                userId:user._id,
                products: cart.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                    price: item.productId.price
                })),
                totalAmount,
                fullName:user.name,
                email,
                phone:user.phone,
                shippingAddress,
            });

            await newOrder.save();
            user.orders.push(newOrder._id);
            user.cart = [];
            await user.save();

            console.log("Order created successfully:", newOrder);

            res.status(200).json({
                success: true,
                message: "Payment verified and order created successfully",
                order: newOrder
            });
        } else {
            console.log("Payment verification failed");
            res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }
    } catch (error) {
        console.error("Error during payment verification:", error);
        res.status(500).json({
            success: false,
            message: "Server error during payment verification",
        });
    }
};

