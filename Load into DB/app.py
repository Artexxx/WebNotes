# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Establish connection
conn = 'mongodb://localhost:27017'

# Pass connection to pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.DOW