import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

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

    const data = await fetchRanksParent(supabase, formData);

    return NextResponse.json(ordenarDataC(data), { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const fetchRanksParent = async (
  supabase: any,
  formData: FormDataParams
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("Error fetching user: " + userError.message);
  }

  const { asinSelected, datesSelected } = formData;

  // hay 2 funciones que pueden hacer el query
  // get_orders_parents que es cte
  // get_orders_parentsub que sub query 
  const { data: RankParents, error } = await supabase.rpc(
    "get_cancelled_orders",
    {
      id_argumento: user.id,
      asin_array: asinSelected,
      start_date: datesSelected.from, // Convertir a cadena de fecha YYYY-MM-DD
      end_date: datesSelected.to, // Convertir a cadena de fecha YYYY-MM-DD
    }
  );

  return RankParents;
};

type DataType = {
  order_date: string;
  parent_asin: string;
  cancelled_orders: number;
};

type ReducedDataType = {
  name: string;
  [key: string]: number | string;
};



//  parent_asin text,
// order_date date,
// cancelled_orders bigint

const ordenarDataC = (data: DataType[]): ReducedDataType[] => {
  const result: ReducedDataType[] = [];

  const reducedData = data.reduce((acc, curr) => {
    const { order_date, parent_asin,  cancelled_orders } = curr;

    if (!acc[order_date]) {
      acc[order_date] = { name: order_date };
    }
    acc[order_date][parent_asin] = cancelled_orders;

    return acc;
  }, {} as { [key: string]: ReducedDataType });

  for (const date in reducedData) {
    result.push(reducedData[date]);
  }

  return result;
};
