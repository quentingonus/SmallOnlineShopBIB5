import { Response } from "express";
import { getproductServices, createproductServices, findproductServices, updateproductServices, deleteproductServices } from "../services/productService";

export const getProduct = async (_req :any, res:Response) => {
  getproductServices(_req, res);
};

export const createProduct = async (req :any, res:Response) => {
  createproductServices(req, res);
};

export const findProduct = async (req :any, res:Response) => {
  findproductServices(req, res);
};

export const updateProduct = async (req :any, res:Response) => {
  updateproductServices(req, res);
};

export const deleteProduct = async (req :any, res:Response) => {
  deleteproductServices(req, res);
};