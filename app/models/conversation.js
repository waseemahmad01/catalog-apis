import mongoose from "mongoose"
import { APP_URL } from "../config";

const conversationSchema = mongoose.Schema({
    members: {
        type: Array,
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    from_profile: {
        type: String,
    },
    to_profile: {
        type: String,
    },
    
}, { timestamps: true, toJSON: { getters: true }, id: false });

export default mongoose.model('Conversation', conversationSchema, 'conversations');