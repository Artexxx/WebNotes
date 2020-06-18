from flask import Flask, jsonify
from flask_pymongo import PyMongo
import json

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/stocks"
mongo = PyMongo(app)
data = {}


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"<h1>Available Routes:</h1>"
        f"<h2>/api/v1.0/stocks</h2>"

    )


@app.route("/api/v1.0/stocks/")
def stocks():
    collections = list(mongo.db.stock_data.find({}, {'_id': False}))

    with open('data.json', 'w') as outfile:
        json.dump(collections, outfile)

    return jsonify(collections)


if __name__ == '__main__':
    app.run(debug=True)
