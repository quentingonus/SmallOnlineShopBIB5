import { Schema, model } from "mongoose";

const productSchema = new Schema({
  created_user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  profile: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  detail: {
    type: String,
  },
  created_category_id: {
    type: Schema.Types.ObjectId,
    ref: "category",
  }
}, {
  timestamps: true
}
)
export default model("product", productSchema)