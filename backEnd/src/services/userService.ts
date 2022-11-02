import {Response} from "express";
import User from "../models/User";
import {deleteFile} from "../utils";
import bcrypt from "bcrypt";

export const getUserService = async (_req :any, res:Response) => {
  try {
    const result = await User.find();
    res.json({ data: result });
  } catch (err) {
    console.log(err)
  }
};

export const createUserService = async (req :any, res:Response) => {
  try {
    let profile = req.body.profileImage;
    if ( req.file ) {
      profile = req.file.path.replace('\\','/');
    }
    const userCreate = {
      profile : profile,
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      address: req.body.address,
      phone: req.body.phone,
      dob: req.body.dob,
      type:req.body.type
    }    
    const post = new User(userCreate);
    const result = await post.save();
    res.status(200).json({msg : "Created User Successfully!!", data : result, status: 1});
  } catch (err) {
    res.send("An Error occured");
    console.log(err)
  }
};

export const findUserService = async (req :any, res:Response) => {
  try {
    const findData = await User.findById(req.params.id)
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
  }
};

export const updateUserService = async (req :any, res:Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error ("Not Found");
      throw error;
    }
    let profile = req.body.profileImage;
    if (req.file) {
     profile = req.file.path.replace('\\','/');
    if (user.profile && user.profile != profile) {
     deleteFile(user.profile);
    }
    if (profile) {
      user.profile = profile ;
    }
  }
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.address = req.body.address;
  user.phone = req.body.phone;
  user.dob = req.body.dob;
  user.type = req.body.type
  const result = await user.save();
  res.json ({msg : "Image Updated Successfully", data: result});
} catch (err) {
     res.send("an error occured in editImage");
     console.log(err)
   }
 };

export const deleteUserService = async (req :any, res:Response) => {
  try {
    await User.findById(req.params.id);
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: "User with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
  }
};