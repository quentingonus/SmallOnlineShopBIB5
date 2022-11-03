import express from 'express';
import { createPurchase, deletePurchase, findPurchase, getPurchase, updatePurchase } from "../controllers/purchaseController";

const router = express.Router();

router
  .route('/')
  .get(getPurchase)
  .post(createPurchase)

 router
  .route('/:id')
  .get(findPurchase)
  .put(updatePurchase)
  .delete(deletePurchase)

export default router;
