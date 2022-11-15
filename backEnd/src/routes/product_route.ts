import express from 'express';
import { createProduct, deleteProduct, findProduct, getProduct, updateProduct } from "../controllers/productController";
import { body } from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(getProduct)
  .post(
    [
      body("name").notEmpty().withMessage("Name must not be empty"),
      body("price").notEmpty().withMessage("Price must note be empty")
    ],
    createProduct)

router
  .route('/:id')
  .get(findProduct)
  .put(
    [
      body("name").notEmpty().withMessage("Name must not be empty"),
      body("price").notEmpty().withMessage("Price must note be empty"),
    ],
    updateProduct)
  .delete(deleteProduct)

export default router;
