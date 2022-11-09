import express from 'express';
import { getPopularPorduct } from '../controllers/PopularProductController';

const router = express.Router();

router
  .route('/')
  .get(getPopularPorduct)

export default router;