import { Response } from "express";
import { getcategoryServices, createcategoryServices, findcategoryServices, updatecategoryServices, deletecategoryServices } from "../services/categoryService";

export const getCategory = async (_req: any, res: Response) => {
  getcategoryServices(_req, res);
};

export const createCategory = async (req: any, res: Response) => {
  createcategoryServices(req, res);
};

export const findCategory = async (req: any, res: Response) => {
  findcategoryServices(req, res);
};

export const updateCategory = async (req: any, res: Response) => {
  updatecategoryServices(req, res);
};

export const deleteCategory = async (req: any, res: Response) => {
  deletecategoryServices(req, res);
};