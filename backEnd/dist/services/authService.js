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
exports.resetPasswordService = exports.forgetPasswordService = exports.logoutService = exports.loginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_2 = require("bcrypt");
const crypto_1 = __importDefault(require("crypto"));
const passwordReset_1 = __importDefault(require("../models/passwordReset"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const loginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.findOne({ email: req.body.email }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "Could not find user"
            });
        }
        if (!(0, bcrypt_2.compareSync)(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                messages: 'Incorrect password'
            });
        }
        const payload = {
            email: yield bcrypt_1.default.hash(user.email, 12),
            id: yield bcrypt_1.default.hash(user.id, 12)
        };
        const token = jsonwebtoken_1.default.sign(payload, 'nyan', { expiresIn: '1d' });
        return res.status(200).send({
            success: true,
            message: 'Login Successfully!',
            user: user,
            token: token
        });
    }));
});
exports.loginService = loginService;
const logoutService = (req, res) => {
    req.session = null;
    return res.json({ "message": "Logout Successfully" });
};
exports.logoutService = logoutService;
const forgetPasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send("Email doesn't exist");
        }
        let token = yield passwordReset_1.default.findOne({ email: req.body.email });
        if (!token) {
            token = yield new passwordReset_1.default({
                email: req.body.email,
                token: crypto_1.default.randomBytes(16).toString("hex"),
            }).save();
        }
        const link = `${process.env.BASE_URL}/forget_password_update/${user._id}/${token.token}`;
        yield (0, sendEmail_1.default)(user.email, "Password Reset", link);
        return res.status(200).json({
            msg: "Password Reset link sent to your email"
        });
    }
    catch (err) {
        return res.send("An Error occured in passwordReset");
        console.log(err);
    }
});
exports.forgetPasswordService = forgetPasswordService;
const resetPasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.body.userId);
        if (!user) {
            return res.status(404).send("UserId does not exist");
        }
        const passwordReset = yield passwordReset_1.default.findOne({
            token: req.params.token
        });
        if (!passwordReset) {
            return res.status(404).send("Invalid link or expired");
        }
        user.password = yield bcrypt_1.default.hash(req.body.password, 12);
        yield user.save();
        yield passwordReset.delete();
        return res.json({
            msg: 'Password reset Successfully'
        });
    }
    catch (err) {
        return res.send("Password Reset Failed");
    }
});
exports.resetPasswordService = resetPasswordService;
