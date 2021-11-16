import express from "express";
import {
	auth,
	category,
	destroy_category,
	admin,
	update_category,
	uploads,
	filters,
} from "../../app";
const router = express.Router();

router.get("/category", category.index);

router.post("/category", [uploads.single("category_img")], category.category);

router.put(
	"/category/:id",
	[auth, admin, uploads.single("category_img")],
	update_category.update
);

router.get("/destroy-category/:id", [auth, admin], destroy_category.destroy);

router.patch("/filters/:id", [auth, admin], filters.filters);
router.post(
	"/edit-category/:id",
	[auth, admin, uploads.single("category_img")],
	update_category.updateCategory
);
router.patch("/edit-category-noimage/:id", update_category.updateCategoryNoimg);

export default router;
