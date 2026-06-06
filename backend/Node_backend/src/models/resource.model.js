import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["AMBULANCE", "MEDICAL_KIT", "FOOD_PACKET", "RESCUE_TEAM"],
    required: true,
  },
  quantity: { type: Number, required: true, min: 0, default: 0 },
  available: { type: Number, required: true, min: 0, default: 0 },
  location: {
    lat: Number,
    lon: Number,
  },
  status: {
    type: String,
    enum: ["AVAILABLE", "DEPLOYED", "MAINTENANCE"],
    default: "AVAILABLE",
  },
  notes: String,
}, { timestamps: true });

resourceSchema.index({ type: 1, status: 1 });

export const Resource = mongoose.model("Resource", resourceSchema);
