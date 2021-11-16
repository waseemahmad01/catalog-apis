import express from "express";
import {
	auth,
	admin,
	decline,
	approve,
	cbs,
	cbss,
	partner,
	sbp,
	ssbp,
	subStore,
	uploads,
} from "../../app";
const router = express.Router();

router.get("/substore/:id", [auth, partner], subStore.index);

router.get("/adminSubstore", [auth, admin], approve.index);

router.get("/cbss", cbss.cbs);

router.get("/sbss/:id", [auth], subStore.sbss);

router.post("/approve", approve.approve);
router.patch("/updatesubscription", approve.updateSubscription);

router.post("/decline", decline.decline);

router.get("/ssbp", [auth, partner], ssbp.sbp);

router.post(
	"/substore",
	[auth, partner, uploads.single("store_logo")],
	subStore.subStore
);

export default router;
