"""Generate synthetic disaster management training data."""
import csv
import os
import random

DISASTER_TYPES = ["FLOOD", "EARTHQUAKE", "FIRE", "LANDSLIDE", "CYCLONE", "OTHER"]
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "disaster_dataset.csv")

COLUMNS = [
    "severity", "affected_population", "disaster_type", "rainfall_mm",
    "road_blockage_percent", "medical_need_level", "elderly_population",
    "infrastructure_damage_level", "rescue_team_availability", "area_size_km2",
    "hospital_distance_km", "response_time_target_min",
    "teams_required", "ambulances_required", "food_packets_required", "medical_kits_required",
]


def _compute_targets(row):
    severity = row["severity"]
    pop = row["affected_population"]
    medical = row["medical_need_level"]
    damage = row["infrastructure_damage_level"]
    blockage = row["road_blockage_percent"]
    rainfall = row["rainfall_mm"]
    disaster = row["disaster_type"]

    disaster_factor = {
        "FLOOD": 1.3, "EARTHQUAKE": 1.5, "FIRE": 1.1,
        "LANDSLIDE": 1.4, "CYCLONE": 1.6, "OTHER": 1.0,
    }.get(disaster, 1.0)

    teams = max(1, int(round(
        (severity * pop / 60 + damage * 2 + blockage / 15) * disaster_factor
    )))
    ambulances = max(1, int(round(
        (severity * medical / 4 + pop / 200 + rainfall / 50) * disaster_factor
    )))
    food_packets = max(pop, int(round(pop * 2.5 + severity * 10)))
    medical_kits = max(1, int(round(pop / 35 + medical * 2 + damage)))

    return teams, ambulances, food_packets, medical_kits


def generate(rows=2000):
    random.seed(42)
    data = []

    for _ in range(rows):
        severity = random.randint(1, 10)
        pop = random.randint(10, 5000)
        disaster = random.choice(DISASTER_TYPES)

        row = {
            "severity": severity,
            "affected_population": pop,
            "disaster_type": disaster,
            "rainfall_mm": round(random.uniform(0, 300), 1),
            "road_blockage_percent": round(random.uniform(0, 100), 1),
            "medical_need_level": random.randint(1, 10),
            "elderly_population": int(pop * random.uniform(0.05, 0.25)),
            "infrastructure_damage_level": random.randint(1, 10),
            "rescue_team_availability": random.randint(1, 50),
            "area_size_km2": round(random.uniform(0.5, 100), 1),
            "hospital_distance_km": round(random.uniform(1, 50), 1),
            "response_time_target_min": random.choice([15, 30, 45, 60]),
        }

        t, a, f, m = _compute_targets(row)
        row["teams_required"] = t
        row["ambulances_required"] = a
        row["food_packets_required"] = f
        row["medical_kits_required"] = m
        data.append(row)

    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=COLUMNS)
        writer.writeheader()
        writer.writerows(data)

    print(f"Generated {rows} rows -> {OUTPUT_PATH}")
    return OUTPUT_PATH


if __name__ == "__main__":
    generate()
