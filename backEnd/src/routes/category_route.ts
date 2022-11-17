import express from 'express';
import { createCategory, deleteCategory, findCategory, getCategory, updateCategory } from "../controllers/categoryController";
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(getCategory)
  .post([verifyToken], createCategory)

router
  .route('/:id')
  .get(findCategory)
  .put([verifyToken], updateCategory)
  .delete([verifyToken], deleteCategory)

export default router;
