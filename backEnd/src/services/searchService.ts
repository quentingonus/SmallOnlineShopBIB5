import { Response } from "express";
import products from "../models/products";
const logger = require('../loggers/logger');

export const createsearchServices = async (req: any, res: Response) => {
    try {
        let search = await products.find(
            {
                "$or": [
                    { title: { $regex: req.params.key } }
                ]
            }
        )
        res.status(200).json({
            message: "Created Successfully", data: search.map((item: any) => {
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
    } catch (err) {
        console.log(err)
        res.send("An Error occured in create product");
        logger.productInfoLogger.log('info', 'Error Create Product')
    }
};