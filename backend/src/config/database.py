from pymongo import MongoClient
from dotenv import load_dotenv
import certifi
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI,tlsCAFile=certifi.where())
db = client["fitforge"]