import express ,{ Request } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer, { FileFilterCallback } from 'multer';
import path from "path";
import { rootDir } from "./utils";
import { v4 } from 'uuid';

import product_route from "./routes/product_route";
import purchase_route from "./routes/purchase_route";
import user_route from "./routes/user_route";
import cart_route from "./routes/cart_route";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "apiuploads");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  },
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(multer({storage: fileStorage , fileFilter}).single('profileImage'));
app.use("/apiuploads", express.static(path.join(rootDir, "apiuploads")));

mongoose
  .connect(process.env.DATABASE || "")
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/users', user_route);
    app.use('/carts', cart_route);
    app.use('/product', product_route);
    app.use('/purchase', purchase_route);
  })

