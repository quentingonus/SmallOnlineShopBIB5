import categorys from "../models/categorys";
import { Response } from "express";
import { deleteFile } from "../utils";
const logger = require('../loggers/logger');

export const getcategoryServices = async (_req: any, res: Response) => {
  try {
    const result = await categorys.find();
    res.json({ data: result });
  } catch (err) {
    console.log(err)
    res.send("An Error occured in get category");
    logger.categoryErrorLogger.log('info', 'Error Category Lists')
  }
};

export const createcategoryServices = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Unauthorized")
    }
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
    }
    const categoryData = {
      profile: profile,
      name: req.body.name,
    }
    const category = new categorys(categoryData);
    const result = await category.save();
    return res.status(201).json({ message: "Created Successfully", data: result })
  } catch (err) {
    logger.categoryInfoLogger.log('info', 'Error Create Category')
    return res.send("An Error occured in create category");
  }
};

export const findcategoryServices = async (req: any, res: Response) => {
  try {
    const findData = await categorys.findById(req.params.id)
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
    res.send("An Error occured in find category");
    logger.categoryErrorLogger.log('info', 'Error Category Not Found')
  }
};

export const updatecategoryServices = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Unauthorized")
    }
    const Category = await categorys.findById(req.params.id);
    if (!Category) {
      const error = new Error("Not Found");
      throw error;
    }
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
      if (Category.profile && Category.profile != profile) {
        deleteFile(Category.profile);
      }
      if (profile) {
        Category.profile = profile;
      }
    }
    const category: any = await categorys.findById(req.params.id)
    category.name = req.body.name;
    category.price = req.body.price;
    const result = await category.save();
    return res.json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    console.log(err)
    logger.categoryErrorLogger.log('info', 'Error Update Category')
    return res.send("an error occured in Edit Category");
  }
};

export const deletecategoryServices = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Unauthorized")
    }
    await categorys.findById(req.params.id);
    await categorys.findByIdAndRemove(req.params.id);
    return res.json({ message: "category with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
    logger.categoryErrorLogger.log('info', 'Error Delete Category')
    return res.send("An Error Occured During Delete Category")
  }
};
