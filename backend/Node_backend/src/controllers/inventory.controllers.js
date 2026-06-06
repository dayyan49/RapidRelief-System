import { Resource } from "../models/resource.model.js";

export const getAllResources = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const resources = await Resource.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, resources });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const { name, type, quantity, available, lat, lon, status, notes } = req.body;

    if (!name || !type || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "name, type, and quantity are required",
      });
    }

    const resource = await Resource.create({
      name,
      type,
      quantity,
      available: available ?? quantity,
      location: lat != null && lon != null ? { lat, lon } : undefined,
      status: status || "AVAILABLE",
      notes,
    });

    return res.status(201).json({ success: true, resource });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, quantity, available, lat, lon, status, notes } = req.body;

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }

    if (name != null) resource.name = name;
    if (type != null) resource.type = type;
    if (quantity != null) resource.quantity = quantity;
    if (available != null) resource.available = available;
    if (status != null) resource.status = status;
    if (notes != null) resource.notes = notes;
    if (lat != null && lon != null) resource.location = { lat, lon };

    await resource.save();
    return res.status(200).json({ success: true, resource });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }
    return res.status(200).json({ success: true, message: "Resource deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getInventorySummary = async (req, res) => {
  try {
    const resources = await Resource.find();
    const summary = {
      AMBULANCE: { total: 0, available: 0 },
      MEDICAL_KIT: { total: 0, available: 0 },
      FOOD_PACKET: { total: 0, available: 0 },
      RESCUE_TEAM: { total: 0, available: 0 },
    };

    resources.forEach((r) => {
      if (summary[r.type]) {
        summary[r.type].total += r.quantity;
        summary[r.type].available += r.available;
      }
    });

    return res.status(200).json({ success: true, summary, resources });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
