import Joi from "joi";
import bcrypt from "bcrypt";
import { CustomErrorHandler, User, JwtService, RefreshToken } from "../../..";
import { REFRESH_SECRET } from "../../../config";

const register = {
	index(req, res, next) {
		res.status(200).send("This is a signUp page");
	},
	async register(req, res, next) {
		// Validation
		const registerSechema = Joi.object({
			username: Joi.string().min(3).max(30).required(),
			email: Joi.string().email().required(),
			password: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
				.required(),
			cpassword: Joi.ref("password"),
			role: Joi.string(),
		});
		// Validation error handler
		const { error } = registerSechema.validate(req.body);

		if (error) {
			return next(error);
		}

		// Check email already in database
		try {
			const userExist = await User.exists({ email: req.body.email });
			if (userExist) {
				return next(CustomErrorHandler.alreadyExist("Email already exist"));
			}
		} catch (error) {
			return next(error);
		}

		const { username, email, password } = req.body;

		// Hash password
		const hashPassword = await bcrypt.hash(password, 10);

		// Create a new user in database
		let access_token;
		let refresh_token;
		try {
			const user = await User.create({
				username,
				email,
				password: hashPassword,
				role: undefined,
			});
			access_token = JwtService.sign({ _id: user._id, role: user.role }, "1y");
			// refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
			// // database whitelist
			// await RefreshToken.create({ token: refresh_token });
			res.status(200).json({ user, access_token });
		} catch (error) {
			return next(error);
		}
	},
};

export default register;
