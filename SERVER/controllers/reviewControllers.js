import reviewModel from '../models/reviewModel.js';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';
import httpStatus from 'http-status-codes';

const addReview = async (req,res) => {
    try {
        const {email} = req.user;
        const {comment} = req.body;
        const {prodId} = req.params;

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token', success: false });
        }

        const product = await productModel.findById(prodId);
        if(!product){
            return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"invalid product id"});
        }

        const newReview = new reviewModel({
            username:user.name,
            comment,
        });

        await newReview.save();
        product.reviews.push(newReview._id);
        product.populate('reviews');
        await product.save();

        res.status(httpStatus.CREATED).json({success:true,message:"review added",product});

    } catch (error) {
        console.log(error);
        
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:"failed to add review"});
    }
}

export {addReview};