import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AsinForm } from "./AsinForm";
import { PricesForm } from "./PricesForm";
const Bla = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>click to  change name of asin Family (parent)</AccordionTrigger>
        <AccordionContent>
        <AsinForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger >click to  add or modify item prices</AccordionTrigger>
        <AccordionContent>
        <PricesForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Bla;
