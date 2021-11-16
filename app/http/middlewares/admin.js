import { CustomErrorHandler, User } from "../..";

const admin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user.type === 'admin' || user.type === 'Admin') {
            next();
        } else {
            return next(CustomErrorHandler.unAuthorized());
        }
    } catch (err) {
        return next(CustomErrorHandler.serverError());
    }
}

export default admin;