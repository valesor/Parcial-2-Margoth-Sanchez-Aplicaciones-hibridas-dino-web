import mongoose from "mongoose";

const dinoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    era: { type: String, required: true },
    diet: { type: String, required: true },
    description: { type: String },
    paleontologist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paleontologist",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Dinosaur", dinoSchema);
