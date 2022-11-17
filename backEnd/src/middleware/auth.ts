const jwt = require("jsonwebtoken");

export const verifyToken = (req: any, res: any, next: any) => {
  //const token = req.headers["x-access-token"];
  let token = req.headers['authorization'].replace("Bearer ", "");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    req.decoded = jwt.verify(token, (process.env.JWT_SECRET as any));
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};