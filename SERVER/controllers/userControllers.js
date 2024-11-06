import User from '../models/userModel.js';
import httpStatus from 'http-status-codes';

const addToCart = async (req, res) => {
    const { email, prodID } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }
        const currCart = user.cart;
        const idx = currCart.findIndex(item => item.productId.equals(prodID));      
        if (idx === -1) {
            const newItem = {
                productId: prodID,
                quantity: 1
            };
            user.cart.push(newItem);
        } else {
            currCart[idx].quantity += 1;
        }
        await user.save();
        await user.populate('cart.productId');
        return res.status(httpStatus.OK).json({ 
            success: true, 
            message: "Item added successfully", 
            cart: user.cart
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: "Failed to add item" 
        });
    }
};

const getCartItems = async (req,res) =>{
    const { email } = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }
        await user.populate('cart.productId');
        res.status(httpStatus.OK).json({success:true,cart:user.cart,message:"items fetched successfully"});
    } catch (err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: "error fetching data" 
        });
    }
}


const addToWishList = async (req, res) => {
    const { email, prodID } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }
        const wishlist = user.wishlist;
        const idx = wishlist.findIndex(item => item.equals(prodID));

        if (idx === -1) {
            user.wishlist.push(prodID);
        } else {
            return res.status(httpStatus.BAD_REQUEST).json({ 
                success: false, 
                message: "Item is already in the wishlist" 
            });
        }
        await user.save();
        await user.populate('wishlist');
        return res.status(httpStatus.OK).json({ 
            success: true, 
            message: "Item added to wishlist successfully", 
            wishlist: user.wishlist 
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: "Failed to add item to wishlist" 
        });
    }
};

const getWishList = async (req,res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }
        await user.populate('wishlist');
        res.status(httpStatus.OK).json({success:true,cart:user.wishlist,message:"items fetched successfully"});
    } catch (err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: "error fetching data" 
        });
    }
}

export { addToCart , addToWishList , getCartItems , getWishList};
