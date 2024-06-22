// import { processCSVAndDetermineTypes } from "./processCSVAndDetermineTypes.js";
import { createClient } from "../../utils/supabase/client";


export const uploadDataOrders = async (dataToInsert) => {
  const supabase = createClient();
  


  if (!dataToInsert) {
    console.error("No hay datos válidos para insertar.");
    return;
  }

  try {
    console.log("dataToInsert",dataToInsert);
    // Insertar datos en la tabla principal (por ejemplo, "main_orders")
    const { data: mainData, error: mainError } = await supabase
      .from("main_orders")
      .upsert(dataToInsert.mainTable)
      .select();

    if (mainError) {
      throw new Error('Error al insertar datos en la tabla principal en Supabase: ' + mainError.message);
    }

    console.log('Inserción exitosa en la tabla principal en Supabase. Registros insertados:', mainData);

    // Insertar datos en la tabla secundaria (por ejemplo, "item_tax")
    const { data: itemTaxData, error: itemTaxError } = await supabase
      .from("item_tax")
      .upsert(dataToInsert.itemTax)
      .select();

    if (itemTaxError) {
      throw new Error('Error al insertar datos en la tabla "item_tax" en Supabase: ' + itemTaxError.message);
    }

    console.log('Inserción exitosa en la tabla "item_tax" en Supabase. Registros insertados:', itemTaxData);

    // Insertar datos en la tercera tabla (por ejemplo, "shipping_data")
    const { data: shippingData, error: shippingError } = await supabase
      .from("shipping_data")
      .upsert(dataToInsert.shippingData)
      .select();

    if (shippingError) {
      throw new Error('Error al insertar datos en la tabla "shipping_data" en Supabase: ' + shippingError.message);
    }

    console.log('Inserción exitosa en la tabla "shipping_data" en Supabase. Registros insertados:', shippingData);

      
    const { data: promotionData, error: promotionError } = await supabase
      .from("promotion")
      .upsert(dataToInsert.promotion)
      .select();

    if (promotionError) {
      throw new Error('Error al insertar datos en la tabla "promotion" en Supabase: ' + promotionError.message);
    }

    console.log('Inserción exitosa en la tabla "promotion" en Supabase. Registros insertados:', promotionData);

    const { data: giftData, error: giftError } = await supabase
    .from("gift")
    .upsert(dataToInsert.gift)
    .select();

  if (giftError) {
    throw new Error('Error al insertar datos en la tabla "gift" en Supabase: ' + giftError.message);
  }

  console.log('Inserción exitosa en la tabla "gift" en Supabase. Registros insertados:', giftData);



  





  } catch (error) {
    console.error(error.message);
  }

};
