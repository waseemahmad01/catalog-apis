import Joi from "joi";
import { Cart, CustomErrorHandler } from "../../..";

const cart = {
    async index(req, res, next) {
        try {
            const cart = await Cart.findOne({ customerId: req.user._id });
            res.status(200).json({ status: true, message: "fetch successfully", cart });
        } catch (error) {
            return next(error);
        }
    },
    async cart(req, res, next) {
        // Validation
        const cartSchema = Joi.object({
            customerId: Joi.string().required(),
            product: Joi.object().required(),
        });

        // Validation error handler
        const { error } = cartSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.wrongCredentials(error));
        }
        const { customerId, product } = req.body;
        let cart;
        try {
            cart = await Cart.findOneAndUpdate({ customerId: customerId }, {
                $push: {
                    products: product
                }
            }, { new: true });
            if (cart === null) {
                cart = await Cart.create({
                    customerId,
                    products: product,
                });
            }
            res.status(200).json({ status: true, message: 'fetch successfully', cart })
        } catch (error) {
            return next(CustomErrorHandler.serverError(error))
        }
    },
    async itemRemove(req, res, next) {

        const { id } = req.params;
        let cart;
        try {
            cart = await Cart.findOneAndUpdate({ customerId: req.user._id }, {
                $pull: {
                    products: { id: id }
                }
            }, { new: true });
            res.status(200).json({ status: true, message: 'fetch successfully', cart })
        } catch (error) {
            return next(CustomErrorHandler.serverError(error))
        }
    },
    async allItemsRemove(req, res, next) {

        const { id } = req.params;
        let cart;
        try {
            cart = await Cart.deleteOne({ _id: id });
            res.status(200).json({ status: true, message: 'fetch successfully', cart })
        } catch (error) {
            return next(CustomErrorHandler.serverError(error))
        }
    }
}

export default cart;