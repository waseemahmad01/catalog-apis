import express from 'express';
import { cart, auth, category, destroy_category, admin, update_category, uploads, filters, order, customer, reports, graph, recommended } from '../../app';
const router = express.Router();

router.get('/users', [auth], customer.index);

router.get('/popular', [auth], customer.popularStore);

router.get('/preference', [auth], recommended.preferences);

router.get('/recommend', [auth], recommended.recommend);

router.get('/revenue/:id', [auth], customer.revenue);

router.get('/sales/:id', [auth], customer.sales);

router.get('/report', [auth], reports.report);

router.get('/daily', [auth], graph.daily);

router.get('/week', [auth], graph.week);

router.get('/month', [auth], graph.month);





export default router;