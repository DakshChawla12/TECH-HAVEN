import Product from '../models/productModel.js';
import httpStatus from 'http-status-codes';

const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is specified
        const limit = 4; // Fixed limit of 5 products per page

        const products = await Product.find().skip((page - 1) * limit).limit(limit); // Always limit to 5 products

        const totalProducts = await Product.countDocuments(); // Total number of products

        res.status(200).json({
            success: true,
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            message: "Products fetched successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
        });
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
        console.log("Request received to fetch four products"); // Log when the function is invoked
        const products = await Product.find().limit(4);
        
        res.status(200).json({ success: true, featuredProducts: products });
    } catch (err) {
        console.error("Error fetching four products:", err); // Log any errors
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
    const { prodID } = req.params;
    try {
        const result = await Product.findByIdAndDelete(prodID);
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const products = await Product.find();
        res.status(200).json({ success: true, message: "Product deleted successfully", products });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};

const editProduct = async (req, res) => {
    try {
        const { prodID } = req.params;
        const { name, price, inStock, description, rating } = req.body;

        console.log('request received', name, price, inStock, description, rating, prodID);

        if (!prodID) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ success: false, message: "Please provide product ID" });
        }

        const product = await Product.findById(prodID);
        if (!product) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ success: false, message: "Invalid product ID" });
        }

        if (name) product.name = name;
        if (price !== undefined) product.price = parseFloat(price);
        if (inStock !== undefined) product.inStock = inStock === 'true' || inStock === true;
        if (description) product.description = description;

        // Ensure the rating is a valid number
        if (rating !== undefined) {
            const parsedRating = parseFloat(rating);
            if (!isNaN(parsedRating)) {
                product.rating = parsedRating;
            } else {
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .json({ success: false, message: "Invalid rating value" });
            }
        }

        await product.save();

        const products = await Product.find();
        res.status(httpStatus.OK).json({
            success: true,
            message: `Product with name ${product.name} edited successfully`,
            products,
        });
    } catch (error) {
        console.error(error);
        res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "Internal server error" });
    }
};


export { getAllProducts , addProduct  , deleteProduct, getFilteredProducts , getFourProducts , getById, editProduct};
