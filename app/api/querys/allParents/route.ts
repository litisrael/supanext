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
  asin_id: string;
  asin_name: string;
  // Otros campos si los hay
}
const fetchRangeDates = async (supabase : any ) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  
    if (userError) {
      throw new Error('Error fetching user: ' + userError.message);
    }

    let { data: asin_parent_names, error } = await supabase
    .from('asin_parent_names')
    .select('*').eq("user_id", user.id)
            
      // { id_argumento: user.id }
    
  
    if (error) {
      console.error('RPC error:', error); // Debugging line
      throw new Error('Error fetching dates: ' + error.message);
    }
  
    if (!asin_parent_names || asin_parent_names.length === 0) {
      throw new Error('No dates found');
    }
  
    const formattedArray = asin_parent_names.map((item: DateItem) => ({
        value: item.asin_id,
        label: item.asin_name
    }));
    
    return formattedArray
  };
  