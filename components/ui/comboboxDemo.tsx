import { CircleHelp, Filter, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface MenuCheckboxProps {
  onValueChange: (values: string[]) => void; // Tipo de la función de devolución de llamada
}
interface Sku {
  value: string;
  label: string;
}

interface Group {
  [groupName: string]: Sku[];
}
export function MenuCheckbox({ onValueChange }: MenuCheckboxProps) {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({}); // Tipo para el estado de los grupos abiertos
  const [valueChequed, setValueChequed] = useState<string[]>([]);
  const [fetchSku, setFetchSku] = useState<string[]>([]); // Tipo para el estado de los SKU
  const [grupos, setGrupos] = useState<Group>({}); // Tipo para los grupos

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchSkuData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: skuData, error: skuError } = await supabase.rpc(
          "obtener_sku",
          { id_argumento: user.id }
        );
        setFetchSku(skuData);
        
        if (skuError) {
          throw new Error("Error al obtener las sku");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkuData();
  }, []);

  const initializeCheckedValues = () => {
    const initialCheckedValues: string[] = [];
    Object.values(grupos).forEach((groupItems) => {
      groupItems.forEach((item) => {
        initialCheckedValues.push(item.value);
      });
    });
    setValueChequed(initialCheckedValues);
    onValueChange(initialCheckedValues);
  };

  useEffect(() => {
    if (fetchSku.length === 0) return;

    // Contar la frecuencia de las dos primeras letras en el array de SKU
    const frecuenciaDosPrimerasLetras = fetchSku.reduce((acc: Record<string, number>, value) => {
      const key = obtenerDosPrimerasLetras(value);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Usando reduce para crear los grupos solo para aquellas dos primeras letras que tienen menos de 5 ocurrencias
    const grupos = fetchSku.reduce((acc: Record<string, Sku[]>, value) => {
      let groupName;

      // Verificar si las dos primeras letras tienen menos de 5 ocurrencias
      if (frecuenciaDosPrimerasLetras[obtenerDosPrimerasLetras(value)] < 5) {
        groupName = "otros";
      } else {
        groupName = obtenerDosPrimerasLetras(value);
      }

      // Agregar el elemento al grupo correspondiente
      acc[groupName] = acc[groupName] || [];
      acc[groupName].push({ value, label: value });

      return acc;
    }, {});
    setGrupos(grupos);
    
  }, [fetchSku]); // Este efecto se ejecutará cada vez que fetchSku cambie

  useEffect(() => {
    initializeCheckedValues();
  }, [grupos]); // Este efecto se ejecutará cada vez que grupos cambie
  useEffect(() => {
    onValueChange(valueChequed);
  }, [valueChequed]);
  const obtenerDosPrimerasLetras = (str: string | undefined) => {
    if (str) {
      // Comprobar si str existe
      return str.substring(0, 2);
    } else {
      return ""; // Devolver una cadena vacía si str es undefined
    }
  };

  const toggleGroupSelection = (groupLabel: string) => {
    setOpenGroups((prevOpenGroups) => ({
      ...prevOpenGroups,
      [groupLabel]: !prevOpenGroups[groupLabel],
    }));
  };

  const toggleAllSku = (groupSku: Sku[] ) => {
    const allGroupSkuValues = groupSku.map(
      (framework) => framework.value
    );
    const isAllSelected = groupSku.every((sku) =>
      valueChequed.includes(sku.value)
    );

    if (isAllSelected) {
      setValueChequed(
        valueChequed.filter((item) => !allGroupSkuValues.includes(item))
      );
    } else {
      setValueChequed([...valueChequed, ...allGroupSkuValues]);
    }
  };

  const handleCheckboxChange = ( sku: Sku) => {
    if (valueChequed.includes(sku.value)) {
      setValueChequed(valueChequed.filter((item) => item !== sku.value));
    } else {
      setValueChequed([...valueChequed, sku.value]);
    }
  };

  return (<>


<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative inline-block"> {/* Contenedor relativo */}
          <HoverCard>
            <HoverCardTrigger>
              <span className="absolute left-[-20px] top-1/2 transform -translate-y-1/2">
                <CircleHelp className="w-5 h-5" /> {/* Icono de ayuda */}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              Choose the items you want to display on the chart.
            </HoverCardContent>
          </HoverCard>
          <Button
            variant="outline"
            role="combobox"
            className="w-[300px] justify-between"
            >
           Choose the items
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ul className="list-none p-0 m-0">
          {Object.entries(grupos).map(([groupName, groupItems]) => (
            <li key={groupName}>
              <div
                className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                )}
                onClick={() => toggleGroupSelection(groupName)}
                >
                <Checkbox
                  checked={valueChequed.some((v) =>
                    groupItems.map((item) => item.value).includes(v)
                  )}
                  className={cn("mr-2 h-4 w-4")}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleAllSku(groupItems)}
                  />
                {groupName}
                <ChevronsDown
                  className={cn("absolute right-0 h-4 w-4", {
                    "transform rotate-180": openGroups[groupName], // Rotamos los chevrones si el grupo está abierto
                  })}
                  />
              </div>
              {openGroups[groupName] && (
                <ul className="list-none p-0 m-0 ml-4">
                  {groupItems.map((item) => (
                    <li key={item.value}>
                      <div
                        className={cn(
                          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        )}
                        >
                        <Checkbox
                          checked={valueChequed.includes(item.value)}
                          onCheckedChange={() => handleCheckboxChange(item)}
                          className={cn("mr-2 h-4 w-4")}
                          />
                        {item.label}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
          </>
  );
}
