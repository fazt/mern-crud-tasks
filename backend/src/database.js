import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  const conn = await mongoose.connect(MONGODB_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
  console.error({ error });
}

mongoose.connection.on("connected", () => {
  console.log("Database is connected to", connection.db.databaseName);
});
