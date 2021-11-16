import { Category, CustomErrorHandler } from "../../..";
import fs from 'fs';

const deleteCategory = {
    async destroy(req, res, next) {
        try {
            const category = await Category.findByIdAndRemove({ _id: req.params.id });
            if (!category) {
                return next(new Error("Nothing file found."));
            }
            console.log(category._doc.category_img);
            const imagePath = category._doc.category_img;
            fs.unlink(`${imagePath}`, (err) => {
                if (err) {
                    return next(CustomErrorHandler.serverError(err));
                }
            });
            // res.status(202).json(document);
            res.status(202).json({ category });
        } catch (error) {
            return next(CustomErrorHandler.serverError());
        }
    }
}

export default deleteCategory;