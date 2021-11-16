import mongoose from "mongoose";

const adsSchema = mongoose.Schema(
	{
		images: {
			type: [String],
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("BannerAd", adsSchema);
