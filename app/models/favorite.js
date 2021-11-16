import mongoose from "mongoose"

const favoriteSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        // enum: ['Store', 'SubStore']
        ref: 'Store',

    }],
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product'
    },
    substores: [{
        type: mongoose.Schema.Types.ObjectId,
        // enum: ['Store', 'SubStore']
        ref: 'SubStore',
    }]
}, { timestamps: true });


export default mongoose.model('Favorite', favoriteSchema, 'favorites');