"use client";

import { Check, ChevronsUpDown, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";



export function MenuCheckbox( {onValueChange}) {

  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const [valueChequed, setValueChequed] =useState([]);
  const [fetchSku, setFetchSku] = useState<any>([]);
  const [grupos, setGrupos] = useState({});
  const supabase = createClientComponentClient();


  useEffect(() => {
    const fetchSkuData= async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

    
  const { data: skuData, error: skuError } = await supabase.rpc("obtener_sku", { id_argumento: user.id });
  setFetchSku(skuData)
  if (skuError) {
    throw new Error("Error al obtener las sku");
  }

} catch (error) {
  console.error(error);
}
};

fetchSkuData();
}, []);

// Función para obtener las dos primeras letras de una cadena
const obtenerDosPrimerasLetras = (str) => {
  if (str) { // Comprobar si str existe
    return str.substring(0, 2);
  } else {
    return ""; // Devolver una cadena vacía si str es undefined
  }
};

useEffect(() => {
  if (fetchSku.length === 0) return;

  // Contar la frecuencia de las dos primeras letras en el array de SKU
  const frecuenciaDosPrimerasLetras = fetchSku.reduce((acc, value) => {
    const key = obtenerDosPrimerasLetras(value);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Usando reduce para crear los grupos solo para aquellas dos primeras letras que tienen menos de 5 ocurrencias
  const grupos = fetchSku.reduce((acc, value) => {
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
  setGrupos(grupos)
  

}, [fetchSku]); // Este efecto se ejecutará cada vez que fetchSku cambie

 useEffect(() => {
  onValueChange(valueChequed);
  }, [valueChequed]);

  
  const toggleGroupSelection = (groupLabel) => {
    setOpenGroups((prevOpenGroups) => ({
      ...prevOpenGroups,
      [groupLabel]: !prevOpenGroups[groupLabel],
    }));
  };

  const toggleAllFrameworks = (groupFrameworks) => {
    const allFrameworkValues = groupFrameworks.map((framework) => framework.value);
    const isAllSelected = groupFrameworks.every((framework) => valueChequed.includes(framework.value));

    if (isAllSelected) {
      setValueChequed(valueChequed.filter((item) => !allFrameworkValues.includes(item)));
    } else {
      setValueChequed([...valueChequed, ...allFrameworkValues]);
    }
  };

  const handleCheckboxChange = (framework) => {
    if (valueChequed.includes(framework.value)) {
      setValueChequed(valueChequed.filter((item) => item !== framework.value));
    } else {
      setValueChequed([...valueChequed, framework.value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>

        <Button variant="outline" role="combobox" className="w-[200px] justify-between">
          Elegir items
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
            checked={valueChequed.some((v) => groupItems.map((item) => item.value).includes(v))}
            className={cn("mr-2 h-4 w-4")}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={() => toggleAllFrameworks(groupItems)}
          />
          {groupName}
          <ChevronsDown
            className={cn("absolute right-0 h-4 w-4", {
              "transform rotate-180": openGroups[groupName] // Rotamos los chevrones si el grupo está abierto
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
  );
}
