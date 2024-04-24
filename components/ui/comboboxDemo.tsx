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

export function MenuCheckbox({ dataSeparatedByGroups }) {
  const [open, setOpen] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState({});
  const [valueChecked, setValueChecked] = React.useState([]);

  const toggleGroupSelection = (groupLabel) => {
    setOpenGroups((prevOpenGroups) => ({
      ...prevOpenGroups,
      [groupLabel]: !prevOpenGroups[groupLabel],
    }));
  };

  const toggleAllFrameworks = (groupFrameworks) => {
    const allFrameworkValues = groupFrameworks.map((framework) => framework.sku);
    const isAllSelected = groupFrameworks.every((framework) =>
      valueChecked.includes(framework.sku)
    );

    if (isAllSelected) {
      setValueChecked(valueChecked.filter((item) => !allFrameworkValues.includes(item)));
    } else {
      setValueChecked([...valueChecked, ...allFrameworkValues]);
    }
  };

  const handleCheckboxChange = (framework) => {
    if (valueChecked.includes(framework.sku)) {
      setValueChecked(valueChecked.filter((item) => item !== framework.sku));
    } else {
      setValueChecked([...valueChecked, framework.sku]);
    }
  };

  const formatGroupData = (groupData) => {
    return groupData.map((item) => ({
      sku: item.sku,
      product_name: item.product_name,
      // Agrega otras propiedades necesarias aquí, como "asin", "currency", etc.
    }));
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
          {Object.entries(dataSeparatedByGroups).map(([grupo, frameworks]) => (
            <li key={grupo}>
              <div
                className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                )}
                onClick={() => toggleGroupSelection(grupo)}
              >
                <Checkbox
                  checked={valueChecked.some((v) => frameworks.map((f) => f.sku).includes(v))}
                  className={cn("mr-2 h-4 w-4")}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleAllFrameworks(frameworks)}
                />
                {grupo}
                <ChevronsUpDown className="absolute right-0 h-4 w-4" />
              </div>
              {openGroups[grupo] && (
                <ul className="list-none p-0 m-0 ml-4">
                  {formatGroupData(frameworks).map((framework, index) => (
                    <li key={index}>
                      <div
                        className={cn(
                          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        )}
                      >
                        <Checkbox
                          checked={valueChecked.includes(framework.sku)}
                          onCheckedChange={() => handleCheckboxChange(framework)}
                          className={cn("mr-2 h-4 w-4")}
                        />
                        {framework.sku}
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