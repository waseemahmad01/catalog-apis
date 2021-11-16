import mongoose from "mongoose"
import { APP_URL } from "../config";

const notifySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    image: {
        type: String,
        get: (image) => {
            // console.log(`${APP_URL}/${image}`);
            // http://localhost:5000/uploads/1616443169266-52350494.png
            return `${APP_URL}${image}`;
        }
    },
    type: {
        type: String,
        require: true
    },
}, { timestamps: true, toJSON: { getters: true }, id: false });

export default mongoose.model('Notification', notifySchema, 'notifications');