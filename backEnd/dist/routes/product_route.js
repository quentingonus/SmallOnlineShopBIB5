"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route('/')
    .get(productController_1.getProduct)
    .post([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name must not be empty"),
    (0, express_validator_1.body)("price").notEmpty().withMessage("Price must note be empty")
], productController_1.createProduct);
router
    .route('/:id')
    .get(productController_1.findProduct)
    .put([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name must not be empty"),
    (0, express_validator_1.body)("price").notEmpty().withMessage("Price must note be empty"),
], productController_1.updateProduct)
    .delete(productController_1.deleteProduct);
exports.default = router;
