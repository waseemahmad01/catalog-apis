import express from "express";
import {
	auth,
	partner,
	login,
	logout,
	refreshToken,
	register,
	user,
	role,
	profile,
	uploads,
	phonenumber,
	changePassword,
	forgetPassword,
} from "../../app";
const router = express.Router();

// router.get('/login', login.index);
router.post("/login", login.login);
router.put(
	"/profile",
	[auth, uploads.single("profile_img")],
	profile.profileEdit
);

router.post("/logout", auth, logout.logout);

// router.get('/register', register.index);
router.post("/register", register.register);

router.post("/phonenumber", phonenumber.phoneNumber);
router.post("/verify", phonenumber.verify);

router.put("/role", auth, role.role);

router.get("/me", [auth, partner], user.me);
router.post("/refresh", refreshToken.refresh);

router.post("/password", auth, changePassword.change);

router.post("/emailverify", forgetPassword.verifyEmail);

router.post("/forgetpassword", forgetPassword.forget);

export default router;
