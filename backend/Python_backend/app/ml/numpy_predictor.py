import json
import os

import numpy as np

MODEL_DIR = os.path.dirname(__file__)
NPZ_PATH = os.path.join(MODEL_DIR, "resource_model.npz")
META_PATH = os.path.join(MODEL_DIR, "model_meta.json")

_weights = None
_meta = None


def _load():
    global _weights, _meta
    if _weights is not None:
        return True
    if not os.path.exists(NPZ_PATH) or not os.path.exists(META_PATH):
        return False
    data = np.load(NPZ_PATH, allow_pickle=True)
    _weights = data["weights"]
    with open(META_PATH, encoding="utf-8") as f:
        _meta = json.load(f)
    return True


def _normalize_disaster(value):
    return str(value or "OTHER").strip().upper()


def _encode(data):
    numeric = [
        float(getattr(data, f, 0) or 0)
        for f in _meta["numeric_features"]
    ]
    disaster = _normalize_disaster(getattr(data, "disaster_type", "OTHER"))
    one_hot = [1.0 if disaster == d else 0.0 for d in _meta["disaster_types"]]
    features = np.array([1.0] + numeric + one_hot, dtype=np.float64)
    return features


def predict_numpy(data):
    if not _load():
        return None

    features = _encode(data)
    prediction = features @ _weights

    return {
        "teams_required": max(1, int(round(prediction[0]))),
        "ambulances_required": max(1, int(round(prediction[1]))),
        "food_packets_required": max(1, int(round(prediction[2]))),
        "medical_kits_required": max(1, int(round(prediction[3]))),
    }
