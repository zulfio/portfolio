import mongoose from "mongoose";
import pc from "picocolors";

async function databaseLoader() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("🔴  MongoDB connection string is not provided.");
    }

    console.log(pc.yellow("MongoDB: Connecting..."));
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
    });

    console.log(
      pc.green(
        `🟢  MongoDB: Connected ${conn.connection.host}:${conn.connection.port} - [${conn.connection.name}]`
      )
    );
  } catch (err) {
    console.error(`🔴  MongoDB Error: ${err.message}`, err);
    process.exit();
  }
}

export default databaseLoader;
