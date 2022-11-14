import { Response } from "express";
import User from "../models/User";
import { deleteFile } from "../utils";
import bcrypt from "bcrypt";

export const getUserService = async (_req: any, res: Response) => {
  try {
    const result = await User.find();
    res.json({ data: result });
  } catch (err) {
    console.log(err)
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
    res.status(200).json({ msg: "Created User Successfully!!", data: result, status: 1 });
  } catch (err) {
    res.send("An Error occured in create user");
    console.log(err)
  }
};

export const findUserService = async (req: any, res: Response) => {
  try {
    const findData = await User.findById(req.params.id)
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
  }
};

export const updateUserService = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("Not Found");
      throw error;
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
    res.json({
      msg: "Image Updated Successfully", data: {
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
    res.send("an error occured in Edit User");
    console.log(err)
  }
};

export const deleteUserService = async (req: any, res: Response) => {
  try {
    const user: any = await User.findById(req.params.id);
    if (!user) {
      const error: any = new Error("Not Found !!")
      error.statusCode = 404;
      throw error;
    }
    user.deleted_at = new Date();   //testing and if error!,must be repair
    const result = await user.save(); //testing and if error!,must be repair
    res.json({ msg: "Deleted User Successfully", data: result }) //testing and if error!,must be repair
    // await User.findByIdAndRemove(req.params.id); 
    // res.json({ message: "User with id " + req.params.id + " removed." })
  } catch (err) {
    res.send("An Error Occured During Delete user")
    console.log(err)
  }
};