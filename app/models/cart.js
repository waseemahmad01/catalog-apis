import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: Array,
    },
    quantity: {
        type: Number,
    }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema, 'carts');