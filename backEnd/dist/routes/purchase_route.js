"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseController_1 = require("../controllers/purchaseController");
const router = express_1.default.Router();
router
    .route('/')
    .get(purchaseController_1.getPurchase)
    .post(purchaseController_1.createPurchase);
router
    .route('/:id')
    .get(purchaseController_1.findPurchase)
    .put(purchaseController_1.updatePurchase)
    .delete(purchaseController_1.deletePurchase);
exports.default = router;
