import Joi from "joi";
import { CustomErrorHandler, Store, SubStore, User } from "../../..";
import fs from "fs";
import { APP_URL } from "../../../config";

const editStore = {
	async editStore(req, res, next) {
		// console.log(req.file);
		const filePath = req.file.path;
		const deleteImg = () => {
			fs.unlink(`${appRoot}${filePath}`, (err) => {
				if (err) {
					return next(CustomErrorHandler.serverError(err.message));
				}
			});
		};
		// Validation
		const productSchema = Joi.object({
			store_name: Joi.string().required(),
			store_category: Joi.string().required(),
			location: Joi.string().required(),
			store_description: Joi.string().required(),
			id: Joi.string().required(),
			subscription: Joi.number().required(),
			approval_status: Joi.string().required(),
		});
		// Validation error handler
		const { error } = productSchema.validate(req.body);

		if (error) {
			// Delete the uploaded file
			deleteImg();
			return next(error);
		}

		// Check email already in database
		// try {
		//     const userExist = await User.exists({ email: req.body.email });
		//     if (userExist) {
		//         return next(CustomErrorHandler.alreadyExist('Email already exist'));
		//     }
		// } catch (error) {
		//     return next(error);
		// }

		const {
			id,
			store_name,
			store_category,
			location,
			store_description,
			store_id,
			approval_status,
			subscription,
		} = req.body;
		let store;
		// Edit user in database
		try {
			store = await Store.findByIdAndUpdate(
				{ _id: id },
				{
					store_name,
					store_category,
					location,
					store_description,
					store_logo: filePath,
					status: {
						subscription: subscription,
						approval_status: approval_status,
					},
				},
				{ new: true }
			);
			if (store === null) {
				store = await SubStore.findByIdAndUpdate(
					{ _id: id },
					{
						store_name,
						store_category,
						location,
						store_description,
						store_logo: filePath,
						store_id,
						status: {
							subscription: subscription,
							approval_status: approval_status,
						},
					},
					{ new: true }
				);
			}
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", store });
		} catch (error) {
			return next(error);
		}
	},
};

export default editStore;
