"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    profile: {
        type: String,
        required: true
    },
    titlee: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    created_category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "category",
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("product", productSchema);
