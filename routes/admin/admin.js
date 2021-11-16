import express from "express";
import {
	auth,
	admin,
	conversation,
	discount,
	uploads,
	messages,
	registersCounts,
	editSubscription,
	views,
	contactUs,
	ads,
} from "../../app";
const router = express.Router();

router.get("/registersCounts", registersCounts.registersCounts);

router.post("/editSubscription", editSubscription.edit);

router.get("/cancelSubscription/:id", editSubscription.cancel);

router.get("/subscription", editSubscription.index);

router.get("/views/:id", [auth], views.views);

router.get("/contact", [auth, admin], contactUs.index);

router.post("/contact", [auth], contactUs.contact);

// ads routes
router.post("/bannerads", [auth, uploads.array("image", 4)], ads.bannerAdd);
router.get("/bannerads", ads.allBannerAds);
router.post("/ads", auth, ads.ad);

router.get("/ads", auth, ads.index);

router.delete("/ads/:id", auth, ads.delete);

export default router;
