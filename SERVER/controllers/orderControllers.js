import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// Controller to place an order
const placeOrder = async (req, res) => {
    const { email, products, shippingAddress, paymentMethod } = req.body;
    
    try {
        // Ensure the user exists by email
        const user = await User.findOne({ email });  // Search by email
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the products are available in stock and calculate the total amount
        let totalAmount = 0;
        const orderProducts = [];
        
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }

            // Check stock availability
            if (product.inStock === false) {
                return res.status(400).json({ message: `Product ${product.name} is out of stock` });
            }

            // Calculate the price for the current product
            const productPrice = product.price * item.quantity;
            totalAmount += productPrice;

            orderProducts.push({
                productId: product._id,
                quantity: item.quantity,
                price: productPrice
            });
        }

        // Create the order
        const order = new Order({
            userId: user._id,  // Use the userId from the found user
            products: orderProducts,
            totalAmount,
            status: 'pending',
            shippingAddress,
            paymentMethod
        });

        const savedOrder = await order.save();

        // Add the order to the user's orders array
        user.orders.push({
            orderId: savedOrder._id,
            orderDate: savedOrder.orderDate,
            status: savedOrder.status,
            totalAmount,
            products: orderProducts
        });

        // Save the updated user document
        await user.save();

        // Optionally, clear the user's cart after placing the order
        user.cart = [];
        await user.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order: savedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {placeOrder};
