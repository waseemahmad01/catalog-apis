import { CustomErrorHandler, Product, Store, SubStore } from "../../..";
import fs from 'fs';

const deleteProduct = {
  async destroy(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete({ _id: req.params.id });
      // const product = await Product.findByIdAndRemove({ _id: '60da98ec4a7e0523d8faca8b' },{new: true});
      if (!product) {
        return next(new Error("Nothing file found."));
      }
      // console.log(product);
      const imagePath = product._doc.images;
      // console.log(imagePath);
      imagePath.forEach(file => {
        const index = file.indexOf('/u');
        const root = file.substr(index + 1);
        // console.log(root);
        fs.unlink(`${appRoot}/${root}`, (err) => {
          // console.log(file);
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
      })
      const mainStore = await Store.exists({ _id: product.store_id });
      if (!mainStore) {
        await SubStore.findOneAndUpdate({ _id: product.store_id }, { $pull: { products: product._id } }, { new: true })
      }
      await Store.findOneAndUpdate({ _id: product.store_id }, { $pull: { products: product._id } }, { new: true })
      // res.status(202).json(product);
      // await SubStore.findOneAndUpdate({ _id: product.store_id }, { $push: { products: product._id } }, { new: true })
      res.status(202).json({ product });
    } catch (error) {
      console.log(error);
      return next(CustomErrorHandler.serverError(error));
    }
  }
}

export default deleteProduct;