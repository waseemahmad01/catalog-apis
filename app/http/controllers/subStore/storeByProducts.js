import { Product, Store, SubStore } from "../../..";

const storeByProducts = {

    async sbp(req, res, next) {

        const { page = 1, limit = 10 } = req.query;
        try {
            const store = await SubStore.findOne({ user_id: req.user._id });
            console.log(store);

            const products = await Product.find({ store_id: store._id })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            res.status(200).json({ status: true, products });
        } catch (error) {
            return next(error)
        }
    }
}

export default storeByProducts;