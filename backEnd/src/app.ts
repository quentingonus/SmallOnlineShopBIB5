import express, { Request } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer, { FileFilterCallback } from 'multer';
import path from "path";
import { rootDir } from "./utils";
import { v4 } from 'uuid';
import cors from 'cors';
import fs from 'fs';


const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');

import product_route from "./routes/product_route";
import purchase_route from "./routes/purchase_route";
import user_route from "./routes/user_route";
import cart_route from "./routes/cart_route";
import auth_route from './routes/auth_route';
import contact_route from "./routes/contact_route";
import category_route from "./routes/category_route";
import popular_route from "./routes/PopularProduct_route";
import search_route from "./routes/search_route";
import chart_route from "./routes/chart_route";

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

try {
  if (fs.existsSync('apiuploads')) {
    console.log("apiuploads folder Exists")
  } else {
    console.log("apiuploads folder not Exists")
    fs.mkdirSync('apiuploads', { recursive: true })
    console.log("apiuploads folder created")
  }
} catch (err) {
  console.error(err)
}

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(multer({ storage: fileStorage, fileFilter }).single('profileImage'));
app.use("/apiuploads", express.static(path.join(rootDir, "apiuploads")));

mongoose
  .connect(process.env.DATABASE || "")
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use('/users', user_route);
    app.use('/auth', auth_route);
    app.use('/carts', cart_route);
    app.use('/product', product_route);
    app.use('/purchase', purchase_route);
    app.use('/category', category_route);
    app.use('/contactus', contact_route);
    app.use('/popular', popular_route);
    app.use('/search', search_route);
    app.use('/chart', chart_route)
  })
