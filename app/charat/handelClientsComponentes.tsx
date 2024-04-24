"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatePickerWithRange } from "@/components/ui/datePickerRangeModifica";
import { MenuCheckbox } from "@/components/ui/comboboxDemo";
import { useEffect, useState } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import LineChart from "@/components/LineChart";
import { useSetState } from "@mantine/hooks";
// Definición del tipo para un rango de fechas
// type DateRange = {
//     startDate?: Date;
//     endDate?: Date;
//   };

interface PurchaseItem {
  purchase_date: Date | string; // Assuming purchase_date can be either a Date or a string representation
  item_price: number;
}
type DateObject = {
  before?: Date;
  after?: Date;
};

// Definición del tipo para un array de objetos DateObject
type RangeDates = DateObject[];
const valorDeGrupos = {
  "SP17-5-T3": "grupo a",
  "SP121-F": "grupo a",
  "SP10-10-T1": "grupo a",
  "SR962-14": "grupo a",
  "312161": "grupo a",
  "SR263-14": "grupo a",
  "302161": "grupo a",
  "SR952-14": "grupo a",
  "SP1142": "grupo a",
  "SP213": "grupo a",
  "SP243": "grupo a",
  "ST666": "grupo a",
  "SP901": "grupo a",
  "ST474": "grupo a",
  "SP890": "grupo a",
  "ST555": "grupo a",
  "SP1523": "grupo b",
  "SP16-6-T3": "grupo b",
  "SP17-11-T1": "grupo b",
  "SP802": "grupo b",
  "SP1102": "grupo b",
  "SR261-14": "grupo b",
  "SP1413": "grupo b",
  "SP701": "grupo b",
  "ST656": "grupo b",
  "SP17-10-T1": "grupo b",
  "SP1293": "grupo b",
  "SP1513": "grupo b",
  "ST676": "grupo b",
  "ST396": "grupo b",
  "SP1442": "grupo b",
  "SP10-10-TC": "grupo b",
  "SP1241": "grupo b",
  "110156": "grupo b",
  "SP1563": "grupo b",
  "ST255": "grupo b",
  "SP1242": "grupo b",
  "352161": "grupo b",
  "ST215": "grupo b",
  "ST575": "grupo b",
  "SP1292": "grupo b",
  "220151": "grupo b",
  "SP1401": "grupo c",
  "222151": "grupo c",
  "SP1552": "grupo c",
  "SP15102": "grupo c",
  "SP1511": "grupo c",
  "SP1542": "grupo c",
  "ST616": "grupo c",
  "SP320": "grupo c",
  "SP20-F": "grupo c",
  "SP1543": "grupo c",
  "ST414": "grupo c",
  "ST434": "grupo c",
  "ST646": "grupo c",
  "SP15112": "grupo c",
  "JC110": "grupo c",
  "551077": "grupo c",
  "SP15101": "grupo c",
  "SP1400": "grupo c",
  "ST565": "grupo c",
  "311161": "grupo c",
  "SP1111": "grupo c",
  "SP16-11-T1": "grupo c",
  "SP16-11-T3": "grupo c",
  "SP16-2-T3": "grupo c",
  "ST916": "grupo c",
  "ST835": "grupo d",
  "SP16-2-T2": "grupo d",
  "301161": "grupo d",
  "SP1200": "grupo d",
  "SP1313": "grupo d",
  "SP292": "grupo d",
  "SP16-1-T2": "grupo d",
  "SR231-14": "grupo d",
  "ST376": "grupo d",
  "SP1510": "grupo d",
  "ST444": "grupo d",
  "SP124-F": "grupo d",
  "SP17-10-T2": "grupo d",
  "ST134": "grupo d",
  "ST906": "grupo d",
  "SP1203": "grupo d",
  "SP32-F": "grupo d",
  "SP1112": "grupo d",
  "SP1562": "grupo d",
  "SP1290": "grupo d",
  "SR211-14": "grupo d",
  "SP100T-C": "grupo e",
  "SP16-0-T3": "grupo e",
  "SR253-14": "grupo e",
  "SP130-C": "grupo e",
  "SP121-C": "grupo e",
  "SP303": "grupo e",
  "SP951": "grupo e",
  "SP17-2-T2": "grupo e",
  "SP902": "grupo e",
  "SR201-14": "grupo e",
  "ST535": "grupo e",
  "ST306": "grupo e",
  "SP10-6-T3": "grupo e",
  "SP105T1": "grupo e",
  "SP903": "grupo f",
  "ST636": "grupo f",
  "SP1551": "grupo f",
  "ST744": "grupo f",
  "SP101T1": "grupo f",
  "SP16-6-T2": "grupo f",
  "SP1501": "grupo f",
  "ST464": "grupo f",
  "SP812": "grupo f",
  "SR251-14": "grupo f",
  "SP10-4-T2": "grupo g",
  "SR221-14": "grupo g",
  "SP10-6-T1": "grupo g",
  "ST104": "grupo g",
  "SP10-6-T2": "grupo g",
  "SP353": "grupo g",
  "221151": "grupo g",
  "SP17-2-T3": "grupo g",
  "SP950": "grupo g",
  "SP1202": "grupo g",
  "SP1512": "grupo g",
  "SP1410": "grupo g",
  "SP17-1-TC": "grupo h",
  "SP16-1-T3": "grupo h",
  "JC12": "grupo h",
  "ST154": "grupo h",
  "SP323": "grupo h",
  "SP1490": "grupo h",
  "SR971-14": "grupo h",
  "TH1": "grupo h",
  "SP90-C": "grupo h",
  "ST714": "grupo h",
  "SR233-14": "grupo i",
  "SP1522": "grupo i",
  "ST926": "grupo i",
  "SP811": "grupo i",
  "SP17-5-TC": "grupo i",
  "SP900": "grupo i",
  "SP101T2": "grupo i",
  "SP1390": "grupo i",
  "ST794": "grupo i",
  "SP17-1-T2": "grupo j",
  "ST895": "grupo j",
  "SP1492": "grupo j",
  "211151": "grupo j",
  "SP17-5-T1": "grupo j",
  "SP156-C": "grupo j",
  "SP1521": "grupo j",
  "SP710": "grupo j",
  "ZS5": "grupo j",
  "SP1561": "grupo j",
  "SR203-14": "grupo k",
  "ST606": "grupo k",
  "ST595": "grupo k",
  "SP293": "grupo k",
  "SP1503": "grupo k",
  "JC13": "grupo k",
  "SR951-14": "grupo k",
  "ST235": "grupo k",
  "SP1210": "grupo k",
  "SP1291": "grupo k",
  "JC16": "grupo k",
  "SR661-14": "grupo l",
  "SP105T3": "grupo l",
  "SR931-14": "grupo l",
  "SP90-F": "grupo l",
  "ST316": "grupo l",
  "SP140-C": "grupo l",
  "SP1310": "grupo l",
  "SP1550": "grupo l",
  "SP1403": "grupo l",
  "ST626": "grupo m",
  "SP16-5-T2": "grupo m",
  "ST245": "grupo m",
  "ST545": "grupo m",
  "ST124": "grupo m",
  "SP31-F": "grupo m",
  "SP10-10-T3": "grupo m",
  "ST956": "grupo m",
  "ST764": "grupo m",
  "SP910": "grupo m",
  "SR223-14": "grupo m",
  "SP700": "grupo n",
  "SP1441": "grupo n",
  "310161": "grupo n",
  "SP1412": "grupo n",
  "SP17-0-T3": "grupo n",
  "ST815": "grupo n",
  "SP15110": "grupo n",
  "SP10-4-TC": "grupo n",
  "JC111": "grupo n",
  "SP129-F": "grupo n",
  "SP17-4-T3": "grupo n",
  "SP953": "grupo n",
  "ST865": "grupo o",
  "ST265": "grupo o",
  "552077": "grupo o",
  "SP17-10-TC": "grupo o",
  "SP15100": "grupo o",
  "SP17-4-T1": "grupo o",
  "ST525": "grupo o",
  "ST505-1": "grupo o",
  "SP17-6-TC": "grupo o",
  "SP1491": "grupo o",
  "SP21-C": "grupo p",
  "SP17-5-T2": "grupo p",
  "300161": "grupo p",
  "ST205": "grupo p",
  "102156": "grupo p",
  "SP80-F": "grupo p",
  "SP1201": "grupo p",
  "SP801": "grupo p",
  "SR961-14": "grupo p",
  "SP1301": "grupo p",
  "SP10-10-T2": "grupo q",
  "SP10-4-T1": "grupo q",
  "ST144": "grupo q",
  "ST825": "grupo q",
  "SR671-14": "grupo q",
  "SP20-C": "grupo q",
  "SP35-F": "grupo q",
  "SR631-14": "grupo q",
  "JC15": "grupo q",
  "SP16-5-T3": "grupo q",
  "SR612-14": "grupo r",
  "ST996": "grupo r",
  "210151": "grupo r",
  "111156": "grupo r",
  "100156": "grupo r",
  "SP16-0-T2": "grupo r",
  "SP1213": "grupo r",
  "SP1340": "grupo r",
  "351161": "grupo r",
  "SP120-F": "grupo r",
  "122156": "grupo r",
  "SR901-14": "grupo r",
  "SP10-11-T2": "grupo r",
  "SP291": "grupo s",
  "350161": "grupo s",
  "SR602-14": "grupo s",
  "ST275": "grupo s",
  "SP100T2": "grupo s",
  "ST946": "grupo s",
  "SP1392": "grupo s",
  "SP16-11-T2": "grupo s",
  "SR921-14": "grupo t",
  "SP10-2-TC": "grupo t",
  "ST174": "grupo t",
  "SP913": "grupo t",
  "JC11": "grupo t",
  "SP1411": "grupo t",
  "SP1211": "grupo t",
  "SP17-4-T2": "grupo t",
  "ST326": "grupo t",
  "SP810": "grupo u",
  "101156": "grupo u",
  "SP10-2-T2": "grupo u",
  "SP10-2-T1": "grupo u",
  "SP313": "grupo u",
  "ST936": "grupo u",
  "SP1553": "grupo u",
  "SP892": "grupo u",
  "SP952": "grupo u",
  "SR271-14": "grupo v",
  "SP16-10-T3": "grupo v",
  "SP30-F": "grupo v",
  "SP91-F": "grupo v",
  "ST366": "grupo v",
  "ST696": "grupo v",
  "SP891": "grupo v",
  "SR621-14": "grupo v",
  "SP21-F": "grupo w",
  "ST194": "grupo w",
  "SP152-C": "grupo w",
  "SR672-14": "grupo w",
  "SP32-C": "grupo w",
  "SP1500": "grupo w",
  "SP1520": "grupo w",
  "SP150-C": "grupo w",
  "SR652-14": "grupo w",
  "ST164": "grupo x",
  "SP711": "grupo x",
  "SP10-4-T3": "grupo x",
  "SP17-6-T1": "grupo x",
  "SP912": "grupo x",
  "ST704": "grupo x",
  "SP17-0-TC": "grupo x",
  "SR942-14": "grupo x",
  "SP10-2-T3": "grupo x",
  "SR902-14": "grupo y",
  "202151": "grupo y",
  "SP322": "grupo y",
  "SP16-1-T1": "grupo y",
  "SP16-5-T1": "grupo y",
  "201151": "grupo y",
  "212151": "grupo y",
  "ST225": "grupo z",
  "SP29-F": "grupo z",
  "SP1402": "grupo z",
  "121156": "grupo z",
  "SP31-C": "grupo z",
  "SP17-2-TC": "grupo aa",
  "SP17-1-T3": "grupo aa",
  "SP10-11-TC": "grupo aa",
  "SP841": "grupo aa",
  "SR611-14": "grupo aa",
  "SP1100": "grupo aa",
  "SR651-14": "grupo aa",
  "ST356": "grupo aa",
  "SP702": "grupo aa",
  "SP16-0-T1": "grupo aa",
  "SP15111": "grupo ab",
  "SP24-C": "grupo ab",
  "ZS1": "grupo ab",
  "550077": "grupo ab",
  "SP1101": "grupo ab",
  "SR911-14": "grupo ab",
  "SP1440": "grupo ab",
  "SP17-1-T1": "grupo ac",
  "ST494": "grupo ac",
  "ST515": "grupo ac",
  "ST724": "grupo ac",
  "203151": "grupo ac",
  "SP105T2": "grupo ac",
  "SP1510-C": "grupo ad",
  "SP800": "grupo ad",
  "SR662-14": "grupo ad",
  "SP30-C": "grupo ad",
  "SP290": "grupo ad",
  "ST346": "grupo ad",
  "SP10-11-T3": "grupo ad",
  "SP840": "grupo ae",
  "ST855": "grupo ae",
  "ST114": "grupo ae",
  "SP17-11-T3": "grupo ae",
  "ST966": "grupo ae",
  "SR273-14": "grupo ae",
  "SP100T3": "grupo af",
  "SP141-C": "grupo af",
  "SP15113": "grupo af",
  "JC19": "grupo af",
  "SP1303": "grupo af",
  "SP29-C": "grupo ag",
  "SR912-14": "grupo ag",
  "SP16-2-T1": "grupo ag",
  "SR922-14": "grupo ag",
  "JC14": "grupo ag",
  "SP203": "grupo ag",
  "SR622-14": "grupo ag",
  "SP1493": "grupo ag",
  "SR632-14": "grupo ag",
  "SP17-6-T2": "grupo ag",
  "SP154-C": "grupo ag",
  "SP16-6-T1": "grupo ah",
  "SP101T3": "grupo ah",
  "SP17-6-T3": "grupo ah",
  "SP1312": "grupo ah",
  "ST734": "grupo ah",
  "JC10": "grupo ai",
  "SR932-14": "grupo ai",
  "SP1502": "grupo ai",
  "SP1113": "grupo ai",
  "SP124-C": "grupo ai",
  "SP1541": "grupo ai",
  "SP1240": "grupo ai",
  "SP911": "grupo ai",
  "SP1391": "grupo ai",
  "SP712": "grupo aj",
  "SP10-6-TC": "grupo aj",
  "SR213-14": "grupo aj",
  "SP101T-C": "grupo aj",
  "SP149-C": "grupo aj",
  "SP35-C": "grupo aj",
  "SP1212": "grupo aj",
  "ST754": "grupo ak",
  "SP10-11-T1": "grupo ak",
  "SP95-F": "grupo ak",
  "SP120-C": "grupo ak",
  "112156": "grupo ak",
  "ST424": "grupo ak",
  "SR601-14": "grupo ak",
  "ST845": "grupo ak",
  "SP91-C": "grupo al",
  "SP17-2-T1": "grupo al",
  "ST404": "grupo al",
  "SP95-C": "grupo al",
  "ST976": "grupo al",
  "ST454": "grupo al",
  "SP100T1": "grupo al",
  "ST805": "grupo am",
  "SP144-C": "grupo am",
  "120156": "grupo am",
  "SR972-14": "grupo am",
  "JC17": "grupo am",
  "SP15103": "grupo am",
  "SP105T-C": "grupo am",
  "SP321": "grupo am",
  "SP842": "grupo am"
};

