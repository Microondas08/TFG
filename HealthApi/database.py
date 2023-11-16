import motor.motor_asyncio
from pymongo import MongoClient
import os

MONGO_URL = os.environ.get('MONGO_URL', "mongodb://localhost:27017/health")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

database = client.Resilience
health_collection = database.Health