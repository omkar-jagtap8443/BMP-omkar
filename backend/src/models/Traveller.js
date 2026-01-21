import { supabase } from "../config/db.js";

export const updateStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('travellers')
    .update({ status })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
};
