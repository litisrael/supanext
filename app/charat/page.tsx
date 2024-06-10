// app/page.tsx
"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import DataDisplay from "./components/DataDisplay";
import Card, { CardContent, CardProps } from "@/components/Card";

import { SimpleLineChart } from "@/components/SimpleLineChart";
export default function Page() {
  const [formData, setFormData] = useState<any | null>(null);


  const handleFormSubmit = (data: any) => {
    setFormData(data);

  };

  return (
    <div>
  
        <CardContent >
        <InputForm onFormSubmit={handleFormSubmit} />
        <SimpleLineChart data={formData} />
        </CardContent>

    </div>
  );
}
