import { User, CustomErrorHandler, SubStore, Store } from "../../.."

const registersCounts = {
    async registersCounts(req, res, next) {
        let partners;
        let customers;
        let pendingRequest;
        try {
            customers = await User.countDocuments({ role: 'customer' });
            try {
                partners = await User.countDocuments({ role: 'partner' });
            } catch (error) {
                return next(CustomErrorHandler.notFound());
            }
            try {
                const subStore = await SubStore.countDocuments({ 'status.approval_status': 'pending' });
                const store = await Store.countDocuments({ 'status.approval_status': 'pending' });
                console.log(subStore);
                pendingRequest = subStore + store
            } catch (error) {
                return next(CustomErrorHandler.notFound());
            }
            res.json({ status: true, message: 'Fetch successfully', customers, partners, pendingRequest })
        } catch (error) {
            return next(CustomErrorHandler.notFound());
        }
    }
}

export default registersCounts