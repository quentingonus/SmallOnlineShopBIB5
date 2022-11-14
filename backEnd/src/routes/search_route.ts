import express from 'express';
import { createSearch } from '../controllers/SearchController'
const router = express.Router();

router
  .route('/:key')
  .get(createSearch)

export default router;
