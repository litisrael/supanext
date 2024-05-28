"use client";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { processCSVAndDetermineTypes } from "./processCSVAndDetermineTypes.js";
import { processAndOrganizeData } from "./proccesDataParents.js";
import {  uploadDataOrders } from "./postReportDay.js";
import { uploadDataParents } from "./postParent.js";



type Parent = {
  parent_id: string;
  asin: string;
  isoString: string;
  variation: string [];
};

type Rank = {
  parent_id: string;
  marketplaceId: string;
  type: 'rank' | 'salesRank';
  title: string;
  link: string;
  value: number;
  rank: number;
};

// type Variation = {
//   parent_id: string;
//   asin: string;
//   market_place_id: string;
//   variation_data: any;
// };

type Tables = {
  parentsArray: Parent[];
  ranksArray: Rank[];
  salesRanksArray: Rank[];
  // variationsArray: Variation[];
};


export default function FileUploadComponent() {
  const [selectedFileOrders, setSelectedFileOrders] = useState(null);
  const [selectedFileParents, setSelectedFileParents] = useState<Tables | null>(null);
  const inputFileRefOrders = useRef<HTMLInputElement>(null); // Referencia al elemento input
  const inputFileRefParents = useRef<HTMLInputElement>(null);
  
  const handleFileChangeOfParent = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      try {
        const fileContent = await selectedFile.text();
        const jsonData = JSON.parse(fileContent);
        const tables = await processAndOrganizeData(jsonData);
        setSelectedFileParents(tables); // Guarda los datos JSON en el estado
        console.log(jsonData);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
};
  const handleUploadButtonClickParents = async () => {
    try {
      await uploadDataParents(selectedFileParents);
      setSelectedFileOrders(null); // Se borra después de presionar el botón "Upload"
      // Restablecer el valor del input después de presionar el botón "Upload"

      const fileInput = inputFileRefParents.current;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  const handleFileChangeOfOrders = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      try {
        const processedFile = await processCSVAndDetermineTypes(files);
        setSelectedFileOrders(processedFile);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  const handleUploadButtonClickOrders = async () => {
    try {
      await uploadDataOrders(selectedFileOrders);
      setSelectedFileOrders(null); // Se borra después de presionar el botón "Upload"
      // Restablecer el valor del input después de presionar el botón "Upload"

      const fileInput = inputFileRefOrders.current;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // console.log("selectedFile", selectedFileOrders);

  return (
    <>
    <div
     className="flex  justify-center gap-4"
     >

    
    <div className="flex flex-col items-center m-2">
    
      <Label htmlFor="fileInput">Upload CSV of orders</Label>
      <Input
        id="fileInput"
        type="file"
        accept=".csv, .txt, text/csv, text/plain"
        onChange={handleFileChangeOfOrders}
        ref={inputFileRefOrders}
        className="m-2"
        />
      <Button type="submit" onClick={handleUploadButtonClickOrders}>
        Upload
      </Button>
    </div>
    <div className="flex flex-col items-center  m-2" >
      <Label htmlFor="fileInput">Upload json parents</Label>
      <Input
        id="fileInput"
        type="file"
        // accept="."
        onChange={handleFileChangeOfParent}
        ref={inputFileRefParents}
        className="m-2"
        />
      <Button type="submit" onClick={handleUploadButtonClickParents}>
        Upload
      </Button>
    </div>
        </div>
        </>
  );
}
