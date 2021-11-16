import Joi from "joi";
import {
	Order,
	CustomErrorHandler,
	Cart,
	Store,
	SubStore,
	Product,
} from "../../..";

const order = {
	async index(req, res, next) {
		try {
			let orders = await Order.find().sort({ createdAt: -1 });
			// console.log(orders);
			// orders.map(async (e) => {
			// 	e.items.map(async (e1, index) => {
			// 		let store = await Store.findById(e1.store_id);
			// 		if (!store) {
			// 			store = await SubStore.findById(e1.store_id);
			// 		}
			// 		e1 = Object.assign(e1, { store_name: store.store_name });
			// 	});
			// 	// console.log(e.items);
			// });
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", orders });
		} catch (error) {
			return next(error);
		}
	},

	async orderUpdate(req, res, next) {
		const { id, paymentStatus, status } = req.query;
		try {
			const orders = await Order.findByIdAndUpdate(
				{ _id: id },
				{
					paymentStatus,
					status,
				},
				{ new: true }
			).sort({ createdAt: -1 });
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", orders });
		} catch (error) {
			return next(error);
		}
	},

	async order(req, res, next) {
		// Validation
		const orderSchema = Joi.object({
			items: Joi.array().required(),
			phone: Joi.string().required(),
			userName: Joi.string().required(),
			address: Joi.string().required(),
			paymentType: Joi.string().required(),
			paymentStatus: Joi.boolean().required(),
			status: Joi.string().required(),
		});

		// Validation error handler
		const { error } = orderSchema.validate(req.body);
		if (error) {
			return next(CustomErrorHandler.wrongCredentials(error));
		}
		const {
			items,
			phone,
			address,
			paymentType,
			paymentStatus,
			status,
			userName,
		} = req.body;
		let order;
		let data;
		try {
			order = await Order.create({
				customerId: req.user._id,
				userName,
				items,
				phone,
				address,
				paymentType,
				paymentStatus,
				status,
			});
			if (order) {
				await Cart.deleteOne({ customerId: req.user._id });
				data = await Order;
				order.items.map(async (store) => {
					const data = await Store.findByIdAndUpdate(
						{ _id: store.store_id },
						{ $inc: { sales: 1, revenue: store.price } }
					);
					if (data === null) {
						await SubStore.findByIdAndUpdate(
							{ _id: store.store_id },
							{ $inc: { sales: 1, revenue: store.price } }
						);
					}
					const sale = store.sold;
					await Product.findByIdAndUpdate(
						{ _id: store.id },
						{ $inc: { sold: sale, stock: -sale } }
					);
				});
			}
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", order });
		} catch (error) {
			return next(error);
		}
	},
};

export default order;
