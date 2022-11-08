"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const utils_1 = require("./utils");
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs'); 
// const swaggerDocument = YAML.load('../../api.yaml');
const product_route_1 = __importDefault(require("./routes/product_route"));
const purchase_route_1 = __importDefault(require("./routes/purchase_route"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const cart_route_1 = __importDefault(require("./routes/cart_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const contact_route_1 = __importDefault(require("./routes/contact_route"));
const category_route_1 = __importDefault(require("./routes/category_route"));
require("./config/passport");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const fileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "apiuploads");
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}_${file.originalname}`);
    },
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/webp" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single('profileImage'));
app.use("/apiuploads", express_1.default.static(path_1.default.join(utils_1.rootDir, "apiuploads")));
app.use(passport_1.default.initialize());
mongoose_1.default
    .connect(process.env.DATABASE || "")
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    // app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use('/users', passport_1.default.authenticate('jwt', { session: false }), user_route_1.default);
    app.use('/auth', auth_route_1.default);
    app.use('/carts', cart_route_1.default);
    app.use('/product', product_route_1.default);
    app.use('/purchase', purchase_route_1.default);
    app.use('/category', category_route_1.default);
    app.use('/contactus', contact_route_1.default);
});
