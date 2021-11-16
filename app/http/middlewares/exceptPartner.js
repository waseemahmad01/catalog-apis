import { CustomErrorHandler, User } from "../..";

const exceptPartner = async (req, res, next) => {
	try {
		// console.log(req.user);
		const user = await User.findOne({ _id: req.user._id });
		// console.log(user);
		if (user.role !== "partner" || user.role !== "Partner") {
			next();
		} else {
			return next(CustomErrorHandler.unAuthorized());
		}
	} catch (err) {
		console.log(err);
		return next(CustomErrorHandler.serverError());
	}
};

export default exceptPartner;
