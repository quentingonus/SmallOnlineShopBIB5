import Purchase from "../models/purchase";
import { Response } from "express";

export const getPurchaseServices = async (_req :any, res:Response) => {
  try {
    const result = await Purchase.find().populate("created_user_id");
    res.json({ data: result });
  } catch (err) {
    console.log(err)
  }
};

export const createPurchaseServices = async (req :any, res:Response) => {
  try {
   console.log(req.body)
    const CategoryData = {
        created_user_id: req.body.created_user_id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        address: req.body.address,
        credit: req.body.credit,
        date: req.body.date,
        order_status: req.body.order_status
    }
    console.log(CategoryData)
    const Category = new Purchase(CategoryData);
    const result = await Category.save();
    res.status(201).json({ message: "Created Successfully", data: result })
  } catch (err) {
    console.log(err)
  }
};

export const findPurchaseServices = async (req :any, res:Response) => {
  try {
    const findData = await Purchase.findById(req.params.id).populate("created_user_id")
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
  }
};

export const updatePurchaseServices = async (req :any, res:Response) => {
  try {
    const purchase:any = await Purchase.findById(req.params.id)
    purchase.productId = req.body.productId;
    purchase.quantity = req.body.quantity;
    purchase.address = req.body.address;
    purchase.credit = req.body.credit;
    const result = await purchase.save();
    res.json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    console.log(err)
  }
};

export const deletePurchaseServices = async (req :any, res:Response) => {
  try {
    await Purchase.findById(req.params.id);
    await Purchase.findByIdAndRemove(req.params.id);
    res.json({ message: "purchase with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
  }
};