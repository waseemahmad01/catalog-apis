import { CustomErrorHandler, Product } from "../../..";

const detailProduct = {
    async detail(req, res, next){
        let product;
        try {
            product = await Product.findOne({ _id: req.params.id }).select('-updatedAt -__v');
        } catch(err) {
            return next(CustomErrorHandler.serverError());
        }
        return res.status(200).json({product});
    }
}

export default detailProduct;