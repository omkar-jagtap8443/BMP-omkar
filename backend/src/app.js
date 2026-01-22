import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import travellerRoutes from "./routes/traveller.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // replace with your frontend URL
  credentials: true
}));
app.use(express.json());

app.get("/health",(req,res)=>{
    res.send("OK");
})

app.use("/users", userRoutes);
app.use("/travellers", travellerRoutes);
app.use("/orders", orderRoutes);

export default app;
