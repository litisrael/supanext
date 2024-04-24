"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const frameworkGroups = [
  {
    label: "JavaScript",
    frameworks: [
      { value: "next.js", label: "Next.js" },
      { value: "nuxt.js", label: "Nuxt.js" },
    ],
  },
  {
    label: "JavaScript Alternativo",
    frameworks: [
      { value: "sveltekit", label: "SvelteKit" },
      { value: "remix", label: "Remix" },
      { value: "astro", label: "Astro" },
    ],
  },
];

export function MenuCheckbox() {

  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const [valueChequed, setValue] =useState([]);

  const supabase = createClientComponentClient();





 useEffect(() => {
    console.log("Frameworks seleccionados:", valueChequed);
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
      setValue(valueChequed.filter((item) => !allFrameworkValues.includes(item)));
    } else {
      setValue([...valueChequed, ...allFrameworkValues]);
    }
  };

  const handleCheckboxChange = (framework) => {
    if (valueChequed.includes(framework.value)) {
      setValue(valueChequed.filter((item) => item !== framework.value));
    } else {
      setValue([...valueChequed, framework.value]);
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
          {frameworkGroups.map((group) => (
            <li key={group.label}>
              <div
                className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                )}
                onClick={() => toggleGroupSelection(group.label)}
              >
                <Checkbox
                  checked={valueChequed.some((v) => group.frameworks.map((f) => f.value).includes(v))}
                  className={cn("mr-2 h-4 w-4")}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleAllFrameworks(group.frameworks)}
                />
                {group.label}
                <ChevronsUpDown className="absolute right-0 h-4 w-4" />
              </div>
              {openGroups[group.label] && (
                <ul className="list-none p-0 m-0 ml-4">
                  {group.frameworks.map((framework) => (
                    <li key={framework.value}>
                      <div
                        className={cn(
                          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        )}
                      >
                        <Checkbox
                          checked={valueChequed.includes(framework.value)}
                          onCheckedChange={() => handleCheckboxChange(framework)}
                          className={cn("mr-2 h-4 w-4")}
                        />
                        {framework.label}
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
