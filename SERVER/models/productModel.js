import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: [String], 
        trim: true
    },
    images: {
        type: [String]
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
