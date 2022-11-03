import products from "../models/products";
import { Response } from "express";
import {deleteFile} from "../utils";

export const getproductServices = async (_req :any, res:Response) => {
  try {
    const result = await products.find().populate("created_user_id");
    res.json({ data: result });
  } catch (err) {
    console.log(err)
  }
};

export const createproductServices = async (req :any, res:Response) => {
  try {
    let profile = req.body.profileImage;
    if ( req.file ) {
      profile = req.file.path.replace('\\','/');
    }

   console.log(req.body)
    const productData = {
      created_user_id: req.body.created_user_id,
      profile: profile,
      name: req.body.name,
      price: req.body.price,
    }
    
    console.log(productData)
    const product = new products(productData);
    const result = await product.save();
    res.status(201).json({ message: "Created Successfully", data: result })
  } catch (err) {
    console.log(err)
  }
};

export const findproductServices = async (req :any, res:Response) => {
  try {
    const findData = await products.findById(req.params.id).populate("created_user_id")
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
  }
};

export const updateproductServices = async (req :any, res:Response) => {
  try {
    const Product = await products.findById(req.params.id);
    if (!Product) {
      const error = new Error ("Not Found");
      throw error;
    }
    let profile = req.body.profileImage;
    if (req.file) {
     profile = req.file.path.replace('\\','/');
    if (Product.profile && Product.profile != profile) {
     deleteFile(Product.profile);
    }
    if (profile) {
      Product.profile = profile ;
    }
  }
    const product:any = await products.findById(req.params.id)
    product.name = req.body.name;
    product.price = req.body.price;
    const result = await product.save();
    res.json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    console.log(err)
  }
};

export const deleteproductServices = async (req :any, res:Response) => {
  try {
    await products.findById(req.params.id);
    await products.findByIdAndRemove(req.params.id);
    res.json({ message: "product with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
  }
};