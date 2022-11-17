import { Response } from "express";
import User from "../models/User";
import { deleteFile } from "../utils";
import bcrypt from "bcrypt";
const logger = require('../loggers/logger');

export const getUserService = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(401).send("Only Admins can request.")
    }

    const page: any = req.query.page ? req.query.page - 1 : 0;
    const usersPerPage: any = req.query.chunk || 5;

    const users: any = await User.find({}).skip(page * usersPerPage).limit(usersPerPage);
    return res.json({
      success: true,
      data: users
    });

  } catch (err) {
    logger.userErrorLogger.log('info', 'Error User Lists')
    return res.status(400).send("An Error occured in get user");
  }
};

export const createUserService = async (req: any, res: Response) => {
  try {
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
    }
    const userCreate = {
      profile: profile,
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      address: req.body.address,
      phone: req.body.phone,
      dob: req.body.dob,
      type: req.body.type,
      created_user_id: req.body.created_user_id
    }
    const post = new User(userCreate);
    const result = await post.save();
    return res.status(200).json({ msg: "Created User Successfully!!", data: result, status: 1 });
  } catch (err) {
    console.log(err)
    logger.userInfoLogger.log('info', 'Error Create User')
    return res.status(400).send("An Error occured in create user");
  }
};

export const findUserService = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    const findData: any = await User.findById(req.params.id)
    if (requestedUser._id != findData._id && requestedUser.type != "Admin") {
      return res.status(403).send("Not Authorized")
    }
    return res.status(200).send({ data: findData })
  } catch (err) {
    logger.userErrorLogger.log('info', 'Error User Not Found')
    return res.send("An Error occured in find user");
  }
};

export const updateUserService = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser._id != req.params.id && requestedUser.type != "Admin") {
      return res.status(403).send("Not Authorized")
    }
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
      if (user.profile && user.profile != profile) {
        deleteFile(user.profile);
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
    user.created_user_id = req.body.created_user_id;
    user.updated_user_id = req.body.updated_user_id;
    const result = await user.save();
    return res.status(200).json({
      msg: "User Updated Successfully", data: {
        _id: result._id,
        profile: result.profile,
        name: result.name,
        email: result.email,
        address: result.address,
        phone: result.phone,
        dob: result.dob,
        type: result.type
      }
    });
  } catch (err) {
    logger.userErrorLogger.log('info', 'Error Update User')
    return res.status(400).send("an error occured in Edit User");
  }
};

export const deleteUserService = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    const user: any = await User.findById(req.params.id);

    if (!user) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Not Authorized")
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      success: true,
      msg: "User Deleted Successfully"
    })

  } catch (err) {
    logger.userErrorLogger.log('info', 'Error Delete User')
    return res.status(400).send("An Error Occured During Delete user")
  }
};