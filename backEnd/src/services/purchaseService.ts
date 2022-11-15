import Purchase from "../models/purchase";
import { Response } from "express";
const logger = require('../loggers/logger');

export const getPurchaseServices = async (_req: any, res: Response) => {
  try {
    const result = await Purchase.find().populate("created_user_id");
    res.json({ data: result });
  } catch (err) {
    console.log(err)
    res.send("An Error occured in get purchase");
    logger.purchaseErrorLogger.log('info', 'Error Purchase Lists')
  }
};

export const createPurchaseServices = async (req: any, res: Response) => {
  try {
    console.log(req.body)
    const CategoryData = {
      created_user_id: req.body.created_user_id,
      productId: JSON.parse(req.body.productId),
      quantity: JSON.parse(req.body.quantity),
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
    res.send("An Error occured in create purchase");
    console.log(err)
    logger.purchaseInfoLogger.log('info', 'Error Create Purchase')
  }
};

export const findPurchaseServices = async (req: any, res: Response) => {
  try {
    const findData = await Purchase.findById(req.params.id).populate("created_user_id")
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
    res.send("An Error occured in find purchase");
    logger.purchaseErrorLogger.log('info', 'Error Purchase Not Found')
  }
};

export const updatePurchaseServices = async (req: any, res: Response) => {
  try {
    const purchase: any = await Purchase.findById(req.params.id)
    purchase.productId = req.body.productId;
    purchase.quantity = req.body.quantity;
    purchase.address = req.body.address;
    purchase.credit = req.body.credit;
    purchase.order_status = req.body.order_status;
    const result = await purchase.save();
    res.json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    res.send("an error occured in Edit Purchase");
    console.log(err)
    logger.purchaseErrorLogger.log('info', 'Error Update Purchase')
  }
};

export const deletePurchaseServices = async (req: any, res: Response) => {
  try {
    await Purchase.findById(req.params.id);
    await Purchase.findByIdAndRemove(req.params.id);
    res.json({ message: "purchase with id " + req.params.id + " removed." })
  } catch (err) {
    res.send("An Error Occured During Delete Purchase")
    console.log(err)
    logger.purchaseErrorLogger.log('info', 'Error Delete Purchase')
  }
};