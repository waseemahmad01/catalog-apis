import { Store, SubStore } from "../../..";

const allStores = {
    async index(req, res, next) {
        try {
            const mainStores = await Store.find();
            const subStores = await SubStore.find({ approval_status: 'approve' });
            const data = mainStores.concat(subStores);
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    }
}

export default allStores;