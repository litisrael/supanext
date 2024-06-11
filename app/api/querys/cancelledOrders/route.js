
import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(req) {
  try {
    const supabase = createClient();

    const { searchParams } = new URL(req.url);
    const asinSelected = searchParams.get("asinSelected")?.split(",");

    const accountType = searchParams.get("accountType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const formData = {
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
      { error: error.message },
      { status: 500 }
    );
  }
}

async function fetchRanksParent(supabase, formData) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError) {
      throw new Error("Error fetching user: " + userError.message);
    }

    const { asinSelected, datesSelected } = formData;

    const { data, error } = await supabase.rpc(
        "get_cancelled_orders",
        {
            id_argumento: user.id,
            asin_array: asinSelected,
            start_date: datesSelected.from, // Convertir a cadena de fecha YYYY-MM-DD
            end_date: datesSelected.to, // Convertir a cadena de fecha YYYY-MM-DD
        }
    );

    if (error) {
        throw new Error("Error fetching data: " + error.message);
    }

    return data;
}

const ordenarDataC = (data) => {
  const result = [];

  const reducedData = data.reduce((acc, curr) => {
    const { order_date, parent_asin,  cancelled_orders } = curr;

    if (!acc[order_date]) {
      acc[order_date] = { name: order_date };
    }

    if (parent_asin && cancelled_orders !== undefined) {
      acc[order_date][parent_asin] = cancelled_orders;
    }

    return acc;
  }, {});

  for (const date in reducedData) {
    result.push(reducedData[date]);
  }

  return result;
};