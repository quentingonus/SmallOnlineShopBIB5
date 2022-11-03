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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchaseServices = exports.updatePurchaseServices = exports.findPurchaseServices = exports.createPurchaseServices = exports.getPurchaseServices = void 0;
const purchase_1 = __importDefault(require("../models/purchase"));
const getPurchaseServices = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield purchase_1.default.find().populate("created_user_id");
        res.json({ data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getPurchaseServices = getPurchaseServices;
const createPurchaseServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const CategoryData = {
            created_user_id: req.body.created_user_id,
            productId: req.body.productId,
            quantity: req.body.quantity,
            date: req.body.date,
            order_status: req.body.order_status
        };
        console.log(CategoryData);
        const Category = new purchase_1.default(CategoryData);
        const result = yield Category.save();
        res.status(201).json({ message: "Created Successfully", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createPurchaseServices = createPurchaseServices;
const findPurchaseServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findData = yield purchase_1.default.findById(req.params.id).populate("created_user_id");
        res.send({ data: findData });
    }
    catch (err) {
        console.log(err);
    }
});
exports.findPurchaseServices = findPurchaseServices;
const updatePurchaseServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchase = yield purchase_1.default.findById(req.params.id);
        purchase.productId = req.body.productId;
        purchase.quantity = req.body.quantity;
        const result = yield purchase.save();
        res.json({ message: "Updated Successfully!", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updatePurchaseServices = updatePurchaseServices;
const deletePurchaseServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield purchase_1.default.findById(req.params.id);
        yield purchase_1.default.findByIdAndRemove(req.params.id);
        res.json({ message: "purchase with id " + req.params.id + " removed." });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deletePurchaseServices = deletePurchaseServices;
