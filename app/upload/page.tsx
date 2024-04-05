"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {processCSVAndDetermineTypes} from './processCSVAndDetermineTypes.js';
import { uploadData } from "./postreportDay.js";

export default function FileUploadComponent() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = async (event) => {
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
    
      console.log("selectedFile",selectedFile);
    
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="fileInput">Upload CSV</Label>
        <Input id="fileInput" type="file" accept=".csv"
        onChange={handleFileChange }
        />
        <Button type="submit" onClick={()=>uploadData(selectedFile) }>Upload</Button>
      </div>
    )
  }

  