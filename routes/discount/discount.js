import express from 'express';
import { auth, discount, promo, storeByDiscounts, uploads } from '../../app';
const router = express.Router();

router.post('/discount', [auth, uploads.single('discount_img')], discount.discount);

router.get('/discounts', discount.index);

router.get('/discounts/:id', [auth], storeByDiscounts.sbd);

router.post('/promo', auth, promo.promo);

router.get('/promo', auth, promo.index);

router.get('/applypromo', auth, promo.checkPromo);

router.put('/applypromo', auth, promo.applyPromo);

export default router;