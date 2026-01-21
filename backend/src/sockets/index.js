import { Server } from "socket.io";
import orderSocket from "./order.socket.js";
import trackingSocket from "./tracking.socket.js";

export const initSockets = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", socket => {
    orderSocket(io, socket);
    trackingSocket(io, socket);
  });
};
