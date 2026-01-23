export default function(io) {
  io.on("connection", (socket) => {
    socket.on("location", data => {
      io.emit(`track:${data.orderId}`, data);
    });
  });
}
