"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var purchaseschema = new mongoose_1.Schema({
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    productId: {
        type: Object,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
});
exports.default = (0, mongoose_1.model)("purchase", purchaseschema);
