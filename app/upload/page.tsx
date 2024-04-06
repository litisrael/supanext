"use client"
import { useEffect, useState,useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {processCSVAndDetermineTypes} from './processCSVAndDetermineTypes.js';
import { uploadData } from "./postreportDay.js";

export default function FileUploadComponent() {
    const [selectedFile, setSelectedFile] = useState(null);
    const inputFileRef = useRef<HTMLInputElement>(null); // Referencia al elemento input

    
    const handleFileChange = async (event : React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          try {
            const processedFile = await processCSVAndDetermineTypes(files);
            setSelectedFile(processedFile);

          
          } catch (error) {
            console.error("Error processing file:", error);
          }
        }
      };
    

      const handleUploadButtonClick = async () => {
        try {
            await uploadData(selectedFile);
            setSelectedFile(null); // Se borra después de presionar el botón "Upload"
            // Restablecer el valor del input después de presionar el botón "Upload"
           
            const fileInput = inputFileRef.current;
        if (fileInput) {
          fileInput.value = '';
        }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

      console.log("selectedFile",selectedFile);
    
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="fileInput">Upload CSV</Label>
        <Input id="fileInput" type="file" accept=".csv"
        onChange={handleFileChange }
        ref={inputFileRef}
        />
        <Button type="submit" onClick={handleUploadButtonClick}>Upload</Button>
      </div>
    )
  }

  