import products from "../models/products";
import User from '../models/User'
import { Response } from "express";
import { deleteFile } from "../utils";
const logger = require('../loggers/logger');

/**
 * Get Product Services
 * @param req 
 * @param res 
 * @returns 
 */

export const getproductServices = async (req: any, res: Response) => {
  try {
    const page: any = req.query.page ? req.query.page - 1 : 0;
    const productPerPage: any = req.query.chunk || 5;

    const product: any = await products.find({}).populate("created_user_id").skip(page * productPerPage).limit(productPerPage);
    return res.json({
      success: true,
      data: product
    });
  } catch (err) {
    console.log(err)
    logger.productInfoLogger.log('info', 'Error Product Lists')
    return res.send("An Error occured in get product");

  }
};

/**
 * Create Product Services
 * @param req 
 * @param res 
 * @returns 
 */

export const createproductServices = async (req: any, res: Response) => {
  try {
    let requestedUser: any = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Not Authorized")
    }
    console.log("Everything OK")
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
    }
    const productData = {
      created_user_id: req.body.created_user_id,
      profile: profile,
      title: req.body.title,
      price: req.body.price,
      created_category_id: req.body.created_category_id,
      detail: req.body.detail
    }
    const product = new products(productData);
    const result = await product.save();
    return res.status(200).json({ message: "Created Successfully", data: result })
  } catch (err) {
    console.log(err)
    logger.productInfoLogger.log('info', 'Error Create Product')
    return res.send("An Error occured in create product");
  }
};

/**
 * Find Product Services
 * @param req 
 * @param res 
 * @returns 
 */

export const findproductServices = async (req: any, res: Response) => {
  try {
    const findData = await products.findById(req.params.id).populate("created_user_id", "created_category_id")
    return res.send({ data: findData })
  } catch (err) {
    console.log(err)
    logger.productErrorLogger.log('error', 'Error Product Not Found')
    return res.send("An Error occured in find product");
  }
};

/**
 * Update Product Services
 * @param req 
 * @param res 
 * @returns 
 */

export const updateproductServices = async (req: any, res: Response) => {
  try {
    let requestedUser: any = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Not Authorized")
    }
    const Product = await products.findById(req.params.id);
    if (!Product) {
      const error = new Error("Not Found");
      throw error;
    }
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
      if (Product.profile && Product.profile != profile) {
        deleteFile(Product.profile);
      }
      if (profile) {
        Product.profile = profile;
      }
    }
    const product: any = await products.findById(req.params.id)
    product.title = req.body.title;
    product.price = req.body.price;
    product.detail = req.body.detail;
    const result = await product.save();
    return res.status(200).json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    console.log(err)
    logger.productErrorLogger.log('error', 'Error Update Product')
    return res.status(400).send("An Error occured in update product");
  }
};

/**
 * Delete Product Services
 * @param req 
 * @param res 
 * @returns 
 */

export const deleteproductServices = async (req: any, res: Response) => {
  try {
    let requestedUser: any = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Not Authorized")
    }
    await products.findById(req.params.id);
    await products.findByIdAndRemove(req.params.id);
    return res.status(200).json({ message: "product with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
    logger.productErrorLogger.log('error', 'Error Delete Product')
    return res.status(400).send("An Error occured in delete product");
  }
};