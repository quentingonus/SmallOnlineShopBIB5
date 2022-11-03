import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  profile : {
    type : String,
    required: true
  },
  name : {
    type: String,
    required: true
  },
}, {
  timestamps: true
}
)
export default model("category", categorySchema)                    