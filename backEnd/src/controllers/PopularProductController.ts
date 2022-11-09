import { Response } from "express";
import { getPopularProductServices } from "../services/PopularProductServices";

export const getPopularPorduct = async (_req: any, res: Response) => {
  getPopularProductServices(_req, res);
};