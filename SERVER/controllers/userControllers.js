import User from '../models/userModel.js';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';

// *** profile controllers *** //

const getUserDetails = async (req,res) => {
    const { email } = req.user;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found , please enter a valid email" });
        }
        const userDetails = {
            name: user.name,
            email:user.email,
            phone:user.phone
        };

        return res.status(httpStatus.OK).json({ success: true, message: "User details fetched successfully", userDetails });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
    }
}

const changeUserDetails = async (req, res) => {
    const { email } = req.user;
    const { NewName, NewMail, NewPhone, currPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }
        if (NewName) user.name = NewName;
        if (NewMail) user.email = NewMail;
        if (NewPhone) user.phone = NewPhone;
        if (newPassword) {
            if (!currPassword) {
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: "Current password is required to change password" });
            }
            const isMatch = await bcrypt.compare(currPassword, user.password);
            if (!isMatch) {
                return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid current password" });
            }
            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: "New password must be different from the current password" });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }
        await user.save();
        const { password, ...userWithoutPassword } = user.toObject();

        return res.status(httpStatus.OK).json({ success: true, message: "Details Updated", user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
    }
};


// *** cart and wishlist controllers *** //

const getLength = async (req,res) => {
    const { email } = req.user; 

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Item added to cart successfully",
            cartLength: user.cart.length,
            wishListLength:user.wishlist.length
        });

    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add item to cart"
        });
    }
}

const addToCart = async (req, res) => {
    const { prodID } = req.body;
    const { email } = req.user; 

    try {
        const user = await User.findOne({email});
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
            message: "Item added to cart successfully",
            cart: user.cart
        });

    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add item to cart"
        });
    }
};

const deleteFromCart = async (req, res) => {
    const { prodID } = req.params;
    const { email } = req.user;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }

        const productIndex = user.cart.findIndex(item => item.productId._id.equals(prodID));
        if (productIndex === -1) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "Product not found in cart" });
        }

        user.cart.splice(productIndex, 1);
        await user.save();
        await user.populate('cart.productId');

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Product removed from cart successfully",
            cart: user.cart
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to remove product from cart"
        });
    }
};

const updateQuantity = async (req, res) => {
    const { prodID, change } = req.body;
    const { email } = req.user;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }

        const productIndex = user.cart.findIndex(item => item.productId._id.equals(prodID));
        if (productIndex === -1) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "Product not found in cart" });
        }

        user.cart[productIndex].quantity += change;

        if (user.cart[productIndex].quantity < 1) {
            user.cart.splice(productIndex, 1);
        }

        await user.save();
        await user.populate('cart.productId');

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Cart updated successfully",
            cart: user.cart
        });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to update cart"
        });
    }
};


const getCartItems = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        await user.populate('cart.productId');
        console.log(user.cart);
        res.status(httpStatus.OK).json({
            success: true,
            cart: user.cart,
            message: "Items fetched successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: "Error fetching data" 
        });
    }
}


const addToWishList = async (req, res) => {
    const { email } = req.user;
    const { prodID } = req.body;
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

const deleteFromWishlist = async (req, res) => {
    const { email } = req.user;
    const { prodID } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const productIndex = user.wishlist.findIndex(
            (item) => item._id.equals(prodID)
        );

        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in wishlist" });
        }

        user.wishlist.splice(productIndex, 1);

        await user.save();
        await user.populate('wishlist');

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist successfully",
            wishlist: user.wishlist
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to remove product from wishlist"
        });
    }
};


const getWishList = async (req,res) => {
    const { email } = req.user;
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found" });
        }
        await user.populate('wishlist');
        res.status(httpStatus.OK).json({success:true,wishlist:user.wishlist,message:"items fetched successfully"});
    } catch (err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            success: false, 
            message: "error fetching data" 
        });
    }
}

export { addToCart , addToWishList , getCartItems , getWishList , deleteFromCart , updateQuantity , deleteFromWishlist , getLength , getUserDetails , changeUserDetails};
