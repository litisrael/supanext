/** @format */




import { createClient } from "@/utils/supabase/server";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Calendar } from "@/components/ui/calendar"
import { DatePickerWithRange } from "@/components/ui/datePickerRange";
import {ComboboxDemo  } from "../components/ui/comboboxDemo";
import { SelectOptionComponent } from "./querydata";

const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity
  }
];

const uesrSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00"
  }
];

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('maxymindates');
  const firstData = data && data[0];

  if (!firstData) {
    console.log(error);
    
    throw new Error('Error al conectar con la base de datos');
  }

  const { mindate, maxdate } = firstData;
  // console.log('Fechas min:', mindate, 'Fechas max:', maxdate);
 

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      
      {/* <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2"> */}

      {/* <DatePickerWithRange /> */}
      
      < SelectOptionComponent  />
      <ComboboxDemo />
      {/* </section> */}
  

      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>

          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Sales</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}




// import AuthButton from "../components/AuthButton";
// import { createClient } from "@/utils/supabase/server";
// import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
// import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
// import {Header} from "@/components/Header";



// import '@mantine/core/styles.css';

// import type { AppProps } from 'next/app';
// import { createTheme, MantineProvider } from '@mantine/core';

// const theme = createTheme({
//   /** Put your mantine theme override here */
// });

// export default function Index({ Component, pageProps }: AppProps) {
//   const canInitSupabaseClient = () => {
//     // This function is just for the interactive tutorial.
//     // Feel free to remove it once you have Supabase connected.
//     try {
//       createClient();
//       return true;
//     } catch (e) {
//       return false;
//     }
//   };

//   const isSupabaseConnected = canInitSupabaseClient();


  



//   return (
//     <MantineProvider theme={theme}>
//      {/* <Component {...pageProps} /> */}
//    <Header>  {isSupabaseConnected && <AuthButton />} </Header>
//       <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
     
//         {/* <main className="flex-1 flex flex-col gap-6">
//           <h2 className="font-bold text-4xl mb-4">Next steps</h2>
//           {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
//         </main> */}
//       </div>

    
//     </MantineProvider>
//   );
// }
