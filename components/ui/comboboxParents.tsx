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

type FormValues = {
  username: string;
  datesSelected: {
    from: Date;
    to: Date;
  };
  asinSelected: string[];
};

type ComboboxParentsProps = {
  selectedAsinParents: ControllerRenderProps<FormValues, "asinSelected">['value'];
  onChange: ControllerRenderProps<FormValues, "asinSelected">['onChange'];
};

export function ComboboxParents({
  selectedAsinParents,
  onChange,
}: ComboboxParentsProps) {
  const [open, setOpen] = useState(false);
  const [dataAsin, setDataAsin] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchDatesRange = async () => {
      const response = await fetch("/api/querys/allParents");
      const data = await response.json();
      setDataAsin(data);
    };

    fetchDatesRange();
  }, []);

  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = selectedAsinParents.includes(value)
      ? selectedAsinParents.filter((item) => item !== value)
      : [...selectedAsinParents, value];

    onChange(newSelectedValues);
  };

  const displayLabel = selectedAsinParents.length
    ? `selected ${selectedAsinParents.length} ASINs`
    : "Select ASIN parents";

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
              {dataAsin.map((item) => (
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
                    checked={selectedAsinParents.includes(item.value)}
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
