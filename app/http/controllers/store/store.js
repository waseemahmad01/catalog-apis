import Joi from "joi";
import { CustomErrorHandler, Store, User } from "../../..";
import fs from "fs";
import { APP_URL } from "../../../config";

const store = {
	async index(req, res, next) {
		const getTime = (dur) => {
			let current;
			var now = new Date();
			if (now.getMonth() == 11) {
				current = new Date(now.getFullYear() + 1, 0, 1);
			} else {
				current = new Date(now.getFullYear(), now.getMonth() + 1 + dur, 1);
			}
			return current.getMonth();
		};
		// pagination mongoose-pagination
		let store;
		try {
			store = await Store.findOne({ user_id: req.user._id })
				.populate("products")
				.select("-updatedAt -__v")
				.sort({ _id: -1 });
			if (store.status.approval_status === "decline") {
				return res
					.status(200)
					.json({ status: true, message: "fetch message", store });
			}
			const duration = store.status.subscription;
			const subscription = getTime(duration);
			const now = new Date().getMonth();
			const currentTime = now + 1;
			if (currentTime === subscription) {
				store = await Store.findOneAndUpdate(
					{ user_id: req.user._id },
					{
						"status.approval_status": "pending",
						"status.subscription": 0,
					},
					{ new: true }
				);
			}
			res.status(200).json({ store });
		} catch (error) {
			return next(CustomErrorHandler.notFound());
		}
	},

	async store(req, res, next) {
		// console.log(req.body);
		const filePath = req.file.path;
		const deleteImg = () => {
			fs.unlink(`${appRoot}/${filePath}`, (err) => {
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
			store_gender: Joi.string().required(),
		});

		// Validation error handler
		const { error } = productSchema.validate(req.body);

		if (error) {
			// Delete the uploaded file
			deleteImg();
			return next(error);
		}

		const {
			store_name,
			store_category,
			location,
			store_description,
			store_gender,
		} = req.body;
		try {
			let storeExists = await Store.exists({ store_name });
			if (storeExists) {
				deleteImg();
				return next(
					CustomErrorHandler.alreadyExist("Store name already exist")
				);
			}
			storeExists = await Store.exists({ user_id: req.user._id });
			if (storeExists) {
				deleteImg();
				return next(
					CustomErrorHandler.alreadyExist("This user already create store")
				);
			}
		} catch (error) {
			return next(error);
		}
		let store;
		let user;
		try {
			store = await Store.create({
				store_logo: filePath,
				store_name,
				store_category,
				location,
				store_description,
				user_id: req.user._id,
				store_gender,
			});
			user = await User.findOneAndUpdate(
				{ _id: store.user_id },
				{
					store: store._id,
				},
				{ new: true }
			);
		} catch (error) {
			return next(error);
		}
		res.status(201).json({ store });
	},
};

export default store;
