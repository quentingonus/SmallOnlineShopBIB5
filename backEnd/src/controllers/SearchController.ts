import { Response } from "express";
import { createsearchServices } from "../services/searchService";


export const createSearch = async (req: any, res: Response) => {
  createsearchServices(req, res);
};