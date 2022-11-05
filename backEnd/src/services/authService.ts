import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { compareSync } from 'bcrypt';
import crypto from "crypto";

import PasswordReset from '../models/passwordReset';
import sendEmail from '../utils/sendEmail'

export const loginService = async (req:Request, res:Response) => {
  User.findOne({ email: req.body.email }).then(async (user: any) => {
    if (!user) {
      return res.status(404).send({
        success : false ,
        msg : "Could not find user"
      })
    }

    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        messages: 'Incorrect password'
      });
    }
    const payload = {
      email: await bcrypt.hash(user.email, 12),
      id: await bcrypt.hash(user.id, 12)
    }

    const token = jwt.sign(payload, 'nyan', { expiresIn: '1d' });

    return res.status(200).send({
      success: true,
      message: 'Login Successfully!',
      user: user,
      token: token
    });
  })
}

export const logoutService = (req: any, res: Response) => {
  req.session = null;
  return res.json({ "message": "Logout Successfully" });
};

export const forgetPasswordService = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ email : req.body.email});
    if (!user) {
      return res.status(404).send("Email doesn't exist");
    }
    let token = await PasswordReset.findOne({ email : req.body.email})
    if (!token) {
      token = await new PasswordReset({
        email : req.body.email ,
        token: crypto.randomBytes(16).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/forget_password_update/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password Reset" ,link);
    
    return res.status(200).json({
      msg : "Password Reset link sent to your email"
    })
  } catch (err) {
    return res.send("An Error occured in passwordReset");
    console.log(err);   
  }
}

export const resetPasswordService = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send("UserId does not exist");
    }
    const passwordReset = await PasswordReset.findOne({
      token : req.params.token
    });

    if (!passwordReset) {
      return res.status(404).send("Invalid link or expired");
    }
    
    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();
    await passwordReset.delete();

    return res.json ({ 
      msg:'Password reset Successfully'
    })
  } catch (err) {
    return res.send ("Password Reset Failed")
  }
}