import Joi from "joi";
import { CustomErrorHandler, SubStore, User } from "../../..";
import fs from 'fs';
import { APP_URL } from "../../../config";

const subStore = {
    async index(req, res, next) {
        const getTime = (dur) => {
            let current;
            var now = new Date();
            if (now.getMonth() === 11) {
                current = new Date(now.getFullYear() + 1, 0, 1);
            } else {
                current = new Date(now.getFullYear(), now.getMonth() + 1 + dur, 1);
            }
            return current.getMonth();
        }
        let store;
        // pagination mongoose-pagination
        try {
            store = await SubStore.findOne({ _id: req.params.id }).populate('products')
                .select("-updatedAt -__v")
                .sort({ _id: -1 });
            if (store.status.approval_status === 'decline') {
                return res.status(200).json({ status: true, message: "fetch message", store })
            }
            const duration = store.status.subscription;
            const subscription = getTime(duration)
            const now = new Date().getMonth();
            const currentTime = now + 1;
            if (currentTime === subscription) {
                store = await SubStore.findOneAndUpdate({ user_id: req.user._id }, {
                    'status.approval_status': "pending",
                    "status.subscription": 0
                }, { new: true })
            }
            res.status(200).json({ store })
        } catch (err) {
            return next(CustomErrorHandler.notFound());
        }
    },

    async sbss(req, res, next) {
        let stores;
        // pagination mongoose-pagination
        const { id } = req.params;
        try {
            stores = await SubStore.find({ store_id: id })
                .select("-updatedAt -__v")
                .sort({ _id: -1 });
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        res.status(200).json({ stores })
    },

    async subStore(req, res, next) {
        const filePath = req.file.path;
        const deleteImg = () => {
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError(err.message));
                }
            });
        }
        // Validation
        const storeSchema = Joi.object({
            store_name: Joi.string().required(),
            store_category: Joi.string().required(),
            location: Joi.string().required(),
            store_description: Joi.string().required(),
            store_id: Joi.string().required(),
        });

        // Validation error handler
        const { error } = storeSchema.validate(req.body);

        if (error) {
            // Delete the uploaded file
            deleteImg();
            return next(error);
        }

        const { store_name, store_category, location, store_description, store_id } = req.body;
        try {
            let storeExists = await SubStore.exists({ store_name });
            if (storeExists) {
                deleteImg();
                return next(CustomErrorHandler.alreadyExist('Store name already exist'));
            }
        } catch (error) {
            return next(error);
        }
        let store;
        let user
        try {
            store = await SubStore.create({
                store_logo: filePath,
                store_name,
                store_category,
                location,
                store_description,
                store_id,
                user_id: req.user._id
            });
            user = await User.findOneAndUpdate({ _id: store.user_id }, {
                sub_store: store._id
            }, { new: true })
        } catch (error) {
            return next(error);
        }
        res.status(201).json({ store });
    }
}

export default subStore;