import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  created_user_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  created_product_id: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
}, {
  timestamps: true
}
)
export default model("cart", cartSchema)