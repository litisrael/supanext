'use client'
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface AsinName {
  asin_id: string;
  asin_name: string;
}



const supabase = createClient();

export const AsinForm = () => {
  const [asinNames, setAsinNames] = useState<AsinName[]>([]);
  const [updatedAsinNames, setUpdatedAsinNames] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchAsinNames = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      // console.log("user", user.id);

      const { data, error } = await supabase
        .from('asin_parent_names')
        .select('*')
        .eq('user_id', user.id)
        .order('asin_id', { ascending: true }); // Ordenar

      if (error) {
        console.error(error);
      } else {
        setAsinNames(data as AsinName[]);
      }
      setLoading(false);
    };

    fetchAsinNames();
  }, []);

  const handleInputChange = (asin_id: string, new_name: string) => {
    setUpdatedAsinNames(prev => ({
      ...prev,
      [asin_id]: new_name,
    }));
  };

  const handleUpdate = async () => {
    setMessage(null); // Resetea el mensaje antes de intentar la actualización
    try {
      for (const [asin_id, new_name] of Object.entries(updatedAsinNames)) {
        const { error } = await supabase
          .from('asin_parent_names')
          .update({ asin_name: new_name })
          .eq('asin_id', asin_id);

        if (error) {
          throw error;
        } else {
          setAsinNames(prev =>
            prev.map(asin =>
              asin.asin_id === asin_id ? { ...asin, asin_name: new_name } : asin
            )
          );
        }
      }
      setMessage({ type: 'success', text: 'Modificación exitosa' });
      setUpdatedAsinNames({});
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Error al modificar los nombres de ASIN' });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      {/* <Spinner size="lg" /> */}
      </div>;
  }

  return (
    <div className="container mx-auto p-4">
       <Button onClick={handleUpdate} className="mt-4">Modify</Button>
      <h1 className="text-2xl font-bold mb-4">ASIN Names</h1>
      {message && (
        <Alert className={`mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </Alert>
      )}
      <div
      className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">

      {asinNames.map(({ asin_id, asin_name }) => (
        <Card key={asin_id} className="mb-4">
          <CardHeader>
            <CardTitle>{asin_id}</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor={`asin_name_${asin_id}`} className="block text-sm font-medium text-gray-700">
              ASIN Name:
            </Label>
            <Input
              id={`asin_name_${asin_id}`}
              type="text"
              value={updatedAsinNames[asin_id] ?? asin_name}
              onChange={e => handleInputChange(asin_id, e.target.value)}
              className="mt-1 block w-full"
              />
          </CardContent>
        </Card>
      ))}
      </div>
     
    </div>
  );
};

export default AsinForm;