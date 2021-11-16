import { Favorite } from "../../..";

const removeFavorite = {
	async remove(req, res, next) {
		const { customerId, storeId, productId, subStoreId } = req.body;
		console.log(storeId);
		let data;
		try {
			if (customerId && productId) {
				data = await Favorite.findOneAndUpdate(
					{ customerId },
					{
						$pull: {
							products: productId,
						},
					},
					{ new: true }
				);
			} else if (customerId && storeId) {
				data = await Favorite.findOneAndUpdate(
					{ customerId },
					{
						$pull: {
							stores: storeId,
						},
					},
					{ new: true }
				);
			} else if (customerId && subStoreId) {
				data = await Favorite.findOneAndUpdate(
					{ customerId },
					{
						$pull: {
							substores: subStoreId,
						},
					},
					{ new: true }
				);
			} else {
				res.status(404).json({
					productId,
					storeId,
					subStoreId,
				});
			}

			res
				.status(200)
				.json({ status: true, message: "fetch successfully", data });
		} catch (error) {
			return next(error);
		}
	},
};

export default removeFavorite;
