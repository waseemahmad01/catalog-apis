import { User, CustomErrorHandler } from "../../..";
import bcrypt from "bcrypt";

const changePassword = {
	async change(req, res, next) {
		const { password, oldPassword } = req.body;
		let user;
		try {
			console.log(req.user._id);
			user = await User.findOne({ _id: req.user._id });
			// Match the password
			const wrongPassword = await bcrypt.compare(oldPassword, user.password);
			if (!wrongPassword) {
				return next(CustomErrorHandler.wrongCredentials("password is wrong!"));
			}
			// Hash password
			const hashPassword = await bcrypt.hash(password, 10);
			user = await User.findByIdAndUpdate(
				{ _id: req.user._id },
				{
					password: hashPassword,
				},
				{ new: true }
			);

			res
				.status(200)
				.json({ status: true, message: "fetch successfully", user });
		} catch (error) {
			return next(error);
		}
	},
};

export default changePassword;
