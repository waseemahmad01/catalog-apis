import mongoose from "mongoose"

const viewsSchema = mongoose.Schema({
    userId: {
        type: Array,
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        enum: ['Store', 'SubStore']
    },
    counter: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

export default mongoose.model('View', viewsSchema, 'views');