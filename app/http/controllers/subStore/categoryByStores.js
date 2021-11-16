import { Product, Store, SubStore } from "../../..";

const categoryByStores = {

    async cbs(req, res, next) {
        const { page = 1, limit = 10 } = req.query;
        try {
            const stores = await SubStore.find({ store_category: req.body.category })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            res.status(200).json({ status: true, stores });
        } catch (error) {

        }
    }
}

export default categoryByStores;