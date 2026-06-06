from fastapi import APIRouter, HTTPException
from app.schemas.request_schema import AllocationRequest, NearbyCentersRequest
from app.services.allocation_services import allocate_resources, find_nearby_centers

router = APIRouter()


@router.post("/allocate")
def allocate(data: AllocationRequest):
    try:
        result = allocate_resources(data)
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/nearby-centers")
def nearby_centers(data: NearbyCentersRequest):
    try:
        result = find_nearby_centers(
            data.location,
            [c.model_dump() for c in data.centers],
            data.limit
        )
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
