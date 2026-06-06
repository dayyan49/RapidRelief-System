import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  location: {
    lat: {
        type: Number,
        required: true
      },

      lon: {
        type: Number,
        required: true
      }
  },

  severity: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED"],
    default: "PENDING"
  },

  affectedPopulation: {
      type: Number,
      default: 1
    },

    disasterType: {
      type: String,
      enum: [
        "FLOOD",
        "EARTHQUAKE",
        "FIRE",
        "LANDSLIDE",
        "CYCLONE",
        "STORM",
        "OTHER"
      ],
      default: "OTHER"
    },

    description: String,

    rainfallMm: Number,
    roadBlockagePercent: Number,
    medicalNeedLevel: { type: Number, min: 1, max: 10 },
    elderlyPopulation: Number,
    infrastructureDamageLevel: { type: Number, min: 1, max: 10 },
    areaSizeKm2: Number,
    hospitalDistanceKm: Number,
    responseTimeTargetMin: Number,

    mlPredictions: {
      teamsRequired: Number,
      ambulancesRequired: Number,
      foodPacketsRequired: Number,
      medicalKitsRequired: Number,
      predictedAt: Date,
    },

}, {timestamps: true});


// 🔥 index
incidentSchema.index({
  status: 1,
  severity: -1
});

export const Incident = mongoose.model("Incident", incidentSchema);