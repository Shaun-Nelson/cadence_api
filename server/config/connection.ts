const { connect, connection } = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/cadence_db";

const connectDB = async () => {
  try {
    await connect(connectionString);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

connectDB();

module.exports = connection;
