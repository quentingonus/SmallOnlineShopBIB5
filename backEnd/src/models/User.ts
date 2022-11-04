import { Schema, model } from "mongoose";

const userSchema = new Schema({
  profile : {
    type : String,
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
  phone:{
    type: Number,
    default: ""
  },
  dob:{
    type: Date,
    default: ""
  },
  type: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  },
  created_user_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  updated_user_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  deleted_user_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  deleted_at: {
    type: Date
  },
}, {
  timestamps: true
}
)
export default model("user", userSchema)