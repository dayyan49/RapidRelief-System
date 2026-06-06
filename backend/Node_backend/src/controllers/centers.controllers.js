import { AssistanceCenter } from "../models/assistanceCenter.model.js";
import { callNearbyCenters } from "../services/python.services.js";
import { calculateDistance } from "../utils/distance.js";

export const getNearbyCenters = async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);
    const limit = parseInt(req.query.limit || "5", 10);

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return res.status(400).json({
        success: false,
        message: "Valid lat and lon query parameters required",
      });
    }

    const centers = await AssistanceCenter.find({ isActive: true });

    if (centers.length === 0) {
      return res.status(200).json({ success: true, centers: [] });
    }

    const centerPayload = centers.map((c) => ({
      id: c._id.toString(),
      name: c.name,
      type: c.type,
      lat: c.location.lat,
      lon: c.location.lon,
    }));

    let nearest = [];

    try {
      nearest = await callNearbyCenters({
        location: [lat, lon],
        centers: centerPayload,
        limit,
      });
    } catch {
      nearest = centerPayload
        .map((c) => ({
          ...c,
          distance: calculateDistance(lat, lon, c.lat, c.lon),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit);
    }

    const enriched = nearest.map((item) => {
      const dbCenter = centers.find((c) => c._id.toString() === item.id);
      const distance =
        item.distance ??
        calculateDistance(lat, lon, item.lat, item.lon);

      return {
        id: item.id,
        name: item.name || dbCenter?.name,
        type: item.type || dbCenter?.type,
        lat: item.lat,
        lon: item.lon,
        capacity: dbCenter?.capacity,
        phone: dbCenter?.phone,
        distance: Math.round(distance * 10) / 10,
      };
    });

    return res.status(200).json({
      success: true,
      centers: enriched,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCenters = async (req, res) => {
  try {
    const centers = await AssistanceCenter.find({ isActive: true });
    return res.status(200).json({ success: true, centers });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
