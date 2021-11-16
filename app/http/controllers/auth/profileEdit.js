import Joi from 'joi';
import bcrypt from 'bcrypt';
import { CustomErrorHandler, User, JwtService, RefreshToken } from '../../..';
import { APP_URL, REFRESH_SECRET } from '../../../config';

const profileEdit = {
    async profileEdit(req, res, next) {

        const filePath = req.file.path;
        const deleteImg = () => {
            fs.unlink(`${appRoot}${filePath}`, (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError(err.message));
                }
            });
        }
        // Validation
        const profileSechema = Joi.object({
            firstname: Joi.string().min(3).max(30).required(),
            lastname: Joi.string().min(3).max(30).required(),
            username: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
        });
        // Validation error handler
        const { error } = profileSechema.validate(req.body);

        if (error) {
            deleteImg();
            return next(CustomErrorHandler.wrongCredentials());
        }

        // Check email already in database
        // try {
        //     const userExist = await User.exists({ email: req.body.email });
        //     if (userExist) {
        //         return next(CustomErrorHandler.alreadyExist('Email already exist'));
        //     }
        // } catch (error) {
        //     return next(error);
        // }

        const { firstname, lastname, username, email } = req.body;

        // Edit user in database
        try {
            const user = await User.findByIdAndUpdate({ _id: req.user._id }, {
                firstname,
                lastname,
                username,
                email,
                profile_img: `${APP_URL}/${filePath}`
            }, { new: true });
            res.status(200).json({ user });
        } catch (error) {
            return next(error);
        }
    }
}

export default profileEdit;