import { Response } from 'express';
import contactEmail from '../utils/contactMail';
// import user from "../models/User";

/**
 * Contact Us Services
 * @param req 
 * @param res 
 * @returns 
 */

export const contactusService = async (req: any, res: Response) => {
  try {
    const email = req.body.email;
    const detail = req.body.detail;
    await contactEmail(email, "Feedback", `Sender mail: ${email}\nDetails: ${detail}`);

    return res.status(200).json({
      msg: "Thank for your feedback!!"
    })
  } catch (err) {
    const error = new Error();
    console.log(error);
    return res.send("An Error occured in feedback");
  }
}