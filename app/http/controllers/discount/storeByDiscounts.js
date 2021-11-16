import { Discount } from "../../.."

const storeByDiscounts = {
    async sbd(req, res, next) {
        let data
        const { id } = req.params;
        try {
            data = await Discount.find({ store_id: id });
            res.status(200).json({ status: true, message: "fetch successfully", data });
        } catch (error) {
            return next(error);
        }
    }
}

export default storeByDiscounts