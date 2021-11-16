import Joi from "joi";
import { Contact, CustomErrorHandler } from "../../..";

const contactUs = {
    async index(req, res, next) {
        try {
            const data = await Contact.find();
            res.status(200).json({ status: true, message: 'fetch successfully', data });

        } catch (error) {
            return next(error);
        }
    },
    async contact(req, res, next) {
        const contactSchema = Joi.object({
            email: Joi.string().email().required(),
            message: Joi.string().required(),
            username: Joi.string().required()
        });

        const { error } = contactSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.wrongCredentials());
        }
        const { email, message, username } = req.body;
        try {
            const data = await Contact.create({
                username,
                message,
                email
            });
            res.status(201).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    }
}

export default contactUs;