import { profile, time } from "console";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: String,
  password: String,
  username: String,
  name: String,
  coverImage: String,
  profile: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;