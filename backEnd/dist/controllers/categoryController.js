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
exports.deleteCategory = exports.updateCategory = exports.findCategory = exports.createCategory = exports.getCategory = void 0;
const categoryService_1 = require("../services/categoryService");
const getCategory = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoryService_1.getcategoryServices)(_req, res);
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoryService_1.createcategoryServices)(req, res);
});
exports.createCategory = createCategory;
const findCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoryService_1.findcategoryServices)(req, res);
});
exports.findCategory = findCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoryService_1.updatecategoryServices)(req, res);
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, categoryService_1.deletecategoryServices)(req, res);
});
exports.deleteCategory = deleteCategory;
