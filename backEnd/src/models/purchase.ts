import { Schema, model } from "mongoose";

var purchaseschema = new Schema({
  created_user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  productId: {
    type: [Object],
    required: true
  },
  quantity: {
    type: [String],
    required: true
  },
  address: {
    type: String,
    require: true
  },
  credit: {
    type: String,
    require: true
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

export default model("purchase", purchaseschema)