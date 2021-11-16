import mongoose from "mongoose";

const adsSchema = mongoose.Schema(
	{
		storeId: {
			type: String,
			required: true,
		},
		store_logo: {
			type: String,
			required: true,
		},
		store_name: {
			type: String,
			required: true,
		},
		store_category: {
			type: String,
			required: true,
		},
		// images: {
		// 	type: [String],
		// 	required: true,
		// },
		duration: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Ad", adsSchema, "ads");
