import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import {fetchAsinNames} from '../../fetchUtils'
interface FormDataParams {
  asinSelected: string[];
  accountType: string;
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

    const accountType = searchParams.get("accountType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const formData: FormDataParams = {
      asinSelected: asinSelected || [],
      accountType: accountType || "",
      datesSelected: {
        from: from || "",
        to: to || "",
      },
    };

    const asinNames = await fetchAsinNames();
    const {renameSalesParents ,renameSaleschilds } = await fetchRanksParent(supabase, formData,asinNames);
// console.log("data", data);
    
return NextResponse.json({
  parent: ordenarData(renameSalesParents),
  child: ordenarChildData( renameSaleschilds)
}, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
 const fetchRanksParent = async (
  supabase: any,
  formData: FormDataParams,
  asinNames: { asin_id: string; asin_name: string }[]
): Promise<any> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("Error fetching user: " + userError.message);
  }

  const { asinSelected, datesSelected } = formData;

  const { data: salesParent, error: rpcError } = await supabase.rpc(
    "get_gross_sales_parent",
    {
      id_argumento: user.id,
      asin_array: asinSelected,
      start_date: datesSelected.from,
      end_date: datesSelected.to,
    }
  );

  if (rpcError) {
    console.error('RPC error:', rpcError);
    throw new Error('Error fetching dates: ' + rpcError.message);
  }
  if (!salesParent || salesParent.length === 0) {
    throw new Error('No data found');
  }


  const asinNameMap = new Map(asinNames.map((asin: { asin_id: string; asin_name: string }) => [asin.asin_id, asin.asin_name]));

  // Renombrar los ASIN en RankParents con sus nombres correspondientes
  const renameSalesParents = salesParent.map((item: DataType) => ({
    ...item,
    parent_asin: asinNameMap.get(item.parent_asin) || item.parent_asin, // Si no se encuentra el nombre, se mantiene el ASIN original
  }));



  const { data: saleschilds, errorSalesChildren } = await supabase.rpc(
    "get_orders_childs",
    {
      id_argumento: user.id,
      asin_array: asinSelected,
      start_date: datesSelected.from, // Convertir a cadena de fecha YYYY-MM-DD
      end_date: datesSelected.to, // Convertir a cadena de fecha YYYY-MM-DD
    }
  );

  if (errorSalesChildren) {
    throw new Error("Error fetching child orders: " + errorSalesChildren.message);
  }



  const renameSaleschilds= saleschilds.map((item: DataType) => ({
    ...item,
    parent_asin: asinNameMap.get(item.parent_asin) || item.parent_asin, // Si no se encuentra el nombre, se mantiene el ASIN original
  }));

  return {renameSalesParents ,renameSaleschilds };
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
    if (order_date && parent_asin !== undefined) {
      acc[order_date][parent_asin] = total_sales;
    }

    return acc;
  }, {} as { [key: string]: ReducedDataType });

  for (const date in reducedData) {
    result.push(reducedData[date]);
  }

  return result;
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
