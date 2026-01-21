import { supabase } from "../config/db.js";

export const logEvent = async (orderId, event) => {
  const { data, error } = await supabase
    .from('order_events')
    .insert([{ order_id: orderId, event }])
    .select();
  if (error) throw error;
  return data;
};
