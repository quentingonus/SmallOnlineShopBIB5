import express from 'express';
import { body } from "express-validator";
import { contactUs } from "../controllers/contactusController";

const router = express.Router();

router
  .route("/")
  .post(
    [
      body("email").notEmpty().withMessage("Email must not be empty"),
      body("detail").notEmpty().withMessage("Detail must not be empty")
    ], contactUs);

export default router;