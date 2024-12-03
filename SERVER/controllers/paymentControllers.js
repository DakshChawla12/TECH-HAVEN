    import instance from '../razorpay.js';
    import crypto from 'crypto';
    import dotenv from 'dotenv';
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
        const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log(order_id);
        console.log(razorpay_payment_id);
        console.log(razorpay_signature);

        try {
            const secret = process.env.RAZORPAY_SECRET;

            // Create HMAC and generate signature
            const hmac = crypto.createHmac('sha256', secret);
            hmac.update(order_id + "|" + razorpay_payment_id);
            const generated_signature = hmac.digest('hex');

            if (generated_signature === razorpay_signature) {
                console.log("Payment verification successful");
                res.redirect("http://localhost:5173");
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
