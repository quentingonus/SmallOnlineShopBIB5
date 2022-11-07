"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
router
    .route("/login")
    .post([
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email must not be empty"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password must not be empty")
], AuthController_1.login);
router.route('/logout').post([], AuthController_1.logout);
router
    .route("/signup")
    .post([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name must not be empty"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email must not be empty"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password must not be empty")
], UserController_1.createUser);
router
    .route("/forgot_password")
    .post([
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email must be empty"),
], AuthController_1.forgotPassword);
router
    .route('/password-reset-update/:userId/:token')
    .post(AuthController_1.resetPassword);
router
    .route('/password-change/:userId/:token')
    .post(AuthController_1.passwordChange);
exports.default = router;
