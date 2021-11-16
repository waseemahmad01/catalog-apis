import Joi from "joi";
import { Category, CustomErrorHandler } from "../../..";
import fs from "fs";

const updateCategory = {
	async update(req, res, next) {
		let filePath;
		if (req.file) {
			filePath = req.file.path;
		}
		// const deleteImg = () => {
		if (req.file) {
			fs.unlink(`${appRoot}/${filePath}`, (err) => {
				if (err) {
					return next(CustomErrorHandler.serverError(err.message));
				}
			});
		}
		// }
		// Validation
		// const categorySchema = Joi.object({
		//     category: Joi.string().required(),
		//     category_filters: Joi.string().required(),
		// });

		// // Validation error handler
		// const { error } = categorySchema.validate(req.body);

		// if (error) {
		//     // Delete the uploaded file
		//     deleteImg();
		//     return next(error);
		// }

		const { category } = req.body;
		const data = JSON.parse(category);
		// try {
		//     const cateExists = await Category.exists({$or : [{category }, {category_filters}]});
		//     if (cateExists) {
		//         deleteImg();
		//         return next(CustomErrorHandler.alreadyExist('Name already exist'));
		//     }
		// } catch (error) {
		//     return next(error);
		// }

		let categorys;
		try {
			categorys = await Category.findOneAndUpdate(
				{ _id: req.params.id },
				{
					...(req.file && { category_img: filePath }),
					category: data,
				},
				{ new: true }
			);
		} catch (error) {
			// deleteImg()
			return next(error);
		}
		res.status(200).json({ categorys });
	},
	async updateCategory(req, res, next) {
		// res.send("ok");
		let filePath;
		if (req.file) {
			filePath = req.file.path;
		}
		// if (req.file) {
		// 	fs.unlink(`${appRoot}/${filePath}`, (err) => {
		// 		if (err) {
		// 			return next(CustomErrorHandler.serverError(err.message));
		// 		}
		// 	});
		// }
		const { category } = req.body;

		let categorys;
		const data = JSON.parse(category);
		try {
			categorys = await Category.findOneAndUpdate(
				{ _id: req.params.id },
				{
					...(req.file && { category_img: filePath }),
					category: data,
				},
				{ new: true }
			);
		} catch (error) {
			// deleteImg()
			return next(error);
		}
		res.status(200).json({ categorys });
	},
	async updateCategoryNoimg(req, res, next) {
		const { category } = req.body;
		let categorys;
		const data = JSON.parse(category);
		try {
			categorys = await Category.findOneAndUpdate(
				{ _id: req.params.id },
				{
					category: data,
				},
				{ new: true }
			);
			res.status(200).json({
				status: "success",
				data: categorys,
			});
		} catch (err) {
			return next(error);
		}
	},
};

export default updateCategory;
