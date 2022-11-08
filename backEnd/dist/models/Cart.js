"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    created_product_id: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "product"
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("cart", cartSchema);
