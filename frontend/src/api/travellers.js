import { API_BASE_URL } from "./config";

export async function updateTravellerLocation(travellerId, lat, lng) {
  const res = await fetch(`${API_BASE_URL}/travellers/location`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ travellerId, lat, lng }),
  });
  if (!res.ok) throw new Error("Failed to update location");
  return res.json();
}
