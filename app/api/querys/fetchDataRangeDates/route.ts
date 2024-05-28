// app/api/querys/fetchDataRangeDates/route.ts
import {createClient} from '../../../../utils/supabase/server'

import { NextResponse } from 'next/server';


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


const fetchRangeDates = async (supabase : any ) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  
    if (userError) {
      throw new Error('Error fetching user: ' + userError.message);
    }
  
    const { data: dates, error: rpcError } = await supabase.rpc(
      "get_available_dates_by_id",
      { id_argumento: user.id }
    );
  
    if (rpcError) {
      console.error('RPC error:', rpcError); // Debugging line
      throw new Error('Error fetching dates: ' + rpcError.message);
    }
  
    if (!dates || dates.length === 0) {
      throw new Error('No dates found');
    }
  
    return dates
  };
  