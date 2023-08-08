# This file is used to setup the mongoDB database.
# It imports the pymongo package and the MONGO_URI (from the .env file in developpement of from Heroku in production) and provide the app woth a mean to connect with the DB.
# The present template only uses one DB with one collecton. Any other app will mostlikely need many collections and possibily multiple DB. Change this file accordingly.

from pymongo import MongoClient
import os

connection_string = os.environ.get("MONGO_URI")

client = MongoClient(f"{connection_string}")

db = client['Test']

collection = db['testMessages']