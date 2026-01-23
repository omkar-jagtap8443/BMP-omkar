// ...removed duplicate export default...
import { updateStatus } from "../models/Traveller.js";
import { createOrderDB, updateOrderStatus } from "../models/Order.js";
import { acquireLock } from "../utils/locks.js";

export const onlineTravellers = new Map(); // travellerId -> socket
let ioInstance = null;
export function setIO(io) {
  ioInstance = io;
}

export default function(io) {
  setIO(io);
  io.on("connection", (socket) => {
    socket.on("traveller:online", async () => {
      // Assume travellerId is available via auth/session
      const travellerId = socket.handshake.query.travellerId;
      onlineTravellers.set(travellerId, socket);
    });

    socket.on("traveller:offline", () => {
      const travellerId = socket.handshake.query.travellerId;
      onlineTravellers.delete(travellerId);
    });

    socket.on("order:new", async (order) => {
      // Find nearby online travellers
      const nearbyTravellers = await Traveller.find({
        online: true,
        // Add location filter here (e.g., geo query)
      });
      nearbyTravellers.forEach(traveller => {
        const tSocket = onlineTravellers.get(traveller._id.toString());
        if (tSocket) {
          tSocket.emit("order:notification", order);
        }
      });
    });

    socket.on("order:accept", async (orderId) => {
      // Lock order for first traveller
      if (await locks.acquire(orderId)) {
        const order = await Order.findById(orderId);
        if (!order || order.status !== "pending") return;
        order.status = "accepted";
        order.traveller = socket.handshake.query.travellerId;
        await order.save();
        // Send details to traveller
        socket.emit("order:details", {
          pickupLocation: order.pickupLocation,
          user: order.user,
        });
        // Send traveller details to user (find user socket)
        // ...user socket logic here...
      }
    });
  });
}
