import { SubStore, Store, CustomErrorHandler } from "../../..";

const decline = {
    async decline(req, res, next) {
        let decline;
        const { id, reason } = req.body;
        console.log(req.body);
        try {

            decline = await SubStore.findByIdAndUpdate({ _id: id }, {
                'status.approval_status': 'decline',
                reason
            }, { new: true });
            if (decline === null) {
                decline = await Store.findByIdAndUpdate({ _id: id }, {
                    'status.approval_status': 'decline',
                    reason
                }, { new: true });
            }
            res.status(200).json({ status: true, message: "fetch successfully", decline })
        } catch (error) {
            return next(error);
        }
    }
}

export default decline;