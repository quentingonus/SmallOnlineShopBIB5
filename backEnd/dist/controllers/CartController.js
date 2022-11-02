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
exports.deleteCart = exports.updateCart = exports.findCart = exports.createCart = exports.getCart = void 0;
const cartService_1 = require("../services/cartService");
const getCart = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartService_1.getCartService)(_req, res);
});
exports.getCart = getCart;
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartService_1.createCartService)(req, res);
});
exports.createCart = createCart;
const findCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartService_1.findCartService)(req, res);
});
exports.findCart = findCart;
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartService_1.updateCartService)(req, res);
});
exports.updateCart = updateCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cartService_1.deleteCartService)(req, res);
});
exports.deleteCart = deleteCart;
