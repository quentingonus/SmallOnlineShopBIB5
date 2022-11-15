import { Request, Response } from 'express';
import { loginService, logoutService, forgetPasswordService, resetPasswordService, passwordChangeService, checkPasswdResetTokenService } from '../services/authService'

export const login = async (req: Request, res: Response) => {
  loginService(req, res);
};

export const logout = (req: any, res: Response) => {
  logoutService(req, res);
};

export const forgotPassword = async (req: any, res: Response) => {
  forgetPasswordService(req, res);
};

export const resetPassword = async (req: Request, res: Response) => {
  resetPasswordService(req, res);
};

export const passwordChange = async (req: Request, res: Response) => {
  passwordChangeService(req, res);
};

export const checkPasswdResetToken = async (req: Request, res: Response) => {
  checkPasswdResetTokenService(req, res);
};