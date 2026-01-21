import h3 from "../config/h3.js";
export const latLngToH3 = (lat, lng) => h3.latLngToCell(lat, lng, 7);
