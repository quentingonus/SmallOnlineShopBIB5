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
exports.passwordChange = exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = void 0;
const authService_1 = require("../services/authService");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authService_1.loginService)(req, res);
});
exports.login = login;
const logout = (req, res) => {
    (0, authService_1.logoutService)(req, res);
};
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authService_1.forgetPasswordService)(req, res);
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authService_1.resetPasswordService)(req, res);
});
exports.resetPassword = resetPassword;
const passwordChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authService_1.passwordChangeService)(req, res);
});
exports.passwordChange = passwordChange;
