import { Response } from "express";
import Cart from "../models/Cart";
const logger = require('../loggers/logger');

/**
 * Get Cart Services
 * @param req 
 * @param res 
 * @returns 
 */

export const getCartService = async (req: any, res: Response) => {
  try {
    const page: any = req.query.page ? req.query.page - 1 : 0;
    const cartPerPage: any = req.query.chunk || 5;

    const carts: any = await Cart.find({}).skip(page * cartPerPage).limit(cartPerPage);
    return res.json({
      success: true,
      data: carts
    });
  } catch (err) {
    console.log(err)
    logger.cartErrorLogger.log('info', 'Error Cart Lists')
    return res.send("An Error occured in get cart");

  }
};

/**
 * Create Cart Services
 * @param req 
 * @param res 
 */

export const createCartService = async (req: any, res: Response) => {
  try {
    const cartData = {
      created_user_id: req.body.created_user_id,
      productId: JSON.parse(req.body.productId),
      quantity: JSON.parse(req.body.quantity)
    }
    const cartStorage = new Cart(cartData);
    const result = await cartStorage.save();
    res.status(201).json({ msg: "Add to Cart Successfully", data: result })
  } catch (err) {
    res.send("An Error occured in create cart");
    console.log(err)
    logger.cartInfoLogger.log('info', 'Error Create Cart')
  }
};

/**
 * Find Cart Services
 * @param req 
 * @param res 
 */

export const findCartService = async (req: any, res: Response) => {
  try {
    const findData = await Cart.findById(req.params.id)
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
    res.send("An Error occured in find cart");
    logger.cartErrorLogger.log('info', 'Error Cart Not Found')
  }
};

/**
 * Update Cart Services
 * @param req 
 * @param res 
 */

export const updateCartService = async (req: any, res: Response) => {
  try {
    const cart: any = await Cart.findById(req.params.id)
    cart.created_user_id = req.body.created_user_id;
    cart.productId = JSON.parse(req.body.productId);
    cart.quantity = JSON.parse(req.body.quantity)
    const result = await cart.save();
    res.json({ msg: "Updated Successfully", data: result })
  } catch (err) {
    res.send("an error occured in Edit Cart");
    console.log(err)
    logger.cartErrorLogger.log('info', 'Error Update Cart')
  }
};

/**
 * Delete Cart Services
 * @param req 
 * @param res 
 */

export const deleteCartService = async (req: any, res: Response) => {
  try {
    await Cart.findById(req.params.id);
    await Cart.findByIdAndRemove(req.params.id);
    res.json({ message: "Cart with id " + req.params.id + " removed." })
  } catch (err) {
    res.send("An Error Occured During Delete Cart")
    console.log(err)
    logger.cartErrorLogger.log('info', 'Error Delete Cart')
  }
};