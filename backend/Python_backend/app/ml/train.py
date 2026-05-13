import pandas as pd
import joblib
import os

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor

# 🔹 load dataset
DATASET_PATH = os.path.join(os.path.dirname(__file__),"disaster_management_dataset.xlsx")

df = pd.read_excel(DATASET_PATH)


# 🔹 input features
X = df[[
    "severity",
    "affected_population",
    "disaster_type",
    "rainfall_mm",
    "road_blockage_percent",
    "medical_need_level",
    "elderly_population",
    "infrastructure_damage_level",
    "rescue_team_availability",
    "area_size_km2",
    "hospital_distance_km",
    "response_time_target_min"
]]


# 🔹 outputs
y = df[[
    "teams_required",
    "ambulances_required",
    "food_packets_required",
    "medical_kits_required"
]]


# 🔹 categorical feature
categorical_features = ["disaster_type"]


# 🔹 numerical features
numerical_features = [
    "severity",
    "affected_population",
    "rainfall_mm",
    "road_blockage_percent",
    "medical_need_level",
    "elderly_population",
    "infrastructure_damage_level",
    "rescue_team_availability",
    "area_size_km2",
    "hospital_distance_km",
    "response_time_target_min"
]


# 🔹 preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        ),
        (
            "num",
            "passthrough",
            numerical_features
        )
    ]
)


# 🔹 model pipeline
pipeline = Pipeline([

    (
        "preprocessor",
        preprocessor
    ),

    (
        "model",

        MultiOutputRegressor(

            RandomForestRegressor(

                n_estimators=100,

                random_state=42
            )
        )
    )
])


# 🔹 train model
pipeline.fit(X, y)


# 🔹 save model
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "resource_model.pkl"
)

joblib.dump(
    pipeline,
    MODEL_PATH
)

print(
    "✅ Multi-output model trained"
)