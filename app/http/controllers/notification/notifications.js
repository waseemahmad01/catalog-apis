import Joi from "joi";
import { CustomErrorHandler, Notification, Notifications } from "../../..";
import fs from 'fs';

const notifications = {
    async index(req, res, next) {
        let data;
        try {
            data = await Notification.find().select('-__v');
            if (!data) {
                return next(CustomErrorHandler.notFound());
            }
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },

    async notification(req, res, next) {
        let filePath;
        if (req.file) {
            filePath = req.file.path;
        }
        const deleteImg = () => {
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError(err.message));
                }
            });
        }
        // Validation
        const notifySchema = Joi.object({
            title: Joi.string().required(),
            subTitle: Joi.string().required(),
            message: Joi.string().allow("").optional(),
            type: Joi.string().required(),
        });

        // Validation error handler
        const { error } = notifySchema.validate(req.body);

        if (error) {
            // Delete the uploaded file
            deleteImg();
            return next(error);
        }

        const { title, subTitle, message, type } = req.body;
        let data;
        try {
            if (filePath) {
                data = await Notification.create({
                    title,
                    subTitle,
                    message,
                    image: filePath,
                    type
                });
            } else {
                data = await Notification.create({
                    title,
                    subTitle,
                    type
                });
            }

            res.status(201).json({ status: true, message: "fetch successfully", data });
        } catch (error) {
            deleteImg()
            return next(error);
        }
    }
}

export default notifications;