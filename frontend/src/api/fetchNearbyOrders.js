import { API_BASE_URL } from "./config";

export async function fetchNearbyOrders(lat, lng) {
  const res = await fetch(`${API_BASE_URL}/orders/nearby?lat=${lat}&lng=${lng}`);
  if (!res.ok) throw new Error("Failed to fetch nearby orders");
  return res.json();
}
