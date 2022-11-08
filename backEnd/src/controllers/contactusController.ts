import { Response } from 'express';
import { contactusService } from '../services/contactusService';

export const contactUs = async (req: any, res: Response) => {
  contactusService(req, res);
}