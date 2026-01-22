const OPENCAGE_API_KEY = "477c6d88ccd444e3bf4114fc57993ad3"; // Replace with your actual key

export async function geocodeAddress(address) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to geocode address');
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error('No results found');
  return {
    lat: data.results[0].geometry.lat,
    lng: data.results[0].geometry.lng
  };
}