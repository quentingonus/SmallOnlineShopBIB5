import express from 'express';
import { getChart } from '../controllers/ChartController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get([verifyToken], getChart)

export default router;