import mongoose from "mongoose";
import path from "path";

const imageDefaultPath = path.join(__dirname, "../utils/imageUserDefault.ts");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: imageDefaultPath },
  phone: { type: String, required: true },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  password: { type: String, required: true },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
