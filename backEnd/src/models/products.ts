import { Schema, model } from "mongoose";

const productSchema = new Schema({
  created_user_id:{
    type: Schema.Types.ObjectId,
    ref :"user",
  },
  profile : {
    type : String,
    required: true
  },
  name : {
    type: String,
    required: true
  },
  price : {
    type : Number,
    required: true
  }
}, {
  timestamps: true
}
)
export default model("product", productSchema)