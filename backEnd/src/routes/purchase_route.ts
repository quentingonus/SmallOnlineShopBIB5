import express from 'express';
import { createPurchase, deletePurchase, findPurchase, getPurchase, updatePurchase, getPurchaseByUserId } from "../controllers/purchaseController";
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get([verifyToken], getPurchase)
  .post(createPurchase)

router
  .route('/user/:userid')
  .get([verifyToken], getPurchaseByUserId)

router
  .route('/:id')
  .get([verifyToken], findPurchase)
  .put([verifyToken], updatePurchase)
  .delete([verifyToken], deletePurchase)


export default router;
