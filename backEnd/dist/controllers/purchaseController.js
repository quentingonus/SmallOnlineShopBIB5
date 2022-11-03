"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchase = exports.updatePurchase = exports.findPurchase = exports.createPurchase = exports.getPurchase = void 0;
const purchaseService_1 = require("../services/purchaseService");
const getPurchase = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, purchaseService_1.getPurchaseServices)(_req, res);
});
exports.getPurchase = getPurchase;
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, purchaseService_1.createPurchaseServices)(req, res);
});
exports.createPurchase = createPurchase;
const findPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, purchaseService_1.findPurchaseServices)(req, res);
});
exports.findPurchase = findPurchase;
const updatePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, purchaseService_1.updatePurchaseServices)(req, res);
});
exports.updatePurchase = updatePurchase;
const deletePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, purchaseService_1.deletePurchaseServices)(req, res);
});
exports.deletePurchase = deletePurchase;
