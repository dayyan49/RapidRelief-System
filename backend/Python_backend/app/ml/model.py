import os

SKLEARN_PATH = os.path.join(os.path.dirname(__file__), "resource_model.pkl")

sklearn_model = None

if os.path.exists(SKLEARN_PATH):
    try:
        import joblib
        sklearn_model = joblib.load(SKLEARN_PATH)
    except Exception:
        sklearn_model = None
