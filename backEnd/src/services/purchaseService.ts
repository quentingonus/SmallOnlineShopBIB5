import Purchase from "../models/purchase";
import User from '../models/User'
import { Response } from "express";
const logger = require('../loggers/logger');

/**
 * Get Purchase Services
 * @param req 
 * @param res 
 * @returns 
 */

export const getPurchaseServices = async (req: any, res: Response) => {
  try {
    const page: any = req.query.page ? req.query.page - 1 : 0;
    const purchasePerPage: any = req.query.chunk || 5;

    const purchase: any = await Purchase.find({}).populate("created_user_id").skip(page * purchasePerPage).limit(purchasePerPage);
    return res.json({
      success: true,
      data: purchase
    });
  } catch (err) {
    console.log(err)
    logger.purchaseErrorLogger.log('info', 'Error Purchase Lists')
    return res.send("An Error occured in get purchase");

  }
};

/**
 * Create Purchase Services
 * @param req 
 * @param res 
 */

export const createPurchaseServices = async (req: any, res: Response) => {
  try {
    console.log(req.body)
    const CategoryData = {
      created_user_id: req.body.created_user_id,
      productId: JSON.parse(req.body.productId),
      quantity: JSON.parse(req.body.quantity),
      address: req.body.address,
      credit: req.body.credit,
      date: new Date().toLocaleString(),
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

/**
 * Get Purchase By User Services
 * @param req 
 * @param res 
 * @returns 
 */

export const getPurchaseByUserIdServices = async (req: any, res: Response) => {
  try {
    let requestedUser: any = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser._id != req.params.userid && requestedUser.type != "Admin") {
      return res.status(403).send("Not Authorized")
    }
    let purchase: any = await Purchase.find({}).populate("created_user_id")
    purchase = purchase.filter((order: any) => {
      if (order.created_user_id) {
        return order.created_user_id._id == req.params.userid
      } else {
        return false
      }
    })
    return res.status(200).send({ data: purchase })
  } catch (err) {
    console.log(err)
    logger.purchaseErrorLogger.log('info', 'Error Purchase Not Found')
    return res.status(400).send("An Error occured in find purchase");
  }
}

/**
 * Find Purchase Services
 * @param req 
 * @param res 
 * @returns 
 */

export const findPurchaseServices = async (req: any, res: Response) => {
  try {
    const findData = await Purchase.findById(req.params.id).populate("created_user_id")
    return res.send({ data: findData })
  } catch (err) {
    console.log(err)
    logger.purchaseErrorLogger.log('info', 'Error Purchase Not Found')
    return res.send("An Error occured in find purchase");
  }
};

/**
 * Update Purchase Services
 * @param req 
 * @param res 
 * @returns 
 */

export const updatePurchaseServices = async (req: any, res: Response) => {
  try {
    const purchase: any = await Purchase.findById(req.params.id)
    purchase.productId = req.body.productId;
    purchase.quantity = req.body.quantity;
    purchase.address = req.body.address;
    purchase.credit = req.body.credit;
    purchase.order_status = req.body.order_status;
    const result = await purchase.save();
    return res.json({ message: "Updated Successfully!", data: result })
  } catch (err) {
    console.log(err)
    logger.purchaseErrorLogger.log('info', 'Error Update Purchase');
    return res.send("an error occured in Edit Purchase");

  }
};

/**
 * Delete Purchase Services
 * @param req 
 * @param res 
 * @returns 
 */

export const deletePurchaseServices = async (req: any, res: Response) => {
  try {
    await Purchase.findById(req.params.id);
    await Purchase.findByIdAndRemove(req.params.id);
    return res.json({ message: "purchase with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
    logger.purchaseErrorLogger.log('info', 'Error Delete Purchase')
    return res.send("An Error Occured During Delete Purchase")
  }
};