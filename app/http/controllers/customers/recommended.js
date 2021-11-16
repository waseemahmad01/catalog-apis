import { Store, SubStore, User } from "../../..";

const recommended = {
    async preferences(req, res, next) {
        const { preference } = req.query;
        const userId = req.user._id;
        let data;
        try {
            data = await User.findByIdAndUpdate({ _id: userId }, { preference }, { new: true });
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },

    async recommend(req, res, next) {

        const userId = req.user._id;
        let data;
        try {
            const user = await User.findOne({ _id: userId });
            const store = await Store.find({ store_category: user.preference });
            const substore = await SubStore.find({ store_category: user.preference });
            data = store.concat(substore);
            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    }
}

export default recommended;