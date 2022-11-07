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
exports.deletecategoryServices = exports.updatecategoryServices = exports.findcategoryServices = exports.createcategoryServices = exports.getcategoryServices = void 0;
const categorys_1 = __importDefault(require("../models/categorys"));
const utils_1 = require("../utils");
const getcategoryServices = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categorys_1.default.find();
        res.json({ data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getcategoryServices = getcategoryServices;
const createcategoryServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profile = req.body.profileImage;
        if (req.file) {
            profile = req.file.path.replace('\\', '/');
        }
        console.log(req.body);
        const categoryData = {
            profile: profile,
            name: req.body.name,
        };
        console.log(categoryData);
        const category = new categorys_1.default(categoryData);
        const result = yield category.save();
        res.status(201).json({ message: "Created Successfully", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createcategoryServices = createcategoryServices;
const findcategoryServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findData = yield categorys_1.default.findById(req.params.id).populate("created_user_id");
        res.send({ data: findData });
    }
    catch (err) {
        console.log(err);
    }
});
exports.findcategoryServices = findcategoryServices;
const updatecategoryServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield categorys_1.default.findById(req.params.id);
        if (!Category) {
            const error = new Error("Not Found");
            throw error;
        }
        let profile = req.body.profileImage;
        if (req.file) {
            profile = req.file.path.replace('\\', '/');
            if (Category.profile && Category.profile != profile) {
                (0, utils_1.deleteFile)(Category.profile);
            }
            if (profile) {
                Category.profile = profile;
            }
        }
        const category = yield categorys_1.default.findById(req.params.id);
        category.name = req.body.name;
        category.price = req.body.price;
        const result = yield category.save();
        res.json({ message: "Updated Successfully!", data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updatecategoryServices = updatecategoryServices;
const deletecategoryServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categorys_1.default.findById(req.params.id);
        yield categorys_1.default.findByIdAndRemove(req.params.id);
        res.json({ message: "category with id " + req.params.id + " removed." });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deletecategoryServices = deletecategoryServices;
