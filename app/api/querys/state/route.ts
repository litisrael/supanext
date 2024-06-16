import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

interface FormDataParams {
  asinSelected: string[];
  datesSelected: {
    from: string;
    to: string;
  };
  selectedState?: string[]; // Added optional selectedState
}

type DataType = {
  order_date: string;
  parent_asin: string;
  ship_state: string;
  quantity_sold: number;
};
// soy jhjhhjh ccvvsjjsjsj
export async function GET(req: Request) {
  try {
    const supabase = createClient();

    const { searchParams } = new URL(req.url);
    const asinSelected = searchParams.get("asinSelected")?.split(",") || [];
    const from = searchParams.get("from") || '';
    const to = searchParams.get("to") || '';
    const selectedState = searchParams.get("selectedState")?.split(",") || [];

    const formData: FormDataParams = {
      asinSelected,
      datesSelected: {
        from,
        to,
      },
      selectedState
    };

    const data = await fetchQuantityOrdersByState(supabase, formData);

    return NextResponse.json(ordenarData(data), { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

const fetchQuantityOrdersByState = async (
  supabase: any,
  formData: FormDataParams
): Promise<DataType[]> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("Error fetching user: " + userError.message);
  }

  const { asinSelected, datesSelected, selectedState } = formData;

  const { data, error } = await supabase.rpc("get_quantity_orders_by_state", {
    id_argumento: user.id,
    asin_array: asinSelected,
    start_date: datesSelected.from,
    end_date: datesSelected.to,
    state_array: selectedState
  });

  if (error) {
    throw new Error("Error fetching data: " + error.message);
  }

  return data as DataType[];
};

type ReducedDataType = {
  name: string;
  [key: string]: number | string;
};

const ordenarData = (data: DataType[]): ReducedDataType[] => {
  const result: ReducedDataType[] = [];

  const reducedData = data.reduce((acc, curr) => {
    const { order_date, parent_asin, ship_state, quantity_sold } = curr;

    if (!acc[order_date]) {
      acc[order_date] = { name: order_date };
    }

    if (parent_asin && quantity_sold !== undefined) {
      acc[order_date][`${parent_asin} (${ship_state})`] = quantity_sold;
    }

    return acc;
  }, {} as { [key: string]: ReducedDataType });

  for (const date in reducedData) {
    result.push(reducedData[date]);
  }

  return result;
};
