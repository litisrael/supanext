import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server';
// import { buildQuery } from './utils/buildQuery';

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
    const asinSelected = searchParams.get('asinSelected')?.split(',');

    
    const accountType = searchParams.get('accountType');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const formData: FormDataParams = {
      asinSelected: asinSelected || [],
      accountType: accountType || '',
      datesSelected: {
        from: from || '',
        to: to || ''
      }
    };

    const data = await fetchRanksParent(supabase
      , formData 
    );

  
    return NextResponse.json(  ordenarData(data), { status: 200 });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}



// app/api/querys/fetchDataRangeDates/utils/buildQuery.ts
export const fetchRanksParent = async (supabase: any
  , formData: FormDataParams
  ) => {
  // const { data:  user , error: userError } = await supabase.auth.getUser();
  const { data: { user }, error: userError } = await supabase.auth.getUser();


  if (userError) {
    throw new Error('Error fetching user: ' + userError.message);
  }
  
  const { asinSelected, datesSelected } = formData;


  const { data: RankParents, error } = await supabase.rpc("get_ranks", {
    id_argumento: user.id,
    asin_array: asinSelected,
    start_date: datesSelected.from, // Convertir a cadena de fecha YYYY-MM-DD
    end_date: datesSelected.to // Convertir a cadena de fecha YYYY-MM-DD
  });
  



  // .from('parents')
  //   .select(`
  //     asin,
  //     isoString,
  //     sales_ranks_parents (
  //       rank_category
  //     )
  //   `)
  //   .eq('user_id', user.id)
  //   .in('asin', asinSelected)
  //   .gte('isoString', datesSelected.from)
  //   .lte('isoString', datesSelected.to);



  return RankParents;
};

type DataType = {
  isodate: string;
  asin: string;
  daily_sum: number;
};

type ReducedDataType = {
  name: string;
  [key: string]: number | string;
};

const ordenarData = (data: DataType[]): ReducedDataType[] => {
  const result: ReducedDataType[] = [];

  const reducedData = data.reduce((acc, curr) => {
    const { isodate, asin, daily_sum } = curr;

    if (!acc[isodate]) {
      acc[isodate] = { name: isodate };
    }
    acc[isodate][asin] = daily_sum;

    return acc;
  }, {} as { [key: string]: ReducedDataType });

  for (const date in reducedData) {
    result.push(reducedData[date]);
  }

  return result;
};

