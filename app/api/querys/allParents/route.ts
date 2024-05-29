// app/api/querys/fetchDataRangeDates/route.ts
import {createClient} from '../../../../utils/supabase/server'

import { NextResponse } from 'next/server';

type FormattedItem = {
  value: string;
  label: string;
};
export async function GET(req :Request ) {
  try {
    const supabase = createClient();
    const data = await fetchRangeDates(supabase);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

interface DateItem {
  asin: string;
  // Otros campos si los hay
}
const fetchRangeDates = async (supabase : any ) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  
    if (userError) {
      throw new Error('Error fetching user: ' + userError.message);
    }
  
    const { data: dates, error: rpcError } = await supabase.rpc(
      "all_parents",
      { id_argumento: user.id }
    );
  
    if (rpcError) {
      console.error('RPC error:', rpcError); // Debugging line
      throw new Error('Error fetching dates: ' + rpcError.message);
    }
  
    if (!dates || dates.length === 0) {
      throw new Error('No dates found');
    }
  
    const formattedArray = dates.map((item: DateItem) => ({
        value: item.asin,
        label: item.asin
    }));
    return formattedArray
  };
  