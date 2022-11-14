import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { compareSync } from 'bcrypt';
import crypto from "crypto";

import PasswordReset from '../models/passwordReset';
import sendEmail from '../utils/sendEmail'

export const loginService = async (req: Request, res: Response) => {
  User.findOne({ email: req.body.email }).then(async (user: any) => {
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "Could not find user"
      })
    }
    // console.log(user);

    if (!compareSync(req.body.password, user.password)) {
      return res.status(404).send({
        success: false,
        messages: 'Incorrect password'
      });
    }
    const payload = {
      email: await bcrypt.hash(user.email, 12),
      id: await bcrypt.hash(user.id, 12)
    }

    const token = jwt.sign(payload, 'furtive', { expiresIn: '1d' });

    return res.status(200).send({
      success: true,
      message: 'Login Successfully!',
      user: {
        _id: user._id,
        profile: user.profile,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        dob: user.dob,
        type: user.type
      },
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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Email doesn't exist");
    }
    let token = await PasswordReset.findOne({ email: req.body.email })
    if (!token) {
      token = await new PasswordReset({
        email: req.body.email,
        token: crypto.randomBytes(16).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/password-reset-update/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password Reset", link);

    return res.status(200).json({
      msg: "Password Reset link sent to your email"
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
      token: req.params.token
    });

    if (!passwordReset) {
      return res.status(404).send("Invalid link or expired");
    }

    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();
    await passwordReset.delete();

    return res.json({
      msg: 'Password reset Successfully'
    })
  } catch (err) {
    return res.send("Password Reset Failed")
  }
};

export const passwordChangeService = async (req: Request, res: Response) => {
  try {
    await User.findById(req.body.userId).then(async (user: any) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Could not find user'
        })
      }

      const token = req.params.token;
      if (!token) return res.status(401).send("Unauthorized");


      if (!compareSync(req.body.oldPassword, user.password)) {
        return res.send({
          success: false,
          message: 'Incorrect password'
        });
      }

      if (compareSync(req.body.newPassword, user.password)) {
        return res.send({
          success: false,
          message: 'Current Password and New Password are same.'
        });
      }

      user.password = await bcrypt.hash(req.body.newPassword, 12);
      await user.save();
      return res.json({ message: "Password Change Successfully!" });
    })
  } catch (error) {
    res.send("An error occured");
  }
};

