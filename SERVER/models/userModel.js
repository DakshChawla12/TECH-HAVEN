import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        trim: true
    },
    cart: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    },
    wishlist: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ],
        default: []
    },
    orders: {
        type: [
            {
                orderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Order' // Reference to the Order model
                },
                orderDate: {
                    type: Date,
                    default: Date.now
                },
                status: {
                    type: String,
                    enum: ['pending', 'completed', 'shipped', 'cancelled'],
                    default: 'pending'
                },
                totalAmount: {
                    type: Number,
                    required: true
                },
                products: [
                    {
                        productId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Product'
                        },
                        quantity: {
                            type: Number,
                            default: 1
                        }
                    }
                ]
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
