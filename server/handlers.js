'use strict';

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getSeats = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        const db = client.db("MongoDB-P2");
        const theaterCollection = db.collection("Theater");

        const seats = await theaterCollection.find().toArray();

        response.status(200).json({ status: 200, data: seats })
    } catch (error) {
        response.status(500).json({ error: "An error occurred while fetching seat data." });
        console.error("Error getting seats", error)
    } client.close()
};

module.exports = { getSeats };
