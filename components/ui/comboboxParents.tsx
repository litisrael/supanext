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


const dataAsin =[
  {
      "value": "B01GOTKH94",
      "label": "Satin Square Ivilon Curtain to Nickel 1/8 1 Window"
  },
  {
      "value": "B01MUEEYQO",
      "label": "Ivory/White Curtain 1 Ivilon to 1/8 Square Window"
  },
  {
      "value": "B06X99GKMH",
      "label": "End 1 Ivilon Satin Window Rod Curtain Cap - Nickel to Pole."
  },
  {
      "value": "B06X99J9Y5",
      "label": "End Curtain - Window Ivilon Cap 1 Gold Pole. Warm Rod to"
  },
  {
      "value": "B06X9KXYXR",
      "label": "to Window Cap Ivilon Black End Curtain Pole. Rod - 1"
  },
  {
      "value": "B072MJYFGF",
      "label": "Color Style Warm Window to Rod - Inch. Treatments, Gold Ivilon Curtain Edge Drapery"
  },
  {
      "value": "B07KKMS3HL",
      "label": "Inch Rods. or Set of Curtain Rods Brackets 2 Fixed Ivilon"
  },
  {
      "value": "B07KQJ4W74",
      "label": "Curtain Ivilon 2 Set of or Rods. Brackets Rods Inch"
  },
  {
      "value": "B07KYWD14F",
      "label": "Treatment to Ball Style, Curtain Drapery Inch. Window - Rod Color Ivilon"
  },
  {
      "value": "B07QD2K98T",
      "label": "Drapery for Ivilon Curtain Rings 14 Hook Set Eyelet of Pins, Ring Loop"
  },
  {
      "value": "B07QMNN1BK",
      "label": "1 Ball to - Curtain inch with Pole. Inch. Finials Rod Ivilon"
  },
  {
      "value": "B08128XNBX",
      "label": "of Ring Hook Ivilon Rings Set Eyelet Pins, Drapery 14 for"
  },
  {
      "value": "B081D6P5VK",
      "label": "Square Carved - Ivilon to in Curtain Rod Finials, 1/8 1 Rod, Window Decorative in."
  },
  {
      "value": "B082T3JNPS",
      "label": "1 Window Drapery inch Acrylic Treatment - Ball Rod Ivilon to"
  },
  {
      "value": "B084GDBDH6",
      "label": "Cap Ivilon - Window 1 Curtain Brushed Nickel Rod to End Pole."
  },
  {
      "value": "B08563DJ1F",
      "label": "Windows - Shower, to or Inch. Ivilon Spring Curtain for"
  },
  {
      "value": "B08WTMK8YR",
      "label": "Drapery to Rod Hexagonal Faceted - Pole. Treatment Window Ivilon 1 inch"
  },
  {
      "value": "B09JTZ9RF2",
      "label": "1-1/8 Inch Rod for Ivilon Connector Rods to Bay of 5/8 Curtain Corner Window"
  },
  {
      "value": "B09KYD6X71",
      "label": "Ivilon - Rod, Window to Rod Design, Knob 1 Drapery"
  },
  {
      "value": "B09PWZLJQ4",
      "label": "Drapery 1 Hexagonal Ivilon Pole. White-Ivory Treatment to - Faceted Window Rod inch"
  },
  {
      "value": "B09WB37BT2",
      "label": "Ivilon Spring Inch, Curtain to - Hexagonal or Windows for Shower,"
  },
  {
      "value": "B09ZCG2S6D",
      "label": "to Rod, Window Design, Cap Rod Decorative End 1 Ivilon"
  },
  {
      "value": "B0B6KB4MFX",
      "label": "Bathroom, No Easy or Curtains, to Curtain Ivilon Drilling for Adjustable Windows, Required, Install, -"
  },
  {
      "value": "B0B8DZ2HDN",
      "label": "Color Curtain for Square Finials Rods Ivilon"
  },
  {
      "value": "B0B8F1B999",
      "label": "Diameter Rods Inch Ivilon Color of and Finials Cap 1 Curtain 7/8 End for"
  },
  {
      "value": "B0B8F1DQY6",
      "label": "Rods Inch Acrylic of 1 Finials Ball 7/8 and Ivilon Curtain Color for Diameter"
  },
  {
      "value": "B0B8F46S89",
      "label": "and diameter of 1 for Faceted Hexagonal Ivilon Curtain 7/8 Finials Rods inch Color"
  },
  {
      "value": "B0BFXNV9L6",
      "label": "Diameter, 1-Inch Ivilon Inches. - Finish Length Design, to Ball Hammered Adjustable"
  },
  {
      "value": "B0C34C594C",
      "label": "Antique Curtain 1/8 Black Square to 1 Rod Treatment Ivilon Window"
  },
  {
      "value": "B0C3FKMZXY",
      "label": "to Shower, Spring for - 24 or Windows Ivilon 16 Inch. Curtain"
  },
  {
      "value": "B0C78Y17GY",
      "label": "Window Ideal Easy Living Ivory Install, Inch Ivilon Rod Curtain Adjustable Bedroom Room, Heavy-Duty, for"
  },
  {
      "value": "B0C794BCKH",
      "label": "Install, Rod Black for Adjustable Room, Ivilon Window Ideal Inch Curtain Heavy-Duty, Easy Living Bedroom"
  },
  {
      "value": "B0C79CXMDY",
      "label": "Bedroom Ivilon Nickel Install, Easy Satin Living Curtain Heavy-Duty, Adjustable Rod Window Inch Room, for Ideal"
  },
  {
      "value": "B0CV2MBDHW",
      "label": "Wall for Rods Ivilon or Diameter. Mount 7/8 2. 1 Brackets Ceiling Color Holders Inch Set and Rod"
  },
  {
      "value": "B0CVNHFKM9",
      "label": "Studs. and Wall Curtain 12x #10-24 Threaded Anchors Screws Ivilon 6X Rods. Grip 2X 1/4-20 Color for Set"
  }
]

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
  // const [dataAsin, setDataAsin] = useState<{ label: string; value: string }[]>([]);

  // useEffect(() => {
  //   const fetchDatesRange = async () => {
  //     const response = await fetch("/api/querys/allParents");
  //     const data = await response.json();
  //     setDataAsin(data);
  //   };

  //   fetchDatesRange();
  // }, []);

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
