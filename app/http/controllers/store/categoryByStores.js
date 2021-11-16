import { Product, Store } from "../../..";

const categoryByStores = {

    async cbs(req, res, next) {
        const { category, gender, page = 1, limit = 10 } = req.query;
        console.log(gender);
        let stores;
        try {

            if (gender !== undefined) {
                stores = await Store.find({ $and: [{ store_category: category }, { store_gender: gender }] })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
            } else {
                stores = await Store.find({ store_category: category })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
            }
            res.status(200).json({ status: true, stores });
        } catch (error) {
            return next(error);
        }
    }
}

export default categoryByStores;