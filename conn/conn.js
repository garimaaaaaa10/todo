const mongoose = require("mongoose");

let isConnected = false;

const conn = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        isConnected = true;
        console.log("connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        throw error;
    }
};

module.exports = conn;
