import Joi from "joi";
import { Ad, CustomErrorHandler, FindStores, BannerAd } from "../../..";
import { APP_URL } from "../../../config";
import fs from "fs";

const ads = {
	async index(req, res, next) {
		let data;
		try {
			data = await Ad.find();
			const data2 = await BannerAd.find();
			FindStores.deleteAd(data);
			FindStores.deleteAd(data2);
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", data });
		} catch (error) {
			return next(error);
		}
	},

	async ad(req, res, next) {
		// console.log(req.body);
		const adSchema = Joi.object({
			storeId: Joi.string().required(),
			store_logo: Joi.string().required(),
			store_name: Joi.string().required(),
			store_category: Joi.string().required(),
			duration: Joi.number().required(),
		});

		const { error } = adSchema.validate(req.body);
		if (error) {
			return next(CustomErrorHandler.wrongCredentials());
		}

		const { storeId, store_logo, store_name, store_category, duration } =
			req.body;
		try {
			const data = await Ad.create({
				storeId,
				store_logo,
				store_name,
				store_category,
				duration,
			});

			res
				.status(201)
				.json({ status: true, message: "fetch successfully", data });
		} catch (err) {
			// console.log(err);
			return next(err);
		}
	},
	async bannerAdd(req, res, next) {
		const files = req.files;
		let data;
		let img = [];
		const deleteImg = () => {
			files.forEach((file) => {
				// console.log(`${appRoot}/${file.path}`);
				fs.unlink(`${appRoot}/${file.path}`, (err) => {
					if (err) {
						return next(CustomErrorHandler.serverError(err.message));
					}
				});
			});
		};
		try {
			files.forEach((e) => {
				const image = `${APP_URL}${e.path}`;
				console.log(img);
				img.push(image);
			});
			// const deleteImg = () => {
			// 	files.forEach((file) => {
			// 		// console.log(`${appRoot}/${file.path}`);
			// 		fs.unlink(`${appRoot}/${file.path}`, (err) => {
			// 			if (err) {
			// 				return next(CustomErrorHandler.serverError(err.message));
			// 			}
			// 		});
			// 	});
			// };
			// console.log(req);
			const duration = req.body.duration * 1;

			data = await BannerAd.create({
				images: img,
				duration,
			});

			res
				.status(201)
				.json({ status: true, message: "fetch successfully", data });
		} catch (err) {
			deleteImg();
			return next(err);
		}
	},

	async delete(req, res, next) {
		const { id } = req.params;
		let data;
		try {
			data = await Ad.deleteOne({ _id: id });

			res
				.status(201)
				.json({ status: true, message: "fetch successfully", data });
		} catch (error) {
			return next(error);
		}
	},

	async allBannerAds(req, res, next) {
		try {
			const data = await BannerAd.find();
			res.status(200).json({
				status: "success",
				message: "fetch successfully",
				data,
			});
		} catch (err) {
			return next(error);
		}
	},
};

export default ads;
