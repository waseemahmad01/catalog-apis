import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    profile_img: {
        type: String,
    },
    role: {
        type: String,
    },
    preference: {
        type: String,
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    sub_store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubStore'
    },
    type: {
        type: String,
        default: 'user'
    },
    promos: {
        type: Array
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');