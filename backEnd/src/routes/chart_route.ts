import express from 'express';
import { getChart } from '../controllers/ChartController';

const router = express.Router();

router
  .route('/')
  .get(getChart)

export default router;