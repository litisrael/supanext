"use client";
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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

export function ComboboxParents() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dataAsin, setDataAsin] = useState<string[]>([]);

  console.log("dataAsin", dataAsin);

  const fetchDatesRange = async () => {
    const response = await fetch("/api/querys/allParents");

    const data = await response.json();

    setDataAsin(data);
  };

  useEffect(() => {
    fetchDatesRange();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Filter label..." autoFocus={true} />
          <CommandList>
            <CommandEmpty>No label found.</CommandEmpty>
            <CommandGroup>
              {dataAsin &&
                dataAsin.map((item,i) => (
                  <CommandItem
                    key={item.label}
                    value={item.value}
                    // onSelect={(value) => {
                    //   setLabel(value)
                    //   setOpen(false);
                    // }
                // }
                  >
                    {item.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
