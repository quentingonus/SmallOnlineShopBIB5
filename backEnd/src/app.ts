import express, { Request } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer, { FileFilterCallback } from 'multer';
import path from "path";
import passport from 'passport';
import { rootDir } from "./utils";
import { v4 } from 'uuid';
import cors from 'cors';

// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs'); 
// const swaggerDocument = YAML.load('../../api.yaml');

import product_route from "./routes/product_route";
import purchase_route from "./routes/purchase_route";
import user_route from "./routes/user_route";
import cart_route from "./routes/cart_route";
import auth_route from './routes/auth_route';
<<<<<<< HEAD
<<<<<<< HEAD
import category_route from './routes/category_route';
=======
import contact_route from "./routes/contact_route";
import category_route from "./routes/category_route";
>>>>>>> origin/feature/contactus
=======
import contact_route from "./routes/contact_route";
import category_route from "./routes/category_route";
>>>>>>> origin/feature/contactus

require("./config/passport")

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
app.use(passport.initialize());

mongoose
  .connect(process.env.DATABASE || "")
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
<<<<<<< HEAD
<<<<<<< HEAD
    app.use('/users', passport.authenticate('jwt', { session: false }), user_route);
=======
=======
>>>>>>> origin/feature/contactus
    // app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use('/users',passport.authenticate('jwt', { session: false }), user_route);
>>>>>>> origin/feature/contactus
    app.use('/auth', auth_route);
    app.use('/carts', cart_route);
    app.use('/product', product_route);
    app.use('/purchase', purchase_route);
    app.use('/category', category_route);
<<<<<<< HEAD
<<<<<<< HEAD
=======
    app.use('/contactus' , contact_route);

>>>>>>> origin/feature/contactus
=======
    app.use('/contactus' , contact_route);

>>>>>>> origin/feature/contactus
  })

