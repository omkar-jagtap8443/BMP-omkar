//import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { initSockets } from "./sockets/index.js";
//dotenv.config();


const server = http.createServer(app);
initSockets(server);

server.listen(process.env.PORT, () =>
  console.log("Backend running on port", process.env.PORT)
);
