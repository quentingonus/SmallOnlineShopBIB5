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
exports.deleteUserService = exports.updateUserService = exports.findUserService = exports.createUserService = exports.getUserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserService = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_1.default.find();
        res.json({ data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUserService = getUserService;
const createUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profile = req.body.profileImage;
        if (req.file) {
            profile = req.file.path.replace('\\', '/');
        }
        const userCreate = {
            profile: profile,
            name: req.body.name,
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, 12),
            address: req.body.address,
            phone: req.body.phone,
            dob: req.body.dob,
            type: req.body.type,
            created_user_id: req.body.created_user_id
        };
        const post = new User_1.default(userCreate);
        const result = yield post.save();
        res.status(200).json({ msg: "Created User Successfully!!", data: result, status: 1 });
    }
    catch (err) {
        res.send("An Error occured in create user");
        console.log(err);
    }
});
exports.createUserService = createUserService;
const findUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findData = yield User_1.default.findById(req.params.id);
        res.send({ data: findData });
    }
    catch (err) {
        console.log(err);
    }
});
exports.findUserService = findUserService;
const updateUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            const error = new Error("Not Found");
            throw error;
        }
        let profile = req.body.profileImage;
        if (req.file) {
            profile = req.file.path.replace('\\', '/');
            if (user.profile && user.profile != profile) {
                (0, utils_1.deleteFile)(user.profile);
            }
            if (profile) {
                user.profile = profile;
            }
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.dob = req.body.dob;
        user.type = req.body.type;
        user.created_user_id = req.body.created_user_id;
        user.updated_user_id = req.body.updated_user_id;
        const result = yield user.save();
        res.json({ msg: "Image Updated Successfully", data: result });
    }
    catch (err) {
        res.send("an error occured in Edit User");
        console.log(err);
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            const error = new Error("Not Found !!");
            error.statusCode = 404;
            throw error;
        }
        user.deleted_at = new Date(); //testing and if error!,must be repair
        const result = yield user.save(); //testing and if error!,must be repair
        res.json({ msg: "Deleted User Successfully", data: result }); //testing and if error!,must be repair
        // await User.findByIdAndRemove(req.params.id); 
        // res.json({ message: "User with id " + req.params.id + " removed." })
    }
    catch (err) {
        res.send("An Error Occured During Delete user");
        console.log(err);
    }
});
exports.deleteUserService = deleteUserService;
