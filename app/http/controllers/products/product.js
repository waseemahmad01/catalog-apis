import Joi from "joi";
import { CustomErrorHandler, Product, Store, SubStore, User } from "../../..";
import fs from 'fs';
import { APP_URL } from "../../../config";

const product = {
    async index(req, res, next) {
        const { page = 1, limit = 6 } = req.query;
        let products;
        // pagination mongoose-pagination
        try {
            products = await Product.find(req.params.id)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // console.log(products);
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        res.status(200).json({ status: true, message: "fetch successfully", products })
    },

    async storeByProducts(req, res, next) {
        const { store_id, page = 1, limit = 6 } = req.query;
        console.log(store_id);
        let products;
        // pagination mongoose-pagination
        try {
            products = await Product.find({ store_id })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            // console.log(products);
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        res.status(200).json({ status: true, message: "fetch successfully", products })
    },

    async product(req, res, next) {
        console.log('hello');
        let img = [];
        const files = req.files;
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
            product_filters: Joi.string().required(),
            product_description: Joi.string().required(),
            price: Joi.number().required(),
            color: Joi.number().required(),
            size: Joi.string().required(),
            weight: Joi.string().required(),
            stock: Joi.number().required(),
            store_id: Joi.string().required(),
        });

        // Validation error handler
        const { error } = productSchema.validate(req.body);

        if (error) {
            // Delete the uploaded file
            deleteImg();
            return next(error);
        }

        const { product_name, product_category, product_filters, product_description, size, color, weight, price, stock, store_id } = req.body;

        let product;
        try {
            const user = await User.findById({ _id: req.user._id });
            product = await Product.create({
                images: img,
                product_name,
                product_category,
                product_filters,
                product_description,
                size,
                price,
                weight,
                color,
                stock,
                store_id
            });
            const mainStore = await Store.exists({ _id: store_id });
            if (!mainStore) {
                await SubStore.findOneAndUpdate({ _id: product.store_id }, { $push: { products: product._id } }, { new: true })
            }
            await Store.findOneAndUpdate({ _id: product.store_id }, { $push: { products: product._id } }, { new: true })
        } catch (error) {
            return next(error);
        }
        res.status(201).json({ product });
    }
}


export default product;