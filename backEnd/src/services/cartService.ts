import {Response} from "express";
import Cart from "../models/Cart";

export const getCartService = async (_req :any, res:Response) => {
  try {
    const result = await Cart.find();
    res.json({ data: result });
  } catch (err) {
    console.log(err)
  }
};

export const createCartService =async (req:any, res:Response) => {
  try {
    const cartData = {
      created_product_id: req.body.created_product_id, //testing and must be repair 
      created_user_id: req.body.created_user_id    //testing and must be repair
    }
    const cartStorage = new Cart(cartData);
    const result = await cartStorage.save();
    res.status(201).json({msg: "Add to Cart Successfully", data: result })
  } catch (err) {
    console.log(err);
  }
};

export const findCartService = async (req :any, res:Response) => {
  try {
    const findData = await Cart.findById(req.params.id)
    res.send({ data: findData })
  } catch (err) {
    console.log(err)
  }
};

export const updateCartService =async (req:any, res:Response) => {
  try {
      const cart:any = await Cart.findById(req.params.id)
      cart.created_product_id = req.body.created_product_id; //testing and must be repair 
      cart.created_user_id = req.body.created_user_id    //testing and must be repair
      const result = await cart.save();
      res.json({msg: "Updated Successfully" , data : result})
  } catch (err) {
    console.log(err);
  }
};

export const deleteCartService = async (req :any, res:Response) => {
  try {
    await Cart.findById(req.params.id);
    await Cart.findByIdAndRemove(req.params.id);
    res.json({ message: "Cart with id " + req.params.id + " removed." })
  } catch (err) {
    console.log(err)
  }
};