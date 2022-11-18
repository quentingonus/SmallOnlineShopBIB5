import Purchase from "../models/purchase";
import Products from "../models/products";
import User from '../models/User'
import { Response } from "express";

const searchName = (id: any, arr: any) => {
  for (let i of arr) {
    if (i._id == id) {
      return i.title
    }
  }
}

/**
 * Get Chart Services
 * @param req 
 * @param res 
 * @returns 
 */

export const getChartServices = async (req: any, res: Response) => {
  try {
    let requestedUser = await User.findById(req.decoded.id)
    if (!requestedUser) {
      return res.status(401).send("Cannot find the user")
    }
    if (requestedUser.type != "Admin") {
      return res.status(403).send("Unauthorized")
    }
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


    const products = await Products.find({})

    newArr = newArr.map((item: any) => {
      let tmpName = searchName(item[0], products)
      item.push(tmpName)
      return item
    })

    return res.json({
      data: newArr.filter((item: any) => {
        if (item[2]) {
          return item
        }
      })
    });

  } catch (err) {
    console.log(err)
    return res.status(400).send("General Error.")
  }
};