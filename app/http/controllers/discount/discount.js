import Joi from "joi";
import { Discount, CustomErrorHandler, FindStores } from "../../..";
import fs from 'fs';

const discount = {
    async index(req, res, next) {
        let data;
        let allData;
        try {
            data = await Discount.find()
                .sort({ createdAt: -1 });
            FindStores.endingTime(data);
            res.status(200).json({ status: true, message: "fetch successfully", data });
        } catch (error) {
            return next(error);
        }
    },

    async discount(req, res, next) {
        // store a image with multer
        const filePath = req.file.path;
        const deleteImg = () => {
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError(err.message));
                }
            });
        }
        const discountSchema = Joi.object({
            discount: Joi.string().required(),
            ending_date: Joi.string().required(),
            store_id: Joi.string().required(),
            product_id: Joi.string().required(),
            product_name: Joi.string().required()
        });

        const { error } = discountSchema.validate(req.body);
        if (error) {
            deleteImg();
            return next(CustomErrorHandler.wrongCredentials(error));
        }

        const { discount, ending_date, store_id, product_id, product_name } = req.body;
        try {
            const data = await Discount.create({
                discount_img: filePath,
                discount,
                ending_date,
                store_id,
                product_id,
                product_name
            });
            res.status(201).json({ status: 'true', message: 'fetch successfully', data });
        } catch (error) {
            deleteImg();
            return next(CustomErrorHandler.notFound(error));
        }
    }
}

export default discount;