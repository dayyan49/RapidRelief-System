export const ASSISTANCE_CENTERS = [
  {
    id: "ac1",
    name: "Central Relief Shelter",
    type: "Shelter",
    lat: 28.6139,
    lon: 77.209,
    capacity: 500,
    phone: "1078",
  },
  {
    id: "ac2",
    name: "City Medical Camp",
    type: "Medical",
    lat: 28.6205,
    lon: 77.215,
    capacity: 200,
    phone: "102",
  },
  {
    id: "ac3",
    name: "Food Distribution Hub",
    type: "Food",
    lat: 28.608,
    lon: 77.22,
    capacity: 1000,
    phone: "1070",
  },
  {
    id: "ac4",
    name: "Emergency Supply Depot",
    type: "Supplies",
    lat: 28.625,
    lon: 77.205,
    capacity: 300,
    phone: "1078",
  },
];

export const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const getNearbyCenters = (lat, lon, limit = 5) => {
  return ASSISTANCE_CENTERS.map((center) => ({
    ...center,
    distance: getDistanceKm(lat, lon, center.lat, center.lon),
  }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};
