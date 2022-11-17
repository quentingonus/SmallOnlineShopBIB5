import Purchase from "../models/purchase";
// import { } from "./productService";
// import products from "../models/products";
import { Response } from "express";

export const getPopularProductServices = async (_req: any, res: Response) => {
  try {
    const result = await Purchase.find().populate("created_user_id");
    let newObj = {}

    // Collecting same items & Adding Items to Obj

    for (let i of result) {
      for (let [index, j] of i.productId.entries()) {
        if (j in newObj) {
          (newObj as any)[j] += parseInt(i.quantity[index])
        } else {
          (newObj as any)[j] = parseInt(i.quantity[index])
        }
      }
    }

    // Sorting to Array

    let newArr = []
    for (let i in newObj) {
      newArr.push([i, (newObj as any)[i]])
    }
    newArr.sort((a, b) => {
      return b[1] - a[1]
    });

    return res.json({ data: newArr });

  } catch (err) {
    return console.log(err)
  }
};