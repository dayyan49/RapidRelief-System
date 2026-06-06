import mongoose from "mongoose";

const assistanceCenterSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["Shelter", "Medical", "Food", "Supplies"],
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  capacity: { type: Number, default: 100 },
  phone: { type: String, default: "1078" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

assistanceCenterSchema.index({ "location.lat": 1, "location.lon": 1 });
assistanceCenterSchema.index({ isActive: 1 });

export const AssistanceCenter = mongoose.model("AssistanceCenter", assistanceCenterSchema);
