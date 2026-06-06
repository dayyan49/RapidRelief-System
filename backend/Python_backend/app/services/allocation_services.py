from app.ml.predictor import predict_resources
from app.spatial.kd_tree import find_nearest_resources
from app.spatial.geo_utils import is_valid_coordinate


def allocate_resources(data):
    location = data.location
    resources = [r.model_dump() for r in data.resources]

    incident_lat = location[0]
    incident_lon = location[1]

    if not is_valid_coordinate(incident_lat, incident_lon):
        raise ValueError("Invalid incident coordinates")

    valid_resources = [
        resource
        for resource in resources
        if is_valid_coordinate(resource["lat"], resource["lon"])
    ]

    if not valid_resources:
        predictions = predict_resources(data)
        return {
            "teams_required": predictions["teams_required"],
            "ambulances_required": predictions["ambulances_required"],
            "food_packets_required": predictions["food_packets_required"],
            "medical_kits_required": predictions["medical_kits_required"],
            "allocated": [],
            "message": "No valid rescue resources available"
        }

    predictions = predict_resources(data)
    teams_required = predictions["teams_required"]

    nearest_resources = find_nearest_resources(
        valid_resources,
        [incident_lat, incident_lon],
        teams_required
    )

    return {
        "teams_required": predictions["teams_required"],
        "ambulances_required": predictions["ambulances_required"],
        "food_packets_required": predictions["food_packets_required"],
        "medical_kits_required": predictions["medical_kits_required"],
        "allocated": nearest_resources,
        "message": "Allocation successful"
    }


def find_nearby_centers(location, centers, k=5):
    resources = [
        {
            "id": center["id"],
            "lat": center["lat"],
            "lon": center["lon"],
            "name": center.get("name", ""),
            "type": center.get("type", ""),
        }
        for center in centers
        if is_valid_coordinate(center["lat"], center["lon"])
    ]

    if not resources:
        return []

    nearest = find_nearest_resources(
        resources,
        [location[0], location[1]],
        min(k, len(resources))
    )

    return nearest
