import "dotenv/config"; 

console.log("SERVER FILE EXECUTING");

import app from "./src/app.js"; 
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;



const startServer = async () => {
  try {
    await connectDB();
    console.log("DB connected, starting server...");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};



startServer();
