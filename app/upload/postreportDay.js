// import { processCSVAndDetermineTypes } from "./processCSVAndDetermineTypes.js";
import { createClient } from "../../utils/supabase/client.ts";



export const uploadData = async (dataToInsert) => {
  const supabase = createClient()
        if (!dataToInsert){  console.error("No hay datos válidos para insertar.");
        return;}
    
        const { data, error } = await supabase
        .from("main_orders")
        .upsert(dataToInsert.mainTable)
      .select()

      if (error) {
          console.error('Error al insertar datos en Supabase:', error.message);
        } else {
          console.log('Inserción exitosa en Supabase. Registros insertados:', data);
        
        
      }
       
  
      

}
