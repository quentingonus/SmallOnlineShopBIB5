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
exports.deleteCartService = exports.updateCartService = exports.findCartService = exports.createCartService = exports.getCartService = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getCartService = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Cart_1.default.find();
        res.json({ data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getCartService = getCartService;
const createCartService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartData = {
            created_product_id: req.body.created_product_id,
            created_user_id: req.body.created_user_id //testing and must be repair
        };
        const cartStorage = new Cart_1.default(cartData);
        const result = yield cartStorage.save();
        res.status(201).json({ msg: "Add to Cart Successfully", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createCartService = createCartService;
const findCartService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findData = yield Cart_1.default.findById(req.params.id);
        res.send({ data: findData });
    }
    catch (err) {
        console.log(err);
    }
});
exports.findCartService = findCartService;
const updateCartService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.default.findById(req.params.id);
        cart.created_product_id = req.body.created_product_id; //testing and must be repair 
        cart.created_user_id = req.body.created_user_id; //testing and must be repair
        const result = yield cart.save();
        res.json({ msg: "Updated Successfully", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateCartService = updateCartService;
const deleteCartService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Cart_1.default.findById(req.params.id);
        yield Cart_1.default.findByIdAndRemove(req.params.id);
        res.json({ message: "Cart with id " + req.params.id + " removed." });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteCartService = deleteCartService;
