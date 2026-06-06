"""
Train disaster resource prediction model from disaster_management_dataset.xlsx.
Saves a numpy linear model (primary) and optionally a sklearn pipeline.
"""
import json
import os

import numpy as np

from app.ml.data_loader import (
    load_training_data,
    NUMERIC_FEATURES,
    TARGETS,
)

MODEL_DIR = os.path.dirname(__file__)
NPZ_PATH = os.path.join(MODEL_DIR, "resource_model.npz")
SKLEARN_PATH = os.path.join(MODEL_DIR, "resource_model.pkl")
META_PATH = os.path.join(MODEL_DIR, "model_meta.json")


def _one_hot(disaster_type, disaster_types):
    return [1.0 if disaster_type == d else 0.0 for d in disaster_types]


def _row_to_features(row, disaster_types):
    numeric = [float(row[f]) for f in NUMERIC_FEATURES]
    return numeric + _one_hot(row["disaster_type"], disaster_types)


def train_numpy_model(rows, disaster_types):
    X = np.array(
        [_row_to_features(r, disaster_types) for r in rows],
        dtype=np.float64,
    )
    X = np.hstack([np.ones((X.shape[0], 1)), X])
    y = np.array([[float(r[t]) for t in TARGETS] for r in rows], dtype=np.float64)

    weights, _, _, _ = np.linalg.lstsq(X, y, rcond=None)
    np.savez(NPZ_PATH, weights=weights, disaster_types=np.array(disaster_types))

    meta = {
        "model_type": "numpy_linear",
        "numeric_features": NUMERIC_FEATURES,
        "disaster_types": disaster_types,
        "targets": TARGETS,
        "training_samples": len(rows),
        "source": "disaster_management_dataset.xlsx",
    }
    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2)

    print(f"Numpy model saved -> {NPZ_PATH} ({len(rows)} samples)")
    return weights


def train_sklearn_model(rows, disaster_types):
    try:
        import pandas as pd
        import joblib
        from sklearn.compose import ColumnTransformer
        from sklearn.preprocessing import OneHotEncoder
        from sklearn.pipeline import Pipeline
        from sklearn.ensemble import RandomForestRegressor
        from sklearn.multioutput import MultiOutputRegressor

        df = pd.DataFrame(rows)
        X = df[NUMERIC_FEATURES + ["disaster_type"]]
        y = df[TARGETS]

        pipeline = Pipeline([
            ("preprocessor", ColumnTransformer([
                ("cat", OneHotEncoder(handle_unknown="ignore"), ["disaster_type"]),
                ("num", "passthrough", NUMERIC_FEATURES),
            ])),
            ("model", MultiOutputRegressor(
                RandomForestRegressor(n_estimators=100, random_state=42)
            )),
        ])
        pipeline.fit(X, y)
        joblib.dump(pipeline, SKLEARN_PATH)
        print(f"Sklearn model saved -> {SKLEARN_PATH}")
        return True
    except Exception as exc:
        print(f"Sklearn training skipped ({exc})")
        return False


def main():
    rows, disaster_types = load_training_data()
    train_numpy_model(rows, disaster_types)
    train_sklearn_model(rows, disaster_types)
    print("Training complete")


if __name__ == "__main__":
    main()
