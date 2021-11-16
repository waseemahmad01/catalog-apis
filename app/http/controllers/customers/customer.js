import { Order, Store, SubStore, User } from "../../..";

const customer = {
    async index(req, res, next) {
        let data;
        try {
            data = await User.find().countDocuments();
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },

    async revenue(req, res, next) {
        const { id } = req.params;
        let data;
        try {
            data = await Store.findOne({ _id: id }).select('revenue');
            if (data === null) {
                data = await SubStore.findOne({ _id: id }).select('revenue');
            }
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },

    async sales(req, res, next) {
        const { id } = req.params;
        let data;
        try {
            data = await Store.findOne({ _id: id }).select('sales');
            if (data === null) {
                data = await SubStore.findOne({ _id: id }).select('sales');
            }
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },

    async popularStore(req, res, next) {
        const { id } = req.params;
        let data;
        try {
            const store = await Store.find()

            const subStore = await SubStore.find()

            data = store.concat(subStore);
            data.sort();
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },
}

export default customer;