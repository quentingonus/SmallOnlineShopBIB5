import { Response } from "express";
import { getChartServices } from "../services/chartService";

export const getChart = async (_req: any, res: Response) => {
  getChartServices(_req, res);
};