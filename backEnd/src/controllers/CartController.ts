import { Response } from "express";
import { getCartService, createCartService, findCartService, updateCartService, deleteCartService } from "../services/cartService";

export const getCart = async (_req: any, res: Response) => {
  getCartService(_req, res);
};

export const createCart = async (req: any, res: Response) => {
  createCartService(req, res);
};

export const findCart = async (req: any, res: Response) => {
  findCartService(req, res);
};

export const updateCart = async (req: any, res: Response) => {
  updateCartService(req, res);
};

export const deleteCart = async (req: any, res: Response) => {
  deleteCartService(req, res);
};