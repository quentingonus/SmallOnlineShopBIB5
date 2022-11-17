import express from 'express';
import { createUser, deleteUser, findUser, getUser, updateUser } from '../controllers/UserController';
import { verifyToken } from '../middleware/auth'

const router = express.Router();

router
  .route('/')
  .get([verifyToken], getUser)
  .post([verifyToken], createUser)

router
  .route('/:id')
  .get(findUser)
  .put([verifyToken], updateUser)
  .delete([verifyToken], deleteUser)

export default router;