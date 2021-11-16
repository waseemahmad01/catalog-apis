import mongoose from "mongoose";
import { APP_URL } from "../config";
const productSchema = mongoose.Schema(
	{
		images: {
			type: [String],
			required: true,
		},
		product_name: {
			type: String,
			required: true,
		},
		product_category: {
			type: String,
			required: true,
		},
		product_filters: {
			type: String,
			required: true,
		},
		product_description: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		color: {
			type: Number,
			required: true,
		},
		weight: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			minimum: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		store_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
		},
	},
	{ timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("Product", productSchema, "products");
