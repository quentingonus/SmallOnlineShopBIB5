import express from 'express';
import { createSearch } from '../controllers/SearchController'
const router = express.Router();

router
  .route('/')
  .post(createSearch)

export default router;
