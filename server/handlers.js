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
        response.status(500).json({status: 500, error: "An error occurred while fetching seat data." });
        console.error("Error getting seats", error)
    } client.close()
};

const bookSeat = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try {
    
        await client.connect();
        const db = client.db("MongoDB-P2");
        const theaterCollection = db.collection("Theater");
        const _id = request.params._id;

        const existingSeat = await theaterCollection.findOne({ _id});

        if (existingSeat) {
            if (!existingSeat.isBooked) {
        
            const result = await theaterCollection.updateOne(
                { _id},
            { $set: { isBooked: true } }
            );
            if (result.modifiedCount === 1) {
                response.status(200).json({ status: 200, _id, message: "You booked the seat!"});
            } else {
                response
                  .status(400)
                  .json({
                    status: 400,
                    _id,
                    message: "Seat could not be booked.",
                  });
            }
            } else {
                 response.status(400).json({
                   status: 400,
                   _id,
                   message: "Seat could not be booked.",
                 });
            }
        } else {
            response.status(400).json({
                   status: 400,
                   _id,
                   message: "Seat could not be booked.",
                 });;
        }
    } catch (error) {
        console.error("Error booking seat:", error);
         response.status(500).json({
           status: 500,
           _id,
           message: "An error occurred while booking the seat.",
         });
    } finally {
    client.close();
    }
};

const updateUser = async (seatId, fullName, email) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MongoDB-P2");
    const seatCollection = db.collection("Theater");

    const existingSeat = await seatCollection.findOne({ _id: seatId });

    if (existingSeat) {
        const result = await seatCollection.updateOne(
          { _id: seatId },
          {
            $set: {
              isBooked: true,
              fullName: fullName,
              email: email,
            },
          });
          return{  success: true ,message: "User information added" };
        } else {
          return { success: false, message: "User information not added" };
        }
  } catch (error) {
    console.error("Error adding information:", error);
    return {
      success: false,
      message: "An error occurred while booking the seat.",
    };
  } finally {
    client.close();
  }
};

module.exports = { getSeats, bookSeat, updateUser };
