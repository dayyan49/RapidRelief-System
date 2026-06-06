import csv
import os

MODEL_DIR = os.path.dirname(__file__)

XLSX_PATH = os.path.join(MODEL_DIR, "disaster_management_dataset.xlsx")
CSV_PATH = os.path.join(MODEL_DIR, "disaster_dataset.csv")

NUMERIC_FEATURES = [
    "severity", "affected_population", "rainfall_mm", "road_blockage_percent",
    "medical_need_level", "elderly_population", "infrastructure_damage_level",
    "rescue_team_availability", "area_size_km2", "hospital_distance_km",
    "response_time_target_min",
]
TARGETS = [
    "teams_required", "ambulances_required",
    "food_packets_required", "medical_kits_required",
]
REQUIRED_COLUMNS = NUMERIC_FEATURES + ["disaster_type"] + TARGETS


def normalize_disaster_type(value):
    return str(value).strip().upper()


def _validate_and_normalize(rows):
    cleaned = []
    disaster_types = set()

    for row in rows:
        if not all(col in row and row[col] not in (None, "") for col in REQUIRED_COLUMNS):
            continue

        normalized = {col: row[col] for col in REQUIRED_COLUMNS}
        normalized["disaster_type"] = normalize_disaster_type(normalized["disaster_type"])

        for col in NUMERIC_FEATURES + TARGETS:
            normalized[col] = float(normalized[col])

        disaster_types.add(normalized["disaster_type"])
        cleaned.append(normalized)

    return cleaned, sorted(disaster_types)


def _load_xlsx(path):
    import pandas as pd
    df = pd.read_excel(path)
    df.columns = [c.strip().lower() for c in df.columns]
    return df.to_dict(orient="records")


def _load_csv(path):
    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = []
        for row in reader:
            rows.append({k.strip().lower(): v for k, v in row.items()})
        return rows


def load_training_data():
    if os.path.exists(XLSX_PATH):
        print(f"Loading dataset from {XLSX_PATH}")
        rows = _load_xlsx(XLSX_PATH)
        source = XLSX_PATH
    elif os.path.exists(CSV_PATH):
        print(f"Loading dataset from {CSV_PATH}")
        rows = _load_csv(CSV_PATH)
        source = CSV_PATH
    else:
        from app.ml.generate_dataset import generate, OUTPUT_PATH
        print("No dataset found — generating synthetic data...")
        generate()
        rows = _load_csv(OUTPUT_PATH)
        source = OUTPUT_PATH

    cleaned, disaster_types = _validate_and_normalize(rows)

    if not cleaned:
        raise ValueError(f"No valid rows found in {source}")

    print(f"Loaded {len(cleaned)} rows | disaster types: {disaster_types}")
    return cleaned, disaster_types
