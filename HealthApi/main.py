from typing import List
from datetime import datetime

from fastapi import FastAPI, HTTPException
from database import health_collection
from models import HealthInDB, HealthCreate
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost:3001",  # Dirección de tu frontend en desarrollo
    # Si tienes otros orígenes, puedes añadirlos aquí
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/health/", response_model=HealthInDB)
async def create_health_entry(health: HealthCreate):
    # Añadir timestamp al momento de la inserción
    health_entry_data = health.dict()
    health_entry_data["timestamp"] = datetime.utcnow()

    # Insertar el documento con el id y timestamp proporcionados
    health_entry = await health_collection.insert_one(health_entry_data)

    # Recuperar y retornar el documento insertado
    new_health = await health_collection.find_one({"id": health.id})
    return HealthInDB(**new_health)

@app.get("/health/", response_model=List[HealthInDB])
async def read_all_health_entries():
    health_entries = await health_collection.find().to_list(1000)  # Limita a 1000 entradas por ejemplo
    return health_entries


@app.get("/health/{health_id}", response_model=HealthInDB)
async def read_health_entry(health_id: str):
    health_entry = await health_collection.find_one({"id": health_id})
    if health_entry:
        return HealthInDB(**health_entry)
    raise HTTPException(status_code=404, detail="Health entry not found")


@app.put("/health/{health_id}", response_model=HealthInDB)
async def update_health_entry(health_id: str, health_update: HealthCreate):
    stored_health_entry = await health_collection.find_one({"id": health_id})
    if not stored_health_entry:
        raise HTTPException(status_code=404, detail="Health entry not found")

    health_updated = await health_collection.update_one({"id": health_id}, {"$set": health_update.dict()})

    if health_updated.modified_count:
        return await health_collection.find_one({"id": health_id})
    else:
        raise HTTPException(status_code=400, detail="Health entry not updated")


@app.delete("/health/{health_id}", response_model=dict)
async def delete_health_entry(health_id: str):
    delete_result = await health_collection.delete_one({"id": health_id})

    if delete_result.deleted_count:
        return {"status": "success", "message": "Health entry deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Health entry not found")

@app.delete("/health/clearall/")
async def clear_all_data():
    result = await health_collection.delete_many({})
    return {"deleted_count": result.deleted_count}
