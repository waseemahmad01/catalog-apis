import { Order } from "../../..";

const graph = {
    async daily(req, res, next) {
        const { id } = req.query;
        try {
            let date = new Date();
            const hours = date.setHours(0, 0, 0, 0);
            const firstHours = date.setHours(6, 0, 0, 0);
            const secondHours = date.setHours(12, 0, 0, 0);
            const thirdHours = date.setHours(18, 0, 0, 0);
            const fourHours = date.setHours(24, 0, 0, 0);

            const data = await Promise.all([
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: hours,
                        $lte: firstHours
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: firstHours,
                        $lte: secondHours
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: secondHours,
                        $lte: thirdHours
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: thirdHours,
                        $lte: fourHours
                    }
                }).count()
            ]);

            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },
    async week(req, res, next) {
        const { id } = req.query;
        try {
            let date = new Date();
            let seven = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 0).getTime();
            let six = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6, 0).getTime();
            let five = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 5, 0).getTime();
            let four = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 4, 0).getTime();
            let three = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3, 0).getTime();
            let two = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0).getTime();
            let one = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 0).getTime();
            let day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0).getTime();

            const data = await Promise.all([
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: one,
                        $lte: two
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: two,
                        $lte: three
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: three,
                        $lte: four
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: four,
                        $lte: five
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: five,
                        $lte: six
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: six,
                        $lte: seven
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: seven,
                        $lte: day
                    }
                }).count()
            ]);

            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    },
    async month(req, res, next) {
        const { id } = req.query;
        try {
            let date = new Date();
            // let seven = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 0).getTime();
            // let six = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 14, 0).getTime();
            // let five = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 5, 0).getTime();
            let four = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 28, 0).getTime();
            let three = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 21, 0).getTime();
            let two = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 14, 0).getTime();
            let one = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 0).getTime();
            let day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0).getTime();

            const data = await Promise.all([
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: one,
                        $lte: two
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: two,
                        $lte: three
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: three,
                        $lte: four
                    }
                }).count(),
                Order.find({
                    'items.store_id': id,
                    'items.time': {
                        $gte: four,
                        $lte: day
                    }
                }).count(),

            ]);

            res.status(200).json({ status: true, message: 'fetch successfully', data });
        } catch (error) {
            return next(error);
        }
    }
}

export default graph;