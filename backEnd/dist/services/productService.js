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
exports.deleteproductServices = exports.updateproductServices = exports.findproductServices = exports.createproductServices = exports.getproductServices = void 0;
const products_1 = __importDefault(require("../models/products"));
const utils_1 = require("../utils");
const getproductServices = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_1.default.find().populate("created_user_id");
        res.json({ data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getproductServices = getproductServices;
const createproductServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profile = req.body.profileImage;
        if (req.file) {
            profile = req.file.path.replace('\\', '/');
        }
        console.log(req.body);
        const productData = {
            created_user_id: req.body.created_user_id,
            profile: profile,
            title: req.body.title,
            price: req.body.price,
        };
        console.log(productData);
        const product = new products_1.default(productData);
        const result = yield product.save();
        res.status(201).json({ message: "Created Successfully", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createproductServices = createproductServices;
const findproductServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findData = yield products_1.default.findById(req.params.id).populate("created_user_id");
        res.send({ data: findData });
    }
    catch (err) {
        console.log(err);
    }
});
exports.findproductServices = findproductServices;
const updateproductServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Product = yield products_1.default.findById(req.params.id);
        if (!Product) {
            const error = new Error("Not Found");
            throw error;
        }
        let profile = req.body.profileImage;
        if (req.file) {
            profile = req.file.path.replace('\\', '/');
            if (Product.profile && Product.profile != profile) {
                (0, utils_1.deleteFile)(Product.profile);
            }
            if (profile) {
                Product.profile = profile;
            }
        }
        const product = yield products_1.default.findById(req.params.id);
        product.title = req.body.title;
        product.price = req.body.price;
        const result = yield product.save();
        res.json({ message: "Updated Successfully!", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateproductServices = updateproductServices;
const deleteproductServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield products_1.default.findById(req.params.id);
        yield products_1.default.findByIdAndRemove(req.params.id);
        res.json({ message: "product with id " + req.params.id + " removed." });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteproductServices = deleteproductServices;
