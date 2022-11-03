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
exports.deleteProduct = exports.updateProduct = exports.findProduct = exports.createProduct = exports.getProduct = void 0;
const productService_1 = require("../services/productService");
const getProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productService_1.getproductServices)(_req, res);
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productService_1.createproductServices)(req, res);
});
exports.createProduct = createProduct;
const findProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productService_1.findproductServices)(req, res);
});
exports.findProduct = findProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productService_1.updateproductServices)(req, res);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, productService_1.deleteproductServices)(req, res);
});
exports.deleteProduct = deleteProduct;
