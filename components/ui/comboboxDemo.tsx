import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [open, setOpen] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState({});
  const [value, setValue] = React.useState([]);

  const toggleGroupSelection = (groupLabel) => {
    setOpenGroups((prevOpenGroups) => ({
      ...prevOpenGroups,
      [groupLabel]: !prevOpenGroups[groupLabel],
    }));
  };

  const toggleAllFrameworks = (groupFrameworks) => {
    const allFrameworkValues = groupFrameworks.map((framework) => framework.value);
    const isAllSelected = groupFrameworks.every((framework) => value.includes(framework.value));

    if (isAllSelected) {
      setValue(value.filter((item) => !allFrameworkValues.includes(item)));
    } else {
      setValue([...value, ...allFrameworkValues]);
    }
  };

  const handleCheckboxChange = (framework) => {
    if (value.includes(framework.value)) {
      setValue(value.filter((item) => item !== framework.value));
    } else {
      setValue([...value, framework.value]);
    }
  };

  return (
    <Popover open={open}onOpenChange={setOpen}>
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
                  checked={value.some((v) => group.frameworks.map((f) => f.value).includes(v))}
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
                          checked={value.includes(framework.value)}
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
