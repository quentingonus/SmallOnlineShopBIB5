import express from 'express';
import { createUser } from "../controllers/UserController";
import { body } from "express-validator";
import { login, logout, forgotPassword, resetPassword, passwordChange, checkPasswdResetToken } from "../controllers/AuthController";
import { verifyToken } from '../middleware/auth'

const router = express.Router();

router
  .route("/login")
  .post(
    [
      body("email").notEmpty().withMessage("Email must not be empty"),
      body("password").notEmpty().withMessage("Password must not be empty")
    ], login);

router.route('/logout').post([], logout);

router
  .route("/signup")
  .post(
    [
      body("name").notEmpty().withMessage("Name must not be empty"),
      body("email").notEmpty().withMessage("Email must not be empty"),
      body("password").notEmpty().withMessage("Password must not be empty")
    ], createUser);

//To send a reset link for password
router
  .route("/forgot_password")
  .post(
    [
      body("email").notEmpty().withMessage("Email must be empty"),
    ], forgotPassword);

//Checking token in reset link is valid or not
router
  .route('/password-token/check')
  .post(checkPasswdResetToken);

//Reset password using reset link
router
  .route('/password-reset-update/:userId/:token')
  .post(resetPassword);

//Reset Password using old password
router
  .route('/password-change')
  .post([verifyToken], passwordChange);


export default router;