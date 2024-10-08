import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    slots_booked: { type: Object, default: {} },
    date: { type: Number, required: true },
  },
  { minimize: false }
);

const barberModel =
  mongoose.models.barber || mongoose.model("barber", barberSchema);
export default barberModel;
