import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import dns from "dns"

dns.setServers(["8.8.8.8","8.8.4.4"])

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  role: { type: String, default: "USER" },
  status: { type: String, default: "ACTIVE" },
  isGuest: { type: Boolean, default: false },
  rescueApplicationStatus: { type: String, default: "NONE" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const DEFAULT_CENTERS = [
  { name: "Central Relief Shelter", type: "Shelter", location: { lat: 28.6139, lon: 77.209 }, capacity: 500, phone: "1078" },
  { name: "City Medical Camp", type: "Medical", location: { lat: 28.6205, lon: 77.215 }, capacity: 200, phone: "102" },
  { name: "Food Distribution Hub", type: "Food", location: { lat: 28.608, lon: 77.22 }, capacity: 1000, phone: "1070" },
  { name: "Emergency Supply Depot", type: "Supplies", location: { lat: 28.625, lon: 77.205 }, capacity: 300, phone: "1078" },
];

const centerSchema = new mongoose.Schema({
  name: String,
  type: String,
  location: { lat: Number, lon: Number },
  capacity: Number,
  phone: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const AssistanceCenter = mongoose.model("AssistanceCenter", centerSchema);

const DEFAULT_RESOURCES = [
  { name: "Ambulance Unit A1", type: "AMBULANCE", quantity: 10, available: 8, status: "AVAILABLE" },
  { name: "Ambulance Unit A2", type: "AMBULANCE", quantity: 5, available: 5, status: "AVAILABLE" },
  { name: "Medical Kit Batch M1", type: "MEDICAL_KIT", quantity: 500, available: 450, status: "AVAILABLE" },
  { name: "Emergency Food Supply F1", type: "FOOD_PACKET", quantity: 2000, available: 1800, status: "AVAILABLE" },
  { name: "Rescue Team Alpha", type: "RESCUE_TEAM", quantity: 15, available: 12, status: "AVAILABLE" },
  { name: "Rescue Team Beta", type: "RESCUE_TEAM", quantity: 10, available: 10, status: "AVAILABLE" },
];

const resourceSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  available: Number,
  status: String,
}, { timestamps: true });

const Resource = mongoose.model("Resource", resourceSchema);

const seed = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required in .env");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@rapidrelief.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = process.env.ADMIN_NAME || "System Admin";
  const adminPhone = process.env.ADMIN_PHONE || "9999999999";

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    if (existing.role !== "ADMIN") {
      existing.role = "ADMIN";
      existing.status = "ACTIVE";
      await existing.save();
      console.log(`Updated existing user to ADMIN: ${adminEmail}`);
    } else {
      console.log(`Admin already exists: ${adminEmail}`);
    }
  } else {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: adminName,
      email: adminEmail,
      phoneNumber: adminPhone,
      password: hashed,
      role: "ADMIN",
      status: "ACTIVE",
      isGuest: false,
    });
    console.log(`Admin created: ${adminEmail} / ${adminPassword}`);
  }

  const centerCount = await AssistanceCenter.countDocuments();
  if (centerCount === 0) {
    await AssistanceCenter.insertMany(DEFAULT_CENTERS);
    console.log(`Seeded ${DEFAULT_CENTERS.length} assistance centers`);
  } else {
    console.log(`Assistance centers already seeded (${centerCount} found)`);
  }

  const resourceCount = await Resource.countDocuments();
  if (resourceCount === 0) {
    await Resource.insertMany(DEFAULT_RESOURCES);
    console.log(`Seeded ${DEFAULT_RESOURCES.length} inventory resources`);
  } else {
    console.log(`Inventory already seeded (${resourceCount} found)`);
  }

  await mongoose.disconnect();
  console.log("Seed complete");
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
