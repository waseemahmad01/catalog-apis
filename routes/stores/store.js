import express from "express";
import {
	auth,
	cbs,
	partner,
	sbp,
	store,
	uploads,
	allStores,
	admin,
	editStore,
	exceptPartner,
	approve,
} from "../../app";
const router = express.Router();

router.get("/store", [auth, partner], store.index);

router.post(
	"/editStore",
	[auth, partner, uploads.single("store_logo")],
	editStore.editStore
);

router.get("/allstores", [auth, exceptPartner], allStores.index);

router.get("/cbs", cbs.cbs);

router.get("/sbp", [auth, partner], sbp.sbp);
router.patch("/updatesubscription", approve.updateSubscription);

router.post(
	"/store",
	[auth, partner, uploads.single("store_logo")],
	store.store
);

export default router;
