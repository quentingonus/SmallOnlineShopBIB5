import products from "../models/products";
import { Response } from "express";
import { deleteFile } from "../utils";
const logger = require('../loggers/logger');
import { isAuthenticate } from "./customService";

export const getproductServices = async (_req: any, res: Response) => {
  try {
    const result = await products.find().populate("created_user_id");
    isAuthenticate("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiQyYiQxMiRGRHp2OEljREhVci9RREZGazd4WG0uS3lsbHVmVUhIbGFKRVo5VmJOTklNd3k2Q3ZNSXhraSIsImlkIjoiJDJiJDEyJDE4VFNGQ29oWTBPS0dxc25CeXlkSXVuUXMvdjNhMC9BZTJzaXlsWS5iUlVxOEZRVm9wbUlHIiwiaWF0IjoxNjY4NDgyNjY5LCJleHAiOjE2Njg1NjkwNjl9.azVJxFZJrG16ZtEjvz5Z3_3IfO4TDk-QQkK0Z9AtZM4");
    res.json({ data: result });
  } catch (err) {
    console.log(err)
    res.send("An Error occured in get product");
    logger.productInfoLogger.log('info', 'Error Product Lists')
  }
};

export const createproductServices = async (req: any, res: Response) => {
  try {
    let profile = req.body.profileImage;
    if (req.file) {
      profile = req.file.path.replace('\\', '/');
    }

    console.log(req.body)
    const productData = {
      created_user_id: req.body.created_user_id,
      profile: profile,
      title: req.body.title,
      price: req.body.price,
      created_category_id: req.body.created_category_id
    }

    console.log(productData)
    const product = new products(productData);
    const result = await product.save();
    res.status(201).json({ message: "Created Successfully", data: result })
  } catch (err) {
    console.log(err)
    res.send("An Error occured in create product");
    logger.productInfoLogger.log('info', 'Error Create Product')
  }
};

export const findproductServices = async (req: any, res: Response) => {
  try {
    const findData = await products.findById(req.params.id).populate("created_user_id", "created_category_id")
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
    res.send("An Error occured in find product");
    logger.productErrorLogger.log('error', 'Error Product Not Found')
  }
};

export const updateproductServices = async (req: any, res: Response) => {
  try {
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
    const result = await product.save();
    res.json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    console.log(err)
    res.send("An Error occured in update product");
    logger.productErrorLogger.log('error', 'Error Update Product')
  }
};

export const deleteproductServices = async (req: any, res: Response) => {
  try {
    await products.findById(req.params.id);
    await products.findByIdAndRemove(req.params.id);
    res.json({ message: "product with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
    res.send("An Error occured in delete product");
    logger.productErrorLogger.log('error', 'Error Delete Product')
  }
};