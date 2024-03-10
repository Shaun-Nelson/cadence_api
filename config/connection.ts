const { connect, connection } = require("mongoose");
const path = require("path");
require("dotenv").config();

const connectionString = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await connect(connectionString);
    console.log(`Connected to the database: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(1);
  }
};

connectDB();

module.exports = connection;
