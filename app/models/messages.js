import mongoose from "mongoose"
import { APP_URL } from "../config";

const messagesSchema = mongoose.Schema({
    conversationId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        require: true
    },
}, { timestamps: true, toJSON: { getters: true }, id: false });

export default mongoose.model('Message', messagesSchema, 'messages');