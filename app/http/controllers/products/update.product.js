import { CustomErrorHandler, Product } from "../../..";
import fs from 'fs';
import Joi from "joi";
import { APP_URL } from "../../../config";

const updateProduct = {
    index(req, res, next) {
        res.send('this is update product');
    },
    async update(req, res, next) {
        let files;
        let img = [];
        if (req.files) {
            files = req.files;
        }
        files.forEach(e => {
            const image = `${APP_URL}${e.path}`;
            img.push(image);
        });
        const deleteImg = () => {
            files.forEach(file => {
                // console.log(`${appRoot}/${file.path}`);
                fs.unlink(`${appRoot}/${file.path}`, (err) => {
                    if (err) {
                        return next(CustomErrorHandler.serverError(err.message));
                    }
                });
            })
        }

        // Validation
        const productSchema = Joi.object({
            product_name: Joi.string().required(),
            product_category: Joi.string().required(),
            filters: Joi.string().required(),
            product_description: Joi.string().required(),
            price: Joi.number().required(),
            color: Joi.number().required(),
            size: Joi.string().required(),
            weight: Joi.string().required(),
            stock: Joi.number().required(),
        });

        // Validation error handler
        const { error } = productSchema.validate(req.body);

        if (error) {
            // Delete the uploaded file
            deleteImg();
            return next(error);
        }

        const { product_name, product_category, filters, product_description, color, size, weight, price, stock } = req.body;

        let product;
        try {
            const id = req.params.id;
            product = await Product.findOneAndUpdate({ _id: id }, {
                ...(req.files && { images: img }),
                product_name,
                product_category,
                filters,
                product_description,
                price,
                color,
                size,
                weight,
                stock
            });
        } catch (error) {
            return next(error);
        }
        res.status(202).json({ product });
    }
}

export default updateProduct;