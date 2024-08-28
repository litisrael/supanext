import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AsinForm } from "./AsinForm";
import { PricesForm } from "./PricesForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Bla = () => {
 
 
  return (


<Tabs defaultValue="cost" >
  <TabsList>
<TabsTrigger value="cost">Modify item cost</TabsTrigger>
<TabsTrigger value="Names of asin Family">Modify names of asin Family</TabsTrigger>
</TabsList>
   <TabsContent value="Names of asin Family">Make changes of asin names 
   <AsinForm />
    </TabsContent>
    <TabsContent value="cost">cost of items
   <PricesForm />
    </TabsContent>
    </Tabs>
  );
}

export default Bla;
