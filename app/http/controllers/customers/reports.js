import { Order } from "../../..";

const reports = {

    async itemGraph(req, res, next) {
        const { id } = req.query;
        try {
            let today = new Date();
            console.log();
            today.setHours(0, 0, 0, 0)
            let first = today.getDate() - today.getDay();
            let last = first + 6;
            let firstday = new Date(today.setDate(first)).toUTCString();
            let lastday = new Date(today.setDate(last)).toUTCString();
            let firstDayMonth = new Date(today.setDate(1));
            let lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            lastDayMonth.setHours(23, 59, 59, 0);
            today = new Date().setHours(0, 0, 0, 0);
            
            console.log(today);
            const data = await Promise.all([
                Order.find({
                    'items.store_id': id,
                    'item.time': {
                        $gte: today
                    }
                }).exec(),
                Order.find({
                    'items.store_id': id,
                    'item.time': {
                        $gte: firstday,
                        $lte: lastday
                    }
                }).exec(),
                Order.find({
                    'items.store_id': id,
                    'item.time': {
                        $gte: firstDayMonth,
                        $lte: lastDayMonth
                    }
                }).exec()
            ]);

            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },

    async report(req, res, next) {
        const { storeId, month, status } = req.query;
        let data;
        try {
            const getTime = (dur) => {
                let now = new Date();
                let firstDayMonth = new Date(now.getFullYear(), dur - 1, 1);
                let lastDayMonth = new Date(now.getFullYear(), dur - 1, 30);
                let startMonth = firstDayMonth.getTime();
                let endMonth = lastDayMonth.getTime();
                return { startMonth, endMonth };
            }

            data = await Order.find({
                status,
                'items.store_id': storeId,
                'items.time': {
                    $gte: getTime(month).startMonth,
                    $lte: getTime(month).endMonth
                }
            }).select('items -_id')

            res.status(200).json({ stauts: true, message: 'fetch successfully', data })
        } catch (error) {
            return next(error);
        }
    }
}

export default reports;