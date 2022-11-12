import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  created_user_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  productId: {
    type: [Object],
    required: true
  },
  quantity: {
    type: [String],
    required: true
  },
}, {
  timestamps: true
}
)
export default model("cart", cartSchema)