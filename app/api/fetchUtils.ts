// pages/api/fetchUtils.ts

import { createClient } from "../../utils/supabase/server";

export const fetchAsinNames = async (
    // parentAsins: string[]
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("asin_parent_names")
    .select("*")
    // .in("asin_id", parentAsins);

  if (error) {
    throw new Error("Error fetching ASIN names: " + error.message);
  }


  
  return data;
};
