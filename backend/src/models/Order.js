import { db } from "../config/db.js";

export const createOrderDB = (order) =>
  db.query(
    `INSERT INTO orders(data,status) VALUES($1,$2) RETURNING *`,
    [order, "SEARCHING"]
  );

export const updateOrderStatus = (id, status) =>
  db.query("UPDATE orders SET status=$1 WHERE id=$2", [status, id]);

