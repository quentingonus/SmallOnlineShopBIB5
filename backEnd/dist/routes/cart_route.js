"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartController_1 = require("../controllers/CartController");
const router = express_1.default.Router();
router
    .route('/')
    .get(CartController_1.getCart)
    .post(CartController_1.createCart);
router
    .route('/:id')
    .get(CartController_1.findCart)
    .put(CartController_1.updateCart)
    .delete(CartController_1.deleteCart);
exports.default = router;
