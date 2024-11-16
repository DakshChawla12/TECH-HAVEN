import Product from '../models/productModel.js';
import httpStatus from 'http-status-codes';

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(httpStatus.OK).json({ success: true, products, message: "Products fetched successfully" });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error fetching products" });
    }
};

const getById = async (req, res) => {
    try {
        const { prodID } = req.params;
        const product = await Product.findById(prodID);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product, message: "Product fetched successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching product" });
    }
};

const getFourProducts = async (req, res) => {
    try {
        const products = await Product.find().limit(4);
        res.status(200).json({ success: true, featuredProducts: products });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

const addProduct = async (req, res) => {
    const { name, rating, price, description, inStock, category, images } = req.body;

    try {
        const newProduct = new Product({
            name,
            rating,
            price,
            description,
            inStock,
            category,
            images
        });
        await newProduct.save();

        return res.status(httpStatus.CREATED).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add product"
        });
    }
};

const getFilteredProducts = async (req, res) => {
    try {
        const {
            name,
            minRating,
            maxRating,
            minPrice,
            maxPrice,
            inStock,
            category,
        } = req.query;

        const filters = {};

        if (name) {
            filters.name = { $regex: name, $options: 'i' };
        }
        if (minRating || maxRating) {
            filters.rating = {};
            if (minRating) filters.rating.$gte = parseFloat(minRating);
            if (maxRating) filters.rating.$lte = parseFloat(maxRating);
        }
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = parseFloat(minPrice);
            if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
        }
        if (inStock) {
            filters.inStock = inStock === 'true'; // Convert string to boolean
        }
        if (category) {
            filters.category = { $in: category.split(',') };
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Product.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const products = await Product.find();
        res.status(200).json({ success: true, message: "Product deleted successfully", products });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};


export { getAllProducts , addProduct  , deleteProduct, getFilteredProducts , getFourProducts , getById};
