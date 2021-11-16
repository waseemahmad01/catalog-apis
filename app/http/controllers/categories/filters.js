import Joi from "joi";
import { Category, CustomErrorHandler } from "../../..";

const filters = {
    async filters(req, res, next) {

        // const filePath = req.file.path;
        // const deleteImg = () => {
        //     fs.unlink(`${appRoot}/${filePath}`, (err) => {
        //         if (err) {
        //             return next(CustomErrorHandler.serverError(err.message));
        //         }
        //     });
        // }
        // Validation
        const categorySchema = Joi.object({
            category_filters: Joi.string().required(),
        });

        // Validation error handler
        const { error } = categorySchema.validate(req.body);

        if (error) {
            // Delete the uploaded file
            // deleteImg();
            return next(error);
        }

        const { category_filters } = req.body;

        try {
            const cateExists = await Category.exists({ category_filters });
            if (cateExists) {
                // deleteImg();
                return next(CustomErrorHandler.alreadyExist('Name already exist'));
            }
        } catch (error) {
            return next(error);
        }

        let categorys;
        try {
            categorys = await Category.findOneAndUpdate({ _id: req.params.id }, {
                $push: { category_filters }
            }, { new: true });
        } catch (error) {
            return next(error);
        }
        res.status(200).json({ categorys });
    }
}

export default filters;