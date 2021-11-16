import { Store, SubStore, FindStores } from "../../..";

const editSubscription = {
	async index(req, res, next) {
		try {
			const store = await Store.find({
				"status.approval_status": "approve",
			}).sort({ _id: -1 });
			const stores = await SubStore.find({
				"status.approval_status": "approve",
			}).sort({ _id: -1 });
			const allStores = store.concat(stores);
			const one = FindStores.one(allStores);
			const two = FindStores.two(allStores);
			const three = FindStores.three(allStores);
			const four = FindStores.four(allStores);
			const five = FindStores.five(allStores);
			const six = FindStores.six(allStores);
			const seven = FindStores.seven(allStores);
			const eight = FindStores.eight(allStores);
			const nine = FindStores.nine(allStores);
			const ten = FindStores.ten(allStores);
			const eleven = FindStores.eleven(allStores);
			const twelve = FindStores.twelve(allStores);
			res.status(200).json({
				status: true,
				message: "fetch successfully",
				one,
				two,
				three,
				four,
				five,
				six,
				seven,
				eight,
				nine,
				ten,
				eleven,
				twelve,
				// allStores,
			});
		} catch (error) {
			return next(error);
		}
	},
	async edit(req, res, next) {
		let update;
		const { id, subscription, end_date } = req.body;
		try {
			update = await Store.findByIdAndUpdate(
				{ _id: id },
				{
					"status.approval_status": "approve",
					"status.subscription": subscription,
					end_date,
				},
				{ new: true }
			);
			if (update === null) {
				update = await SubStore.findByIdAndUpdate(
					{ _id: id },
					{
						"status.approval_status": "approve",
						"status.subscription": subscription,
						end_date,
					},
					{ new: true }
				);
			}
			res
				.status(200)
				.json({ status: true, message: "Fetch successfully", update });
		} catch (error) {
			return next(error);
		}
	},
	async cancel(req, res, next) {
		try {
			const cancel = await Store.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					"status.approval_status": "pending",
					"status.subscription": 0,
				},
				{ new: true }
			);
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", cancel });
		} catch (error) {
			return next(error);
		}
	},
};

export default editSubscription;
