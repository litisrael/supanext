// utils/dataFunctions.ts

interface DateRange {
  from?: Date | string;
  to?: Date | string;
}

export interface DataTransformadaItem {
  purchase_date: string;
  sku: string;
  total_quantity: number;
}

interface TypeSkuYFecha {
  purchase_date: string;
  sku: string;
  total_quantity: number;
}
export interface SkuColors {
  [sku: string]: string;
}

interface AccType {
  [purchase_date: string]: { [key: string]: any }; // Puedes usar 'any' para los valores si no estás seguro de su tipo
}

interface AccTypeState {
  [ship_state: string]: { [sku: string]: any }; // Objeto que almacena VentasXState para cada sku en ship_state
}

type VentasXState = {
  ship_state: string;
  sku: string;
  total_quantity: number;
}

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const fetchDataRangeDates = async () => {
  try {
    const user = await getUser();
    if (!user) return;

    const { data, error } = await supabase.rpc(
      "obtener_fechas_disponibles_por_id",
      { id_argumento: user.id }
    );

    if (error) {
      throw new Error("Error al obtener las fechas");
    }

    if (data && data.length > 0) {
      const { fecha_minima, fecha_maxima } = data[0];
      return [
        { before: new Date(fecha_minima) },
        { after: new Date(fecha_maxima) },
      ];
    }
  } catch (error) {
    console.error(error);
  }
};

export const combineHeadersForChartOrders = (
  data: TypeSkuYFecha[],
  checkedValues: string[]
): {
  dataRenderizar: DataTransformadaItem[];
  skuColors: SkuColors;
  totalCantidad: number;
} => {
  let totalCantidad = 0;
  const skuColors: SkuColors = {};
  const colors = [
    "Slate",
    "Gray",
    "Zinc",
    "Neutral",
    "Stone",
    "Red",
    "Orange",
    "Amber",
    "Yellow",
    "Lime",
    "Green",
    "Emerald",
    "Teal",
    "Cyan",
    "Sky",
    "Blue",
    "Indigo",
    "Violet",
    "Purple",
    "Fuchsia",
    "Pink",
    "Rose",
  ];

  const dataTransformada = data.reduce((acc: AccType, curr: TypeSkuYFecha) => {
    const { purchase_date, sku, total_quantity } = curr;

    if (checkedValues.includes(sku)) {
      totalCantidad += total_quantity;

      if (!acc[purchase_date]) {
        acc[purchase_date] = { purchase_date };
      }

      if (!acc[purchase_date][sku]) {
        acc[purchase_date][sku] = total_quantity;
        if (!skuColors[sku]) {
          const randomBaseColor =
            colors[Math.floor(Math.random() * colors.length)];
          skuColors[sku] = randomBaseColor;
        }
      } else {
        acc[purchase_date][sku] += total_quantity;
      }
    }
    return acc;
  }, {} as AccType);
  const dataRenderizar = Object.values<DataTransformadaItem>(
    // @ts-ignore:
    dataTransformada
  ).sort(
    (a, b) =>
      new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime()
  );
console.log("asi tendria que ser los colores",skuColors);

  return { dataRenderizar, skuColors, totalCantidad };
};


export const combineHeadersForChartState = (
  data: VentasXState[],
  checkedValues: string[]
) => {
  const colors = [
    "Slate",
    "Gray",
    "Zinc",
    "Neutral",
    "Stone",
    "Red",
    "Orange",
    "Amber",
    "Yellow",
    "Lime",
    "Green",
    "Emerald",
    "Teal",
    "Cyan",
    "Sky",
    "Blue",
    "Indigo",
    "Violet",
    "Purple",
    "Fuchsia",
    "Pink",
    "Rose",
  ];

  let salesByState: {[key: string]: {[key: string]: number}} = {}; // Inicializar como objeto vacío
  let stateColors: {[key: string]: string} = {}; // Inicializar como objeto vacío

  for (let item of data) {
    if (checkedValues.includes(item.sku)) { // Usar item.sku para obtener el sku actual
      if (!salesByState[item.ship_state]) {
        salesByState[item.ship_state] = {};
      }
      if (!salesByState[item.ship_state][item.sku]) {
        salesByState[item.ship_state][item.sku] = 0;
      }
      salesByState[item.ship_state][item.sku] += item.total_quantity; // Sumar la cantidad al sku correspondiente

      // Asignar color al sku si aún no tiene uno asignado
      if (!stateColors[item.sku]) {
          const randomBaseColor =
            colors[Math.floor(Math.random() * colors.length)];
          stateColors[item.sku] = randomBaseColor;
        }
    }
  }

  const formattedSalesByState = Object.entries(salesByState).map(([ship_state, skus]) => ({
    ship_state,
    ...skus
  }));




  return { salesByState: formattedSalesByState, stateColors };
};
