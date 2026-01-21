import { supabase } from "../config/db.js";

export const createUser = async (name, phone) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, phone }])
    .select();
  if (error) throw error;
  return data;
};
