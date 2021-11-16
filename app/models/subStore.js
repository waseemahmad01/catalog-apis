import mongoose from "mongoose";
import { APP_URL } from "../config";

const storeSchema = mongoose.Schema(
	{
		store_logo: {
			type: String,
			required: true,
			get: (image) => {
				// console.log(`${APP_URL}/${image}`);
				// http://localhost:5000/uploads/1616443169266-52350494.png
				return `${APP_URL}${image}`;
			},
		},
		store_name: {
			type: String,
			required: true,
		},
		store_category: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		store_description: {
			type: String,
			required: true,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		status: {
			approval_status: {
				type: String,
				default: "pending",
			},
			subscription: {
				type: Number,
				default: 0,
			},
		},
		store_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
		},
		products: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Product",
		},
		reason: {
			type: String,
		},
		views: {
			type: Number,
		},
		sales: {
			type: Number,
			default: 0,
		},
		revenue: {
			type: Number,
			default: 0,
		},
		end_date: {
			type: Number,
		},
	},
	{ timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("SubStore", storeSchema, "subStores");
