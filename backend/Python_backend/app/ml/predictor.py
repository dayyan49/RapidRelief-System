from app.ml.numpy_predictor import predict_numpy


class HeuristicPredictor:
    @staticmethod
    def predict(data):
        severity = float(data.severity)
        population = float(data.affected_population)
        medical_need = float(data.medical_need_level or 3)
        disaster_factor = {
            "FLOOD": 1.3, "EARTHQUAKE": 1.5, "FIRE": 1.1,
            "LANDSLIDE": 1.4, "CYCLONE": 1.6, "OTHER": 1.0,
        }.get(data.disaster_type, 1.0)

        teams = max(1, int(round(severity * population / 80 * disaster_factor)))
        ambulances = max(1, int(round(severity * medical_need / 5 * disaster_factor)))
        food_packets = max(int(population), int(round(population * 2.5)))
        medical_kits = max(1, int(round(population / 40 + medical_need)))

        return {
            "teams_required": teams,
            "ambulances_required": ambulances,
            "food_packets_required": food_packets,
            "medical_kits_required": medical_kits,
        }


def _predict_sklearn(data):
    try:
        import pandas as pd
        from app.ml.model import sklearn_model
        if sklearn_model is None:
            return None

        input_df = pd.DataFrame([{
            "severity": data.severity,
            "affected_population": data.affected_population,
            "disaster_type": data.disaster_type,
            "rainfall_mm": data.rainfall_mm,
            "road_blockage_percent": data.road_blockage_percent,
            "medical_need_level": data.medical_need_level,
            "elderly_population": data.elderly_population,
            "infrastructure_damage_level": data.infrastructure_damage_level,
            "rescue_team_availability": data.rescue_team_availability,
            "area_size_km2": data.area_size_km2,
            "hospital_distance_km": data.hospital_distance_km,
            "response_time_target_min": data.response_time_target_min,
        }])

        prediction = sklearn_model.predict(input_df)[0]
        return {
            "teams_required": max(1, int(round(prediction[0]))),
            "ambulances_required": max(1, int(round(prediction[1]))),
            "food_packets_required": max(1, int(round(prediction[2]))),
            "medical_kits_required": max(1, int(round(prediction[3]))),
        }
    except Exception:
        return None


def predict_resources(data):
    result = predict_numpy(data)
    if result:
        return result

    result = _predict_sklearn(data)
    if result:
        return result

    return HeuristicPredictor.predict(data)
