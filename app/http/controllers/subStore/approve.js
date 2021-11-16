import { Store, SubStore } from "../../..";

const approve = {
	async index(req, res, next) {
		try {
			const store = await Store.find({
				"status.approval_status": "pending",
			}).sort({ _id: -1 });
			const stores = await SubStore.find({
				"status.approval_status": "pending",
			}).sort({ _id: -1 });
			const allStores = store.concat(stores);
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", allStores });
		} catch (error) {
			return next(error);
		}
	},
	// change
	async approve(req, res, next) {
		const { id, subscription, end_date } = req.body;
		let approve;
		try {
			approve = await SubStore.findByIdAndUpdate(
				{ _id: id },
				{
					"status.approval_status": "approve",
					"status.subscription": subscription,
					end_date,
				},
				{ new: true }
			);
			if (approve === null) {
				approve = await Store.findByIdAndUpdate(
					{ _id: id },
					{
						"status.approval_status": "approve",
						"status.subscription": subscription,
						end_date,
					},
					{ new: true }
				);
			}
			res.status(200).json({ approve });
		} catch (error) {
			return next(error);
		}
	},
	async updateSubscription(req, res, next) {
		const { id, end_date } = req.body;
		console.log(req.body);
		let store;
		try {
			store = await Store.findByIdAndUpdate(
				id,
				{ $set: { end_date } },
				{ new: true }
			);
			if (!store) {
				store = await SubStore.findByIdAndUpdate(id, { $set: { end_date } });
			}
			if (!store) {
				return res
					.status(400)
					.send("no store found with id provided in request");
			}
			res.status(200).json({ store });
		} catch (error) {
			return next(error);
		}
	},
};

export default approve;
