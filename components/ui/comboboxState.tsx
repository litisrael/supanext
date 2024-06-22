import { useState, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // Asegúrate de que esta importación es correcta
import { ControllerRenderProps } from "react-hook-form";


const dataState = [
  { value: "AE", label: "AE" },
  { value: "ALABAMA", label: "ALABAMA" },
  { value: "ALASKA", label: "ALASKA" },
  { value: "ALBERTA", label: "ALBERTA" },
  { value: "AP", label: "AP" },
  { value: "ARIZONA", label: "ARIZONA" },
  { value: "ARKANSAS", label: "ARKANSAS" },
  { value: "Antioquia", label: "Antioquia" },
  { value: "BAJA CALIFORNIA", label: "BAJA CALIFORNIA" },
  { value: "BAJA CALIFORNIA SUR", label: "BAJA CALIFORNIA SUR" },
  { value: "BRITISH COLUMBIA", label: "BRITISH COLUMBIA" },
  { value: "CALIFORNIA", label: "CALIFORNIA" },
  { value: "CHIHUAHUA", label: "CHIHUAHUA" },
  { value: "COLORADO", label: "COLORADO" },
  { value: "CONNECTICUT", label: "CONNECTICUT" },
  { value: "DC", label: "DC" },
  { value: "DELAWARE", label: "DELAWARE" },
  { value: "FLORIDA", label: "FLORIDA" },
  { value: "GEORGIA", label: "GEORGIA" },
  { value: "HAWAII", label: "HAWAII" },
  { value: "IDAHO", label: "IDAHO" },
  { value: "ILLINOIS", label: "ILLINOIS" },
  { value: "INDIANA", label: "INDIANA" },
  { value: "IOWA", label: "IOWA" },
  { value: "KANSAS", label: "KANSAS" },
  { value: "KENTUCKY", label: "KENTUCKY" },
  { value: "LOUISIANA", label: "LOUISIANA" },
  { value: "MAINE", label: "MAINE" },
  { value: "MANITOBA", label: "MANITOBA" },
  { value: "MARYLAND", label: "MARYLAND" },
  { value: "MASSACHUSETTS", label: "MASSACHUSETTS" },
  { value: "MEXICO", label: "MEXICO" },
  { value: "MICHIGAN", label: "MICHIGAN" },
  { value: "MICHOACÁN", label: "MICHOACÁN" },
  { value: "MINNESOTA", label: "MINNESOTA" },
  { value: "MISSISSIPPI", label: "MISSISSIPPI" },
  { value: "MISSOURI", label: "MISSOURI" },
  { value: "MONTANA", label: "MONTANA" },
  { value: "MORELOS", label: "MORELOS" },
  { value: "NEBRASKA", label: "NEBRASKA" },
  { value: "NEVADA", label: "NEVADA" },
  { value: "NEW BRUNSWICK", label: "NEW BRUNSWICK" },
  { value: "NEW HAMPSHIRE", label: "NEW HAMPSHIRE" },
  { value: "NEW JERSEY", label: "NEW JERSEY" },
  { value: "NEW MEXICO", label: "NEW MEXICO" },
  { value: "NEW YORK", label: "NEW YORK" },
  { value: "NEWFOUNDLAND AND LABRADOR", label: "NEWFOUNDLAND AND LABRADOR" },
  { value: "NORTH CAROLINA", label: "NORTH CAROLINA" },
  { value: "NORTH DAKOTA", label: "NORTH DAKOTA" },
  { value: "NOVA SCOTIA", label: "NOVA SCOTIA" },
  { value: "OHIO", label: "OHIO" },
  { value: "OKLAHOMA", label: "OKLAHOMA" },
  { value: "ONTARIO", label: "ONTARIO" },
  { value: "OREGON", label: "OREGON" },
  { value: "PENNSYLVANIA", label: "PENNSYLVANIA" },
  { value: "PR", label: "PR" },
  { value: "Pa.", label: "Pa." },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "QUEBEC", label: "QUEBEC" },
  { value: "Qu�bec", label: "Qu�bec" },
  { value: "RHODE ISLAND", label: "RHODE ISLAND" },
  { value: "Rizal", label: "Rizal" },
  { value: "SASKATCHEWAN", label: "SASKATCHEWAN" },
  { value: "SOUTH CAROLINA", label: "SOUTH CAROLINA" },
  { value: "SOUTH DAKOTA", label: "SOUTH DAKOTA" },
  { value: "TENNESSEE", label: "TENNESSEE" },
  { value: "TEXAS", label: "TEXAS" },
  { value: "UTAH", label: "UTAH" },
  { value: "VERMONT", label: "VERMONT" },
  { value: "VI", label: "VI" },
  { value: "VIRGINIA", label: "VIRGINIA" },
  { value: "WASHINGTON", label: "WASHINGTON" },
  { value: "WEST VIRGINIA", label: "WEST VIRGINIA" },
  { value: "WISCONSIN", label: "WISCONSIN" },
  { value: "WYOMING", label: "WYOMING" }
];




type FormValues = {
  username: string;
  datesSelected: {
    from: Date;
    to: Date;
  };
  selectedState: string[];
};

type ComboboxParentsProps = {
  selectedState: ControllerRenderProps<FormValues, "selectedState">['value'];
  onChange: ControllerRenderProps<FormValues, "selectedState">['onChange'];
};

export function ComboboxState({
  selectedState,
  onChange,
}: ComboboxParentsProps) {
  const [open, setOpen] = useState(false);
  // const [dataState, setDataState] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchDatesRange = async () => {
      // const response = await fetch("/api/querys/allStates");
      // const data = await response.json();
      // setDataState(data);

   
      
    };

    fetchDatesRange();
  }, []);

  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = selectedState.includes(value)
      ? selectedState.filter((item) => item !== value)
      : [...selectedState, value];

    onChange(newSelectedValues);
  };

  const displayLabel = selectedState.length
    ? `selected ${selectedState.length} state`
    : "Select States";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          
        >
            {displayLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {dataState.map((item) => (
                <div
                  key={item.value}
                  className="flex items-center justify-between px-2 py-1.5 text-sm rounded-sm"
                  onClick={() => handleCheckboxChange(item.value)}
                >
                  <div
                    className={cn(
                      "flex-1 cursor-pointer select-none outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                  >
                    {item.label}
                  </div>
                  <Checkbox
                    checked={selectedState.includes(item.value)}
                    onCheckedChange={() => handleCheckboxChange(item.value)}
                    onClick={(e) => e.stopPropagation()} // Evita que el evento click del div se dispare cuando se hace click en el checkbox
                    className="ml-2"
                  />
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
