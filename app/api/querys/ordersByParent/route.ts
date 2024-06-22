import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import {fetchAsinNames} from '../../fetchUtils'
interface FormDataParams {
  asinSelected: string[];
  datesSelected: {
    from: string;
    to: string;
  };
}

export async function GET(req: Request) {
  try {
    const supabase = createClient();

    const { searchParams } = new URL(req.url);
    const asinSelected = searchParams.get("asinSelected")?.split(",");


    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const formData: FormDataParams = {
      asinSelected: asinSelected || [],
     
      datesSelected: {
        from: from || "",
        to: to || "",
      },
    };
    const asinNames = await fetchAsinNames();
    const {renameoredersParents ,renameorderschilds} = await fetchOrders(supabase, formData, asinNames);
    
    // console.log("pdre oredana", ordenarData(renameoredersParents))
    // console.log("pdre hijo", ordenarChildData( renameorderschilds))
    
    
    
    return NextResponse.json({
      parent: ordenarData(renameoredersParents),
      child: ordenarChildData( renameorderschilds)
    }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}



const fetchOrders = async (
  supabase: any,
  formData: FormDataParams,
 asinNames: { asin_id: string; asin_name: string }[]
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  

  if (userError) {
    throw new Error("Error fetching user: " + userError.message);
  }

  const { asinSelected, datesSelected } = formData;

  // la funncion con get_orders_id_asin_dates
  //  era sin hacer join usando la columna parent 
// que se copmleta con trigger de la tabla child

  //     "get_orders_id_asin_dates",

  const { data: orderParents, errorOrdersParents } = await supabase.rpc(
    "get_orders_parentsub",
    {
      id_argumento: user.id,
      asin_array: asinSelected,
      start_date: datesSelected.from, // Convertir a cadena de fecha YYYY-MM-DD
      end_date: datesSelected.to, // Convertir a cadena de fecha YYYY-MM-DD
    }
  );
  if (errorOrdersParents) {
    throw new Error("Error fetching parent orders: " + errorOrdersParents.message);
  }

  // const asinNames = await fetchAsinNames();
// console.log("orderParents",orderParents);


  // Crear un mapa de nombres de ASIN
  const asinNameMap = new Map(asinNames.map((asin: { asin_id: string; asin_name: string }) => [asin.asin_id, asin.asin_name]));

  // Renombrar los ASIN en RankParents con sus nombres correspondientes
  const renameoredersParents = orderParents.map((item: DataType) => ({
    ...item,
    parent_asin: asinNameMap.get(item.parent_asin) || item.parent_asin, // Si no se encuentra el nombre, se mantiene el ASIN original
  }));




  const { data: orderschilds, error: errorOrdersChildren } = await supabase.rpc(
    "get_orders_childs",
    {
      id_argumento: user.id,
      asin_array: asinSelected,
      start_date: datesSelected.from, // Convertir a cadena de fecha YYYY-MM-DD
      end_date: datesSelected.to, // Convertir a cadena de fecha YYYY-MM-DD
    }
  );

  if (errorOrdersChildren) {
    throw new Error("Error fetching child orders: " + errorOrdersChildren.message);
  }


  // console.log("orderschilds",orderschilds);
  

  
  // Renombrar los ASIN en RankParents con sus nombres correspondientes
  const renameorderschilds= orderschilds.map((item: DataType) => ({
    ...item,
    parent_asin: asinNameMap.get(item.parent_asin) || item.parent_asin, // Si no se encuentra el nombre, se mantiene el ASIN original
  }));


  return { renameoredersParents ,renameorderschilds};

};

type DataType = {
  order_date: string;
  parent_asin: string;
  total_sales: number;
};

type ReducedDataType = {
  name: string;
  [key: string]: number | string;
};

const ordenarData = (data: DataType[]): ReducedDataType[] => {
  const result: ReducedDataType[] = [];

  const reducedData = data.reduce((acc, curr) => {
    const { order_date, parent_asin, total_sales } = curr;

    if (!acc[order_date]) {
      acc[order_date] = { name: order_date };
    }
    acc[order_date][parent_asin] = total_sales;

    return acc;
  }, {} as { [key: string]: ReducedDataType });

  for (const date in reducedData) {
    result.push(reducedData[date]);
  }

  return result;
};


type ChildDataType = {
  order_date: string;
  parent_asin: string;
  product_name: string;
  total_sales: number;
};

type ReducedChildDataType = {
  name: string; // Cambiar el nombre de 'name' a 'date' o a otro nombre que prefieras
  products: { [product_name: string]: number };
};





const ordenarChildData = (data) => {
  const result  = {};

  data.forEach((item) => {
    const { order_date, parent_asin, product_name, total_sales } = item;

    if (!result[parent_asin]) {
      result[parent_asin] = [];
    }

    const parentData = result[parent_asin];

    let dateEntry = parentData.find((entry) => entry.name === order_date);

    if (!dateEntry) {
      dateEntry = { name: order_date }
      // Crear un nuevo objeto que cumpla con ReducedChildDataType
      const newEntry = {
        name: order_date,
        [product_name]: total_sales,
      };

      parentData.push(newEntry);
    } else {
      // Si ya existe la entrada para esa fecha, actualizar el total_sales
      if (dateEntry[product_name]) {
        dateEntry[product_name] += total_sales;
      } else {
        dateEntry[product_name] = total_sales;
      }
    }
  });

  return result;
};
