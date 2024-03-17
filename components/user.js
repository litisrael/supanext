import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export  async function userFun( ) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

 
  

  return user 
}
