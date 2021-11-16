import Joi from 'joi';
import { CustomErrorHandler, User, JwtService, RefreshToken, Store } from '../../..';
import twilio from 'twilio';
import { ACCOUNTSID, AUTHTOKEN, SERVICEID } from '../../../config';
const client = twilio(ACCOUNTSID, AUTHTOKEN);

const phoneNumber = {
    async phoneNumber(req, res, next) {
        const { phonenumber, channel } = req.body;
        try {
            const verifyCode = await client.verify.services(SERVICEID).verifications.create({
                to: phonenumber,
                channel: channel
            });

            res.status(200).json({ status: true, message: "fetch successfully", verifyCode });
        } catch (error) {
            return next(CustomErrorHandler.wrongCredentials('Wrong credential'));
        }
    },

    async verify(req, res, next) {
        // Validation
        const registerSechema = Joi.object({
            username: Joi.string().min(3).max(30).allow("").optional(),
            phonenumber: Joi.string().required(),
            code: Joi.number().required(),
            role: Joi.string()
        });
        // Validation error handler
        const { error } = registerSechema.validate(req.body);

        if (error) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        // Check email already in database
        try {
            const userExist = await User.exists({ email: req.body.email });
            if (userExist) {
                return next(CustomErrorHandler.alreadyExist('Email already exist'));
            }
        } catch (error) {
            return next(error);
        }

        const { username, phonenumber, code } = req.body;

        // Create a new user in database
        let access_token;
        let refresh_token;
        try {
            const verify = await client.verify.services(SERVICEID).verificationChecks.create({
                to: phonenumber,
                code: code
            });

            if (!verify) {
                return next(CustomErrorHandler.wrongCredential('Wrong verification code'));
            }
            let mainStore;
            if (verify.status === 'approved') {

                try {
                    const exists = await User.exists({ email: phonenumber });
                    if (exists) {
                        const user = await User.findOne({ email: phonenumber });
                        mainStore = await Store.exists({ user_id: user._id });
                        access_token = JwtService.sign({ _id: user._id, role: user.role }, 86400);
                        res.status(200).json({ status: true, user, access_token, mainStore });
                    } else {

                        const user = await User.create({
                            username,
                            email: phonenumber,
                            role: undefined
                        });
                        access_token = JwtService.sign({ _id: user._id, role: user.role }, 86400);
                        // refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
                        // // database whitelist
                        // await RefreshToken.create({ token: refresh_token });
                        res.status(200).json({ status: false, user, access_token });

                    }
                } catch (error) {
                    return next(error);
                }
            } else {
                return next(CustomErrorHandler.wrongCredentials("verification code wrong"));
            }
        } catch (error) {
            return next(error);
        }
    }
}
export default phoneNumber;