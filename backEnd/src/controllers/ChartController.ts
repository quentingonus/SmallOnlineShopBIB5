import { Response } from "express";
import { getChartServices } from "../services/chartService";

export const getChart = async (req: any, res: Response) => {
  getChartServices(req, res);
};