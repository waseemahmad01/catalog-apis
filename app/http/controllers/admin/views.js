import { Views } from "../../..";

const views = {
    async views(req, res, next) {
        const { id } = req.params;
        const userId = req.user._id;
        let views;
        let exist;
        let data;
        try {
            exist = await Views.findOne({ storeId: id });
            if (!exist) {
                views = await Views.create({
                    userId,
                    storeId: id
                })
            } else {
                views = await Views.findOne({
                    $and: [{ storeId: id }, { userId: userId }]
                });
                if (views === null) {
                    views = await Views.findOneAndUpdate({
                        _id: exist._id
                    }, {
                        $push: {
                            userId: userId
                        },
                        $inc: {
                            counter: 1
                        }
                    }, { new: true });
                }
            }
            res.status(200).json({ status: true, message: "fetch successfully", views });
        } catch (error) {
            return next(error);
        }
    }
}

export default views;