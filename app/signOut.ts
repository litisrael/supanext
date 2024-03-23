// authActions.ts
"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";


export default async function signOut() {
    const supabase = createClient();
    
  await supabase.auth.signOut();
  console.log("Usuario desconectado con éxito");
  // You can redirect the user to the login page or another destination here
//   return redirect("/login");
}
