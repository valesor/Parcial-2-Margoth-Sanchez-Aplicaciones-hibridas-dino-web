import mongoose from "mongoose";

const paleoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  specialty: { type: String },
});

export default mongoose.model("Paleontologist", paleoSchema);
