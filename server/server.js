import "dotenv/config";
import http from "http";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initSocket } from "./src/socket/index.js";
import { startSessionMonitor } from "./src/jobs/session.job.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("DB connected, starting server...");

    startSessionMonitor();

    const server = http.createServer(app);

    initSocket(server);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();