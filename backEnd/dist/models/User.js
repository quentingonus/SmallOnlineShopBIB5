"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    profile: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        default: ""
    },
    dob: {
        type: Date,
        default: ""
    },
    type: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    updated_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    deleted_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    deleted_at: {
        type: Date
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("user", userSchema);
