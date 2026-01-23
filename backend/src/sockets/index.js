import { Server } from "socket.io";
import orderSocket, { setIO } from "./order.socket.js";
import trackingSocket from "./tracking.socket.js";

export const initSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  });
  setIO(io);
  orderSocket(io);
  trackingSocket(io);
  global._io = io;
};
