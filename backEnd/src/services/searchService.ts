import { Response } from "express";
import products from "../models/products";
const logger = require('../loggers/logger');

/**
 * Create Search Services
 * @param req 
 * @param res 
 */

export const createsearchServices = async (req: any, res: Response) => {
  try {
    console.log("Query is ", req.body.query)
    let search = await products.find(
      {
        title: {
          '$regex': req.body.query, '$options': 'i'
        }
      }
    )
    if (search.length) {
      res.status(200).json({
        message: "Search success.", data: search.map((item: any) => {
          return {
            _id: item._id,
            created_user_id: item.created_user_id,
            profile: item.profile,
            title: item.title,
            price: item.price,
            detail: item.detail,
            created_category_id: item.created_category_id
          }
        })
      })
    } else {
      res.status(400).send("Query Not found")
    }
  } catch (err) {
    console.log(err)
    logger.productInfoLogger.log('info', 'Error Create Product')
    res.send("An Error occured in search product");
  }
};