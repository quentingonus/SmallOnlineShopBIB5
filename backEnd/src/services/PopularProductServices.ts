import Purchase from "../models/purchase";
// import { } from "./productService";
// import products from "../models/products";
import { Response } from "express";
//const logger = require('../loggers/logger');

export const getPopularProductServices = async (_req: any, res: Response) => {
  try {
    const result = await Purchase.find().populate("created_user_id");
    let newObj = {}

    // Collecting same items & Adding Items to Obj
    console.log(result);

    for (let i of result) {
      for (let [index, j] of i.productId.entries()) {
        if (j in newObj) {
          (newObj as any)[j] += parseInt(i.quantity[index])
        } else {
          (newObj as any)[j] = parseInt(i.quantity[index])
        }
      }
    }

    console.log(newObj);

    // Sorting to Array

    let newArr = []
    for (let i in newObj) {
      newArr.push([i, (newObj as any)[i]])
    }
    newArr.sort((a, b) => {
      return b[1] - a[1]
    });

    return res.json({ data: newArr });

    // Kaung si thu 's idea

    // const test = [
    //   {
    //     productId : req.body.productId,
    //     quantity : req.body.quantity
    //   }
    // ]

    // test.sort((max, min)=> {
    //   return min.quantity - max.quantity 
    // }) 

    // test.forEach((top) => {
    //   res.send("testing")
    //   console.log(`${top.productId}`);
    //   res.json({ data : result});
    // })
  } catch (err) {
    return console.log(err)
  }
};