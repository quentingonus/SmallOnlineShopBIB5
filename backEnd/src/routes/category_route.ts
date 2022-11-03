import express from 'express';
import { createCategory, deleteCategory, findCategory, getCategory, updateCategory } from "../controllers/categoryController";

const router = express.Router();

router
  .route('/')
  .get(getCategory)
  .post(createCategory)

 router
  .route('/:id')
  .get(findCategory)
  .put(updateCategory)
  .delete(deleteCategory)

export default router;
