import mongoose from "mongoose";
import { APP_URL } from "../config";

const categorySchema = mongoose.Schema(
	{
		category_img: {
			type: String,
			required: true,
			get: (image) => {
				// http://localhost:5000/uploads/1616443169266-52350494.png
				return `${APP_URL}${image}`;
			},
		},
		category: {
			type: Object,
			required: true,
		},
		category_filters: {
			type: Array,
			required: true,
		},
		// category_gender: {
		//     type: String,
		// }
	},
	{ timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("Category", categorySchema, "categories");
