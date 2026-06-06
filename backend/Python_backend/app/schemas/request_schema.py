from pydantic import BaseModel, Field
from typing import List, Optional


class Resource(BaseModel):
    id: str
    lat: float
    lon: float


class AllocationRequest(BaseModel):
    severity: int = Field(..., ge=1, le=10)
    affected_population: int = 1
    disaster_type: str = "OTHER"
    rainfall_mm: float = 0
    road_blockage_percent: float = 0
    medical_need_level: int = Field(3, ge=1, le=10)
    elderly_population: int = 0
    infrastructure_damage_level: int = Field(3, ge=1, le=10)
    rescue_team_availability: int = 0
    area_size_km2: float = 1
    hospital_distance_km: float = 5
    response_time_target_min: int = 30
    location: List[float]
    resources: List[Resource] = []


class CenterPoint(BaseModel):
    id: str
    name: Optional[str] = ""
    type: Optional[str] = ""
    lat: float
    lon: float


class NearbyCentersRequest(BaseModel):
    location: List[float]
    centers: List[CenterPoint]
    limit: int = Field(5, ge=1, le=50)
