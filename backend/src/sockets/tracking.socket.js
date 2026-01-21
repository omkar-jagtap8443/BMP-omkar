export default (io, socket) => {
  socket.on("location", data => {
    io.emit(`track:${data.orderId}`, data);
  });
};
