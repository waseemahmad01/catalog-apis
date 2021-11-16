import express from 'express';
import { auth, favorite, removeFavorite } from '../../app';
const router = express.Router();

router.post('/favorite', favorite.favorite);
router.get('/favorite/:id', auth, favorite.index);
router.get('/like/:id', favorite.like);

router.post('/removefavorite', auth, removeFavorite.remove);

export default router;