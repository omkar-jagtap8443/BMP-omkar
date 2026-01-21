export default (io, socket) => {
  socket.on("order-request", data => {
    io.emit("order-broadcast", data);
  });
};
