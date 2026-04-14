import { Server } from "socket.io";
import {
  markUnstable,
  recoverSession
} from "../services/session.service.js";

let io;

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("joinSession", ({ sessionId }) => {
      if (!sessionId) return;

      socket.join(sessionId);
      socket.data.sessionId = sessionId;

      io.to(sessionId).emit("userJoined", {
        socketId: socket.id
      });
    });

    socket.on("teacherActive", async ({ sessionId }) => {
      try {
        await recoverSession(sessionId);
      } catch (err) {
        console.error("teacherActive error:", err);
      }
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);

      const sessionId = socket.data.sessionId;

      if (!sessionId) return;

      try {
        setTimeout(async () => {
          const room = io.sockets.adapter.rooms.get(sessionId);

          if (!room || room.size === 0) {
            await markUnstable(sessionId);
          }
        }, 5000);

      } catch (err) {
        console.error("disconnect error:", err);
      }
    });

  });

};

export const getIO = () => io;