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
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
    }

    console.log(req.body)
    const categoryData = {
      profile: profile,
      name: req.body.name,
    }

    console.log(categoryData)
    const category = new categorys(categoryData);
    const result = await category.save();
    res.status(201).json({ message: "Created Successfully", data: result })
  } catch (err) {
    res.send("An Error occured in create category");
    console.log(err)
    logger.categoryInfoLogger.log('info', 'Error Create Category')
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
    res.json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    res.send("an error occured in Edit Category");
    console.log(err)
    logger.categoryErrorLogger.log('info', 'Error Update Category')
  }
};

export const deletecategoryServices = async (req: any, res: Response) => {
  try {
    await categorys.findById(req.params.id);
    await categorys.findByIdAndRemove(req.params.id);
    res.json({ message: "category with id " + req.params.id + " removed." })
  } catch (err) {
    res.send("An Error Occured During Delete Category")
    console.log(err)
    logger.categoryErrorLogger.log('info', 'Error Delete Category')
  }
};