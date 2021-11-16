import Joi from "joi";
import { Category, CustomErrorHandler } from "../../..";
import fs from 'fs';
import { APP_URL } from "../../../config";
import { json } from "express";

const category = {
    async index(req, res, next) {
        let category;
        // pagination mongoose-pagination
        try {
            category = await Category.find()
                .select("-updatedAt -__v")
                .sort({ _id: -1 });
            // console.log(products);
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        res.status(200).json({ category })
    },

    async category(req, res, next) {

        // console.log(req.file);
        const filePath = req.file.path;
        const deleteImg = () => {
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError(err.message));
                }
            });
        }

        // const src = fs.createReadStream(req.file.path);
        // const dest = fs.createWriteStream('uploads/', req.file.originalname);
        // src.pipe(dest);
        // src.on('end', () => {
        //     fs.unlink(req.file.path);
        // });
        // src.on('error', (err) => {
        //     console.log(err);
        // })

        // console.log(filePath);
        // let img = [];
        // const files = req.files;
        // files.forEach(e => {
        //     const image = `${APP_URL}${e.path}`;
        //     img.push(image);
        // });
        // const deleteImg = () => {
        //     files.forEach(file => {
        //         // console.log(`${appRoot}/${file.path}`);
        //         fs.unlink(`${appRoot}/${file.path}`, (err) => {
        //             if (err) {
        //                 return next(CustomErrorHandler.serverError(err.message));
        //             }
        //         });
        //     })
        // }
        // console.log(img);
        // Validation
        // const categorySchema = Joi.object({
        //     category: Joi.string().required(),
        //     // category_filters: Joi.string().required(),
        //     // category_gender: Joi.string().allow("").optional(),
        // });

        // Validation error handler
        // const { error } = categorySchema.validate(req.body);

        // if (error) {
        //     // Delete the uploaded file
        //     deleteImg();
        //     return next(error);
        // }

        const { category } = req.body;
        const data = JSON.parse(category);
        console.log(data);
        // try {
        //     // console.log(JSON.parse(category_filters));
        //     const cateExists = await Category.exists({ $or: [{ category }, { category_filters }] });
        //     if (cateExists) {
        //         deleteImg();
        //         return next(CustomErrorHandler.alreadyExist('Name already exist'));
        //     }
        // } catch (error) {
        //     return next(error);
        // }

        let categorys;
        try {
            categorys = await Category.create({
                category_img: filePath,
                category: data,

            });
        } catch (error) {
            // console.log(error);
            return next(error);
        }
        res.status(201).json({ categorys });
    }
}

export default category;