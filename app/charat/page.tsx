// app/page.tsx
"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import Card, { CardContent, CardProps } from "@/components/Card";

export default function Page() {
  return (
    <>
      <CardContent>
        <InputForm />
      </CardContent>
    </>
  );
}
