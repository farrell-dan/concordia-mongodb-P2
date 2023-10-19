const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MongoDB-P2");
    const theaterCollection = db.collection("Theater");

    const seats = [];
    const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let r = 0; r < row.length; r++) {
      for (let s = 1; s < 13; s++) {
        seats.push({
          _id: `${row[r]}-${s}`,
          price: 225,
          isBooked: false,
        });
      }
    }
    const result = await theaterCollection.insertMany(seats);
    console.log(`${result.insertedCount} seats inserted`);
  } catch (error) {
    console.error("Error inserting seats:", error);
  }
  client.close();
};

batchImport(); 