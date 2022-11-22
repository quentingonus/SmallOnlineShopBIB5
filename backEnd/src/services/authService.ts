import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { compareSync } from 'bcrypt';
import crypto from "crypto";
import PasswordReset from '../models/passwordReset';
import sendEmail from '../utils/sendEmail'

/**
 * Login Services
 * @param req 
 * @param res 
 */

export const loginService = async (req: Request, res: Response) => {
  User.findOne({ email: req.body.email }).then(async (user: any) => {
    if (!user) {
      return res.status(404).send("Could not find user")
    }
    // console.log(user);

    if (!compareSync(req.body.password, user.password)) {
      return res.status(404).send('Incorrect password');
    }
    const payload = {
      email: await bcrypt.hash(user.email, 12),
      id: user.id
    }

    const token = jwt.sign(payload, (process.env.JWT_SECRET as any), { expiresIn: '1d' });

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

/**
 * LogOut Services
 * @param req 
 * @param res 
 * @returns 
 */

export const logoutService = (req: any, res: Response) => {
  req.session = null;
  return res.json({ "message": "Logout Successfully" });
};

/**
 * Forget Password Services
 * @param req 
 * @param res 
 * @returns 
 */

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
      success: true,
      msg: "Password Reset link sent to your email"
    })
  } catch (err) {
    console.log(err);
    return res.status(400).send("An Error occured in passwordReset");
  }
}

/**
 * Reset Password Services
 * @param req 
 * @param res 
 * @returns 
 */

export const resetPasswordService = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    const PasswordResetToken: any = await PasswordReset.findOne({
      token: req.params.token
    });

    if (!PasswordResetToken) {
      return res.status(404).send("Invalid link or expired");
    }

    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();
    await PasswordResetToken.delete();

    return res.json({
      success: true,
      msg: 'Password reset Successfully'
    })
  } catch (err) {
    return res.status(400).send("Password Reset Failed")
  }
};

/**
 * Password Change Services
 * @param req 
 * @param res 
 */

export const passwordChangeService = async (req: Request, res: Response) => {
  try {
    await User.findById(req.body.userId).then(async (user: any) => {
      if (!user) {
        return res.status(400).send('Could not find user')
      }

      let requestedUser = await User.findById((req as any).decoded.id)
      if (!requestedUser) {
        return res.status(401).send("Cannot find the user")
      }

      if (requestedUser.type != "Admin" && requestedUser._id != req.body.userId) {
        return res.status(403).send("Not Authorized")
      }

      if (!compareSync(req.body.oldPassword, user.password)) {
        return res.status(400).send("Incorrect password");
      }

      if (compareSync(req.body.newPassword, user.password)) {
        return res.status(400).send('Current Password and New Password are same.');
      }

      user.password = await bcrypt.hash(req.body.newPassword, 12);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password Change Successfully!"
      });
    })
  } catch (error) {
    console.log(error)
    res.status(400).send("An error occured");
  }
};

/**
 * Check Password Reset Token Services
 * @param req 
 * @param res 
 * @returns 
 */

export const checkPasswdResetTokenService = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send("User does not exist");
    }

    const token = await PasswordReset.findOne({ token: req.body.resetToken });

    if (!token) {
      return res.status(404).send("Invalid link or expired");
    }
    if (user.email == token.email) {
      return res.json({
        success: true,
        msg: 'Token is valid'
      })
    }
    return res.status(400).json('Token is not valid')
  } catch (error) {
    console.log(error)
    return res.status(400).send("An error occured");
  }
};
