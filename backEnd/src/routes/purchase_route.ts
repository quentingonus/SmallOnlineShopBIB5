import express from 'express';
import { createPurchase, deletePurchase, findPurchase, getPurchase, updatePurchase, getPurchaseByUserId } from "../controllers/purchaseController";
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(getPurchase)
  .post(createPurchase)

router
  .route('/user/:userid')
  .get([verifyToken],getPurchaseByUserId)

router
  .route('/:id')
  .get(findPurchase)
  .put(updatePurchase)
  .delete(deletePurchase)


export default router;
