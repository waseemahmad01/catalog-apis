import express from 'express';
import { cart, auth, category, destroy_category, admin, update_category, uploads, filters, order } from '../../app';
const router = express.Router();

router.get('/cart', [auth], cart.index);

router.post('/cart', [auth], cart.cart);

router.get('/removeitem/:id', [auth], cart.itemRemove);

router.post('/order', [auth], order.order);

router.patch('/order', [auth, admin], order.orderUpdate);

router.get('/orders', [auth], order.index);

router.delete('/allitem/:id', [auth], cart.allItemsRemove);


export default router;