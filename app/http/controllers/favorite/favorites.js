import { Favorite, Store } from "../../..";

const favorites = {
	async index(req, res, next) {
		const { id } = req.params;
		try {
			const data = await Favorite.findOne({ customerId: id })
				.populate("stores", "-status -products -updatedAt -__v")
				.populate("substores", "-status -products -updatedAt -__v")
				.populate("products", "-updatedAt -__v")
				.sort({ createdAt: -1 })
				.exec();
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", data });
		} catch (error) {
			return next(error);
		}
	},
	async like(req, res, next) {
		const { id, cid } = req.params;
		try {
			const data = await Favorite.exists({
				$and: [
					{ customerId: cid },
					{ $or: [{ stores: id }, { products: id }, { substores: id }] },
				],
			});

			// const data = await Favorite.exists({
			// 	$or: [{ stores: id }, { products: id }, { substores: id }],
			// });
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", data });
		} catch (error) {
			return next(error);
		}
	},
	async favorite(req, res, next) {
		const { customerId, storeId, productId, subStoreId } = req.body;
		let data;
		// const customerId = req.user._id;
		try {
			const exist = await Favorite.exists({ customerId });
			console.log(exist);
			if (!exist) {
				data = await Favorite.create({
					customerId,
					stores: storeId,
					products: productId,
					substores: subStoreId,
				});
			} else {
				// data = await Favorite.findOne({
				//     $and: [
				//         { customerId },
				//         { $or: [{ products: productId }, { stores: storeId }, { substores: subStoreId }] }]
				// });
				// console.log(data);
				// if (data === null) {
				// data = await Favorite.findOneAndUpdate({
				//     customerId
				// }, {
				//     $addToSet: {
				//         products: productId,
				//         stores: storeId,
				//         substores: subStoreId
				//     }

				// }, { new: true, multi: true });
				if (customerId && productId) {
					// data = await Favorite.findOneAndUpdate({
					//     customerId
					// }, {
					//     $push: {
					//         products: productId,
					//     }
					// }, { new: true });
					data = await Favorite.findOne({ customerId });
					const notUnique = data.products.includes(productId);
					if (!notUnique) {
						data.products.push(productId);
					}
				}
				if (customerId && storeId) {
					// data = await Favorite.findOneAndUpdate({
					//     customerId
					// }, {
					//     $push: {
					//         stores: storeId,
					//     }
					// }, { new: true });
					data = await Favorite.findOne({ customerId });
					const notUnique = data.stores.includes(storeId);
					if (!notUnique) {
						data.stores.push(storeId);
					}
				}
				if (customerId && subStoreId) {
					// data = await Favorite.findOneAndUpdate({
					//     customerId
					// }, {
					//     $push: {
					//         substores: subStoreId
					//     }
					// }, { new: true });
					data = await Favorite.findOne({ customerId });
					const notUnique = data.substores.includes(subStoreId);
					if (!notUnique) {
						data.substores.push(subStoreId);
					}
				}
			}
			data = await data.save();
			// }
			res
				.status(200)
				.json({ status: true, message: "fetch successfully", data });
		} catch (error) {
			return next(error);
		}
	},
};

export default favorites;
