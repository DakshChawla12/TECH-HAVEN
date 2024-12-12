import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
});

const reviewModel = mongoose.model('Reviews',reviewSchema);

export default reviewModel;