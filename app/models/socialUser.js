import mongoose from "mongoose"

const socialUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('SocialUser', socialUserSchema, 'socialusers');