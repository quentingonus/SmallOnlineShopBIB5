import express from 'express';
import { createCart, deleteCart, findCart, getCart, updateCart } from '../controllers/CartController';

const router = express.Router();

router
  .route('/')
  .get(getCart)
  .post(createCart)

 router
  .route('/:id')
  .get(findCart)
  .put(updateCart)
  .delete(deleteCart)

export default router;