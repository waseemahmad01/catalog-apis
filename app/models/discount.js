import mongoose from "mongoose"
import { APP_URL } from "../config";

const discountSchema = mongoose.Schema({
    discount_img: {
        type: String,
        required: true, get: (image) => {
            // http://localhost:5000/uploads/1616443169266-52350494.png
            return `${APP_URL}${image}`;
        }
    },
    discount: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    ending_date: {
        type: String,
        required: true
    },
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        enum: ['Store', 'SubStore']
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true, toJSON: { getters: true }, id: false });

export default mongoose.model('Discount', discountSchema, 'discounts');