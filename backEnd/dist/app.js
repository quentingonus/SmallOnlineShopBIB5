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
const user_route_1 = __importDefault(require("./routes/user_route"));
const cart_route_1 = __importDefault(require("./routes/cart_route"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const uuid_1 = require("uuid");
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
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single('profileImage'));
app.use("/apiuploads", express_1.default.static(path_1.default.join(utils_1.rootDir, "apiuploads")));
mongoose_1.default
    .connect(process.env.DATABASE || "")
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/users', user_route_1.default);
    app.use('/carts', cart_route_1.default);
});
