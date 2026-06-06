import math


def _haversine(lat1, lon1, lat2, lon2):
    r = 6371
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(d_lon / 2) ** 2
    )
    return r * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def _brute_force_nearest(resources, target_location, k):
    ranked = sorted(
        resources,
        key=lambda r: _haversine(
            target_location[0], target_location[1], r["lat"], r["lon"]
        ),
    )
    return ranked[:k]


def find_nearest_resources(resources, target_location, k=1):
    if not resources:
        return []

    k = min(k, len(resources))

    try:
        from scipy.spatial import KDTree

        points = [(r["lat"], r["lon"]) for r in resources]
        tree = KDTree(points)
        distances, indexes = tree.query(target_location, k=k)

        if isinstance(indexes, int):
            indexes = [indexes]

        return [resources[i] for i in indexes]
    except Exception:
        return _brute_force_nearest(resources, target_location, k)
