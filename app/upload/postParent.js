// import { processCSVAndDetermineTypes } from "./processCSVAndDetermineTypes.js";
import { createClient } from "../../utils/supabase/client";


export const uploadDataParents = async (dataToInsert) => {
  const supabase = createClient();
  


  if (!dataToInsert) {
    console.error("No hay datos válidos para insertar.");
    return;
  }

  try {
    console.log("dataToInsert",dataToInsert);

    // Insertar datos en la tabla principal (por ejemplo, "main_orders")
    const { data: parentsData, error: parentsError } = await supabase
            .from('parents')
            .upsert(dataToInsert.parentsArray)
            .select();

        if (parentsError) throw parentsError;


    console.log('Inserción exitosa en la tabla parents en Supabase. Registros insertados:', parentsData);
 

    // const { data: variationsData, error: variationsError } = await supabase
    //   .from('variations')
    //   .upsert(dataToInsert.variationsArray)
    //   .select();

   
    //   if (variationsError) throw variationsError;
    //   console.log('Inserción exitosa en la tabla variations en Supabase. Registros insertados:', variationsData);
 


      const { data: salesRanksData, error: salesRanksError } = await supabase
      .from('sales_ranks_parents')
      .upsert(dataToInsert.salesRanksArray)
      .select();

    if (salesRanksError) {
      throw new Error('Error al insertar datos en la tabla salesRanks en Supabase: ' + salesRanksError.message);
    }
    console.log('Inserción exitosa en la tabla sales_ranks_parents en Supabase. Registros insertados:', salesRanksData);
 




    const { data: child, error: childError } = await supabase
      .from('childs')
      .upsert(dataToInsert.childsArray)
      .select();

    if (salesRanksError) {
      throw new Error('Error al insertar datos en la tabla salesRanks en Supabase: ' + childError.message);
    }
    console.log('Inserción exitosa en la tabla sales_ranks_parents en Supabase. Registros insertados:', child);
 



  } catch (error) {
    console.error(error.message);
  }

};
