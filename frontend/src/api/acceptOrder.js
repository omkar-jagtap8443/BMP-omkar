
import { API_BASE_URL } from "./config";

export async function acceptOrder(orderId, travellerId) {
  const res = await fetch(`${API_BASE_URL}/orders/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, travellerId }),
  });
  if (!res.ok) throw new Error("Failed to accept order");
  return res.json();
}
