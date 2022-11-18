const jwt = require("jsonwebtoken");

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    let token: string = req.headers['authorization'].split(" ")[1];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    req.decoded = jwt.verify(token, (process.env.JWT_SECRET as any));
  } catch (err) {
    console.log("From CATCH:", err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};