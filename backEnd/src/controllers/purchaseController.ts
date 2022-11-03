import { Response } from "express";
import { getPurchaseServices, createPurchaseServices, findPurchaseServices, updatePurchaseServices, deletePurchaseServices } from "../services/purchaseService";

export const getPurchase = async (_req :any, res:Response) => {
  getPurchaseServices(_req, res);
};

export const createPurchase = async (req :any, res:Response) => {
  createPurchaseServices(req, res);
};

export const findPurchase = async (req :any, res:Response) => {
  findPurchaseServices(req, res);
};

export const updatePurchase = async (req :any, res:Response) => {
  updatePurchaseServices(req, res);
};

export const deletePurchase = async (req :any, res:Response) => {
  deletePurchaseServices(req, res);
};