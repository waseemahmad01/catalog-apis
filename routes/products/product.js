import express from 'express';
import { product, uploads, update_product, destroy_product, detail_product, auth, partner } from '../../app';
const router = express.Router();

router.get('/product/:id', product.index);

router.get('/storebyproducts', product.storeByProducts);


router.post('/product', [auth, partner, uploads.array('image', 2)], product.product);

router.post('/edit-product/:id', [auth, partner, uploads.array('image', 2)], update_product.update);

router.get('/destroy-product/:id', [auth, partner], destroy_product.destroy);

router.get('/detail-product/:id', detail_product.detail);

export default router;