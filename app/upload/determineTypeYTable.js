// me falta mapearlo por si se repite el mismo codigo
// import { NameOfParent } from "./parendYChilds";
import { createClient } from '@/utils/supabase/client'
import { normalizeState } from "./stateNormalizer";


export async function determineTypeYTables(table) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  console.log("id", user.id);


  if (!user) {
    console.error("Usuario no encontrado");
    return; // Salir de la función si el usuario no está definido
  }

  const filteredTable = addIdYRemoveDuplicates(table);
  


console.log("filteredTable", filteredTable);
  const tables = {
    mainTable: [],
    orderChannel: [],
    itemTax: [],
    shippingData: [],
    promotion: [],
    gift:[]
  };



  
  for (let line = 0; line < filteredTable.length; line++) {
    const currentOrder = { ...filteredTable[line] };

    currentOrder.user_id = user.id;
     currentOrder.id = `${currentOrder.amazon_order_id}@${currentOrder.sku}`;

// hau una columna parent que podriamos usarla para saber a que padre es 
//solo sirve si en la misma fecha ya hay una tabla parent y revisar a  que 
// corresponde
    //  currentOrder.parent =NameOfParent(currentOrder.asin)
    currentOrder.quantity = parseInt(currentOrder.quantity);
    currentOrder.currency = currentOrder.currency;
    currentOrder.ship_country = currentOrder.ship_country;
    currentOrder.ship_state = normalizeState(currentOrder.ship_state)
    const parseToFloatOrNull = (value) =>
      value != null ? parseFloat(value) : null;
    currentOrder.item_price = parseToFloatOrNull(currentOrder.item_price);
    currentOrder.item_tax = parseToFloatOrNull(currentOrder.item_tax);
    currentOrder.shipping_price = parseToFloatOrNull(
      currentOrder.shipping_price
    );
    currentOrder.price_designation = parseToFloatOrNull(
      currentOrder.price_designation
    );

    currentOrder.shipping_tax = parseToFloatOrNull(currentOrder.shipping_tax);
    currentOrder.gift_wrap_price = parseToFloatOrNull(
      currentOrder.gift_wrap_price
    );
    currentOrder.gift_wrap_tax = parseToFloatOrNull(currentOrder.gift_wrap_tax);
    currentOrder.item_promotion_discount = parseToFloatOrNull(
      currentOrder.item_promotion_discount
    );

    // Convierte a booleano si la cadena es 'true' o 'false', de lo contrario, déjalo como está.
    if (currentOrder.signature_confirmation_recommended !== undefined){
    currentOrder.signature_confirmation_recommended =
      currentOrder.signature_confirmation_recommended.toLowerCase().trim() ===
      "true"
        ? true
        : currentOrder.signature_confirmation_recommended
            .toLowerCase()
            .trim() === "false"
        ? false
        : currentOrder.signature_confirmation_recommended;
    }
    // Convierte a booleano si la cadena es 'true' o 'false', de lo contrario, déjalo como está.
  if ( currentOrder.is_business_order !== undefined){
    currentOrder.is_business_order =
    currentOrder.is_business_order.toLowerCase().trim() === "true"
    ? true
    : currentOrder.is_business_order.toLowerCase().trim() === "false"
    ? false
    : currentOrder.is_business_order;
  }
    // Insertar en la tabla principal (mainTable)
    
    tables.mainTable.push({
      user_id: user.id,
      id: currentOrder.id,
      // day: currentOrder.day,
      // month: currentOrder.month,
      parent:currentOrder.parent,
      quantity: currentOrder.quantity,
      currency: currentOrder.currency,
      ship_country: currentOrder.ship_country,
      asin: currentOrder.asin,

      fulfillment_channel: currentOrder.fulfillment_channel,
      is_business_order: currentOrder.is_business_order,
      item_price: currentOrder.item_price,
      item_status: currentOrder.item_status,
      last_updated_date: currentOrder.last_updated_date,
      // merchant_order_id: currentOrder.merchant_order_id,
      order_status: currentOrder.order_status,
      product_name: currentOrder.product_name,
      purchase_date: currentOrder.purchase_date,
      sales_channel: currentOrder.sales_channel,
      ship_city: currentOrder.ship_city,
      ship_postal_code: currentOrder.ship_postal_code,
      ship_service_level: currentOrder.ship_service_level,
      ship_state: currentOrder.ship_state,
      signature_confirmation_recommended:
        currentOrder.signature_confirmation_recommended,
      sku: currentOrder.sku,
    });

    if (currentOrder.item_tax !== null) {
      tables.itemTax.push({
        fk: currentOrder.id,
        item_tax: currentOrder.item_tax, // Ajusta esto según la propiedad que necesitas de la tabla item_tax
      });
    }
    if (currentOrder.order_channel !== null) {
      tables.orderChannel.push({
        fk: currentOrder.id,
        order_channel: currentOrder.order_channel,
      });
    }


    // Insertar en la tabla shipping_data
    if (
      currentOrder.shipping_price !== null ||
      currentOrder.shipping_tax !== null ||
      currentOrder.purchase_order_number !== null ||
      currentOrder.price_designation !== null
    ) {
      tables.shippingData.push({
        fk: currentOrder.id,
        shipping_price: currentOrder.shipping_price,
        shipping_tax: currentOrder.shipping_tax,
        purchase_order_number: currentOrder.purchase_order_number,
        price_designation: currentOrder.price_designation,
      });
    }

    if (
      currentOrder.item_promotion_discount !== null ||
      currentOrder.ship_promotion_discount !== null ||
      currentOrder.promotion_ids !== null
    ) {
      tables.promotion.push({
        fk: currentOrder.id,
        item_promotion_discount: currentOrder.item_promotion_discount,
        ship_promotion_discount: currentOrder.ship_promotion_discount,
        promotion_ids: currentOrder.promotion_ids,
      });
    }
  


  if (
    currentOrder.gift_wrap_price !== null ||
    currentOrder.gift_wrap_tax !== null 
  ) {
    tables.gift.push({
      fk: currentOrder.id,
      gift_wrap_price: currentOrder.gift_wrap_price,
      gift_wrap_tax: currentOrder.gift_wrap_tax,
  
    });
  
}
}
  console.log("tables", tables);

  // Devolver las tablas
  return tables;
}

export function addIdYRemoveDuplicates(arr) {
  const dataMappedById = {};

  for (let i = 0; i < arr.length; i++) {
    const currentOrder = { ...arr[i] };
    const id = `${currentOrder.amazon_order_id}@${currentOrder.sku}`;
    dataMappedById[id] = currentOrder;
  }

  return Object.values(dataMappedById);
}

// function parsearDay(fechaString) {
//   const dateObject = new Date(fechaString);
//   const dayOfWeek = new Intl.DateTimeFormat("en-US", {
//     weekday: "long",
//   }).format(dateObject);
//   // console.log("dayOfWeek",dayOfWeek);
//   return dayOfWeek;
// }
// function parsearMonth(fechaString) {
//   const dateObject = new Date(fechaString);
//   const month = new Intl.DateTimeFormat("en-US", {
//     month: "long",
//   }).format(dateObject);
//   // console.log("month", month);
//   return month;
// }
