import Joi from "joi";
import bcrypt from 'bcrypt';
import { CustomErrorHandler, JwtService, RefreshToken, Store, User } from "../../..";
import { REFRESH_SECRET } from "../../../config";

const login = {
    async login(req, res, next) {
        const { email, password } = req.body;
        // Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        // Validation error handler
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        // Check the email in database
        let access_token;
        let refresh_token;
        try {

            const user = await User.findOne({ email: email });

            if (!user) {
                return next(CustomErrorHandler.wrongCredentials('Wrong email'));
            }
            const mainStore = await Store.exists({ user_id: user._id });

            // Match the password
            const wrongPassword = await bcrypt.compare(password, user.password)
            if (!wrongPassword) {
                return next(CustomErrorHandler.wrongCredentials('Wrong password'));
            }

            access_token = JwtService.sign({ _id: user._id, role: user.role }, '1y');
            // refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            // database whitelist
            // await RefreshToken.create({ token: refresh_token });
            res.status(200).json({ user, access_token, mainStore });
        } catch (error) {
            return next(error);
        }
    }
}

export default login;