const HandelClientsComponents = () => {
  const [RangeDates, setRangeDates] = useState<RangeDates>();
  const [selectedDays, SetselectedDays] = useState< DateObject | null>(null);
  const [selectedData, setSelectedData] = useState<any>([]);
  const [dataSeparatedByGroups, setDataSeparatedByGroups] = useState<any>([]);
  console.log("selectedData", selectedData);


  console.log("dataSeparatedByGroups",dataSeparatedByGroups);
  

  // Función para recibir los datos del hijo
  const receiveSelectedDays = (data: DateObject | undefined | null) => {
    SetselectedDays(data ?? null);
  };

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchDataRangeDates = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // const { data, error } = await supabase.rpc("maxymindates");
        const { data, error } = await supabase.rpc(
          "obtener_fechas_disponibles_por_id",
          { id_argumento: user.id }
        );
        if (error) {
          throw new Error("Error al obtener las fechas");
        }

        if (data && data.length > 0) {
          const { fecha_minima, fecha_maxima } = data[0];
          setRangeDates([
            { before: new Date(fecha_minima) },
            { after: new Date(fecha_maxima) },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataRangeDates();
  }, []);

  useEffect(() => {
    const fetchDataCharat = async () => {
      try {
        if (
          selectedDays !== null &&
          selectedDays.from !== null &&
          selectedDays.to !== null
        ) {
          const { data, error } = await supabase
            .from("main_orders")
           
            .select(
              `   * ,
                    item_tax (
                      fk, *
                    ),
                    promotion(
                      fk, *
                    ),
                    shipping_data(
                      fk, *
                    )

                  `
            )
            .gte("purchase_date", selectedDays.from) // Utiliza el nombre de tu columna de fecha y ajusta el operador según tus necesidades
            .lte("purchase_date", selectedDays.to);

          if (error) {
            throw new Error(error.message);
          }
    

          
          setSelectedData(data);
          // console.log("Data:", data);
          // Aquí puedes hacer lo que quieras con los datos, como enviarlos al componente padre
        } else {
          console.log(
            "selectedDays.from y selectedDays.to deben ser distintos de null"
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataCharat();
  }, [selectedDays]); // Agrega selectedDays como una dependencia del efecto



  useEffect(() => {
    const objetosPorGrupo = selectedData.reduce((acc, objeto) => {
      // Obtenemos el grupo al que pertenece el SKU del objeto
      const grupo = valorDeGrupos[objeto.sku];
  
      // Si el grupo existe, agregamos el objeto al array correspondiente
      if (grupo) {
        // Si el grupo aún no tiene un array, lo inicializamos
        if (!acc[grupo]) {
          acc[grupo] = [];
        }
        // Agregamos el objeto al array del grupo
        acc[grupo].push(objeto);
      }
  
      return acc;
    }, {});
  
    // Actualizamos el estado con los objetos separados por grupos
    setDataSeparatedByGroups(objetosPorGrupo);
  }, [selectedData]); // Asegúrate de incluir cualquier dependencia necesaria, como "objetos"
  




  //     }
  //   if (data !== null) {
  //     const groupedData: DateObject[] = data.reduce((result, order) => {
  //       const dateKey = new Date(order.purchase_date).toLocaleDateString();
  //       result[dateKey] = (result[dateKey] || 0) + order.item_price;
  //       return result;
  //     }, {});

  // Convertir el objeto a un array de objetos
  // const dataArray = Object.entries(groupedData).map(([date, total]) => ({
  //   date,
  //   total: parseFloat(total.toFixed(2)),
  // }));
  // dataArray.sort((a, b) => new Date(a.date) - new Date(b.date));

  // setChartData(dataArray);
  // console.log('dataArray', dataArray);





// para ver las ventas de cada pais estado
  // const stateCounts = {};

  // // Iterar sobre los resultados y contar el número de pedidos para cada estado
  // data.forEach(order => {
  //   const dateKey = new Date(order.purchase_date).toLocaleDateString();
  //   const state = order.ship_state;
  
  //   // Inicializar el objeto para la fecha si aún no existe
  //   stateCounts[dateKey] = stateCounts[dateKey] || {};
  //   // Incrementar el recuento para el estado correspondiente
  //   stateCounts[dateKey][state] = (stateCounts[dateKey][state] || 0) + 1;
  // });
  
  // // Convertir el objeto a un array de objetos
  // const dataStates = Object.entries(stateCounts).map(([date, stateCount]) => ({
  //   date,
  //   ...stateCount,
  // }));
  
  // console.log("stateCounts",stateCounts);
  
  // console.log("antes de dataStates",dataStates);
  
  // dataStates.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // console.log("despues de dataStates",dataStates);
  // setSelectedData(dataStates)
  

  return (
    <>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2">
        <DatePickerWithRange
          RangeDates={RangeDates}
          sendDataToParent={receiveSelectedDays}
        />
        <MenuCheckbox
         dataSeparatedByGroups={dataSeparatedByGroups}
          />
      </section>
      <CardContent>
        <p className="p-4 font-semibold">Overview</p>

        <LineChart
        //  data = {selectedData}
        />
      </CardContent>
    </>
  );
};

export default HandelClientsComponents;
