import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  url: String,
  type: {
    type: String,
    enum: ["ID_PROOF", "CERTIFICATE"]
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true
  },

  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: function () {
      return !this.isGuest;
    }
  },

  role: {
    type: String,
    enum: ["USER", "RESCUE", "ADMIN"],
    default: "USER"
  },

  status: {
    type: String,
    enum: ["ACTIVE", "PENDING", "BLOCKED"],
    default: "ACTIVE"
  },

  isGuest: {
    type: Boolean,
    default: true
  },

  location: {
    current: {
      lat: { type: Number, default: null },
      lon: { type: Number, default: null },
      updatedAt: Date
    },
    lastKnown: {
      lat: { type: Number, default: null },
      lon: { type: Number, default: null },
      updatedAt: Date
    }
  },

  skills: [String],

  rescueApplicationStatus: {
    type: String,
    enum: ["NONE", "PENDING", "APPROVED", "REJECTED"],
    default: "NONE"
  },

  availability: {
    type: String,
    enum: ["FULL_TIME", "PART_TIME", "OFF_DUTY"],
    default: "OFF_DUTY"
  },

  documents: [documentSchema],

  verification: {
    isVerified: { type: Boolean, default: false },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    verifiedAt: Date
  },

  lastLogin: Date,
  isLoggedIn: {
    type: Boolean,
    default: false
  },

  resetToken: String,
  resetExpires: Date

}, { timestamps: true });

// 🔥 indexes
userSchema.index({ role: 1, status: 1 });

export const User = mongoose.model("User", userSchema);